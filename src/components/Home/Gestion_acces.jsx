/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import {
  IonApp,
  IonButton,
  IonCol,
  IonList,
  IonModal,
  IonThumbnail,
  IonSearchbar,
  IonContent,
  IonAvatar,
  IonSelectOption,
  IonPage,
  IonItemDivider,
  IonSelect,
  IonRadioGroup,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonAlert,
  IonButtons,
  IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonNote,
  IonBadge,
  IonRouterLink,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonRouter,
  IonAccordion,
  IonAccordionGroup,
  IonSegment,
  IonSegmentButton,
  IonProgressBar,
  IonLoading,
  IonToast,
  useIonAlert,
} from "@ionic/react";
import Axios from "axios";
import {
  triangle,
  ellipse,
  square,
  arrowBack,
  arrowForward,
  personCircleOutline,
  globeOutline,
  trash,
  trashOutline,
  chevronBack,
  arrowDownCircle,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
} from "../../Feature/PanierSlice";

import { IonReactRouter } from "@ionic/react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { format } from "date-fns";
import { recupCommande } from "../../Feature/CommandeSlice";
import LineChart from "./LineChart";
import Stacked from "./Stacked";
import Chart from "./Charts";
import { Conteneur1 } from "../Conteneur1";
import {
  setaccescompte,
  setaccesparcompte,
  setchoiceacces,
  setPassacces,
} from "../../Feature/HashSlice";

const Gestion_acces = () => {
  const pass_acces = useSelector((state) => state.Hash.pass_acces);
  const accescompteprincipal = useSelector(
    (state) => state.Hash.accescompteprincipal
  );
  const accescomptesecondaire = useSelector(
    (state) => state.Hash.accescomptesecondaire
  );

  const [messagetoast, setmessagetoast] = useState("Code d'accès incorrect !");
  const [showToast, setShowToast] = useState(false);
  
  const dispatch = useDispatch();

  const [presentAlert] = useIonAlert();

  const verifcodep = ()=>{
    presentAlert({
      header: "Entrez le code d'accès",
      buttons: [
        {
          text: "Ok",
          cssClass: "secondary",
          handler: (alertData) => {
            //takes the data store_name  boutiqueName
            // sendupdatedata(alertData.name1, id_acces_secondaire);
       if(accescompteprincipal.find((t)=> t.code_acces_principal === alertData.name1)){
        dispatch(setchoiceacces("principal"));
        window.location.href = "/home";
       }else{
        setShowToast(true)
       }
          },
        },
        {
          text: "RETOUR",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
      ],
      inputs: [
        {
          name: "name1",
          type: "text",
          placeholder: "",
          attributes: {
            // maxlength: 4,
          },
          min: 1,
          // max: 100,
        },
      ],
    });
  }
  const verifcodes = ()=>{
    presentAlert({
      header: "Entrez le code d'accès",
      buttons: [
        {
          text: "Ok",
          cssClass: "secondary",
          handler: (alertData) => {
            //takes the data store_name  boutiqueName
            // sendupdatedata(alertData.name1, id_acces_secondaire);
            if(accescomptesecondaire.find((t)=> t.code_acces_secondaire === alertData.name1)){
              dispatch(setchoiceacces("secondaire"));
              window.location.href = "/home";
             }else{
              setShowToast(true)
             }
          },
        },
        {
          text: "RETOUR",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
      ],
      inputs: [
        {
          name: "name1",
          type: "text",
          placeholder: "",
          attributes: {
            // maxlength: 4,
          },
          min: 1,
          // max: 100,
        },
      ],
    });
  }
    return ( <>
    
    <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle className="nereide">Digital trader</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={messagetoast}
            color="warning"
            duration={5000}
            position="top"
          />
          <IonContent>
            
            <div className="homes">
              <h2 className="text-center">Choisir le compte </h2>
            {accescompteprincipal[0] &&
                  accescompteprincipal[0].acces_principal === "ACTIF" ? (
                    <>
                      {" "}
                      <div className="w-full flex bg-white px-3 py-3 my-3 rounded-1xl justify-between" onClick={()=>{verifcodep()}}>
                        Acces principal
                      </div>
                    </>
                  ) : null}

                  {accescomptesecondaire.map((bat, index) => {
                    return (
                      <>
                        {" "}
                        <div className="w-full flex bg-white px-3 py-3 my-3 rounded-1xl justify-between" onClick={()=>{verifcodes()}}>
                          Acces secondaire {index+1}
                        </div>
                      </>
                    );
                  })}
            </div>
          </IonContent>
        </IonPage></> );
}
 
export default Gestion_acces;