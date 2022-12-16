
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink, IonSegment, IonSegmentButton, IonAccordion, IonAccordionGroup, IonCheckbox, IonFabButton } from "@ionic/react";


import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline, personCircle, arrowDownCircle, add } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import Axios from 'axios'





import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Commandes } from './Commandes'
import { Vendus } from './Vendus'


interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;
    onclose: () => void;
    close1: (a: number | React.SetStateAction<any>,
        b: number | React.SetStateAction<any>,
        c: number | React.SetStateAction<any>) => void;
    produit: [][];
    index: number;

}



export const ModalProd: React.SFC<Ajout_utiliformprops> = ({ onclose, produit, index, close1 }) => {
    const [showmodal, setShowmodal] = useState(false);
    const [article, setArticlelist] = useState<any[]>([]);
    const [reduc, setReduc] = useState<any>();
    const [reductype, setReductype] = useState<any>(false);
    const [nom, setNom] = useState<String>();
    const [prix, setPrix] = useState<any>(0);
    const [quantite, setQuantite] = useState<any>();
    const [groupee, setGroupee] = useState<String>('rr');
    const [nomCli, setNomCli] = useState<String>('rr');
    const [telephone, setTelephone] = useState<String>('rr');
    const [remarque, setRemarque] = useState<String>('rr');
    const [adresse, setAdresse] = useState<String>('rr');
    const [antecedant, setantecedant] = useState<String>('rr');
    const [datenaissance, setdatenaissance] = useState<String>('rr');
    const [id, setId] = useState<number>(0);
    let [date, setdate] = useState("");

    const getprod = () => {
        fetch('https://backend-shop.benindigital.com/afficheartcroiss').then((res) => {
            const data = res.json()
            return data
        }).then((data) => {
            setArticlelist(data);
        })
    }
    
    const permu = async (a: [] | React.SetStateAction<any>) => {
        console.log(a);
        if (a.hasOwnProperty("name")) {
            setNom(a.name);
            setPrix(a.price);
            setReduc(a.discount_type);
            setReductype(a.discount);
            
        }
    }
    const env = async () => {
        if((quantite)&&(nom)){
            close1(nom, quantite, prix)
        }else{
            alert("Veuillez remplir tous les champs")
        }      
    }


    useEffect(() => {
        getprod();
    }, []);
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color="secondary">
                        <IonTitle>Infos produit</IonTitle>
                        <IonButtons slot="start">
                            <IonButton
                                onClick={() => {
                                    onclose();
                                }}
                            >
                                <IonIcon
                                    style={{ fontSize: "30px" }}
                                    icon={arrowBack}
                                    color=""
                                />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList lines="full" class="ion-no-margin">
                        <IonItem>
                            <IonCol size="3">
                                <IonLabel>
                                    Nom:
                                </IonLabel>
                            </IonCol>
                            <IonSelect value={id} placeholder="Specialité" className="inscripmed"
                                onIonChange={event => {
                                    setId(event.detail.value); permu(article.find(e => e.id == event.detail.value))
                                }}>
                                {article.map((val, key) => {
                                    return (
                                        <IonSelectOption value={val.id}>{val.name} {val.price}$</IonSelectOption>
                                    )
                                })}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonCol size="5">
                                <IonLabel>
                                    Quantité:
                                </IonLabel>
                            </IonCol>
                            <IonInput onIonChange={e => { setQuantite(e.detail.value) }} >
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonCol size="5">
                                <IonLabel>
                                    Type Réduction:
                                </IonLabel>
                            </IonCol>
                            <IonCheckbox disabled checked={reductype}>
                            </IonCheckbox>
                        </IonItem>
                        <IonItem>
                            <IonCol size="5">
                                <IonLabel>
                                    Réduction:
                                </IonLabel>
                            </IonCol>
                            <IonInput>
                                {reduc}
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonButton className="ion-text-center" onClick={() => { env() }}>
                                Ajouter
                            </IonButton>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonApp>




        </>



    )

};