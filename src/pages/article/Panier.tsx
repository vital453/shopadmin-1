import { IonApp, IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import React from 'react';
import PanierArt from '../../components/articles/PanierArt';


const Panier: React.FC = () => {
  return (
    <>
      <IonHeader translucent>
        <IonToolbar color='secondary'>
          <IonButtons slot="start">
            <IonButton routerLink="/">
              <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className='ion-text-center'>Panier</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonApp>
        <PanierArt />
      </IonApp>
    </>
  );
};
export default Panier;