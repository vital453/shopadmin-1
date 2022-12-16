
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonModal, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonMenuButton, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonCard, IonCardContent, IonCardTitle, IonNote, IonBadge, IonRouterLink, IonSegment, IonSegmentButton, IonAccordion, IonAccordionGroup, IonCheckbox } from "@ionic/react";


import { triangle, ellipse, square, arrowBack, arrowForward, personCircleOutline, globeOutline, personCircle, arrowDownCircle, closeCircleOutline, chevronBack } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Description from '../../components/articles/description'





import { IonReactRouter } from '@ionic/react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";




interface Ajout_utiliformprops {

    onclose: () => void;
    // nom: String;
    // prenom: String;



}



export const SearchModal: React.SFC<Ajout_utiliformprops> = ({ onclose }) => {
    const [showmodal, setShowmodal] = useState(false);
    const [produit, setProduitlist] = useState<any[]>(useSelector((state: any) => state.product.product));
    const [velk, setVelk] = useState<any[]>(useSelector((state: any) => state.product.product));
    const [titre, setTitre] = useState<String>();
    const [age, setAge] = useState<any>(0);
    const [groupee, setGroupee] = useState<String>('rr');
    const [nom, setNom] = useState<String>('rr');
    const [telephone, setTelephone] = useState<String>('rr');
    const [remarque, setRemarque] = useState<String>('rr');
    const [adresse, setAdresse] = useState<String>('rr');
    const [antecedant, setantecedant] = useState<String>('rr');
    const [datenaissance, setdatenaissance] = useState<String>('rr');
    const [id, setId] = useState<number>(0);
    const [checked, setChecked] = useState(false);
    const [searchText, setSearchText] = useState('');
    // let article = useSelector((state: any) => state.product.product)

    // const searchbar: any = document.querySelector('recherche');
    // searchbar.addEventListener('ionInput', );

    const change = (ide: any | React.SetStateAction<any>) => {
        setSearchText(ide)
        const query = ide.toLowerCase();
        setVelk(produit.filter(t => t.name.toLowerCase().includes(ide.toLowerCase())));
    }

    const ouvdesc = (a: any | React.SetStateAction<any>, b: any | React.SetStateAction<any>) => {
        setNom(a);
        setId(b)
        setShowmodal(true)
    }


    const getart = () => {
        // fetch('https://backend-shop.benindigital.com/afficheart').then((res) => {
        //     const data = res.json()
        //     return data
        // }).then((data) => {
        //     setProduitlist(data);
        //     setVelk(data);
        // })
    };


    const majstatut = () => {

        Axios.post('https://backend-shop.benindigital.com/majstatut', {
            invoice: "",
        }).then((ret) => {
            if (ret.data == "success") {
                alert('Statut lis à jour');
                console.log(ret.data);
            }
        })
    };





    useEffect(() => {
        getart();
    }, []);
    return (
        <>
            <IonHeader translucent>
                <IonToolbar color='secondary'>
                    <IonButtons slot="start">
                        <IonButton color="dark" onClick={() => { onclose() }}>
                            <IonIcon style={{ fontSize: '20px' }} icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle className='ion-text-center Itemsv'>Commander</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonItem >
                <IonSearchbar value={searchText} onIonChange={e => { setSearchText(e.detail.value!); change(e.detail.value!) }}></IonSearchbar>
            </IonItem>
            <IonContent fullscreen>
                <IonList lines="full" class="ion-no-margin">
                    {velk.map((card, index) => {
                        return (
                            <IonItem lines="none" className="nereide" onClick={() => {
                                // { window.location.href = ` /home/articledesc/${card.id} `};
                                ouvdesc(card.name, card.id)
                            }}>
                                {card.name}
                            </IonItem>
                        )
                    })}
                </IonList>
            </IonContent>
            <IonModal isOpen={showmodal} onDidDismiss={() => { setShowmodal(false) }}>
                <IonItem className='Item1' lines='none'>
                    <IonButtons slot='start' onClick={() => { setShowmodal(false) }}>
                        <IonIcon icon={chevronBack} />
                    </IonButtons>
                    {nom}
                </IonItem>
                <Description Id={id} />
            </IonModal>





        </>



    )

};