import React from 'react';
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonModal, IonMenuButton } from "@ionic/react";
import { Tableau1 } from '../Tableau1';
import { add, arrowBack, personAdd } from 'ionicons/icons';
import { Modalmed } from './Modalmed';
import './affichmed.css'
import Axios from 'axios'

const Affichagesecret = () => {


  const [groupe, setGroupe] = useState();
  const [showmodal, setShowmodal] = useState(false);
  const [med, setMedlist] = useState<any[]>([]);
  let [nom, setNom] = useState<String>('ee');
  let [prenom, setPrenom] = useState<String>('rr');
  const [specialite, setSpecialite] = useState<any[]>([]);
  let [id, setId] = useState<String>('rr');
  const redig = () => {
    { window.location.href = "/" }
  }

  const permu = (a: String | React.SetStateAction<String>, i: String | React.SetStateAction<String>) => {
    setNom(a)
    setPrenom(i)
  }

  const rec = () => {
    Axios.get('https://backend-medical.benindigital.com/affichagemed').then((response) => {
      setMedlist(response.data);
    }) 
  }
  const recherche= (a: [] | React.SetStateAction<any>) =>{ 
    Axios.post('https://backend-medical.benindigital.com/recherchermed', {nom : a}).then((response)=>{
      
      setMedlist(response.data);
      
    })
  };
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    rec();
  }, []);


  return (
    <div>

      <IonApp>
        <IonHeader translucent>
          <IonToolbar color='primary'>
            <IonButtons slot="start">
              <IonButton routerLink='/'>
                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>Liste des medecins</IonTitle>
            <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList lines="full" class="ion-no-margin">
            <div className='game'>
              <div>
                <IonButtons slot="start" className='ion-text-end'>
                  <IonButton onClick={() => { }} className='ion-text-end'>
                    {/* <IonIcon slot="icon-only" icon={personAdd} /> */}
                  </IonButton>
                </IonButtons>
              </div>
              <div className='game1'>
                <IonButtons slot="end" className='ion-text-end' >
                  <IonButton onClick={() => { }} className='ion-text-end' routerLink='/ajoutmed' >
                    <IonIcon icon={add} style={{ fontSize: '30px' }}/>
                  </IonButton>
                </IonButtons>
              </div>
            </div>
            <IonToolbar>
              <IonSearchbar onIonChange={e => { recherche(e.detail.value) }}></IonSearchbar>
            </IonToolbar>

            <IonList>
              {med.map((val, key) =>
                <IonItem key={key} onClick={() => { setShowmodal(true); permu(val.nom, val.prenom); setId(val.idMedecin) }}>
                  {/* <IonItem key={key}  
                // onClick={()=>{window.location.href = `/modalexem/${key}`}}
                routerLink={`/modalexem/${key}`}
                > */}
                  <IonThumbnail slot="start">
                    <img
                      // src={val.Mode} 
                      src="img/1aa.jpg" className='imp1'
                    />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{val.nom}</h2>
                    <p>{val.prenom}, {val.telephone}</p>
                  </IonLabel>
                </IonItem>
              )}
            </IonList>
          </IonList>
        </IonContent>
        <IonModal
          isOpen={showmodal}
          onDidDismiss={() => {
            setShowmodal(false)
          }}
        >
          <Modalmed
            onclose={() => { setShowmodal(false) }}
            // nom={nom}
            // prenom={prenom}
            id={id}
          />

        </IonModal>
      </IonApp>
    </div>
  );
};

export default Affichagesecret;



{/* <h4>Discover</h4>
<h2>Music we think you'll love.</h2>
<IonList>
  {albums.map(album =>
    <IonItem key={album.id}>
      <IonThumbnail slot="start">
        <img src={album.artwork} />
      </IonThumbnail>
      <IonLabel>
        <h2>{album.title}</h2>
        <p>{album.artist}, {album.year}</p>
      </IonLabel>
    </IonItem>
  )}
</IonList> */}


