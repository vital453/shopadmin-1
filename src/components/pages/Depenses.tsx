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
import { Modaldepdec } from "./Modaldepdec";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
}

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

export const Depenses: React.SFC<Ajout_utiliformprops> = ({}) => {
  const [showmodal, setShowmodal] = useState(false);
  let panier = useSelector((state: any) => state.panier.panier);
  let comm = useSelector((state: any) => state.Caisse.histo_decaisse).concat(
    useSelector((state: any) => state.Caisse.histo_depense)
  );
  const userid = useSelector((state: any) => state.auth.user).userId;
  const caisse_value = useSelector((state: any) => state.Caisse.caisse);
  const depenses = useSelector((state: any) => state.Caisse.histo_depense);
  const decaisse = useSelector((state: any) => state.Caisse.histo_decaisse);
  const [commande, setCommandelist] = useState<any[]>([]);
  const [montant, setMontant] = useState<any>("ee");
  const [last_caisse, setLast_caisse] = useState<any>("");
  const [date, setDate] = useState<any>("");
  const [end_caisse, setEnd_caisse] = useState<any>("rr");
  const [observation, setObservation] = useState<any>();
  const [numcompte, setNumcompte] = useState<any>();
  const [nomCli, setNomCli] = useState<String>("rr");
  const [telephone, setTelephone] = useState<String>("rr");
  const [remarque, setRemarque] = useState<String>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("rr");
  const [id, setId] = useState<number>(0);
  const dispatch = useDispatch();
  const [nub, setNub] = useState<any>(15);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const boutiqueid = useSelector((state: any) => state.auth.user);
  const accesparcompte = useSelector((state: any) => state.Hash.accesparcompte);

  const loadData = (ev: any) => {
    setTimeout(() => {
      setNub(nub + 10);
      ev.target.complete();
    }, 500);
  };

  const getcom = () => {
    // fetch('https://backend-shop.benindigital.com/affichecommande').then((res) => {
    //     const data = res.json()
    //     return data
    // })
    //     .then((data) => {
    //         setCommandelist(data);
    //         console.log(data);
    //     })
    // fetch('https://backend-shop.benindigital.com/affichecommande').then((res) => {
    //     const data = res.json()
    //     return data
    // }).then((data) => {
    //     dispatch(recupCommande(data));
    // })
  };

  const permu = (
    n: String | React.SetStateAction<String>,
    p: String | React.SetStateAction<String>,
    a: String | React.SetStateAction<String>,
    s: String | React.SetStateAction<String>,
    z: String | React.SetStateAction<String>,
    y: String | React.SetStateAction<String>
  ) => {
    setDate(n);
    setMontant(p);
    setLast_caisse(a);
    setEnd_caisse(s);
    setObservation(z);
    setNumcompte(y);
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
          return bat.histo_depense === 1 ? (
            <>
              {comm[0] ? (
                <>
                  {comm.slice(0, nub).map((card: any, index: any) => {
                    return (
                      <IonItem
                        className=" Itemsv"
                        onClick={() => {
                          permu(
                            card.date,
                            card.montant,
                            card.last_caisse,
                            card.end_caisse,
                            card.observation,
                            card.numero_compte
                          );
                        }}
                      >
                        <IonLabel>
                          <IonLabel>
                            {/* <h3 className="nereide"><span className="adddate">{String(new Date(card.date)).split("(")[0]}</span><span className="add1">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(card.montant)}</span></h3> */}
                            {card.numero_compte ? (
                              <h3 className="nereide">
                                <p className=" add3 nereide">
                                  <span className="adddate">
                                    {String(new Date(card.date)).split("(")[0]}
                                  </span>
                                </p>
                                <span>Décaissement: </span>
                                <span className="add5">
                                  {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "XOF",
                                  }).format(card.montant)}
                                </span>
                              </h3>
                            ) : (
                              <h3 className="nereide">
                                <p className=" add3 nereide">
                                  <span className="adddate">
                                    {String(new Date(card.date)).split("(")[0]}
                                  </span>{" "}
                                </p>
                                <span>Dépense: </span>
                                <span className="add5">
                                  {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "XOF",
                                  }).format(card.montant)}
                                </span>
                              </h3>
                            )}
                            {/* <p className=" add3" ><span className="add1">Commandes:</span>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(card.total_price)}</p> */}
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
                      aucune dépense
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
                <Modaldepdec
                  onclose={() => {
                    setShowmodal(false);
                  }}
                  Datec={date}
                  Montant={montant}
                  Lastcaisse={last_caisse}
                  Endcaisse={end_caisse}
                  Observation={observation}
                  Numcompte={numcompte}

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
