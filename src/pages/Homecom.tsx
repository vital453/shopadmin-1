import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonicSlides, IonBadge, IonCardSubtitle, IonFab, IonFabButton, IonFabList, IonRefresher, IonRefresherContent, IonModal, IonLoading, IonBackButton, IonItem, IonLabel, IonNote } from '@ionic/react';
import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import './Home.css'
import PanierArt from '../components/articles/PanierArt';
import Paniermodal from '../components/articles/Paniermodal';
import styles from "./Home.module.css";
import { analytics, cart, chevronBack, chevronUpCircle, chevronUpCircleOutline, closeCircleOutline, globeOutline, heart, home, homeOutline, logoFacebook, logoInstagram, logoTwitter, logoVimeo, share } from 'ionicons/icons';
import { Tableau13 } from '../components/articles/Paniermodal';
import { tab4 } from '../components/articles/Paniermodal';
import { atr } from '../components/articles/Paniermodal';
import { boolcont } from '../components/conteneur';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { RefresherEventDetail } from '@ionic/core';
import { Tableau12 } from '../components/Patient/Modaldetailspat';
import { arrowBack, personAdd, personCircleOutline, personCircleSharp } from 'ionicons/icons';
import Bannier_home from '../components/Home/Bannier_home';
import { Homescom } from '../components/Home/Homescom';
import Description from '../components/articles/description';
import Categories from '../components/articles/categorie';
import { useIonRouter } from '@ionic/react';
import { App } from '@capacitor/app';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, setProductPan, updateQuantity, dec, vider, declien, deccont } from '../Feature/PanierSlice';
import { dectriggmod } from '../Feature/DeclencheursSlice';





function doRefresh(event: Event | React.SetStateAction<any>) {
  console.log('Begin async operation');
  setTimeout(() => {
    console.log('Async operation has ended');
    event.detail.complete();
  }, 2000);
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
export const RDVV = (ide: number | React.SetStateAction<any>) => {
  return ide;
}

const Homecom: React.FC = () => {


  const [showmodal, setShowmodal] = useState(false);
  const [showmodal2, setShowmodal2] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const [getab, setGettab] = useState<any>(tab4);
  const [sho, setSho] = useState<any>(false);
  // let [panier, setPanier] = useState<any[]>(useSelector((state:any) => state.panier.panier));
  // const [cont, setCont] = useState<any>((window.location.pathname.split("/")[2]));
  // const [lien, setLien] = useState<any>((window.location.pathname.split("/")[3]));
  // const [trigger, setTrigger] = useState<any>(useSelector((state:any) => state.panier.trigg))
  let panier = useSelector((state: any) => state.panier.panier);
  let cont = useSelector((state: any) => state.panier.cont);
  const dispatch = useDispatch();
  let trigger = useSelector((state: any) => state.panier.trigg);
  const [patient, setPatientlist] = useState<any[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  let lien = useSelector((state: any) => state.panier.lien);
  const router = useIonRouter();
  const triggermod= useSelector((state: any) => state.triggers.triggermod);
  const boutiqueid = useSelector((state: any) => state.auth.user);
  const accesparcompte = useSelector((state: any) => state.Hash.accesparcompte);

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  const getpan = () => {
    fetch('https://backend-shop.benindigital.com/affichepanier').then((res) => {
      const data = res.json()
      return data
    }).then((data) => {
    })
  }

  document.getElementById('far')?.addEventListener('touchmove', (e) => {
    document.getElementById('far')!.style.left = (e.changedTouches[0].clientX - 25) / window.innerWidth * 100 + '%';
    document.getElementById('far')!.style.top = (e.changedTouches[0].clientY - 25) / window.innerHeight * 100 + '%'
  })



  const relance = () => {
  }


  useEffect(() => {
    console.log(trigger);
  }, [(trigger: any) => { }]);

  useEffect(() => {
   
    getpan();

  }, []);
  useEffect(() => {
    console.log('zzz');
    
}, [triggermod]);

  return ( 
    <IonPage>
      <IonHeader  >
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => {router.goBack(); setShowmodal(false)}}>
              <IonIcon color='medium' icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className='nereide' >Digital trader</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className='alice' >
      {accesparcompte
                .filter((t: any) => t.id_boutique === boutiqueid.BoutiqueId)
                .map((bat: any) => {
                  return (
                   bat.gestion_vente === 1 ? <> 
                   {(lien == 0) ? (
          <Homescom
            Panier={panier} />
        ) : (
          null
        )}
        {(cont == 'articledesc') ? (
          <Description Id={lien} />
        ) : (
          null
        )}
        {(lien > 0) ? (
          <Categories Id={lien} Panier={panier} />
        ) : (
          null
        )}
        <IonFab vertical="center" horizontal="center" slot="fixed" className='fab1' id='far' >
          <IonButton color='secondary' onClick={() => {
            setShowmodal(true); 
           
          }
          } size='small'  >
            <IonBadge color="secondary"  >{panier.length}</IonBadge>
            <IonIcon icon={cart} className="animate__animated" />
            Ajouter
          </IonButton>
          {/* <IonFabList side="top">
            <IonFabButton onClick={() => setShowmodal(true)}><IonIcon icon={cart}/></IonFabButton>
          </IonFabList>
          <IonFabList side="start">
            <IonFabButton><IonIcon icon={logoInstagram} /></IonFabButton>
          </IonFabList> */}
        </IonFab>


        <IonModal isOpen={showmodal} onDidDismiss={() => { setShowmodal(false) }}
          backdropBreakpoint={0.5}
          className='modal1'>
          <IonItem>
            <IonToolbar className='ion-text-center Titre1 '   >
              Détails de la vente
              <IonIcon icon={closeCircleOutline} size='large' slot='end' className='iconmod'
                onClick={() => { setShowmodal(false); }} />
            </IonToolbar>
          </IonItem>
          <Paniermodal Panier={panier} trigg={() => { setSho(!sho) }} /> 
        </IonModal>


        {/* <IonModal
          // ref={modal}
          trigger="open-modal"
          isOpen={showmodal}
          initialBreakpoint={0.25}
          breakpoints={[0.25, 0.5, 0.75]}
          backdropDismiss={false}
          backdropBreakpoint={0.5}
        >
          <IonContent className="ion-padding">
            <IonItem>
              <IonToolbar className='ion-text-center Titre1 '   >
                Panier
                <IonIcon icon={closeCircleOutline} size='large' slot='end' className='iconmod'
                  onClick={() => { setShowmodal(false); }} />
              </IonToolbar>
            </IonItem>
            <Paniermodal Panier={panier} trigg={() => { setSho(!sho) }} />

          </IonContent>
        </IonModal> */}
                   </>: 
                   <div className='flex items-center justify-center text-2xl mt-14'>vous n'avez pas accès à cette page</div>
                   
                  );
                })}
      </IonContent>




    </IonPage>
  );
};

export default Homecom;










