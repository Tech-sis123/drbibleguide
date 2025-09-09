const axios = require('axios');
const logger = require('../config/logger');

const queryBibleResources = async (text) => {
  try {
    // This would search biblical resources instead of general web search
    // For now, we'll return some predefined biblical resources
    return [
      {
        title: "Blue Letter Bible",
        link: "https://www.blueletterbible.org",
        type: "biblical"
      },
      {
        title: "Bible Gateway",
        link: "https://www.biblegateway.com",
        type: "biblical"
      },
      {
        title: "Early Christian Writings",
        link: "https://www.earlychristianwritings.com",
        type: "historical"
      },
      {
        title: "Studylight.org",
        link: "https://www.studylight.org",
        type: "theological"
      }
    ];
  } catch (error) {
    logger.error(`Search failed: ${error.message}`);
    return []; // Return empty array instead of throwing error
  }
};

module.exports = { queryBibleResources };