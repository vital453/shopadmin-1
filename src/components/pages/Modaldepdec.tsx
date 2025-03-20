/* eslint-disable react-hooks/exhaustive-deps */

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
  IonProgressBar,
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
  checkmarkSharp,
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
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  setcaisse,
  sethisto_decaisse,
  sethisto_depense,
} from "../../Feature/CaisseSlice";

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
  type: any;
  id: any;
}

export const Modaldepdec: React.SFC<Ajout_utiliformprops> = ({
  onclose,
  Datec,
  Montant,
  Lastcaisse,
  Endcaisse,
  Observation,
  Numcompte,
  type,
  id,
}) => {
  useEffect(() => {
    console.log(Numcompte);
  }, []);
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);
  const [progress, setprogress] = useState(false);
  const caisse_value = useSelector((state: any) => state.Caisse.caisse);
  const dispatch = useDispatch();
  const userid = useSelector((state: any) => state.auth.user);

  const [progress1, setprogress1] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);

  const deletedepense = () => {
    setprogress(true);
    setprogress1(true);
    setprogress1(true);
    toast.loading(
      "Opération en cours de traitement....\n\nVeuillez patienter.",
      {
        duration: 60000,
      }
    );
    const last_caisse = caisse_value[0].caisse;
    console.log(last_caisse);
    const end_caisse = parseInt(last_caisse) + parseInt(Montant);
    console.log(end_caisse);
    Axios.post("https://backendtrader.digitalfirst.space/delete_depense", {
      id_boutique: userid.BoutiqueId,
      id: id,
      montant: Montant,
      last_caisse: last_caisse,
      end_caisse: end_caisse,
    }).then((res) => {
      getCaisse();
      gethisto_decaissement();
      gethisto_depense();
      setShowToast(true);
      setprogress(false);
      setprogress1(false);
      console.log(res.data);
      onclose();
    });
  };
  const deletedecaissement = () => {
    setprogress(true);
    setprogress1(true);
    setprogress1(true);
    toast.loading(
      "Opération en cours de traitement....\n\nVeuillez patienter.",
      {
        duration: 60000,
      }
    );
    const last_caisse = caisse_value[0].caisse;
    console.log(last_caisse);
    const end_caisse = parseInt(last_caisse) + parseInt(Montant);
    console.log(end_caisse);
    Axios.post("https://backendtrader.digitalfirst.space/delete_decaissement", {
      id_boutique: userid.BoutiqueId,
      id: id,
      montant: Montant,
      last_caisse: last_caisse,
      end_caisse: end_caisse,
    }).then((res) => {
      getCaisse();
      gethisto_decaissement();
      gethisto_depense();
      setShowToast(true);
      setprogress(false);
      setprogress1(false);
      console.log(res.data);
      onclose();
    });
  };

  const getCaisse = () => {
    Axios.post("https://backendtrader.digitalfirst.space/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setcaisse(ret.data));
    });
  };
  const gethisto_depense = () => {
    Axios.post("https://backendtrader.digitalfirst.space/histo_depense", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_depense(ret.data));
    });
  };
  const gethisto_decaissement = () => {
    Axios.post("https://backendtrader.digitalfirst.space/histo_decaissement", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_decaisse(ret.data));
    });
  };

  useEffect(() => {
    if (caisse_value[0]) {
      console.log(caisse_value[0].caisse);
    }
    console.log(userid.userId);
  }, [caisse_value]);
  return (
    <>
      <IonApp>
        {progress1 && (
          <div>
            <Toaster />
          </div>
        )}
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
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Dépense supprimer avec succèss"
            duration={8000}
            position="top"
          />
          <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="Décaissement supprimer avec succèss"
            duration={8000}
            position="top"
          />

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

            <IonItem>
              <IonCol className="nereide" size="4">
                Observation:
              </IonCol>
              <IonCol className="nereide" size="6">
                {Observation}
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
                }).format(Montant)}
              </IonCol>
            </IonItem>
            <IonItem>
              <IonCol className="nereide" size="4">
                Caisse avant retrait:
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
                Caisse après retrait:
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

            {progress ? (
              <>
                <IonProgressBar
                  type="indeterminate"
                  className="mt-3"
                ></IonProgressBar>
              </>
            ) : (
              <>
                {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
                <div className="cartCheckout">
                  <IonButton
                    color="success"
                    onClick={() => {
                      if (type === "Dépense") {
                        deletedepense();
                      } else if (type === "Décaissement") {
                        deletedecaissement();
                      }
                    }}
                  >
                    {/* <IonIcon icon={checkmarkSharp} /> */}
                    &nbsp;Supprimer {type === "Dépense" ? "la" : "le"} {type}
                  </IonButton>
                </div>
                {/* ) : (
                  <div className="cartCheckout">
                    <IonButton color="success">
                      &nbsp;Supprimer {type === "Dépense" ? "la" : "le"} {type}
                    </IonButton>
                  </div>
                )} */}
              </>
            )}
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
