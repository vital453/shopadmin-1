
import { IonButtons, IonHeader } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, addCircle } from 'ionicons/icons';
import { IonContent } from '@ionic/react';
import { IonApp } from '@ionic/react';
import { IonList } from '@ionic/react';
import { IonItem } from '@ionic/react';
import { IonLabel } from '@ionic/react';
import { IonToolbar } from '@ionic/react';
import { IonTitle } from '@ionic/react';
import { IonSearchbar } from '@ionic/react';
import { useState } from 'react';
interface Ajout_utiliformprops {
  onclose: () => void;
  tab: {

    Formation: string,
    Cible: string,
    Format: string,
    Mode: string,
    Theme: string,
    Duree: string,
    Certificat: string,
    Modalite: string,
  }[];
}
// interface tabg {
//   Formation: string,
//   Cible: string,
// }
// export const tabh: { name: string }[] = [   
//   {
//     name: 'hbfhgf',
// },
// ]

// export let allNames: { id: number, name: string }[] = [
//   {
//     id: 15,
//     name: `${name}`
//   },
// ]
export const Tableau11=(namet: string, prenomt: string) => [
  {
      Formation: namet,
      Cible: prenomt,
     
  },
];
// function greeting(name: string,nameo: string,namei: string,namep: string)[]{
//   return (
//     name,
//     nameo
//   )
  
// }
export const ModalExample: React.SFC<Ajout_utiliformprops> = ({ onclose, tab }) => {
  // const [donner1, setDonner1] = useState(ondetail())
  let ugcu = 10;
  const affi = () => {
    console.log(tab);
  }
  return (
    <>
      <IonApp>
        <IonHeader translucent>
          <IonToolbar color='primary'>
            <IonTitle>Details rendez-vous</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => { onclose() }}>
                <IonIcon style={{ fontSize: '30px' }} icon={arrowBackCircle} color="" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
            <IonButtons slot="end">
              <IonButton onClick={() => { affi() }}>
                <IonIcon style={{ fontSize: '30px' }} icon={arrowBackCircle} color="" />
              </IonButton>
            </IonButtons>
            {tab.map((val, key) =>
              <IonItem key={key} onClick={() => { onclose() }}>

                <IonLabel>
                  <h2>NOM</h2>
                  <p>{val.Theme}</p>
                </IonLabel>
                <IonLabel>
                  <h2>Prenom</h2>
                  <p> {val.Theme}</p>
                </IonLabel>
                <IonLabel>
                  <h2>Date</h2>
                  <p>{val.Theme}</p>
                </IonLabel>
                <IonLabel>
                  <h2>Date</h2>
                  <p>{val.Theme}</p>
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonContent>
      </IonApp>
    </>
  )
};