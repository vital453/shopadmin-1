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
import { setaccesparcompte,setPassacces } from "../../Feature/HashSlice";

// interface Ajout_utiliformprops {
//   // nom: String;
//   // prenom: String;
// }

export const DroitAcces = () => {
  const data = [
    {
      title: "Bilan Journalier",
      subtitle: "FinancesCompta",
      dec: (e) => {
        // setShowmodal(e);
      },
      id: 1,
    },
    {
      title: "Bilan Périodique",
      subtitle: "FinancesComptaPeriode",
      dec: (e) => {
        // setShowmodal2(e)
      },
      id: 2,
    },
  ];
  const router = useIonRouter();
  let [dateactu, setDateactu] = useState(
    useSelector((state) => state.Hash.date_actu)
  );
  const boutiquecompte = useSelector((state) => state.Hash.boutiquecompte);
  const pass_acces = useSelector((state) => state.Hash.pass_acces);
  const [pass_dacces, setpass_dacces] = useState("");
  const [ifpass_dacces, setIfpass_dacces] = useState(false);
  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [check1, setcheck1] = useState(true);
  const [check2, setcheck2] = useState(true);
  const [check3, setcheck3] = useState(true);
  const [check4, setcheck4] = useState(true);
  const [check5, setcheck5] = useState(true);
  const [check6, setcheck6] = useState(true);
  const [check7, setcheck7] = useState(true);
  const [check8, setcheck8] = useState(true);
  const [check9, setcheck9] = useState(true);
  const [check10, setcheck10] = useState(true);
  const [check11, setcheck11] = useState(true);
  const [check12, setcheck12] = useState(true);
  const [presentAlert] = useIonAlert();
  const dispatch = useDispatch();
  const [message, setmessage] = useState("");

  const [seg, setSeg] = useState("Par_produits");

  useEffect(() => {
    if (boutiquecompte[0]) {
      boutiquecompte[0].store_name === "" ?   setSeg(boutiquecompte[0].boutiqueName) : setSeg(boutiquecompte[0].store_name);
    }
    console.log(pass_acces[0].pass_acces + "pass");
    console.log(boutiquecompte[0].store_name + "pass");
  }, []);

  const reg = () => {
    if (!pass_dacces) {
      setShowToast(true);
      setmessage("Veuillez remplir le champs");
    } else {
      if (pass_dacces.length > 3) {
        setprogress(true);
        Axios.post("https://backendtrader.digitalfirst.space/updatepassacces", {
          idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
          pass_acces: pass_dacces,
        }).then((ret) => {
          Axios.post("https://backendtrader.digitalfirst.space/affichepassacess", {
            idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
          }).then((ret) => {
            dispatch(setPassacces(ret.data));
            console.log(ret.data);
            setprogress(false);
            setShowToast2(true);
          });
        });
      } else {
        setShowToast(true);
        setmessage("Le champs doit contenir au monis 4 caratères");
      }
    }
  };

  const handlechange = (data) => {
    if (data === "ter1") {
      if (check1 === true) {
        console.log(data);
        // setdonnee1(1);
        // console.log(donnee1);
      }
      setcheck1(!check1);
      console.log(check1);
    }
    if (data === "ter2") {
      if (check2 === true) {
        console.log(data);
        // setdonnee2(1);
        // console.log(donnee2);
      }
      setcheck2(!check2);
    }
    if (data === "ter3") {
      if (check3 === true) {
        console.log(data);
        // setdonnee3(1);
        // console.log(donnee3);
      }
      setcheck3(!check3);
    }
    if (data === "ter4") {
      if (check4 === true) {
        console.log(data);
        // setdonnee4(1);
        // console.log(donnee4);
      }
      setcheck4(!check4);
    }
    if (data === "ter5") {
      if (check5 === true) {
        console.log(data);
        // setdonnee5(1);
        // console.log(donnee5);
      }
      setcheck5(!check5);
      
    }
    if (data === "ter6") {
      if (check6 === true) {
        console.log(data);
        // setdonnee6(1);
        // console.log(donnee6);
      }
      setcheck6(!check6);
     
    }
    if (data === "ter7") {
      if (check7 === true) {
        console.log(data);
        // setdonnee7(1);
        // console.log(donnee7);
      }
      setcheck7(!check7);
      // setdonnee7(0);
    }
    if (data === "ter8") {
      if (check8 === true) {
        console.log(data);
        // setdonnee8(1);
        // console.log(donnee8);
      }
      setcheck8(!check8);
      // setdonnee8(0);
    }
    if (data === "ter9") {
      if (check9 === true) {
        console.log(data);
        // setdonnee9(1);
        // console.log(donnee9);

      }
      setcheck9(!check9);
      // setdonnee9(0);
    }
    if (data === "ter10") {
      if (check10 === true) {
        console.log(data);
        // setdonnee10(1);
        // console.log(donnee10);
      }
      setcheck10(!check10);
      // setdonnee10(0);
    }
    if (data === "ter11") {
      if (check11 === true) {
        console.log(data);
        // setdonnee11(1);
        // console.log(donnee11);
      }
      setcheck11(!check11);
      // setdonnee11(0);
    }
    if (data === "ter12") {
      if (check12 === true) {
        console.log(data);
        // setdonnee11(1);
        // console.log(donnee11);
      }
      setcheck12(!check12);
      // setdonnee11(0);
    }
  };

  const regg = (id_boutique, pass_entrer, store_name) => {
    if (pass_entrer === pass_acces[0].pass_acces ) {
      setprogress1(true);
      Axios.post("https://backendtrader.digitalfirst.space/majaccesboutique", {
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
        id_boutique: id_boutique,
        store_name: store_name,
        gestion_vente: check3 ? 0 : 1,
        gestion_produit: check4 ? 0 : 1,
        histo_operation: check8 ? 0 : 1,
        histo_vente: check7 ? 0 : 1,
        histo_depense: check9 ? 0 : 1,
        histo_appro: check11 ? 0 : 1,
        finance_day: check1 ? 0 : 1,
        finance_periode: check2 ? 0 : 1,
        gestion_caisse: check5 ? 0 : 1,
        gestion_depense: check6 ? 0 : 1,
        gestion_decaisse: check10 ? 0 : 1,
        gestion_commande_attente: check12 ? 0 : 1,
      }).then((ret) => {
        console.log(ret.data);
        Axios.post(
          "https://backendtrader.digitalfirst.space/afficheaccesparboutique",
          {
            id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
          }
        ).then((ret) => {
          dispatch(setaccesparcompte(ret.data));
          setprogress1(false);
          setShowToast3(true);
        });
      });
    }else{
      setShowToast4(true)
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonRouterLink routerLink={`/home`} color="dark">
              <IonButton
              // onClick={() => {
              //     router.goBack();
              // }}
              >
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonRouterLink>
          </IonButtons>
          <IonTitle className="nereide">Digital trader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message}
        duration={5000}
        position="top"
      />
      <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="pass ajouter avec succès"
        duration={5000}
        position="top"
      />
      <IonToast
        isOpen={showToast3}
        onDidDismiss={() => setShowToast3(false)}
        message="Mise à jour des droits d'accès de la boutique "
        duration={5000}
        position="top"
      />
      <IonToast
        isOpen={showToast4}
        onDidDismiss={() => setShowToast4(false)}
        message="pass d'accès incorrect "
        duration={5000}
        position="top"
      />
      {pass_acces[0].pass_acces === "" ? (
        <IonContent>
          <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <div className="flex flex-col overflow-y-auto md:flex-row">
                <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                  <div className="w-full flex flex-col">
                    <div className="w-full items-center justify-center text-center">
                      <h1 className="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                        Ajouter un pass d'accès pour la modification des droits
                        d'accès
                      </h1>
                    </div>

                    <label className=" text-sm">
                      {/* <span className="text-gray-700 dark:text-gray-400">
                      Username
                    </span> */}
                      <IonInput
                        className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                        placeholder="Choisissez le pass d'accès"
                        value={pass_dacces}
                        onIonChange={(e) => setpass_dacces(e.detail.value)}
                      />
                    </label>
                    {ifpass_dacces && (
                      <div className="empty_full mt-3">
                        Veuillez entrez le nom de la Boutique
                      </div>
                    )}
                    {progress ? (
                      <>
                        <IonProgressBar
                          type="indeterminate"
                          className="mt-3"
                        ></IonProgressBar>
                      </>
                    ) : (
                      <>
                        <a
                          className="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                          onClick={() => {
                            reg();
                          }}
                        >
                          Enregistrer
                        </a>
                      </>
                    )}
                    <hr className="my-8" />

                    {/* <button className="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaInstagram /> &nbsp; &nbsp; Instagram
                  </button>
                  <button className="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaTwitter /> &nbsp; &nbsp; Twitter
                  </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      ) : (
        <IonContent>
          <div className="homes">
            <IonSegment
              className="nereide mb-3"
              onIonChange={(e) => {
                setSeg(e.detail.value);
              }}
              value={seg}
              scrollable={true}
              mode="ios"
            >
              {boutiquecompte.map((bout, index) => {
                return (
                
                  bout.store_name === "" ?
                  <IonSegmentButton value={bout.boutiqueName}>
                    <IonLabel>{bout.boutiqueName}</IonLabel>
                  </IonSegmentButton> :
                   <IonSegmentButton value={bout.store_name}>
                   <IonLabel>{bout.store_name}</IonLabel>
                 </IonSegmentButton>
                );
              })}
            </IonSegment>
            <div className="div2">
              {boutiquecompte
                .filter((t) =>  t.store_name==="" ? t.boutiqueName === seg : t.store_name === seg)
                .map((bat) => {
                  return (
                    <div className="flex flex-col items-start justify-start gap-4">
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            value={check1}
                            onChange={() => {
                              handlechange("ter1");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox1"
                          >
                            Bilan journalier
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value={check2}
                            onChange={() => {
                              handlechange("ter2");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox2"
                          >
                            Bilan périodique
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox3"
                            value={check3}
                            onChange={() => {
                              handlechange("ter3");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox3"
                          >
                            Gestion des ventes
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox4"
                            value={check4}
                            onChange={() => {
                              handlechange("ter4");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox4"
                          >
                            Gestion des produits
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox5"
                            value={check5}
                            onChange={() => {
                              handlechange("ter5");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox5"
                          >
                            Gestion de la caisse
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox6"
                            value={check6}
                            onChange={() => {
                              handlechange("ter6");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox6"
                          >
                            Gestion des dépenses
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox7"
                            value={check7}
                            onChange={() => {
                              handlechange("ter7");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox7"
                          >
                            Historique des ventes
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox8"
                            value={check8}
                            onChange={() => {
                              handlechange("ter8");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox8"
                          >
                            Historique des opérations
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox9"
                            value={check9}
                            onChange={() => {
                              handlechange("ter9");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox9"
                          >
                            Historique des dépenses
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox10"
                            value={check10}
                            onChange={() => {
                              handlechange("ter10");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox10"
                          >
                            Gestion des décaissements
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox11"
                            value={check11}
                            onChange={() => {
                              handlechange("ter11");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox11"
                          >
                            Historique des approvisionnements
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox12"
                            value={check11}
                            onChange={() => {
                              handlechange("ter12");
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineCheckbox12"
                          >
                            Gestion des commandes en attentes
                          </label>
                        </div>
                      </div>

                      {progress1 ? (
                        <>
                          <IonProgressBar
                            type="indeterminate"
                            className="mt-3 mb-3"
                          ></IonProgressBar>
                        </>
                      ) : (
                        <>
                          <a
                            className="block w-full no-underline px-4 py-2 mt-4 mb-3 cursor-pointer text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            // onClick={() => {
                            //   regg(bat.id);
                            // }}
                            onClick={() => {
                              presentAlert({
                                header: "Entrez votre pass d'accès",
                                buttons: [
                                  {
                                    text: "Ok",
                                    cssClass: "secondary",
                                    handler: (alertData) => {
                                      //takes the data store_name  boutiqueName
                                      regg(bat.id, alertData.name1, bat.store_name ==="" ? bat.boutiqueName : bat.store_name );
                                    },
                                  },
                                  {
                                    text: "RETOUR",
                                    role: "cancel",
                                    cssClass: "secondary",
                                    handler: () => { },
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
                            }}
                          >
                            Enregistrer
                          </a>
                        </>
                      )}
                      {/* <div>{bat.store_name}</div> */}
                      {/* <div>{pass_acces.pass_acces}jdkfdjknf</div> */}
                    </div>
                  );
                })}
              {/* {seg == "Par_produits" ? <div>knnc</div> : null}
              {seg == "Global" ? <div>fhdfjdf</div> : null} */}
            </div>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};
