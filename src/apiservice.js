import axios from "axios";

const fetchQuestion = async (amount = 1) => {
  // Default amount to 1 if not specified
  const url = `https://opentdb.com/api.php?amount=${amount}`;
  const maxRetries = 3;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("Rate limit exceeded. Retrying in 5 seconds...");
      
      } else {
        console.log(error);
        break; 
      }
    }
  }
  return [];
};

export default fetchQuestion;
