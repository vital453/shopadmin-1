/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink, IonFabButton, IonLoading, IonToast } from "@ionic/react";
import Axios from 'axios'

import './conteneur.css'
import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline, removeCircleSharp, removeOutline, addOutline, informationCircle, star } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
// import { tab4 } from './articles/Paniermodal';
// import { tab5 } from './articles/PanierItem';







import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import AddToCartButton from "./AddToCartButton";
import { log } from "console";



interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;
    Nom: String;
    Prix: number;
    Id: number;
    Stock: number;
    Ig: String;

}

export let boolcont = false;

const aff1 = () => {
    setTimeout(() => { boolcont = false }, 500);
    boolcont = true
}









export const Conteneur: React.SFC<Ajout_utiliformprops> = ({ Nom, Prix, Id, Stock, Ig }) => {
    const [clic, setClic] = useState(false);
    const [panier, setPanier] = useState<any[]>();
    const [nom, setNom] = useState<String>(Nom);
    const [achatv, setAchatv] = useState<any>(false);
    const [quantite, setQuantite] = useState<any>(1);
    const [prix, setPrix] = useState<any>(Prix);
    const [command, setCommand] = useState<any>();
    const [ajoute, setAjoute] = useState<any>();
    const [telephone, setTelephone] = useState<String>('rr');
    const [remarque, setRemarque] = useState<String>('rr');
    const [adresse, setAdresse] = useState<String>('rr');
    const [antecedant, setantecedant] = useState<String>('rr');
    const [datenaissance, setdatenaissance] = useState<String>('rr');
    const [id, setId] = useState<number>(0);

    const [showLoading, setShowLoading] = useState(true);

    const [showToast1, setShowToast1] = useState(false);



    // setTimeout(() => {
    //     setShowLoading(false);
    // }, 10000);
    const refr = () => {
        // getpan()
        // if (tab5 == 14) {
        //     fetch('https://backendtrader.digitalfirst.space/affichepanier').then((res) => {
        //         const data = res.json()
        //         return data
        //     }).then((data) => {
        //         setPanier(data);
        //         setClic(false);
        //         for (var i = 0, len = data.length, a = 0; i < len; i++) {
        //             if (data[i].product_id == Id) {
        //                 setCommand(true);
        //                 a = a + 1;
        //                 console.log(data[i].product_quantity);
        //                 setAjoute(data[i].product_quantity);
        //             }
        //             if (a == 0 && i == (len - 1)) {
        //                 setCommand(false)
        //             }
        //         }

        //     })
        // }
    }


    const increm = () => {
        if (quantite < Stock) {
            setQuantite(quantite + 1)
        }
    };
    const decrem = () => {
        if (quantite > 0) {
            setQuantite(quantite - 1)
        }
    };

    // const getpan = () => {

    //     if (panier && (clic == false) && (tab4 == 12)) {
    //         for (var i = 0, len = panier.length, a = 0; i < len; i++) {
    //             if (panier[i].product_id == Id) {
    //                 setCommand(true);
    //                 a = 2;
    //                 setAjoute(panier[i].product_quantity);


    //             }
    //             if (a == 0 && i == (len - 1)) {
    //                 setCommand(false)
    //             }
    //         }
    //     } else {
    //         fetch('https://backendtrader.digitalfirst.space/affichepanier').then((res) => {
    //             const data = res.json()
    //             return data
    //         }).then((data) => {
    //             setPanier(data);
    //             setClic(false);


    //             for (var i = 0, len = data.length, a = 0; i < len; i++) {
    //                 if (data[i].product_id == Id) {
    //                     setCommand(true);
    //                     a = a + 1;
    //                     console.log(data[i].product_quantity);
    //                     setAjoute(data[i].product_quantity);
    //                 }
    //                 if (a == 0 && i == (len - 1)) {
    //                     setCommand(false)
    //                 }
    //             }
    //         })
    //     }



    // }
    const suppression = (ide: number | React.SetStateAction<any>) => {

        Axios.delete(`https://backendtrader.digitalfirst.space/deletepan/${ide}`);
        setCommand(false);
        setAjoute(quantite);
        setClic(true);
    }

    const change = () => {
        if (command) {
            setQuantite(ajoute)
        }
        setAchatv(true)
    }


    const ajout = () => {
        setClic(true);

        if (ajoute) {
            if (quantite == 0) {
                suppression(Id);
            } else {

                setAjoute(quantite)
                setCommand(true);

                Axios.put('https://backendtrader.digitalfirst.space/majpan', {
                    product_quantity: parseInt(quantite),
                    product_id: Id,
                    price: Prix,
                }).then((ret) => {
                    if (ret.data) {
                        // alert('Element modifié');
                        // console.log(ret.data);


                    } else {
                        // alert('Element non modifié');
                        // console.log(ret.data);
                    }
                })
                setQuantite(1);
            }


        } else {
            setAjoute(quantite)
            setCommand(true);
            aff1();
            Axios.post('https://backendtrader.digitalfirst.space/ajoutpanier', {
                product_quantity: parseInt(quantite),
                product_name: nom,
                unite_price: parseInt(prix),
                total_price: prix * quantite,
                product_id: Id,
                stock: Stock,
            }).then((ret) => {
                setShowToast1(true)
                if (ret.data == 'suc') {
                    // alert('Element enrégistré');                  
                } else {
                    // alert('Element non enrégistré');

                }
            })
            setQuantite(1);
        }




    };




    useEffect(() => {
        // getpan();
        refr();
    });
    return (
        <>
            {command ? (
                <IonFabButton color="secondary" className="notifbadge">{ajoute}</IonFabButton>
            ) : (
                null
            )

            }

            <IonCard className="card">
                <div onClick={() => {

                    { window.location.href = ` /home/articledesc/${Id} ` };
                }}>
                    <img src={`https://backendtrader.digitalfirst.space/${Ig}`} alt="card" className="imga" />
                </div>

                <IonCardContent className='cardcontent'>

                    <IonRow className="r1">
                        <h5 className="nom">{nom}</h5>
                    </IonRow>
                    <IonRow className="r2">
                        <IonNote className="note1">{prix}$  </IonNote>
                        <IonNote className="note1"> Stock:{Stock} </IonNote>
                    </IonRow>


                    {(achatv) ? (
                        <IonRow className="r3">
                            <IonCol className="c1" size="6" >
                                <IonIcon icon={removeOutline} className='ico1' onClick={() => { decrem() }} />
                                <IonBadge color="light" className="badg" >{quantite}</IonBadge>
                                <IonIcon icon={addOutline} className='ico2' onClick={() => { increm() }} />
                            </IonCol>
                            <IonCol >
                                <div onClick={() => { ajout(); setAchatv(false); setShowLoading(true) }} ><AddToCartButton icon={true} color={false}/></div>

                            </IonCol>
                        </IonRow>
                    ) : (
                        <IonButton className="comb" color="secondary" onClick={() => { change() }} >Commander</IonButton>
                    )}

                    <IonLoading
                        cssClass='my-custom-class'
                        isOpen={showLoading}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}
                        duration={1000}
                    />
                    <IonToast
                        isOpen={showToast1}
                        onDidDismiss={() => setShowToast1(false)}
                        message="Click to Close"
                        icon={informationCircle}
                        position="top"
                        duration={200}
                    />


                    {/* <IonCardTitle className="title">{nom}</IonCardTitle>
                    <IonNote className="subtitle">{prix}</IonNote> */}

                </IonCardContent>
            </IonCard>

        </>



    )

};