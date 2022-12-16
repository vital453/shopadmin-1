import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';
import { call, home, heart, pin, star, globe, basket, camera, bookmark } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './segment.css'

interface seg {
  selectedvalue: 'nouv' | 'list';
  onSelectedValue: (value: 'nouv' | 'list')=>void; 
  id: number;

}
export const SegmentExamples: React.FC<seg> = ({selectedvalue,onSelectedValue,id,}) => {
 
    const inputchangehandle = (event: CustomEvent)=>{
        onSelectedValue(event.detail.value)
       }

    return (
        <IonSegment value={selectedvalue} onIonChange={inputchangehandle}>
          <Link to={`/new_rdv/${id}`}>
          <IonSegmentButton value="nouv" 
        //   onClick={()=>{window.location.href = "/new_rdv" }}
          >
            <IonLabel>Nouveau Rendez-vous</IonLabel>
          </IonSegmentButton>
          </Link>
          <Link to={`/list_rdv/${id}`}> 
          <IonSegmentButton value="list" 
        //    onClick={()=>{window.location.href = "/list_rdv" }}
        //    routerLink={"/list_rdv"}
          >
            <IonLabel>List des Rendez-vous</IonLabel>
          </IonSegmentButton>
          </Link>
        </IonSegment> 
  );
};
