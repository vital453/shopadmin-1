
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink, IonSegment, IonSegmentButton, IonAccordion, IonAccordionGroup, IonCheckbox, IonFabButton } from "@ionic/react";


import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline, personCircle, arrowDownCircle, add, trash, addCircleOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import Axios from 'axios'





import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";



interface Ajout_utiliformprops {

    // nom: String;
    // prenom: String;
    onclose: () => void;
}


export const derncom: React.SFC<Ajout_utiliformprops> = ({ onclose, }) => {
    const [showmodal, setShowmodal] = useState(false);
    const [etat, setEtat] = useState(false);
    const [titre, setTitre] = useState<String>();
    const [age, setAge] = useState<any>(0);
    const [stat, setStat] = useState<any>();
    const [groupee, setGroupee] = useState<String>('rr');
    const [nomCli, setNomCli] = useState<String>('rr');
    const [telephone, setTelephone] = useState<String>('rr');
    const [remarque, setRemarque] = useState<String>('rr');
    const [adresse, setAdresse] = useState<String>('rr');
    const [antecedant, setantecedant] = useState<String>('rr');
    const [datenaissance, setdatenaissance] = useState<String>('rr');
    const [index, setIndex] = useState<number>(1);
    let [date, setdate] = useState("");
    const [tab, setTab] = useState<any>({
        name: "b",
        product_quantity: 0,
        unite_price: 0,
    })
    const [checked, setChecked] = useState(false);
    const [produit, setProduitlist] = useState<any[]>([
        {
            name: "",
            product_quantity: 0,
            unite_price: 0,
        }
    ]);

    const verif = async () => {
        console.log(produit[produit.length - 1].name);
        if (!produit[produit.length - 1].name) {
            alert("Dernier article non renseigné");
        } else {
            produit.push({
                name: "",
                product_quantity: 0,
                unite_price: 0,
            });
        }
    }
    const vet = async (e: number | React.SetStateAction<any>) => {
        console.log(e);
        setIndex(e)
    }
    const majart = async (a: any | React.SetStateAction<any>,
        b: any | React.SetStateAction<any>,
        c: any | React.SetStateAction<any>) => {
        produit[index].name = a;
        produit[index].product_quantity = b;
        produit[index].unite_price = c;
        setShowmodal(false)
    }




    useEffect(() => {

    }, []);
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color="secondary">
                        <IonTitle>Ajout commande</IonTitle>
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
                                    N°Facture:
                                </IonLabel>
                            </IonCol>
                            <IonInput>
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonCol size="3">
                                <IonLabel>
                                    Whatsapp client:
                                </IonLabel>
                            </IonCol>
                            <IonInput>
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonCol size="3">
                                <IonLabel>
                                    Date:
                                </IonLabel>
                            </IonCol>
                            <IonInput type="date"  value={date}onIonChange={(e) => { setdate(e.detail.value!) }}>
                            </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="ion-text-center">
                                Produits:
                            </IonLabel>
                            
                                <IonIcon icon={addCircleOutline} color="secondary" slot="end" size="large"  onClick={() => verif()} />
                            
                        </IonItem>
                        {produit.map((card, ind) => {
                            return (
                                <IonItem >
                                    <IonThumbnail slot="start">
                                        <img src="img/1cc.png" className='imp1' />
                                    </IonThumbnail>
                                    <IonLabel onClick={() => { setEtat(true); vet(ind); setShowmodal(true) }}>
                                        <h2>{card.name} x {card.product_quantity}</h2>
                                        <p>{card.unite_price}$</p>
                                    </IonLabel>
                                    <IonButton color="secondary" onClick={() => { produit.splice(ind, 1) }}><IonIcon icon={trash} /></IonButton>

                                </IonItem>
                            )
                        })}
                        <IonItem>
                            <IonButton color="secondary" onClick={() => { console.log(produit) }}>Valider</IonButton>
                        </IonItem>



                    </IonList>
                </IonContent>
            </IonApp>
            <IonModal
                isOpen={showmodal}
                onDidDismiss={() => {
                    setShowmodal(false)
                }}>
                

            </IonModal>



        </>



    )

};