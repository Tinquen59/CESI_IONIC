/* eslint-disable */
import React, { Fragment } from "react";
import moment from 'moment'
import helpers from '../helpers/helpers'

import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonContent,
  IonItem,
  IonList,
  IonAvatar,
  IonLabel,
} from "@ionic/react";

type WeatherDetailProps = {
  weather: any;
  currentForecast: any;
};

const WeatherDetail: React.FC<WeatherDetailProps> = ({
  weather,
  currentForecast,
}) => {

  const formatTemperature = (temp: number) => `${(temp - 273.15).toFixed(0)}°`

  const formatDateTime = (dt: any, formatType: any) => moment.unix(dt).format(formatType)

  return (
    <Fragment>
      {weather && currentForecast && (
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonAvatar slot="start">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </IonAvatar>
              <IonCardTitle>{weather.name}</IonCardTitle>
              <IonCardSubtitle>{weather.weather[0].main}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Aujourd'hui : {weather.weather[0].description}
              <IonList>
                {currentForecast.hourly.map((item) => (
                  <IonItem>
                    <IonAvatar slot="start">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h1>{formatDateTime(item.dt, 'HH')}h00</h1>
                      <h2>{formatTemperature(item.temp)}</h2>
                      <h3>{item.weather[0].main}</h3>
                      <p>{item.weather[0].description}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardTitle>Les jours suivants</IonCardTitle>
            <IonCardContent>
              <IonList>
                {currentForecast.daily.map((item) => (
                  <IonItem>
                    <IonAvatar slot="start">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      />
                    </IonAvatar>

                    <IonLabel>
                      <h1>{formatDateTime(item.dt, 'dddd')}</h1>
                      <h2>{formatTemperature(item.temp.day)}</h2>
                      <h3>{item.weather[0].main}</h3>
                      <p>{item.weather[0].description}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
      )}

      <Fragment></Fragment>
    </Fragment>
  );
};

export default WeatherDetail;
