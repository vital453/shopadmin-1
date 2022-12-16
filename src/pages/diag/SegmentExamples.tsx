import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';
import { call, home, heart, pin, star, globe, basket, camera, bookmark, idCardSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './segment.css'
interface Ajout_utiliformprops {
  onclose: () => void;

  nom: String;
  prenom: String;
  id: String;

}


export const SegmentExamples: React.FC<{id: String | number; selectedvalue: 'nouv' | 'list'; onSelectedValue: (value: 'nouv' | 'list')=>void}> = ({selectedvalue,onSelectedValue,id,}) => {
 
    const inputchangehandle = (event: CustomEvent)=>{
        onSelectedValue(event.detail.value)
    }
    
    

    return (
        <IonSegment value={selectedvalue} onIonChange={inputchangehandle}>
          <Link to={`/NouvDiag/${id}`}>

          <IonSegmentButton value="nouv" 
        //   onClick={()=>{window.location.href = "/new_rdv" }}
          >
            <IonLabel>Nouveau Diagnostic</IonLabel>
          </IonSegmentButton>
          </Link>
          <Link to={`/ListDiag/${id}`}>
          <IonSegmentButton value="list" 
        //    onClick={()=>{window.location.href = "/list_rdv" }}
        //    routerLink={"/list_rdv"}
          >
            <IonLabel>Diagnostic patient</IonLabel>
          </IonSegmentButton>
          </Link>
        </IonSegment> 
  );
};
