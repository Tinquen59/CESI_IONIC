/* eslint-disable */
import weather from '../repository/weather'
import moment from 'moment'
export default {
    /**
 * get current weather by city name
 * @param location : string
 */
    async getWeather(location: string) {
        const data = await weather.getWeather(location)
        return data
    }
}