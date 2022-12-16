import React from 'react';
import { IonGrid, IonRow, IonCol, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { IonApp } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { arrowBack, personAddSharp } from 'ionicons/icons';
import { IonList } from '@ionic/react';


interface Affi_utiliformprops {
    onclose: () => void;

    nom: String;
    prenom: String;

}
const redig = () => {
    { window.location.href = "/" }
}


export const Tableau12 = (namet: String, prenomt: String) => [
    {
        Formation: namet,
        Cible: prenomt,

    }
];
// export const Tableau12: {namet: String, prenomt: String}[] = [
//    {
//         namet: 'jjj',
//         prenomt: 'fffff',

//     }
// ];
export const Modaldetailspat: React.SFC<Affi_utiliformprops> = ({ onclose, nom, prenom }) => {
    const redige = () => {
        console.log(nom);
        console.log(prenom);
        
     }
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        <IonTitle>Details Patient</IonTitle>
                        <IonButtons slot="start">
                            <IonButton onClick={() => { onclose() }}>
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} color="" />
                            </IonButton>
                        </IonButtons>

                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonList lines="full" class="ion-no-margin">
                        <IonButtons slot="">
                            <IonButton routerLink='/'>
                                vxbdbd<IonIcon style={{ fontSize: '30px' }} icon={personAddSharp} color="danger" />
                            </IonButton>
                        </IonButtons>
                        <IonGrid>
                            <IonRow className="ion-align-items-start">
                                <IonCol className="">ion-col start</IonCol>
                                <IonCol className="" onClick={() => { Tableau12(nom, prenom); redig() }}>ion-col center </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    )
};