const API_KEY = 'a574e06820587c886dfe41b5d060e601'

// @ts-ignore
export default {
    /**
     * /get weather data from location
     * @param location : string
     */
    async getWeather(location: string) {
        const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
        const data = await request.json()
        return data
    },

    async setWeather(location: string) {
    },

    async getForecast(lon: number, lat: number) {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${API_KEY}`)
        const dataWeather = await request.json()
        return dataWeather
    }
};
