const co = require('cheerio');
const axios = require('axios');
const qs = require('querystring');

const create = async (linkk, text1, text2) => {
  try {
    const response = await axios.post(linkk, qs.stringify({
      text_1: text1,
      text_2: text2,
      login: 'OK'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    let $ = co.load(response.data);
    const results = [];
    $(".thumbnail").find("img").each(function() {
      let h = $(this).attr("src");
      const result = "https://photooxy.com" + h;
      results.push(result);
      console.log(result);
    });
    return results;
  } catch (error) {
    console.error('Error in textpro create:', error.message);
    throw error;
  }
}

module.exports = { create }
