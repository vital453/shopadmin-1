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
import { Modaltresorerie } from "./Modaltresorerie";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
}

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

export const Tresorerie: React.SFC<Ajout_utiliformprops> = ({}) => {
  const [showmodal, setShowmodal] = useState(false);
  let panier = useSelector((state: any) => state.panier.panier);
  let comm = useSelector((state: any) => state.Caisse.histo_tresorerie);
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

  const [width, setWindowWidth] = useState(window.innerWidth);

  const [searchText, setSearchText] = useState("");

  const loadData = (ev: any) => {
    setTimeout(() => {
      setNub(nub + 10);
      ev.target.complete();
    }, 500);
  };

  const getcom = () => {
    // fetch('https://backendtrader.digitalfirst.space/affichecommande').then((res) => {
    //     const data = res.json()
    //     return data
    // })
    //     .then((data) => {
    //         setCommandelist(data);
    //         console.log(data);
    //     })
    // fetch('https://backendtrader.digitalfirst.space/affichecommande').then((res) => {
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

  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log(comm);
  }, []);

  window.addEventListener("resize", updateDimensions);
  return (
    // <>
    //   {width < 500 ? (
    //     <>
    //       {comm[0] ? (
    //         <>
    //           {comm.slice(0, nub).map((card: any, index: any) => {
    //             return (
    //               <IonItem
    //                 className=" Itemsv"
    //                 onClick={() => {
    //                   permu(
    //                     card.date,
    //                     card.montant,
    //                     card.last_caisse,
    //                     card.end_caisse,
    //                     "Aucune",
    //                     card.numero_compte
    //                   );
    //                 }}
    //               >
    //                 <IonLabel>
    //                   <IonLabel>
    //                     {/* <h3 className="nereide"><span className="adddate">{String(new Date(card.date)).split("(")[0]}</span><span className="add1">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(card.montant)}</span></h3> */}
    //                     {card.type == "caisse" ? (
    //                       <h3 className="nereide">
    //                         <p className=" add3 nereide">
    //                           <span className="adddate">
    //                             {/* {String(new Date(card.date)).split("(")[0]} */}
    //                             {card.date.split("T")[0]} &nbsp; à &nbsp; {(card.date.split("T")[1]).split(".")[0]}
    //                           </span>
    //                         </p>
    //                         <span>Caisse: </span>
    //                         <span className="add5">
    //                           {new Intl.NumberFormat("de-DE", {
    //                             style: "currency",
    //                             currency: "XOF",
    //                           }).format(card.montant)}
    //                         </span>
    //                       </h3>
    //                     ) : (
    //                       <h3 className="nereide">
    //                         <p className=" add3 nereide">
    //                           <span className="adddate">
    //                             {/* {String(new Date(card.date)).split("(")[0]} */}
    //                       {card.date.split("T")[0]} &nbsp; à &nbsp; {(card.date.split("T")[1]).split(".")[0]}
    //                           </span>{" "}
    //                         </p>
    //                         <span>Banque: </span>
    //                         <span className="add5">
    //                           {new Intl.NumberFormat("de-DE", {
    //                             style: "currency",
    //                             currency: "XOF",
    //                           }).format(card.montant)}
    //                         </span>
    //                       </h3>
    //                     )}
    //                     {/* <p className=" add3" ><span className="add1">Commandes:</span>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(card.total_price)}</p> */}
    //                   </IonLabel>
    //                 </IonLabel>
    //               </IonItem>
    //             );
    //           })}
    //           <IonInfiniteScroll
    //             className="scroll1"
    //             onIonInfinite={loadData}
    //             threshold="100px"
    //             disabled={isInfiniteDisabled}
    //           >
    //             <IonInfiniteScrollContent
    //               loadingSpinner="lines-sharp-small"
    //               loadingText="Chargement de données..."
    //             ></IonInfiniteScrollContent>
    //           </IonInfiniteScroll>
    //         </>
    //       ) : (
    //         <>
    //           <div className="items-center justify-center text-center mb-3">
    //             <img className="" src="delai-de-traitement.png" alt="d" />
    //             <h2 className="items-center justify-center text-center ">
    //             aucune operation dans la trésorerie
    //             </h2>
    //           </div>
    //         </>
    //       )}
    //       <IonModal
    //         isOpen={showmodal}
    //         onDidDismiss={() => {
    //           setShowmodal(false);
    //         }}
    //       >
    //         <Modaltresorerie
    //           onclose={() => {
    //             setShowmodal(false);
    //           }}
    //           Datec={date}
    //           Montant={montant}
    //           Lastcaisse={last_caisse}
    //           Endcaisse={end_caisse}
    //           Observation={observation}
    //           Numcompte={numcompte}

    //           // tab={patient}
    //         />
    //       </IonModal>
    //     </>
    //   ) : (
    <>
      <IonSearchbar
        mode="ios"
        value={searchText}
        placeholder={"rechercher par date"}
        className="pl-0"
        animated={true}
        onIonChange={(e) => {
          setSearchText(e.detail.value!);
          // change(e.detail.value!);
        }}
        onIonFocus={(e) => {
          // dispatch(setactive_categ(""));
          // dispatch(setactive_tendance(""));
          // setNub(10);
        }}
      ></IonSearchbar>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <IonModal
            isOpen={showmodal}
            onDidDismiss={() => {
              setShowmodal(false);
            }}
          >
            <Modaltresorerie
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
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left text-sm">
                    Type de l'opération
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center text-sm">
                    Date de l'opération
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center text-sm">
                    Montant
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {comm[0] ? (
                <>
                  {comm.filter(
                    (t: any) =>
                      t.date.toLowerCase().includes(searchText.toLowerCase())
                    // || t.status_id_command === filtrestat
                  )[0] ? (
                    comm
                      .filter(
                        (t: any) =>
                          t.date
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        // || t.status_id_command === filtrestat
                      )
                      .map((card: any, index: any) => {
                        return (
                          <tr
                            onClick={() => {
                              permu(
                                card.date,
                                card.montant,
                                card.last_caisse,
                                card.end_caisse,
                                "Aucune",
                                card.numero_compte
                              );
                            }}
                            className="cursor-pointer"
                          >
                            <td className="p-2">
                              <div className="text-sm">
                                {card.type == "caisse" ? (
                                  <span className="text-neutral-900 font-semibold">
                                    Caisse{" "}
                                  </span>
                                ) : (
                                  <span className="text-neutral-900 font-semibold">
                                    Banque{" "}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center text-sm text-cyan-500">
                                {card.date.split("T")[0]} &nbsp; à &nbsp;{" "}
                                {card.date.split("T")[1].split(".")[0]}
                                {/* {card.date.split("T")[0]} */}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center text-red-600 text-sm">
                                {new Intl.NumberFormat("de-DE", {
                                  style: "currency",
                                  currency: "XOF",
                                }).format(card.montant)}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <div className="flex items-center justify-center h-20 bg-white w-full">
                      <span>aucun resultat</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="items-center justify-center text-center mb-3">
                  <img className="" src="delai-de-traitement.png" alt="d" />
                  <h2 className="items-center justify-center text-center ">
                    aucune operation dans la trésorerie
                  </h2>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
    //   )}
    // </>
  );
};
