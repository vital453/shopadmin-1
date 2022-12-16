import {  IonCol, IonModal , IonListHeader , IonRadio , IonTextarea , IonThumbnail, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonInput, IonRow, IonAlert } from "@ionic/react";
import {  calculatorOutline, camera, personCircle, personSharp, refreshOutline } from 'ionicons/icons';

import { IonButtons, IonHeader } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { arrowBack, addCircle } from 'ionicons/icons';
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
 
  nom : String ;
  prenom: String;
  
}

export const ModalExample: React.SFC<Ajout_utiliformprops> = ({ onclose, nom, prenom }) => {
  // const [donner1, setDonner1] = useState(ondetail())
  const [clinique, setClinique] = useState('Clinique A');
  const [groupe, setGroupe] = useState('A');
  const [newNom, setNewnom] = useState <String | undefined> (nom);
  const [newPrenom, setNewprenom] = useState(prenom);
  return (
    <>
      <IonApp>
        <IonHeader translucent>
          <IonToolbar color='primary'>
            <IonTitle>Details rendez-vous</IonTitle>
            <IonButtons slot="start">
              <IonButton onClick={() => { onclose() }}>
                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} color="" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        
          
            
          <IonContent fullscreen>
          <IonList lines="full" class="ion-no-margin">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    style={{ '--border-radius': '100%', width: '152px', height: '152px' }}
                    // onClick={() => getPhoto({
                    //     resultType: CameraResultType.DataUrl,
                    //     source: CameraSource.Camera,
                    //     quality: 100
                    // })}
                    color="medium"
                  >
                    <IonIcon style={{ fontSize: '62px' }} icon={personCircle} />

                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating"><h2 className="labh" >Nom</h2></IonLabel>
                    <IonInput placeholder="" disabled value={''+newNom} ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Prenom</IonLabel>
                    <IonInput placeholder="" value={''+newPrenom} disabled></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonRadioGroup value="M" >
              <IonListHeader >
                <IonLabel>SEXE</IonLabel>
              </IonListHeader>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel>Femme</IonLabel>
                      <IonRadio slot="start" color="warning" value="F" disabled></IonRadio>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem lines='none'>
                      <IonLabel>Homme</IonLabel>
                      <IonRadio slot="start" color="primary" value="M" disabled></IonRadio>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRadioGroup>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonInput placeholder="Age" type="number" value={17} disabled></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonSelect value={groupe} placeholder="Votre groupe sanguin" onIonChange={e => setGroupe(e.detail.value)} disabled>
                      <IonSelectOption value="A">A</IonSelectOption>
                      <IonSelectOption value="B">B</IonSelectOption>
                      <IonSelectOption value="AB">AB</IonSelectOption>
                      <IonSelectOption value="O">O</IonSelectOption>
                      <IonSelectOption value="A+">A+</IonSelectOption>
                      <IonSelectOption value="B+">B+</IonSelectOption>
                      <IonSelectOption value="AB+">AB+</IonSelectOption>
                      <IonSelectOption value="O+">O+</IonSelectOption>
                      <IonSelectOption value="A-">A-</IonSelectOption>
                      <IonSelectOption value="B-">B-</IonSelectOption>
                      <IonSelectOption value="AB-">AB-</IonSelectOption>
                      <IonSelectOption value="O-">O-</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonSelect value={clinique} placeholder="Clinique" onIonChange={e => setClinique(e.detail.value)} disabled>
              <IonSelectOption value="Clinique A">Clinique A</IonSelectOption>
              <IonSelectOption value="Clinique B">Clinique B</IonSelectOption>
              <IonSelectOption value="Clinique C">Clinique C</IonSelectOption>
              <IonSelectOption value="Clinique D">Clinique D</IonSelectOption>
            </IonSelect>
          </IonList>
          <IonList lines="full" class="ion-no-margin">
            <IonItem>
              <IonLabel position="stacked">Coordonnées</IonLabel>
              <IonInput placeholder="Téléphone 1" disabled></IonInput>
              <IonInput placeholder="Téléphone 2" disabled></IonInput>
              <IonInput placeholder="Ville" disabled></IonInput>
              <IonInput placeholder="Quartier" disabled></IonInput>
              <IonInput placeholder="Maison" disabled></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Remarques</IonLabel>
              <IonTextarea placeholder="placeholder" disabled></IonTextarea>
            </IonItem>
         





           
                {/* <IonLabel>
                  <h2>Nom</h2>
                  <p> {nom}</p>
                </IonLabel>
                <IonLabel>
                  <h2>Prenom</h2>
                  <p>{prenom}</p>
                </IonLabel> */}
              
              
            
          </IonList>
        </IonContent>
      </IonApp>
    </>
  )
};