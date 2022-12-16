import React from 'react';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonApp, IonContent, IonList, IonItem, IonRow, IonCol, IonInput, IonGrid, IonLabel, IonMenuButton, IonFabButton, IonNote, IonToast, IonModal, IonBackdrop, useIonRouter } from '@ionic/react';
import { addOutline, arrowBack, arrowForward, cart, informationCircle, play, playCircleOutline, playOutline, remove, removeCircleOutline } from 'ionicons/icons';
import 'swiper/scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, setProductPan, updateQuantity, dec } from '../../Feature/PanierSlice';

import "./swip.css";
import Articledesc from '../../pages/article/Articledesc';
import { Icon } from '@mui/material';

interface Ajout_utiliformprops {


    Id: number
}



const Description: React.FC<Ajout_utiliformprops> = ({ Id, }) => {
    const [idant, setIdant] = useState<any>(Id);               // window.location.pathname.split("/")[2])
    const [article, setArticle] = useState<any[]>([]);
    const [quantite, setQuantite] = useState<any>(1);
    let panier = useSelector((state: any) => state.panier.panier);
    const [idcategorie, setIdcategorie] = useState(0);
    const [nom, setNom] = useState<any>();
    const [prix, setPrix] = useState<any>();
    const [sexe, setSexe] = useState('');
    const [stock, setStock] = useState<any>(0);
    const [description, setDescription] = useState(0);
    const [picture1, setPicture1] = useState<any>();
    const [picture2, setPicture2] = useState<any>();
    const [picture3, setPicture3] = useState<any>();
    const [picture4, setPicture4] = useState<any>();
    const [video, setVideo] = useState<any>();
    const [, setAdresse] = useState("");
    let [antecedants, setAntecedants] = useState(" ");
    let [date, setdate] = useState("");
    const [remarque, setRemarque] = useState(' ');
    const dispatch = useDispatch();
    const [trigger, setTrigger] = useState<any>(useSelector((state: any) => state.panier.trigg));
    const [command, setCommand] = useState<any>();
    const [showmodal, setShowmodal] = useState(false);
  const userid = useSelector((state:any) => state.auth.user);
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false); 
    
 
    


    const getart = () => {
        Axios.post('https://backend-shop.benindigital.com/recupart', {
            id: idant,
            id_boutique: userid.userId,
        }).then((ret) => {
            setArticle(ret.data);
            console.log(ret.data);
            setStock(ret.data[0].stock)
            setIdcategorie(ret.data[0].idClinique)
            setNom(ret.data[0].name)
            setPrix(ret.data[0].price)
            setDescription(ret.data[0].description)
            setPicture1(ret.data[0].picture1)
            setPicture2(ret.data[0].picture2)
            setPicture3(ret.data[0].picture3)
            setPicture4(ret.data[0].picture4)
            setVideo(ret.data[0].video)
            setStock(ret.data[0].stock)
            
            
        })
    };

    const increm = () => {
        if (quantite < stock) {
            setQuantite(quantite + 1)
        }
    };
    const decrem = () => {
        if (quantite > 1) {
            setQuantite(quantite - 1)
        }
    };
    const ajout = () => {

        if (panier.filter((t: any) => t.product_id == idant)[0]) {
            // setAjoute((panier.filter((t:any)=>t.product_id== Id)[0]).product_quantity);
            dispatch(updateQuantity([parseInt(quantite), idant, parseInt(prix) * parseInt(quantite)]));
            dispatch(dec(!trigger));
            setShowToast2(true)
        } else {
            dispatch(setProductPan({
                product_id: idant,
                product_quantity: parseInt(quantite),
                product_name: nom,
                unite_price: parseInt(prix),
                total_price: parseInt(prix) * parseInt(quantite),
                picture1: picture1,
                stock: stock,
            }));
            setShowToast1(true)
            dispatch(dec(!trigger));
        }


        // Axios.post('https://backend-shop.benindigital.com/ajoutpanier', {
        //         product_quantity: parseInt (quantite),
        //         product_name: nom,
        //         unite_price: parseInt (prix),
        //         total_price:  prix * quantite ,
        //         product_id: idant
        //     }).then((ret) => {
        //         if (ret.data == 'suc') {
        //             alert('Element enrégistré');          
        //         } else {
        //             alert('Element non enrégistré');          
        //         }
        //     })
        //     console.log(prix);       
    };





    const data = [

        {
            title: "Road",
            subtitle: "Long road",
            image: "/assets/1e.jpg"
        },
        {
            title: "Moun",
            subtitle: "Big mountains",
            image: "/assets/1e.jpg"
        },
        {
            title: "Unk",
            subtitle: "This is unknown",
            image: "/assets/1e.jpg"
        },
        {
            title: "Unk",
            subtitle: "This is unknown",
            image: "/assets/1e.jpg"
        },

    ];

    useEffect(() => {
        if (panier.filter((t: any) => t.product_id == idant)[0]) {
            // setAjoute((panier.filter((t:any)=>t.product_id== Id)[0]).product_quantity);
            setCommand(true)
        } else {
            // setAjoute(0);
            setCommand(false);
        }
    }, [(trigger: any) => { }]);

    useEffect(() => {

        getart();

    }, []);

    return (
        <>

            {/* <IonHeader translucent>
                    <IonToolbar color='secondary'>
                        <IonButtons slot="start">
                            <IonButton routerLink="/">
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle className='ion-text-center'>Descriptif</IonTitle>
                        <IonButtons slot="end">
                            <IonMenuButton />
                        </IonButtons>
                    </IonToolbar> 
                </IonHeader> */}
            <IonContent fullscreen>
                <IonList lines="full" class="ion-no-margin">
                    <IonToolbar className='ion-text-center Titre1 '  >
                        {nom}
                    </IonToolbar>
                    <div className='newdiv'>
                        <Swiper spaceBetween={30} pagination={{ clickable: true, }} modules={[Pagination]} className="">
                            {(picture1) ? (
                                <SwiperSlide><img src={`https://backend-shop.benindigital.com/${picture1}`} alt="card" className="imdet" /></SwiperSlide>
                            ) : (
                                null
                            )}
                            {(picture2) ? (
                                <SwiperSlide><img src={`https://backend-shop.benindigital.com/${picture2}`} alt="card" className="imdet" /></SwiperSlide>
                            ) : (
                                null
                            )}
                            {(picture3) ? (
                                <SwiperSlide><img src={`https://backend-shop.benindigital.com/${picture3}`} alt="card" className="imdet" /></SwiperSlide>
                            ) : (
                                null
                            )}
                            {(picture4) ? (
                                <SwiperSlide><img src={`https://backend-shop.benindigital.com/${picture4}`} alt="card" className="imdet" /></SwiperSlide>
                            ) : (
                                null
                            )}

                            
                        </Swiper>
                    </div>
                    <IonItem >
                        <IonButton className='ion-text-center' color='secondary' onClick={() => setShowmodal(true)}>
                            <IonIcon icon={playCircleOutline} /> Voir video</IonButton>
                    </IonItem>

                    <IonItem className='nereide'>
                        Description
                    </IonItem>
                    <IonItem>
                        <IonNote className='ion-margin-top nereide'>
                            {description}
                        </IonNote>
                    </IonItem>

                    <IonItem className='ion-margin-top nereide'>
                        <IonGrid>
                            <IonRow >
                                Quantité disponible :
                                {stock}
                            </IonRow>
                            <IonRow >
                                <IonCol className='ion-text-center lab' >
                                    Quantité :
                                </IonCol>
                                <IonCol size='8'>
                                    <IonItem lines='none'>

                                        <IonFabButton size='small' color='secondary' onClick={() => { decrem() }} >
                                            <IonIcon icon={remove} />
                                        </IonFabButton>


                                        <IonInput className='entrees' value={quantite} max={stock} min={1} step='1' readonly  >
                                        </IonInput>

                                        <IonFabButton size='small' color='secondary' onClick={() => { increm() }} >
                                            <IonIcon icon={addOutline} />
                                        </IonFabButton>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines='none' className='ion-margin'>
                        <IonButton color='secondary' slot='end' size='small' onClick={() => { ajout() }}>Ajouter au panier
                            <IonIcon icon={cart} /></IonButton>
                    </IonItem>

                    <IonModal
                        isOpen={showmodal}
                        onDidDismiss={() => { setShowmodal(false) }}
                        id="example-modal">
                        <video controls height='200' className='vid'>
                            <source src={`https://backend-shop.benindigital.com/${video}`} />
                        </video>
                    </IonModal>
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
                    <div className='aaa'></div>

                </IonList>
            </IonContent>






        </>
    );
};

export default Description;