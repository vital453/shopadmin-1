/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink } from "@ionic/react";

import './conteneur1.css'
import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';






import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";


interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;
    Titre: String;
    Desc: String
}

// import { Swiper } from 'swiper/types';



// Import Swiper React components


// Import Swiper styles 
// import 'swiper/swiper.scss';
// import 'swiper/scss'



export const Conteneur1: React.SFC<Ajout_utiliformprops> = ( { Titre, Desc, } ) => {
    const [showmodal, setShowmodal] = useState(false);
    const [patient, setPatientlist] = useState<any[]>([]);
    const [nom, setNom] = useState<String>('ee');
    const [titre, setTitre] = useState<String>(Titre);
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
            <div className="eac">
                
                    <div className="ee">
                        <h2 className="ether">{Titre}</h2>
                    </div>
                    {/* <div className="aa" color="secondary">
                        <p className="ethern">
                          
                            </p>
                    </div> */}
                    <div className="dd">
                    </div>
                
            </div>

        </>



    )

};