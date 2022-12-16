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
import { ModalCom } from "./ModalCom";
import { recupCommande } from "../../Feature/CommandeSlice";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
}

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

export const Commandes: React.SFC<Ajout_utiliformprops> = ({}) => {
  const [showmodal, setShowmodal] = useState(false);
  let panier = useSelector((state: any) => state.panier.panier);
  let comm = [].concat(useSelector((state: any) => state.commande.commande));
  const userid = useSelector((state: any) => state.auth.user);
  const [commande, setCommandelist] = useState<any[]>([]);
  const [invoice, setInvoice] = useState<any>("ee");
  const [statut, setStatut] = useState<any>();
  const [date, setDate] = useState<any>();
  const [prixt, setPrixt] = useState<any>("rr");
  const [whatsapp, setWhatsapp] = useState<any>();
  const [etatstat, setEtatstat] = useState<any>(false);
  const [nomCli, setNomCli] = useState<String>("rr");
  const [telephone, setTelephone] = useState<String>("rr");
  const [remarque, setRemarque] = useState<String>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("rr");
  const [id, setId] = useState<number>(0);
  const [nub, setNub] = useState<any>(15);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const boutiqueid = useSelector((state: any) => state.auth.user);
  const accesparcompte = useSelector((state: any) => state.Hash.accesparcompte);

  const dispatch = useDispatch();

  const loadData = (ev: any) => {
    setTimeout(() => {
      setNub(nub + 10);
      ev.target.complete();
    }, 500);
  };

  const getcom = () => {
    Axios.post("https://backend-shop.benindigital.com/affichecommande", {
      id_boutique: userid.BoutiqueId,
    }).then((ret) => {
      dispatch(recupCommande(ret.data));
    });
  };

  const permu = (
    n: String | React.SetStateAction<String>,
    p: String | React.SetStateAction<String>,
    a: String | React.SetStateAction<String>,
    s: String | React.SetStateAction<String>,
    z: String | React.SetStateAction<String>
  ) => {
    setDate(n);
    setInvoice(p);
    setStatut(a);
    setPrixt(s);
    setWhatsapp(z);
    setShowmodal(true);
  };

  const data = [
    {
      title: "Ventes",
      subtitle: "Long road",
      image: "/assets/1e.jpg",
      id: 1,
    },
    {
      title: "Caisse",
      subtitle: "Big mountains",
      image: "/assets/1e.jpg",
      id: 2,
    },
    {
      title: "Stock",
      subtitle: "This is unknown",
      image: "/assets/1e.jpg",
      id: 3,
    },
    {
      title: "Bilan",
      subtitle: "This is unknown",
      image: "/assets/1e.jpg",
      id: 4,
    },
    {
      title: "Caisse",
      subtitle: "This is unknown",
      image: "/assets/1e.jpg",
      id: 5,
    },
    {
      title: "Cosmétique",
      subtitle: "This is unknown",
      image: "/assets/1e.jpg",
      id: 6,
    },
  ];

  useEffect(() => {
    console.log(comm);
  }, []);
  return (
    <>
      {accesparcompte
        .filter((t: any) => t.id_boutique === boutiqueid.BoutiqueId)
        .map((bat: any) => {
          return bat.histo_vente === 1 ? (
            <>
              {comm[0] ? (
                <>
                  {comm.slice(0, nub).map((card: any, index: any) => {
                    return (
                      <IonItem
                        className=" Itemsv"
                        onClick={() => {
                          // setId(val.idPatient);
                          permu(
                            card.date,
                            card.invoice,
                            card.status_id_command,
                            card.total_price,
                            card.whatsapp
                          );
                        }}
                      >
                        <IonLabel>
                          <IonLabel>
                            <h3 className="nereide">
                              <span className="add1">{card.whatsapp}</span>{" "}
                              <span className="adddate">
                                {String(new Date(card.date)).split("(")[0]}
                              </span>{" "}
                              <span className="add2">{card.invoice}</span>{" "}
                            </h3>
                            {card.whatsapp != "" ? (
                              <p className=" add3">
                                <span className="add1">Commande: </span>
                                <span className="add5">
                                  {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "XOF",
                                  }).format(card.total_price)}
                                </span>
                              </p>
                            ) : (
                              <p className=" add3">
                                <span className="add1">Vente: </span>
                                <span className="add5">
                                  {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "XOF",
                                  }).format(card.total_price)}
                                </span>
                              </p>
                            )}
                          </IonLabel>
                        </IonLabel>
                      </IonItem>
                    );
                  })}
                  <IonInfiniteScroll
                    className="scroll1"
                    onIonInfinite={loadData}
                    threshold="100px"
                    disabled={isInfiniteDisabled}
                  >
                    <IonInfiniteScrollContent
                      loadingSpinner="lines-sharp-small"
                      loadingText="Chargement de données..."
                    ></IonInfiniteScrollContent>
                  </IonInfiniteScroll>
                </>
              ) : (
                <>
                  <div className="items-center justify-center text-center mb-3">
                    <img className="" src="delai-de-traitement.png" alt="d" />
                    <h2 className="items-center justify-center text-center ">
                      aucune vente
                    </h2>
                  </div>
                </>
              )}

              <IonModal
                isOpen={showmodal}
                onDidDismiss={() => {
                  setShowmodal(false);
                }}
              >
                <ModalCom
                  onclose={() => {
                    setShowmodal(false);
                    getcom();
                  }}
                  Invoice={invoice}
                  Prix={prixt}
                  Datec={date}
                  Statut={statut}
                  Etat={etatstat}
                  Whatsapp={whatsapp}
                  // tab={patient}
                />
              </IonModal>
            </>
          ) : (
            <div className="flex items-center justify-center text-2xl mt-14">
              vous n'avez pas accès à cette page
            </div>
          );
        })}
    </>
  );
};
