import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "6c71458b804dabbc63cd4162f109e28d";

export const fetchWeather = async (query) => {
  //query is the name of the city we want to search for
  const { data } = await axios.get(URL, {
    params: {
      //These are the properties we want to send to our server
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });

  return data;
};
