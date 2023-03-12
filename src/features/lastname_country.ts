import axios from 'axios';
const LastNameCountry = async (lastname: string) => {
  try {
    const { data } = await axios.get(`https://buoyantgolddimension.imbharat420.repl.co/?lastname=${lastname}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default LastNameCountry;

//https://forebears.io/surnames?q=timmango

//https://forebears.io/resources
