/* eslint-disable */
import React, { useState, useEffect, Fragment } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonAvatar,
  IonCardTitle,
  IonList,
  IonLabel,
  IonItem,
  IonCardContent,
  IonCardHeader,
  IonToast,
  IonAlert,
  IonButton,
  IonModal,
  IonCardSubtitle
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import firebase from "firebase";
import helpers from "../helpers/helpers";
import moment from 'moment'
import "./Tab2.css";
import { DB } from '../env'
import weather from '../repository/weather'

const Tab2: React.FC = () => {
  const [citys, setCitys] = useState(null);
  const [notification, setNotification] = useState('')
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [id, setId] = useState(null)
  const [modal, setModal] = useState(false)
  const [currentWeatherSelected, setCurrentWeatherSelected] = useState(null)

  console.log(citys, 'citys 1')

  async function getWeatherFromList() {
    const documents = await DB.collection("WeatherList").get();
    let citys = [];
    documents.forEach((doc) => {
      citys.push({ dataWeather: doc.data(), keyId: doc.ref.id });
      console.log(doc, 'les villes')
    });

    console.log(citys, 'test ville')

    const weathersList = await Promise.all(
      citys.map(async (item) => {
        return {
          ...item,
          weather: await helpers.getWeather(item.dataWeather.city),
        };
      })
    );
    console.log(weathersList, 'list')
    setCitys(weathersList)
  }

  useEffect(() => {
    getWeatherFromList();
  }, []);

  const removeCity = async () => {
    setNotification('')
    DB.collection("WeatherList").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
      getWeatherFromList()
      setNotification('La ville a été supprimé avec succes')
    }).catch(function (error) {
      console.error("Error removing document: ", error);
      getWeatherFromList()
      setNotification('Une erreur est survenue')
    });
    // console.log(item.city)
  }

  const deleteData = (item) => {
    setShowDeleteAlert(true)
    setId(item.keyId)
  }

  const showWeather = async (item) => {
    setModal(true)
    console.log(item)
    item.forecast = await weather.getForecast(item.weather.coord.lon, item.weather.coord.lat)
    setCurrentWeatherSelected(item)
  }

  const formatTemperature = (temp: number) => `${(temp - 273.15).toFixed(0)}°`;
  const formatDateTime = (dt: any, formatType: any) => moment.unix(dt).format(formatType)

  console.log(weather)
  return (
    <Fragment>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Liste météo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Liste météo</IonTitle>
            </IonToolbar>
          </IonHeader>
          {citys !== null && <Fragment>
            {citys.map((item) => (
              <IonCard>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonAvatar slot="start">
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather.weather[0].icon}.png`}
                          alt=""
                        />
                      </IonAvatar>

                      <IonLabel>
                        <h1>{item.dataWeather.city}</h1>
                        <h2>{formatTemperature(item.weather.main.temp)}</h2>
                        <h3>{item.weather.weather[0].main}</h3>
                        <p>{item.weather.weather[0].description}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                  <IonButton color="danger" onClick={() => deleteData(item)} >Supprimer</IonButton>
                  <IonButton onClick={() => showWeather(item)}>Voir la météo</IonButton>
                </IonCardContent>
              </IonCard>
            ))}

          </Fragment>}

        </IonContent>
        {currentWeatherSelected !== null &&
          <IonModal isOpen={modal} cssClass='my-custom-class'>
            <IonContent>
            <IonCard>
              <IonContent>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonAvatar slot="start">
                        <img
                          src={`https://openweathermap.org/img/wn/${currentWeatherSelected.weather.weather[0].icon}.png`}
                          alt=""
                        />
                      </IonAvatar>

                      <IonLabel>
                        <h1>{currentWeatherSelected.dataWeather.city}</h1>
                        <h2>{formatTemperature(currentWeatherSelected.weather.main.temp)}</h2>
                        <h3>{currentWeatherSelected.weather.weather[0].main}</h3>
                        <p>{currentWeatherSelected.weather.weather[0].description}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonContent>
            </IonCard>
                {/* ici la fin du IonCard */}
                <IonCard>
                  <IonCardHeader>
                    <IonAvatar slot="start">
                      <img
                        src={`https://openweathermap.org/img/wn/${currentWeatherSelected.weather.weather[0].icon}.png`}
                      />
                    </IonAvatar>
                    <IonCardTitle>{currentWeatherSelected.weather.name}</IonCardTitle>
                    <IonCardSubtitle>{currentWeatherSelected.weather.weather[0].main}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Aujourd'hui : {currentWeatherSelected.weather.weather[0].description}
                    <IonList>
                      {currentWeatherSelected.forecast.hourly.map((item) => (
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
                      {currentWeatherSelected.forecast.daily.map((item) => (
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
            <IonButton onClick={() => setModal(false)}>Close Modal</IonButton>
          </IonModal>
        }

      </IonPage>
      <IonToast
        isOpen={notification.length > 0 ? true : false}
        message={notification}
        position="bottom"
        duration={1000}
      />
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        cssClass='my-custom-class'
        header={'Supprimer'}
        message={'Etes vous sûr de vouloir supprimer'}
        buttons={[
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: blah => {
              setShowDeleteAlert(false)
            }
          },
          {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
              removeCity()
            }
          }
        ]}
      />
    </Fragment>
  );
};

export default Tab2;
