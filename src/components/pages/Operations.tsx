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
import Axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { ModalCom } from "./ModalCom";
import { recupCommande } from "../../Feature/CommandeSlice";
import { ModalApprov } from "./ModalApprov";
import { Modaldepdec } from "./Modaldepdec";
import "intro.js/introjs.css";
import introJs from "intro.js";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
}

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

export const Operations: React.SFC<Ajout_utiliformprops> = ({}) => {
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal2, setShowmodal2] = useState(false);
  const [showmodal3, setShowmodal3] = useState(false);
  let panier = useSelector((state: any) => state.panier.panier);
  let appr = useSelector(
    (state: any) => state.approvisionnement.approvisionnement
  );
  let depdec = useSelector((state: any) => state.Caisse.histo_decaisse).concat(
    useSelector((state: any) => state.Caisse.histo_depense)
  );
  let approv = [].concat(
    useSelector((state: any) => state.approvisionnement.approvisionnement)
  );
  let comme = useSelector((state: any) => state.Caisse.histo_decaisse).concat(
    useSelector((state: any) => state.Caisse.histo_depense)
  );
  let comm = useSelector((state: any) => state.commande.commande);
  let ope = comm.concat(appr).concat(depdec);
  const [commande, setCommandelist] = useState<any[]>([]);
  // const [ope, setOpe] = useState<any[]>(comm.concat(appr));
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
  const [montant, setMontant] = useState<any>("ee");
  const [last_caisse, setLast_caisse] = useState<any>("");
  // const [date, setDate] = useState<any>('');
  const [ids, setid] = useState<any>();
  const [type, settype] = useState<any>();
  const [end_caisse, setEnd_caisse] = useState<any>("rr");
  const [observation, setObservation] = useState<any>();
  const [quant_appro, setquant_appro] = useState<any>();
  const [prev_quant, setprev_quant] = useState<any>();
  const [numcompte, setNumcompte] = useState<any>();
  const [id, setId] = useState<number>(0);
  const dispatch = useDispatch();
  const userid = useSelector((state: any) => state.auth.user);
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
    Axios.post("https://backendtrader.digitalfirst.space/affichecommande", {
      id_boutique: userid.BoutiqueId,
    }).then((ret) => {
      dispatch(recupCommande(ret.data));
    });
  };

  const permu1 = (
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

  const permu2 = (
    n: String | React.SetStateAction<String>,
    p: String | React.SetStateAction<String>,
    a: String | React.SetStateAction<String>,
    s: String | React.SetStateAction<String>,
    t: String | React.SetStateAction<String>
  ) => {
    setDate(n);
    setInvoice(p);
    setquant_appro(a);
    setPrixt(s);
    setprev_quant(t);
  };
  const permu3 = (
    n: String | React.SetStateAction<String>,
    p: String | React.SetStateAction<String>,
    a: String | React.SetStateAction<String>,
    s: String | React.SetStateAction<String>,
    z: String | React.SetStateAction<String>,
    y: String | React.SetStateAction<String>,
    t: String | React.SetStateAction<String>,
    i: String | React.SetStateAction<String>
  ) => {
    setDate(n);
    setMontant(p);
    setLast_caisse(a);
    setEnd_caisse(s);
    setObservation(z);
    setNumcompte(y);
    settype(t);
    setid(i);
    setShowmodal3(true);
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
    console.log(ope);
    // commande.sort
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const step1Element = document.querySelector("#step23");

  //     if (step1Element) {
  //       const intro = introJs()
  //         .setOptions({
  //           steps: [
  //             {
  //               element: step1Element,
  //               intro: "Ici ce trouve le tableau des differente données",
  //             },
  //           ],
  //           nextLabel: "Suivant",
  //           prevLabel: "Retour",
  //           doneLabel: "Terminer",
  //         })
  //         .start();
  //     }
  //     return () => {
  //       introJs().exit();
  //     };
  //   }, 200);
  // }, []);

  window.addEventListener("resize", updateDimensions);

  return (
    // <>
    //   {
    //   width < 500 ? (
    //     <>
    //       {ope[0] ? (
    //         <>
    //           {ope
    //             .sort(function (a: any, b: any) {
    //               var key1 = new Date(a.date);
    //               var key2 = new Date(b.date);
    //               if (key1 < key2) {
    //                 return 1;
    //               } else if (key1 === key2) {
    //                 return 0;
    //               } else {
    //                 return -1;
    //               }
    //             })
    //             .slice(0, nub)
    //             .map((card: any, index: any) => {
    //               return (
    //                 <IonItem className=" Itemsv" onClick={() => {}}>
    //                   {ope[index].status_id_command ? (
    //                     <IonLabel
    //                       onClick={() => {
    //                         permu1(
    //                           card.date,
    //                           card.invoice,
    //                           card.status_id_command,
    //                           card.total_price,
    //                           card.whatsapp
    //                         );
    //                         // console.log(String(new Date(card.date)).split("GMT")[0]);
    //                       }}
    //                     >
    //                       <h3 className="nereide">
    //                         <span className="add1">{card.whatsapp}</span>{" "}
    //                         <span className="adddate">
    //                           {/* {String(new Date(card.date)).split("(")[0]} */}
    //                           {card.date.split("T")[0]} &nbsp; à &nbsp;{" "}
    //                           {card.date.split("T")[1].split(".")[0]}
    //                         </span>{" "}
    //                         <span className="add2">{card.invoice}</span>{" "}
    //                       </h3>
    //                       <p className=" add3">
    //                         {card.whatsapp != "" ? (
    //                           <>
    //                             <span className="add1">Commandes:</span>
    //                             <span className="add5">
    //                               {" "}
    //                               {new Intl.NumberFormat("de-DE", {
    //                                 style: "currency",
    //                                 currency: "XOF",
    //                               }).format(card.total_price)}
    //                             </span>
    //                           </>
    //                         ) : (
    //                           <>
    //                             <span className="add1">ventes:</span>
    //                             <span className="add5">
    //                               {new Intl.NumberFormat("de-DE", {
    //                                 style: "currency",
    //                                 currency: "XOF",
    //                               }).format(card.total_price)}
    //                             </span>
    //                           </>
    //                         )}
    //                       </p>
    //                     </IonLabel>
    //                   ) : ope[index].montant ? (
    //                     <IonLabel
    //                       className=" Itemsv"
    //                       onClick={() => {
    //                         permu3(
    //                           card.date,
    //                           card.montant,
    //                           card.last_caisse,
    //                           card.end_caisse,
    //                           card.observation,
    //                           card.numero_compte,
    //                           card.numero_compte ? "Décaissement" : "Dépense",
    //                           card.id
    //                         );
    //                       }}
    //                     >
    //                       <h3>
    //                         {/* <h3 className="nereide"><span className="adddate">{String(new Date(card.date)).split("(")[0]}</span><span className="add1">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(card.montant)}</span></h3> */}
    //                         {card.numero_compte ? (
    //                           <h3 className="nereide">
    //                             <p className=" add3 nereide">
    //                               <span className="adddate">
    //                                 {/* {String(new Date(card.date)).split("(")[0]} */}
    //                                 {card.date.split("T")[0]} &nbsp; à &nbsp;{" "}
    //                                 {card.date.split("T")[1].split(".")[0]}
    //                               </span>
    //                             </p>
    //                             <span>Décaissement: </span>
    //                             <span className="add5">
    //                               {new Intl.NumberFormat("de-DE", {
    //                                 style: "currency",
    //                                 currency: "XOF",
    //                               }).format(card.montant)}
    //                             </span>
    //                           </h3>
    //                         ) : (
    //                           <h3 className="nereide">
    //                             <p className=" add3 nereide">
    //                               <span className="adddate">
    //                                 {/* {String(new Date(card.date)).split("(")[0]} */}
    //                                 {card.date.split("T")[0]} &nbsp; à &nbsp;{" "}
    //                                 {card.date.split("T")[1].split(".")[0]}
    //                               </span>{" "}
    //                             </p>
    //                             <span>Dépense: </span>
    //                             <span className="add5">
    //                               {new Intl.NumberFormat("de-DE", {
    //                                 style: "currency",
    //                                 currency: "XOF",
    //                               }).format(card.montant)}
    //                             </span>
    //                           </h3>
    //                         )}
    //                         {/* <p className=" add3" ><span className="add1">Commandes:</span>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(card.total_price)}</p> */}
    //                       </h3>
    //                     </IonLabel>
    //                   ) : (
    //                     <IonLabel
    //                       onClick={() => {
    //                         setShowmodal2(true);
    //                         permu2(
    //                           card.date,
    //                           card.product_name,
    //                           card.stock_appro,
    //                           card.total_price,
    //                           card.stock_preview
    //                         );
    //                         // console.log(new Date(card.date));
    //                       }}
    //                     >
    //                       <h3 className="nereide">
    //                         <span className="adddate">
    //                           {/* {String(new Date(card.date)).split("(")[0]} */}
    //                           {card.date.split("T")[0]} &nbsp; à &nbsp;{" "}
    //                           {card.date.split("T")[1].split(".")[0]}
    //                         </span>{" "}
    //                         {/* <span className="add2">{card.invoice}</span>{" "} */}
    //                       </h3>
    //                       <p className=" add3">
    //                         {card.total_price < 0 ? (
    //                           <>
    //                             <span className="text-purple-700">
    //                               Sortie hors vente:{" "}
    //                             </span>
    //                             <span className="add5">
    //                               {new Intl.NumberFormat("de-DE", {
    //                                 style: "currency",
    //                                 currency: "XOF",
    //                               }).format(card.total_price)}
    //                             </span>
    //                           </>
    //                         ) : (
    //                           <>
    //                             <span className="add4">
    //                               Approvisionnement:{" "}
    //                             </span>
    //                             <span className="add5">
    //                               {new Intl.NumberFormat("de-DE", {
    //                                 style: "currency",
    //                                 currency: "XOF",
    //                               }).format(card.total_price)}
    //                             </span>
    //                           </>
    //                         )}
    //                       </p>
    //                     </IonLabel>
    //                   )}
    //                 </IonItem>
    //               );
    //             })}
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
    //               aucune opération
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
    //         <ModalCom
    //           onclose={() => {
    //             setShowmodal(false);
    //             getcom();
    //           }}
    //           Invoice={invoice}
    //           Prix={prixt}
    //           Datec={date}
    //           Statut={statut}
    //           Etat={etatstat}
    //           Whatsapp={whatsapp}
    //         />
    //       </IonModal>

    //       <IonModal
    //         isOpen={showmodal2}
    //         onDidDismiss={() => {
    //           setShowmodal2(false);
    //         }}
    //       >
    //         <ModalApprov
    //           onclose={() => {
    //             setShowmodal2(false);
    //           }}
    //           Invoice={invoice}
    //           Prix={prixt}
    //           Datec={date}
    //           prev_quant={prev_quant}
    //           quant_appro={quant_appro}
    //           Etat={etatstat}
    //           // tab={patient}
    //         />
    //       </IonModal>

    //       <IonModal
    //         isOpen={showmodal3}
    //         onDidDismiss={() => {
    //           setShowmodal3(false);
    //         }}
    //       >
    //         <Modaldepdec
    //           onclose={() => {
    //             setShowmodal3(false);
    //           }}
    //           Datec={date}
    //           Montant={montant}
    //           Lastcaisse={last_caisse}
    //           Endcaisse={end_caisse}
    //           Observation={observation}
    //           Numcompte={numcompte}
    //           type={type}
    //           id={ids}

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

      <IonRow></IonRow>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
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
            />
          </IonModal>

          <IonModal
            isOpen={showmodal2}
            onDidDismiss={() => {
              setShowmodal2(false);
            }}
          >
            <ModalApprov
              onclose={() => {
                setShowmodal2(false);
              }}
              Invoice={invoice}
              Prix={prixt}
              Datec={date}
              prev_quant={prev_quant}
              quant_appro={quant_appro}
              Etat={etatstat}
              // tab={patient}
            />
          </IonModal>

          <IonModal
            isOpen={showmodal3}
            onDidDismiss={() => {
              setShowmodal3(false);
            }}
          >
            <Modaldepdec
              onclose={() => {
                setShowmodal3(false);
              }}
              Datec={date}
              Montant={montant}
              Lastcaisse={last_caisse}
              Endcaisse={end_caisse}
              Observation={observation}
              Numcompte={numcompte}
              type={type}
              id={ids}

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
                <th className="p-2">
                  <div className="font-semibold text-center text-sm">
                    Status du Paiement
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {ope[0] ? (
                <>
                  {ope.filter((t: any) =>
                    t.date.toLowerCase().includes(searchText.toLowerCase())
                  )[0] ? (
                    ope
                      .sort(function (a: any, b: any) {
                        var key1 = new Date(a.date);
                        var key2 = new Date(b.date);
                        if (key1 < key2) {
                          return 1;
                        } else if (key1 === key2) {
                          return 0;
                        } else {
                          return -1;
                        }
                      })
                      .filter((t: any) =>
                        t.date.toLowerCase().includes(searchText.toLowerCase())
                      )
                      .map((card: any, index: any) => {
                        return (
                          <>
                            {card.status_id_command ? (
                              <>
                                <tr
                                  onClick={() => {
                                    permu1(
                                      card.date,
                                      card.invoice,
                                      card.status_id_command,
                                      card.total_price,
                                      card.whatsapp
                                    );
                                  }}
                                  className="cursor-pointer"
                                >
                                  <td className="p-2">
                                    <div className="text-sm">
                                      {card.whatsapp !== "" ? (
                                        <span className="text-neutral-900 font-semibold">
                                          Commande{" "}
                                        </span>
                                      ) : (
                                        <span className="text-neutral-900 font-semibold">
                                          Vente{" "}
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
                                      }).format(card.total_price)}
                                    </div>
                                  </td>
                                  <td className="p-2">
                                    <div className="text-center text-gray-700 text-sm">
                                      {card.status_paiement}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ) : (
                              <>
                                {ope[index].montant ? (
                                  <>
                                    <tr
                                      onClick={() => {
                                        permu3(
                                          card.date,
                                          card.montant,
                                          card.last_caisse,
                                          card.end_caisse,
                                          card.observation,
                                          card.numero_compte,
                                          card.numero_compte
                                            ? "Décaissement"
                                            : "Dépense",
                                          card.id
                                        );
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <td className="p-2">
                                        <div className="text-sm">
                                          {card.numero_compte ? (
                                            <span className="text-neutral-900 font-semibold">
                                              Décaissement{" "}
                                            </span>
                                          ) : (
                                            <span className="text-neutral-900 font-semibold">
                                              Dépense{" "}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                      <td className="p-2">
                                        <div className="text-center text-sm text-cyan-500">
                                          {card.date.split("T")[0]} &nbsp; à
                                          &nbsp;{" "}
                                          {
                                            card.date
                                              .split("T")[1]
                                              .split(".")[0]
                                          }
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
                                      <td className="p-2">
                                        <div className="text-center text-gray-700 text-sm">
                                          {card.status_paiement}
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr
                                      onClick={() => {
                                        setShowmodal2(true);
                                        permu2(
                                          card.date,
                                          card.product_name,
                                          card.stock_appro,
                                          card.total_price,
                                          card.stock_preview
                                        );
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <td className="p-2">
                                        <div className="text-sm">
                                          {card.total_price < 0 ? (
                                            <span className="text-neutral-900 font-semibold">
                                              Sortie hors vente{" "}
                                            </span>
                                          ) : (
                                            <span className="text-neutral-900 font-semibold">
                                              Approvisionnemnt{" "}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                      <td className="p-2">
                                        <div className="text-center text-sm text-cyan-500">
                                          {card.date.split("T")[0]} &nbsp; à
                                          &nbsp;{" "}
                                          {
                                            card.date
                                              .split("T")[1]
                                              .split(".")[0]
                                          }
                                          {/* {card.date.split("T")[0]} */}
                                        </div>
                                      </td>
                                      <td className="p-2">
                                        <div className="text-center text-red-600 text-sm">
                                          {new Intl.NumberFormat("de-DE", {
                                            style: "currency",
                                            currency: "XOF",
                                          }).format(card.total_price)}
                                        </div>
                                      </td>
                                      <td className="p-2">
                                        <div className="text-center text-gray-700 text-sm">
                                          {card.status_paiement}
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </>
                            )}
                          </>
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
                    aucune opération
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
