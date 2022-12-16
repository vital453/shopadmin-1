
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink, IonFabButton, IonLoading, IonToast, useIonRouter } from "@ionic/react";
import Axios from 'axios'

import './conteneur.css'
import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline, removeCircleSharp, removeOutline, addOutline, informationCircle, star, chevronBack } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import { tab4 } from './articles/Paniermodal';
import { tab5 } from './articles/PanierItem';
import { deleteProduct, setProductPan, updateQuantity, dec } from '../Feature/PanierSlice';


import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import AddToCartButton from "./AddToCartButton";
import { log } from "console";
import { useSelector, useDispatch } from 'react-redux';
import Description from '../components/articles/description'



interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;
    Nom: String;
    Prix: number;
    Id: number;
    Stock: number;
    Ig: String;
    // transit: (a: number | React.SetStateAction<any>,
    //     b: number | React.SetStateAction<any>,
    //     c: number | React.SetStateAction<any>) => void;
    Panier: [][];

}

export let boolcont = false;

const aff1 = () => {
    setTimeout(() => { boolcont = false }, 500);
    boolcont = true
}




export const Conteneur: React.SFC<Ajout_utiliformprops> = ({ Nom, Prix, Id, Stock, Ig, }) => {
    const [clic, setClic] = useState(false);
    const [showmodal, setShowmodal] = useState(false);
    const [showmodal2, setShowmodal2] = useState(false);
    const [showmodal3, setShowmodal3] = useState(false);
    const [showmodal4, setShowmodal4] = useState(false);
    // const [panier, setPanier] = useState<any[]>(useSelector((state: any) => state.panier.panier));
    let panier = useSelector((state: any) => state.panier.panier);
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
    const [chargeimg, setChargeImg] = useState<any>(false);
    let article = useSelector((state: any) => state.product.product)
    const [id, setId] = useState<number>(0);
    const [trigger, setTrigger] = useState<any>(useSelector((state: any) => state.panier.trigg))
    const dispatch = useDispatch();
    const ionRouter = useIonRouter();
    const [loaded, setLoaded] = useState(false);
    

    // const trigger= useSelector((state: any) => state.panier.trigg);

    // const [showLoading, setShowLoading] = useState(true);

    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);




    // setTimeout(() => {
    //     setShowLoading(false);
    // }, 10000);
    const refr = () => {

    }


    const increm = () => {
        if (quantite < Stock) {
            if (Stock > 0) {
                setQuantite(quantite + 1)
            }
        }
    };
    const decrem = () => {
        if (quantite > 0) {
            if (Stock > 0) {
                setQuantite(quantite - 1)
            }
        }
    };
    const recherche = (ide: any | React.SetStateAction<any>) => {
        if (ide) {
            setCommand(true)
        } else {
            setCommand(false)
        }
    };

    const getpan = () => {

        if (panier.filter((t: any) => t.product_id == Id)[0]) {
            setAjoute((panier.filter((t: any) => t.product_id == Id)[0]).product_quantity);
            setCommand(true)
        } else {
            setAjoute(0);
            setCommand(false);
        }




        // if(ajoute){
        //     setCommand(true);
        // }else{
        //     setCommand(false);
        // }

        // else {
        //     fetch('https://backend-shop.benindigital.com/affichepanier').then((res) => {
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




    const suppression = (ide: number | React.SetStateAction<any>) => {
        // Axios.delete(`https://backend-shop.benindigital.com/deletepan/${ide}`);
        // setCommand(false);
        // setAjoute(quantite);
        // setClic(true);
        dispatch(deleteProduct(ide));
        dispatch(dec(!trigger));
        setCommand(false)
        setShowToast3(true)
    }

    const change = () => {
        if (command) {
            setQuantite(ajoute)
        }
        setAchatv(true)
    }

    


    const ajout = () => {
        if (Stock > 0) {
            setClic(true);
            if (ajoute) {
                if (quantite == 0) {
                    // suppression(Id);
                    dispatch(deleteProduct(Id));
                    dispatch(dec(!trigger));
                    // setCommand(false);
                    setShowToast3(true);
                    // setAjoute(0);
                } else {

                    setAjoute(quantite);
                    setCommand(true);

                    dispatch(updateQuantity([parseInt(quantite), Id, Prix*parseInt(quantite)]));
                    dispatch(dec(!trigger));
                    setShowToast2(true)
                    setQuantite(1);
                }
            } else {
                setAjoute(quantite)
                setCommand(true);
                if (!(panier.find((e: any) => e.product_id == Id)) && quantite > 0) {
                    dispatch(setProductPan({
                        product_id: Id,
                        product_quantity: parseInt(quantite),
                        product_name: nom,
                        unite_price: parseInt(prix),
                        total_price: parseInt(prix) * parseInt(quantite),
                        picture1: Ig,
                        stock: Stock,
                        total_sold: (article.filter((t: any) => t.id == Id)[0]).total_sold
                    }));
                    dispatch(dec(!trigger));
                    setShowToast1(true)
                    setQuantite(1);
                }
            }

        }
    };

    useEffect(() => {
        getpan();
        // if((panier.find((e:any)=>e.product_id==Id))){
        //     setAjoute((panier.find((e:any)=>e.product_id==Id)).product_quantity);
        //     console.log('dia'); }         

        // console.log('dia');
    }, [(trigger: any) => { }]);

    useEffect(() => {

    }, []);
    return (
        <>
            {command ? (
                <IonFabButton color="secondary" className="notifbadge">{ajoute}</IonFabButton>
            ) : (
                null
            )
            }
            <IonCard className="card">
            {loaded ? null : (
                    <img src={`loading.gif`} className="imga" />
                )}
                <img src={`https://backend-shop.benindigital.com/${Ig}`} 
                    style={loaded ? {} : { display: 'none' }}
                    onLoad={() => setLoaded(true)}
                    alt="card" className="imga"
                    //  <img src="images/yelan.png" alt="card" className="imga"
                    onClick={() => { setShowmodal(true) }} />


                    {/* <img src={`https://backend-shop.benindigital.com/${Ig}`} alt="card" className="imga"
                    onClick={() => {setShowmodal(true)}} /> */}
    
                <IonCardContent className='cardcontent'>

                    <IonRow className="r1">
                        <h5 className="nom">{Nom}</h5>
                    </IonRow>
                    <IonRow className="r2">
                        {/* <IonNote className="note1">{prix}$  </IonNote> */}
                        <IonNote className="note1">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(Prix)}  </IonNote>
                        <IonNote className="note1"> Stock:{Stock} </IonNote>
                    </IonRow>


                    {(achatv) ? (
                        <IonRow className="r3">
                            <IonCol className="c1" size="6.7" >
                                <IonIcon icon={removeOutline} className='ico1' onClick={() => { decrem() }} />
                                <IonBadge color="light" className="badg" >{quantite}</IonBadge>
                                <IonIcon icon={addOutline} className='ico2' onClick={() => { increm(); }} />
                            </IonCol>
                            <IonCol className="c2" >
                                <div onClick={() => {
                                    ajout(); setAchatv(false);
                                    //  setShowLoading(true);
                                }} className='addn' ><AddToCartButton icon={true} color={false}/></div>
                            </IonCol>
                        </IonRow>
                    ) : (
                        <IonButton className="comb" color="secondary" onClick={() => { change() }} >Ajouter</IonButton>
                    )}

                    {/* <IonLoading
                        cssClass='my-custom-class'
                        isOpen={showLoading}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}
                        duration={1000}
                    /> */}
                    <IonToast
                        isOpen={showToast1}
                        onDidDismiss={() => setShowToast1(false)}
                        message="Elément ajouté au panier"
                        icon={informationCircle}
                        position="top"
                        duration={800}
                    />
                    <IonToast
                        isOpen={showToast2}
                        onDidDismiss={() => setShowToast2(false)}
                        message="Quantité mise à jour"
                        icon={informationCircle}
                        position="top"
                        duration={800}
                    />
                    <IonToast
                        isOpen={showToast3}
                        onDidDismiss={() => setShowToast3(false)}
                        message="Elément supprimé du panier"
                        icon={informationCircle}
                        position="top"
                        duration={800}
                    />

                    <IonModal isOpen={showmodal} onDidDismiss={() => { setShowmodal(false) }}>
                        <IonItem className='Item1' lines='none'>
                            <IonButtons slot='start' onClick={() => { setShowmodal(false) }}>
                                <IonIcon icon={chevronBack} />
                            </IonButtons>
                            {Nom}
                        </IonItem>
                        <Description Id={Id} />
                    </IonModal>


                    {/* <IonCardTitle className="title">{nom}</IonCardTitle>
                    <IonNote className="subtitle">{prix}</IonNote> */}

                </IonCardContent>
            </IonCard>

        </>



    )

};