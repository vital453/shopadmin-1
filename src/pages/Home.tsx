import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonicSlides, IonBadge, IonCardSubtitle, IonFab, IonFabButton, IonFabList, IonRefresher, IonRefresherContent, IonModal } from '@ionic/react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Home.css'
import PanierArt from '../components/articles/PanierArt';
import Paniermodal from '../components/articles/Paniermodal';
import Homecom from '../pages/Homecom'
import Axios from "axios";
import { logOutt, recupUser } from '../Feature/auth/AuthSlice';




import { ProductStore } from '../data/ProductStore';
import { FavouritesStore } from '../data/FavouritesStore';
import { CartStore } from '../data/CartStore';
import styles from "./Home.module.css";
import { add, cart, chevronUpCircle, chevronUpCircleOutline, closeCircleOutline, globeOutline, heart, logoFacebook, logoInstagram, logoTwitter, logoVimeo, share } from 'ionicons/icons';
import { Tableau13 } from '../components/articles/Paniermodal';
import { tab4 } from '../components/articles/Paniermodal';
import { boolcont } from '../components/conteneurxx';


import PlaceCard from '../components/PlaceCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { RefresherEventDetail } from '@ionic/core';

import { Tableau12 } from './../components/Patient/Modaldetailspat';
import { arrowBack, personAdd, personCircleOutline, personCircleSharp } from 'ionicons/icons';
import Bannier_home from '../components/Home/Bannier_home';
import { Homes } from '../components/Home/Homes';
import Description from '../components/articles/description';
import { Ventes } from '../components/pages/Ventes';
import Nouv2 from '../pages/Nouv2.js'
import { useSelector, useDispatch } from 'react-redux';
import { dectriggmod } from '../Feature/DeclencheursSlice';


const refr = () => {
  if (tab4 == 14) {

    setTimeout(() => { { window.location.href = "/Home" } }, 500);
    alert('Commande validé');

  }

}
const ajoutmed = () => {
  { window.location.href = "/ajoutmed" }
}

const listepat = () => {
  { window.location.href = "/listepat" }
}
const listemed = () => {
  { window.location.href = "/listemed" }
}
const RDV = () => {
  { window.location.href = "/rdv" }
}
const RDVV = () => {
  { window.location.href = "/panier" }
}

const Home: React.FC = () => {
  const products = ProductStore.useState((s: { products: any; }) => s.products);
  const favourites = FavouritesStore.useState((s: { product_ids: any; }) => s.product_ids);
  const shopCart = CartStore.useState((s: { product_ids: any; }) => s.product_ids);
  const triggermod= useSelector((state: any) => state.triggers.triggermod);
  let user = useSelector((state: any) => state.auth.user);
  let wal = useSelector((state: any) => state.auth.whale);

  const [showmodal, setShowmodal] = useState(false);
  const [ty, setTy] = useState<any>(1);
  const dispatch = useDispatch();
  const [panier, setPanier] = useState<any[]>([]);
  const [cont, setCont] = useState<any>((window.location.pathname.split("/")[2]));
  const [lien, setLien] = useState<any>((window.location.pathname.split("/")[3]));

  const [patient, setPatientlist] = useState<any[]>([]);

  const getpan = () => {
    fetch('https://backend-shop.benindigital.com/affichepanier').then((res) => {
      const data = res.json()
      return data
    }).then((data) => {
      // console.log(data);
      setPanier(data);
    })
    // console.log(boolcont);

  }

    document.getElementById('far')?.addEventListener('touchmove', (e)=>{
    document.getElementById('far')!.style.left=(e.changedTouches[0].clientX - 25)/window.innerWidth*100+ '%';
    document.getElementById('far')!.style.top=(e.changedTouches[0].clientY - 25)/window.innerHeight*100+ '%'
  })


  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      console.log("nlanla");
      event.detail.complete();
    }, 2000);
  }

  useEffect(() => {
    console.log(ty);
    setTy(ty+1)
}, [wal]);


 
  return (
    <>
      <IonContent fullscreen >
      <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200} className='refresh'>
          <IonRefresherContent ></IonRefresherContent>
        </IonRefresher>
        {(cont) ? (
          null
        ) : (
          <Homes />
        )}
        {/* {(cont == 'Ventes') ? (
          <Ventes Titre={cont}/>
        ) : (
          null
        )} */}
        {(cont == 'Ajout') ? (
          <Nouv2 />
        ) : (
          null
        )}
      </IonContent>
    </>
  );
};

export default Home;








