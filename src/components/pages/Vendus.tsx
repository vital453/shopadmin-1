
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink } from "@ionic/react";


import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';






import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { ModalCom } from './ModalCom'


interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;

}

// import { Swiper } from 'swiper/types';



// Import Swiper React components


// Import Swiper styles 
// import 'swiper/swiper.scss';
// import 'swiper/scss'



export const Vendus: React.SFC<Ajout_utiliformprops> = ({ }) => {
    const [showmodal, setShowmodal] = useState(false);
    const [patient, setPatientlist] = useState<any[]>([]);
    const [invoice, setInvoice] = useState<any>('ee');
    const [statut, setStatut] = useState<any>();
    const [date, setDate] = useState<any>();
    const [prixt, setPrixt] = useState<any>('rr');
    const [etatstat, setEtatstat] = useState<any>(true);
    const [nomCli, setNomCli] = useState<String>('rr');
    const [telephone, setTelephone] = useState<String>('rr');
    const [remarque, setRemarque] = useState<String>('rr');
    const [adresse, setAdresse] = useState<String>('rr');
    const [antecedant, setantecedant] = useState<String>('rr');
    const [datenaissance, setdatenaissance] = useState<String>('rr');
    const [id, setId] = useState<number>(0);

    const getcom = () => {
        fetch('https://backend-shop.benindigital.com/affichecomv').then((res) => {
            const data = res.json()
            return data
        })
            .then((data) => {

                setPatientlist(data);
                console.log(data);
            })
    }

    const permu = (
        n: String | React.SetStateAction<String>
        , p: String | React.SetStateAction<String>
        , a: String | React.SetStateAction<String>
        , s: String | React.SetStateAction<String>

    ) => {
        setInvoice(p)
        setDate(n)
        setStatut(a)
        setPrixt(s)
    }


    


    useEffect(() => {
        getcom();
    }, []);
    return (
        <>



            {patient.map((card, index) => {
                return (

                    <IonItem className=" Itemsv" onClick={() => {
                        setShowmodal(true);
                        // setId(val.idPatient);
                        permu(card.date, card.invoice, card.statut, card.total_price)
                    }}>

                        <IonLabel>
                            <h2>{(card.date).split("T")[0]} {card.invoice}  </h2>
                            {/* <p>{val.telephone1},&nbsp;&nbsp;&nbsp;{val.telephone2}</p> */}
                            <p>{card.total_price}</p>
                        </IonLabel>
                    </IonItem>

                )
            })}

            {/* <IonModal
                isOpen={showmodal}
                onDidDismiss={() => {
                    setShowmodal(false)
                }}
            >
                <ModalCom
                    onclose={() => { setShowmodal(false) }}
                    Invoice={invoice}
                    Prix={prixt}
                    Date={date}
                    Statut={statut}
                    Etat={etatstat}
                // tab={patient}
                />

            </IonModal> */}



        </>



    )

};