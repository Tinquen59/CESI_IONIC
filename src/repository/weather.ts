const API_KEY = "a574e06820587c886dfe41b5d060e601";

export default {
  /**
   * /get weather data from location
   * @param location : string
   */
  async getWeather(location: string) {

    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
    );
    const data = await request.json();

    if(data.cod === "404") {
      return false
    }
    return data;
  },
  /**
   * /get forecast by lat and lon
   * @param lat : number
   * @param lon : number
   */
  async getForecast(lat: number, lon: number) {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${API_KEY}`
    );
    const data = await request.json();
    return data;
  },

  async getReverseLocation (lat: number, lon: number) {
    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=${API_KEY}`)
    const data = await request.json()
    return data.name
  }
};
