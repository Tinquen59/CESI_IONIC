import React, { useState, Fragment } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonInput,
  IonToast
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import { DB } from "../env";
import helpers from "../helpers/helpers";
import { addOutline } from "ionicons/icons";
import Tab2 from './Tab2'

const Tab3: React.FC = () => {
  const [newCity, setnewCity] = useState("");
  const [notification, setNotification] = useState("");

  const addCity = async () => {
    const errorForm = await checkErrorForm()
    if (errorForm) {
      await DB.collection("WeatherList").doc().set({ city: newCity.trim() });
      setNotification(`${newCity} à été ajouté à votre liste météo !`);
      setnewCity("")
      // Tab2.getWeatherFromList()
    }
  };

  const checkErrorForm = async () => {
    setNotification("")
    const cityExist = await helpers.getWeather(newCity);
    if (!cityExist) {
      setNotification("Cette ville n'existe pas");
      return;
    }
    const documents = await DB.collection("WeatherList").get();

    let cityExistDatabase = false;
    documents.forEach((doc) => {
      if (doc.data().city === newCity) {
        cityExistDatabase = true;
        return;
      }
    });

    if (cityExistDatabase) {
      setNotification("Cette ville est déja enregistré");
      return;
    }
    return true;
  };
  return (
    <Fragment>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favoris</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Favoris</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonInput
            value={newCity}
            placeholder="Entrez le nom de votre ville"
            onIonChange={(e) => setnewCity(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonButton
          disabled={newCity.length === 0 ? true : false}
          onClick={() => addCity()}
          expand="block"
        >
          Ajouter la ville
        </IonButton>
      </IonContent>
    </IonPage>
     <IonToast
     isOpen={notification.length > 0 ? true : false}
     onDidDismiss={() => setNotification("")}
     message={notification}
     position="bottom"
     duration={1000}
   />
   </Fragment>
  );
};

export default Tab3;
