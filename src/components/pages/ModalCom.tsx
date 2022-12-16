
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink, IonSegment, IonSegmentButton, IonAccordion, IonAccordionGroup, IonCheckbox, IonToast } from "@ionic/react";


import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline, personCircle, arrowDownCircle, informationCircle, chevronBack } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import Axios from 'axios'





import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Commandes } from './Commandes'
import { Vendus } from './Vendus'
import { recupCommande } from '../../Feature/CommandeSlice';
import { useDispatch, useSelector } from "react-redux";


interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;
    onclose: () => void;
    Invoice: String;
    Prix: number;
    Datec: any;
    Whatsapp: String;
    Statut: boolean;
    Etat: boolean;


}



export const ModalCom: React.SFC<Ajout_utiliformprops> = ({ onclose, Invoice, Prix, Datec, Statut, Etat, Whatsapp }) => {
    const [showmodal, setShowmodal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [produit, setProduitlist] = useState<any[]>([]);
    const dispatch = useDispatch();
    const [libstat, setLibstatlist] = useState<any[]>([]);
    const [etat, setEtat] = useState<any>(Etat);
    const [titre, setTitre] = useState<String>();
    const [age, setAge] = useState<any>(0);
    const [statut1, setStatut1] = useState<any>(Statut);
    const [statut, setStatut] = useState<any>(Statut);
    const [selectval, setSelectval] = useState<any>(Statut);
    const commart= useSelector((state: any) => state.commande.commandeart);
    const [groupee, setGroupee] = useState<String>('rr');
    const [nomCli, setNomCli] = useState<String>('rr');
    const [telephone, setTelephone] = useState<String>('rr');
    const [remarque, setRemarque] = useState<String>('rr');
    const [adresse, setAdresse] = useState<String>('rr');
    const [antecedant, setantecedant] = useState<String>('rr');
    const [datenaissance, setdatenaissance] = useState<String>('rr');
    const [id, setId] = useState<number>(0);
    const [checked, setChecked] = useState(false);
    const userid = useSelector((state:any) => state.auth.user);


    const getartcom = () => {
        // Axios.post('https://backend-shop.benindigital.com/afficheartcom', {
        //     invoice: Invoice,
        //     id_boutique: userid.userId
        // }).then((ret) => {
        //     setProduitlist(ret.data);
        //     console.log(ret.data);

        // })

        setProduitlist(commart.filter((t: any) => t.invoice == Invoice)); 

    };

    // const permu = (
    //     n: any | React.SetStateAction<any>
    // ) => {    
    // }


    const majstatut = (n: any | React.SetStateAction<any>) => {
        if (statut == 1 && statut1 == 1) {
            setShowToast2(true)
        } else {
            Axios.post('https://backend-shop.benindigital.com/majstatut', {
                invoice: Invoice,
                stat: n,
                id_boutique: userid.BoutiqueId
            }).then((ret) => {
                if (ret.data == "success") {
                    if (statut1 == 2 && statut == 1) {
                        Axios.post('https://backend-shop.benindigital.com/reducquant', {
                            reduc: produit,
                            tail: produit.length,
                            id_boutique: userid.BoutiqueId
                        }).then((ret) => {
                            console.log(ret.data);  
                        })
                    }

                    Axios.post('https://backend-shop.benindigital.com/affichecommande', {
                        id_boutique: userid.BoutiqueId
                    }).then((ret) => {
                        dispatch(recupCommande(ret.data));
                        setShowToast(true);
                        onclose();
                        console.log(ret.data);
            
                    })

                }
            })
        }

    };

    const getlibstat = () => {
        fetch('https://backend-shop.benindigital.com/affichelibstat').then((res) => {
            const data = res.json()
            return data
        }).then((data) => {
            console.log(data);
            setLibstatlist(data);
        })
    }





    useEffect(() => {
        getartcom();
        getlibstat();
        console.log(statut);

    }, []);
    return (
        <>
            <IonApp>
                <IonItem className='Item1' lines='none'>
                    <IonButtons slot='start' onClick={() => { onclose(); }}>
                        <IonIcon icon={chevronBack} />
                    </IonButtons>
                    Détails Commande
                </IonItem>

                <IonContent fullscreen>
                    <IonList lines="full" class="ion-no-margin">


                        <IonItem>

                            <IonCol className="nereide" size="3">
                                Date:
                            </IonCol>
                            <IonCol className="nereide" size="7">
                                {String(new Date ( Datec )).split("(")[0]}
                            </IonCol>

                        </IonItem>

                        <IonItem>

                            <IonCol className="nereide" size="4">
                                Facture:
                            </IonCol>
                            <IonCol className="nereide" size="6">
                                {Invoice}
                            </IonCol>

                        </IonItem>

                        <IonItem>

                            <IonCol className="nereide" size="4">
                                Montant:
                            </IonCol>
                            <IonCol className="nereide" size="6">
                            {new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(Prix)}
                            </IonCol>

                        </IonItem>


                        <IonItem>

                            <IonCol className="nereide" size="4">
                                Statut:
                            </IonCol>
                            <IonCol className="nereide" >
                                <IonSelect value={selectval} placeholder="Selectionner" onIonChange={e => {
                                    setStatut1(e.detail.value);
                                    setSelectval(e.detail.value); console.log(e.detail.value);
                                }}>
                                    {libstat.map((card, index) => {
                                        return (
                                            <IonSelectOption disabled={statut > card.id || (((card.id - statut) > 1) && card.id != 4) || statut == 3 ? true : false} value={card.id}>{card.libeller}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonCol>

                        </IonItem>
                        {/* (card.id-statut) <= 1 */}
                        <IonItem>

                            <IonCol className="nereide" size="4">
                                N°Client:
                            </IonCol>
                            <IonCol className="nereide" size="6">
                                {Whatsapp}
                            </IonCol>

                        </IonItem>


                        <IonAccordionGroup>
                            <IonAccordion value="colors" toggleIcon={arrowDownCircle}>
                                <IonItem slot="header">
                                    <IonLabel>Produits</IonLabel>
                                </IonItem>
                                <IonList slot="content">
                                    {produit.map((card, index) => {
                                        return (
                                            <IonItem>
                                                <IonLabel>{card.product_name}</IonLabel>
                                                <IonLabel>{card.product_quantity}</IonLabel>
                                                <IonLabel>{card.total_price}</IonLabel>
                                            </IonItem>
                                        )
                                    })}
                                </IonList>
                            </IonAccordion>

                        </IonAccordionGroup>

                        {(statut >= 3) ? (
                            null
                        ) : (
                            <IonCol>
                                <IonButton color="success"
                                    onClick={() => { 
                                        majstatut(statut1)
                                        // console.log(Invoice);
                                        
                                     }}
                                >Mettre à jour le status</IonButton>
                            </IonCol>
                        )}



                    </IonList>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message="Status mis à jour"
                        icon={informationCircle}
                        position="top"
                        duration={800}
                    />
                    <IonToast
                        isOpen={showToast2}
                        onDidDismiss={() => setShowToast2(false)}
                        message="Le nouveau status est incorrect"
                        icon={informationCircle}
                        position="top"
                        duration={800}
                    />
                </IonContent>
            </IonApp>




        </>



    )

};