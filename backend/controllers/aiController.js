// backend/controllers/aiInterviewController.js
const { GoogleGenAI } = require("@google/genai"); // keep your install
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

// create ai client using API key from .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// helper: small retry wrapper to reduce transient failures
async function tryWithRetry(fn, attempts = 3, baseDelayMs = 400) {
  let lastError;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      // simple backoff
      await new Promise((r) => setTimeout(r, baseDelayMs * i));
    }
  }
  throw lastError;
}

// helper: extract text from the response in a robust way
function extractTextFromResponse(response) {
  // 1) Newer libs sometimes put text at response.output[0].contents[...].text
  try {
    if (!response) return "";
    // try common shapes
    if (response.output && Array.isArray(response.output)) {
      // loop through outputs and contents
      for (const out of response.output) {
        if (out.contents && Array.isArray(out.contents)) {
          for (const c of out.contents) {
            if (typeof c.text === "string" && c.text.trim()) return c.text.trim();
            if (c.type === "text" && typeof c.text === "string") return c.text.trim();
          }
        }
        if (typeof out.text === "string" && out.text.trim()) return out.text.trim();
      }
    }

    // older/simple libs sometimes expose response.text
    if (typeof response.text === "string" && response.text.trim()) return response.text.trim();

    // fallback to stringify
    return JSON.stringify(response);
  } catch (e) {
    // last resort
    return typeof response === "string" ? response : "";
  }
}

// safe JSON parse: extract the JSON array/object from AI text
function safeParseJsonFromAiText(rawText) {
  if (!rawText || typeof rawText !== "string") return null;

  try {
    // Try to find a JSON array or object inside the text
    const match = rawText.match(/[\[{][\s\S]*[\]}]/);
    if (!match) return null;

    const cleaned = match[0].trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("safeParseJsonFromAiText JSON.parse failed:", err);
    return null;
  }
}

// get model from env or default to a known working model
const DEFAULT_MODEL = "gemini-2.5-flash";
const MODEL_NAME = process.env.GEMINI_MODEL || DEFAULT_MODEL;

/**
 * @desc    Generate interview questions and answers using Gemini
 * @route   POST /api/ai/generate-questions
 * @access  Private
 */
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

const callAI = async () =>
  ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,

    // how much & how "creative"
    generationConfig: {
      maxOutputTokens: 300,   
      temperature: 0.5,       
    },

    // ask Gemini to reply as proper JSON (array of Q&A objects)
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" },
          },
          required: ["question", "answer"],
        },
      },
    },
  });

    const response = await callAI();
    const rawText = extractTextFromResponse(response);

    // Try to parse JSON safely
    const data = safeParseJsonFromAiText(rawText);

       if (!data || !Array.isArray(data)) {
      // Parsing failed or result is not an array → treat as error
      return res.status(500).json({
        message: "AI returned text but JSON parsing failed. See rawText for debug.",
        rawText,
      });
    }

    // On success, always return { questions: [...] }
    return res.status(200).json({ questions: data });
  } catch (error) {
    console.error("Error generateInterviewQuestions:", error);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message || error.toString(),
    });
  }
};

/**
 * @desc    Generate explanation for an interview question
 * @route   POST /api/ai/generate-explanation
 * @access  Private
 */
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const callAI = async () =>
      ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
      });

    const response = await tryWithRetry(callAI, 3, 400);
    const rawText = extractTextFromResponse(response);

    const data = safeParseJsonFromAiText(rawText);

    if (!data) {
      return res.status(200).json({
        message: "AI returned text but JSON parsing failed. See rawText for debug.",
        rawText,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error generateConceptExplanation:", error);
    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message || error.toString(),
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };