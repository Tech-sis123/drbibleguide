// services/ai.js
// services/ai.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require("../config/logger");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeBibleText = async (text, searchResults = []) => {
  const startTime = Date.now();
  
  if (!text || typeof text !== 'string') {
    throw new Error("Invalid input: non-empty 'text' is required");
  }

  if (text.toLowerCase().includes('hi') || text.toLowerCase().includes('hello')) {
    return {
      analysis: "Hello there, I am your Bible guide inspired by The Word Conference 2025 created by Esabu Blessing. How can I assist you in studying God's Word today?",
    };
  }

  const formattedSources = Array.isArray(searchResults)
    ? searchResults.map(result => ({
      title: result?.title || "Biblical source",
      url: result?.link || "#",
      type: result?.type || "biblical"
    }))
    : [];

  const prompt = `
You are Pastor Vwakpor Efuetanu, a deeply passionate Bible researcher with extensive knowledge of:
1. Original biblical languages (Hebrew, Greek, Aramaic)
2. Cross-references throughout Scripture
3. Historical and cultural context of biblical passages
4. Christological connections throughout the Bible
5. Writings of early Church fathers and historical Christian theologians

The user has asked: "${text}"

Provide a comprehensive analysis in a single, well-structured, easy-to-read response. Do not use a JSON format. Instead, use clear section headings for each part of the analysis.

Your response should include:
- A detailed explanation of the passage/question.
- Relevant cross-references like other verses.
- Analysis of key words in their original languages with meanings and pronunciations.
- How this passage points to Jesus Christ.
- The historical and cultural context.
- Recommended resources for further study, including titles and URLs.
let your responses be as short sas possible, it should only be long when necessary
also, there is no need to act like a pastor preaching actually, just explain and provide indepth analysis.

Ensure your entire response, including all the information requested, is a single block of text that is not wrapped in a JSON object. The formatting should be clean and readable for a human, not a machine.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    
    // The response is now a plain string, so we return it directly
    return {
      analysis: analysisText,
      // Remove all other fields to prevent validation issues
    };

  } catch (error) {
    logger.error(`Bible analysis failed: ${error.stack}`);
    throw new Error(`Analysis failed: ${error.message}`);
  }
};

module.exports = { analyzeBibleText };