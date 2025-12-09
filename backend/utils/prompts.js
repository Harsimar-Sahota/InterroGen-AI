const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
Generate ${numberOfQuestions} interview question–answer pairs
for a ${role} with ${experience} years of experience.
Focus on: ${topicsToFocus}.

Each answer must be concise (2–3 sentences only).

Return ONLY valid JSON in this exact format:
[
  { "question": "Question here?", "answer": "Answer here." },
  ...
]

No backticks, no markdown, no extra text before or after the JSON.
`;

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate explanations for a given interview question.
    
    Task:
    
    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide a small code block.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format:
    
    {
        "title": "Short title here?",
        "explanation": "Explanation here."
    }
    
    Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
    `;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
