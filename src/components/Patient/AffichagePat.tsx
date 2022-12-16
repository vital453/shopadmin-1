import React from 'react';
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton } from "@ionic/react";
import { Tableau1 } from '../Tableau1';
import '../Patient/affichagepat.css'
import { addCircle, arrowBackCircle, personAdd, arrowBack, add } from 'ionicons/icons';
import { ModalExample } from './ModalExample';
import { Modaldetailspat } from './Modaldetailspat';
import { ModalExample1 } from './ModalExample1';
import Axios from 'axios'


const AffichagePat = () => {

  const [groupe, setGroupe] = useState();
  const [showmodal, setShowmodal] = useState(false);
  const [nom, setNom] = useState<String>('ee');
  const [prenom, setPrenom] = useState<String>('rr');
  const [age, setAge] = useState<any>(0);
  const [sexe, setSexe] = useState<String>('rr');
  const [groupee, setGroupee] = useState<String>('rr');
  const [nomCli, setNomCli] = useState<String>('rr');
  const [telephone, setTelephone] = useState<String>('rr');
  const [remarque, setRemarque] = useState<String>('rr');
  const [adresse, setAdresse] = useState<String>('rr');
  const [antecedant, setantecedant] = useState<String>('rr');
  const [datenaissance, setdatenaissance] = useState<String>('rr');
  const [id, setId] = useState<number>(0);
  const [patient, setPatientlist] = useState<any[]>([]);
  const redig = () => {
    { window.location.href = "/" }
  }
  // const getpatient = () => {
  //   Axios.get('http://localhost:3001/affichepatient').then((response) => {
  //     setPatientlist(response.data);
  //   })
  // }
  const getpatient = () => {
    fetch('https://backend-medical.benindigital.com/affichepatient').then((res) => {
      const data = res.json()
      return data
    }).then((data) => {
      console.log(data);
      setPatientlist(data);
    })
  }
  const permu = (
      n: String | React.SetStateAction<String>
    , p: String | React.SetStateAction<String>
    , a: String | React.SetStateAction<String>
    , s: String | React.SetStateAction<String>
    , g: String | React.SetStateAction<String>
    , nc: String | React.SetStateAction<String>
    , t: String | React.SetStateAction<String>
    , r: String | React.SetStateAction<String>
    , e: String | React.SetStateAction<String>
    , i: String | React.SetStateAction<String>
    , ii: String | React.SetStateAction<String>
  ) => {
    setNom(n)
    setPrenom(p)
    setAge(a)
    setSexe(s)
    setGroupee(g)
    setNomCli(nc)
    setTelephone(t)
    setRemarque(r)
    setAdresse(e)
    setantecedant(i)
    setdatenaissance(ii)
  }
  const recherche = (a: [] | React.SetStateAction<any>) => {
    Axios.post('https://backend-medical.benindigital.com/rechercherpat', { nom: a }).then((response) => {
      setPatientlist(response.data);
      console.log(response.data);
      
    })
  };
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    getpatient();
    console.log(patient);
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
            <IonTitle slot="">
              Patients
            </IonTitle>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <div className="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
<div className="alert alert-secondary" role="alert">
  A simple secondary alert—check it out!
</div>
<div className="alert alert-success" role="alert">
  A simple success alert—check it out!
</div>
<div className="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div>
<div className="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div>
<div className="alert alert-info" role="alert">
  A simple info alert—check it out!
</div>
<div className="alert alert-light" role="alert">
  A simple light alert—check it out!
</div>
<div className="alert alert-dark" role="alert">
  A simple dark alert—check it out!
</div>
          <IonList lines="full" className="ion-no-margin">
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
                  <IonButton className='ion-text-end' routerLink='/ajoutpat' >
                    <IonIcon icon={add} style={{ fontSize: '30px' }} />
                  </IonButton>
                </IonButtons>
              </div>
            </div>
            <IonToolbar>
              <IonSearchbar
               onIonChange={e => { recherche(e.detail.value) }}
               ></IonSearchbar>
            </IonToolbar>

            <IonList>
              {patient.map((val, key) => {
                return (
                  <IonItem key={key} onClick={() => {
                    setShowmodal(true);
                    setId(val.idPatient);
                    permu(val.nom, val.prenom, val.age, val.sexe, val.groupeSanguin, val.nomClinique, val.telephone1, val.remarques, val.ville, val.antecedant, val.datenaissance)
                  }}>
                    {/* <IonItem key={key}  
                // onClick={()=>{window.location.href = `/modalexem/${key}`}}
                routerLink={`/modalexem/${key}`}
                > */}
                    <IonThumbnail slot="start">
                      <img
                        // src={val.Mode} 
                        src="img/1cc.png" className='imp1'
                      />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>{val.nom}  {val.prenom}</h2>
                      {/* <p>{val.telephone1},&nbsp;&nbsp;&nbsp;{val.telephone2}</p> */}
                      <p>{val.telephone1}</p>
                    </IonLabel>
                  </IonItem>
                )
              }
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
          <ModalExample1
            onclose={() => { setShowmodal(false) }}
            nom={nom}
            prenom={prenom}
            age={age}
            sexe={sexe}
            groupeS={groupee}
            telephone={telephone}
            remarque={remarque}
            nomCli={nomCli}
            adresse={adresse}
            antecedant={antecedant}
            datenaissance={datenaissance}
            id={id}
          // tab={patient}
          />

        </IonModal>
      </IonApp>
    </div>
  );
};

export default AffichagePat;



