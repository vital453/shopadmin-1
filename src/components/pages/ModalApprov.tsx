/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useSelector } from "react-redux";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
  onclose: () => void;
  Prix: number;
  prev_quant: any;
  quant_appro: any;
  Datec: any;
  Invoice: any;
  Etat: boolean;
}

export const ModalApprov: React.SFC<Ajout_utiliformprops> = ({
  onclose,
  prev_quant,
  quant_appro,
  Prix,
  Datec,
  Invoice,
  Etat,
}) => {
  const [showmodal, setShowmodal] = useState(false);
  const [produit, setProduitlist] = useState<any[]>([]);
  // const [etat, setEtat] = useState<boolean>(Statut);
  const [titre, setTitre] = useState<String>();
  const [date, setDate] = useState<any>(String(new Date(Datec)));
  const [age, setAge] = useState<any>(0);
  // const [statut, setStatut] = useState<any>(Statut);
  const [groupee, setGroupee] = useState<String>("rr");
  const [nomCli, setNomCli] = useState<String>("rr");
  const [telephone, setTelephone] = useState<String>("rr");
  const [remarque, setRemarque] = useState<String>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("rr");
  const [id, setId] = useState<number>(0);
  const [checked, setChecked] = useState(false);
  const userid = useSelector((state: any) => state.auth.user);

  // const getartcom = () => {
  //   Axios.post("https://backendtrader.digitalfirst.space/afficheartapprov", {
  //     invoice: Invoice,
  //     id_boutique: userid.userId,
  //   }).then((ret) => {
  //     setProduitlist(ret.data);
  //     console.log(ret.data);
  //   });
  // };

  // const majstatut = () => {
  //   Axios.post("https://backendtrader.digitalfirst.space/majstatut", {
  //     invoice: Invoice,
  //     id_boutique: userid.userId,
  //   }).then((ret) => {
  //     if (ret.data == "success") {
  //       alert("Statut lis à jour");
  //       onclose();
  //       console.log(ret.data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getartcom();
  //   console.log(date);
  // }, []);
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
          Détails approvisionnement
        </IonItem>

        <IonContent fullscreen>
          <IonList lines="full" class="ion-no-margin">
            <IonItem>
              <IonCol size="3" className="nereide">
                Date:
              </IonCol>
              <IonCol className="nereide" size="7">
                {/* {String(new Date(Datec)).split("(")[0]} */}
                {Datec.split("T")[0]} &nbsp; à &nbsp;{" "}
                {Datec.split("T")[1].split(".")[0]}
              </IonCol>
            </IonItem>

            <IonItem>
              <IonCol className="nereide" size="6">
                Nom du produit:
              </IonCol>
              <IonCol className="nereide" size="4">
                {Invoice}
              </IonCol>
            </IonItem>

            <IonItem>
              <IonCol className="nereide" size="4">
                Montant:
              </IonCol>
              <IonCol className="nereide" size="6">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XOF",
                }).format(Prix)}
              </IonCol>
            </IonItem>
            <IonItem>
              <IonCol className="nereide" size="4">
                Quantite:
              </IonCol>
              <IonCol className="nereide" size="6">
              {quant_appro}
              </IonCol>
            </IonItem>
            <IonItem>
              <IonCol className="nereide" size="4">
                Prev Quantite:
              </IonCol>
              <IonCol className="nereide" size="6">
              {prev_quant}
              </IonCol>
            </IonItem>
            {/* <IonAccordionGroup>
              <IonAccordion value="colors" toggleIcon={arrowDownCircle}>
                <IonItem className="nereide" slot="header">
                  <IonLabel>Produits</IonLabel>
                </IonItem>

                <IonList slot="content">
                  {produit.map((card, index) => {
                    return (
                      <IonItem>
                        <IonLabel>{card.product_name}</IonLabel>
                        <IonLabel>{card.stock_appro}</IonLabel>
                        <IonLabel>{card.total_price}</IonLabel>
                      </IonItem>
                    );
                  })}
                </IonList>
              </IonAccordion>
            </IonAccordionGroup> */}

            {/* {(etat) ? (
                            null
                        ) : (
                            <IonCol>
                                <IonButton color="success"                                 
                                    onClick={() => {  majstatut() }}
                                >Editer</IonButton>
                            </IonCol>
                        )} */}
          </IonList>
        </IonContent>
      </IonApp>
    </>
  );
};
