const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const ai = async (func,topic,tId,mId)=>{
      const openai = new OpenAIApi(configuration);
      const {data} = await openai.createCompletion({
          prompt: topic,
          model: "text-davinci-002",
          temperature: 0.5,
          max_tokens: 60,
          top_p: 0.3,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
      });
      func(data.choices[0].text, tId, mId)
}


module.exports = ai