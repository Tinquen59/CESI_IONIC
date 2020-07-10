import React, {useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import SearchBar from '../components/SearchBar';
import './Tab1.css';
import WeatherDetail from '../components/WeatherDetail';
import weather from '../repository/weather'

const Tab1: React.FC = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null)
  const [geolocHasBeenDone, setGeolocHasBeenDone] = useState(false);
  const [showToast, setShowToast] = useState(null);

  /**
   * get current weather by city name
   * @param location : string
   */
  const getWeather = async (location: string) =>  {
    const data = await weather.getWeather(location)
    if(!data) {
      setShowToast(true)
      return 
    }
    setCurrentWeather(data)
    await getForecast(data.coord.lat, data.coord.lon)
  
  }
/**
 * get forecast of the city by lat and lon
 * @param lat : number
 * @param lon : number
 */
const getForecast = async (lat: number, lon: number) => {
  const data = await weather.getForecast(lat, lon)
  setCurrentForecast(data)
  setGeolocHasBeenDone(true)
}

/**
 * UseEffect + geolocation 
 */
useEffect(() => {
  if ("geolocation" in navigator && !geolocHasBeenDone) {
    navigator.geolocation.getCurrentPosition(async position => {
      const city = await weather.getReverseLocation(position.coords.latitude, position.coords.longitude)
      await getWeather(city)
    });
  } else {
     return 
  }
});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lieu actuel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lieu actuel</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SearchBar defaultName={'Paris'} getWeather={(location: string) => getWeather(location)} />
        {currentWeather && <WeatherDetail currentForecast={currentForecast} weather={currentWeather} />}
        <IonToast
        isOpen={showToast}
        message="Aucune ville trouvé"
        position="bottom"
      />
       
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
