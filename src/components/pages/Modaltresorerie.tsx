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
  IonSegment,
  IonSegmentButton,
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox,
  IonToast,
} from "@ionic/react";

import {
  triangle,
  ellipse,
  square,
  arrowBack,
  arrowForward,
  personCircleOutline,
  globeOutline,
  personCircle,
  arrowDownCircle,
  informationCircle,
  chevronBack,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
import Axios from "axios";

import { IonReactRouter } from "@ionic/react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Commandes } from "./Commandes";
import { Vendus } from "./Vendus";
import { recupCommande } from "../../Feature/CommandeSlice";
import { useDispatch } from "react-redux";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
  onclose: () => void;
  Datec: any;
  Montant: any;
  Lastcaisse: any;
  Endcaisse: any;
  Observation: any;
  Numcompte: any;
}

export const Modaltresorerie: React.SFC<Ajout_utiliformprops> = ({
  onclose,
  Datec,
  Montant,
  Lastcaisse,
  Endcaisse,
  Observation,
  Numcompte,
}) => {
  useEffect(() => {
    console.log(Numcompte);
  }, []);
  return (
    <>
      <IonApp>
        <IonItem className="Item1" lines="none">
          <IonButtons
            slot="start"
            onClick={() => {
              onclose();
            }}
          >
            <IonIcon icon={chevronBack} />
          </IonButtons>
          Détails des retraits
        </IonItem>

        <IonContent fullscreen>
          <IonList lines="full" class="ion-no-margin">
            <IonItem>
              <IonCol className="nereide" size="3">
                Date:
              </IonCol>
              <IonCol className="nereide" size="7">
                {/* {String(new Date(Datec)).split("(")[0]} */}
                {Datec.split("T")[0]} &nbsp; à &nbsp;{" "}
                {Datec.split("T")[1].split(".")[0]}
              </IonCol>
            </IonItem>
            {/* <IonItem>
              <IonCol className="nereide" size="3">
                Observation:
              </IonCol>
              <IonCol className="nereide" size="7">
                Aucune
              </IonCol>
            </IonItem> */}

            <IonItem>
              <IonCol className="nereide" size="4">
                Montant:
              </IonCol>
              <IonCol className="nereide" size="6">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XOF",
                }).format(Montant)}
              </IonCol>
            </IonItem>
            <IonItem>
              <IonCol className="nereide" size="4">
                Caisse avant commande:
              </IonCol>
              <IonCol className="nereide" size="6">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XOF",
                }).format(Lastcaisse)}
              </IonCol>
            </IonItem>
            <IonItem>
              <IonCol className="nereide" size="4">
                Caisse après commande:
              </IonCol>
              <IonCol className="nereide" size="6">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XOF",
                }).format(Endcaisse)}
              </IonCol>
            </IonItem>

            {Numcompte ? (
              <IonItem>
                <IonCol className="nereide" size="4">
                  N°de compte:
                </IonCol>
                <IonCol className="nereide" size="6">
                  {Numcompte}
                </IonCol>
              </IonItem>
            ) : null}

            {/* <IonAccordionGroup>
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
                                    onClick={() => { majstatut(statut1) }}
                                >Mettre à jour le status</IonButton>
                            </IonCol>
                        )} */}
          </IonList>
          {/* <IonToast
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
                    /> */}
        </IonContent>
      </IonApp>
    </>
  );
};
