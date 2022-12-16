
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink, IonSegment, IonSegmentButton, IonFab, IonFabButton } from "@ionic/react";


import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline, add } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';






import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Commandes } from './Commandes'
import { Vendus } from './Vendus'
import { ModalComAdd } from './ModalComAdd'


interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;
    Titre: String;


}



export const Ventes: React.FC = () => {
    const [showmodal, setShowmodal] = useState(false);
    const [patient, setPatientlist] = useState<any[]>([]);
    const [seg, setSeg] = useState<any>('Commandés');
    const [titre, setTitre] = useState<String>("");
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



    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
    }, []);
    return (
        <>
            <IonSegment onIonChange={e => { setSeg(e.detail.value); }} value={seg} scrollable={true}  >
                <IonSegmentButton value="Commandés">
                    <IonLabel>Commandés</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Vendus">
                    <IonLabel>Vendus</IonLabel>
                </IonSegmentButton>
            </IonSegment>
            {(seg == 'Commandés') ? (
                // <Commandes />
                null
            ) : (
                // <Vendus />
                null
            )}
            gghgjghg
            {/* <IonFab vertical="center" horizontal="center" slot="fixed" className='fab1' id='far' >
                <IonFabButton color='secondary' size='small' onClick={() => setShowmodal(true)}  >
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab> */}
            <IonModal
                isOpen={showmodal}
                onDidDismiss={() => {
                    setShowmodal(false)
                }}
            >
                <ModalComAdd />

            </IonModal>




        </>



    )

};