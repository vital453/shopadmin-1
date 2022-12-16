import React from 'react';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonApp, IonContent, IonList, IonItem, IonRow, IonCol, IonInput, IonGrid, IonLabel, IonMenuButton, IonThumbnail } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import 'swiper/scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper';

import "./swip.css";














const PanierArt: React.FC = () => {
    const [idant, setIdant] = useState(parseInt(window.location.pathname.split("/")[2]));
    const [panier, setPanier] = useState<any[]>([]);
    const [totalquant, setTotalquant] = useState<any>(0);
    const [totalprix, setTotalprix] = useState<any>(0);
    const [invoice, setInvoice] = useState<any>();
    const [prenom, setPrenom] = useState('');
    const [sexe, setSexe] = useState('');
    const [age, setAge] = useState(0);
    const [telephone1, setTelephone1] = useState(0);
    const [telephone2, setTelephone2] = useState(0);
    const [quartier, setQuartier] = useState("Quartier");
    const [ville, setVille] = useState("Ville");
    const [maison, setMaison] = useState("Maison");
    const [adresse, setAdresse] = useState("");
    let [antecedants, setAntecedants] = useState(" ");
    let [date, setdate] = useState("");
    const [remarque, setRemarque] = useState(' ');
    const [id, setId] = useState<number>(0);


    const getpan = () => {
        fetch('https://backend-shop.benindigital.com/affichepanier').then((res) => {
            const data = res.json()
            return data
        }).then((data) => {
            console.log(data);
            setPanier(data);
            for(var i = 0, len = data.length; i < len; i++) {
                setTotalquant(totalquant+data[i].product_quantity) ;  //Iterate over your first array and then grab the second element add the values up
                setTotalprix(totalprix+data[i].unite_price);
            }
            setInvoice(data[0].invoice);
        })
    }



    const envoi = () => {
        Axios.post('https://backend-shop.benindigital.com/ajoutcommande', {
            totalquant: totalquant,
            totalprix: totalprix,
            invoice: invoice,
        }).then((ret) => {
            if (ret.data == 'suc') {
                alert('Element enrégistré');           
            } else {
                alert('Element non enrégistré');
            }
        })
    }

    const envoi1 = () => {
        panier.map ((val, key)=> {

            Axios.post('https://backend-shop.benindigital.com/ajoutcomList', {
                totalquant: val.product_quantity,
                totalprix: val.total_price,
                nomProduit: val.product_name,
                product_id: val.product_id,
        }).then((ret) => {
            if (ret.data == 'suc') {
                
            } else {
                alert('Element non enrégistré');
                
            }
        })

        })      
        suppr();
    }

    const suppr = () => {
        fetch('https://backend-shop.benindigital.com/supprpan', {
            
        }).then((data) => {
            if (data ) {
                alert('Element enrégistré');    
            } else {
                alert('Element non enrégistré');
            }
        })
        
        
    }




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
        
        getpan();

    }, []);
    return (
        <>
            
            <IonContent fullscreen>
                <IonList lines="full" class="ion-no-margin">
                    <IonToolbar className='ion-text-center Titre1 '  >
                        Produits
                    </IonToolbar>
                    
                    <IonList>
                        {panier.map((val, key) => {
                            return (
                                <IonItem key={key} onClick={() => { }}>

                                    <IonThumbnail slot="start">
                                        <img
                                            // src={val.Mode} 
                                            src="img/1cc.png" className='imp1'
                                        />
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h2>{val.product_name} x {val.product_quantity}</h2>
                                        {/* <p>{val.telephone1},&nbsp;&nbsp;&nbsp;{val.telephone2}</p> */}
                                        <p>{val.total_price}$</p>
                                    </IonLabel>

                                </IonItem>
                            )
                        }
                        )
                        }
                        <IonItem>
                            <IonButton slot='end' onClick={() => {   envoi();envoi1() }} 
                            >Confirmer la commande</IonButton>
                            {/* INSERT INTO old_post SELECT * FROM post WHERE post_timestamp < valeur; */}
                            {/*  CREATE TABLE T_CIBLE AS SELECT *  FROM T_SOURCE  WHERE 1 = 0; */}
                        </IonItem>


                    </IonList>







                </IonList>
            </IonContent>

        </>
    );
};

export default PanierArt;