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
  setaccescompteprincipal,
  setaccescomptesecondaire,
  setaccesparcompte,
  setPassacces,
} from "../../Feature/HashSlice";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Acces = () => {
  const router = useIonRouter();
  let [dateactu, setDateactu] = useState(
    useSelector((state) => state.Hash.date_actu)
  );
  const boutiquecompte = useSelector((state) => state.Hash.boutiquecompte);
  const pass_acces = useSelector((state) => state.Hash.pass_acces);
  const accescompteprincipal = useSelector(
    (state) => state.Hash.accescompteprincipal
  );
  const accescomptesecondaire = useSelector(
    (state) => state.Hash.accescomptesecondaire
  );
  const [pass_dacces, setpass_dacces] = useState("");
  const [pass_daccess, setpass_daccess] = useState("");
  const [valeur, setvaleur] = useState("");
  const [ifpass_dacces, setIfpass_dacces] = useState(false);
  const [ifpass_daccess, setIfpass_daccess] = useState(false);
  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);
  const [progress2, setprogress2] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast5, setShowToast5] = useState(false);
  const [showToast6, setShowToast6] = useState(false);
  const [showToast7, setShowToast7] = useState(false);
  const [messagetoast, setmessagetoast] = useState("");
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal1, setShowmodal1] = useState(false);
  const [presentAlert] = useIonAlert();
  const dispatch = useDispatch();
  const [message, setmessage] = useState("");

  const [seg, setSeg] = useState("Par_produits");
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

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
  const rege = () => {
    Axios.post("https://backendtrader.digitalfirst.space/verif_create_acces", {
      id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
    }).then((ret) => {
      if (ret.data === "acces principal creer pour ce compte") {
        // setverifacces(1);
        // console.log("acces principal creer pour ce compte");
        // console.log(JSON.parse(localStorage.getItem("user") + "").userId);
        presentAlert({
          header: "Création d'un code pin d'accès secondaire",
          buttons: [
            {
              text: "Ok",
              cssClass: "secondary",
              handler: (alertData) => {
                //takes the data store_name  boutiqueName
                //   regg(bat.id, alertData.name1, bat.store_name ==="" ? bat.boutiqueName : bat.store_name );
                sendadddata(alertData.name1);
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
      } else if (ret.data === "aucun acces creer pour ce compte") {
        // console.log("aucun acces creer pour ce compte");
        // console.log(JSON.parse(localStorage.getItem("user") + "").userId);
        presentAlert({
          header: "Création d'un d'un code pin d'accès principal",
          buttons: [
            {
              text: "Ok",
              cssClass: "secondary",
              handler: (alertData) => {
                //takes the data store_name  boutiqueName
                senddata1(alertData.name1, 0);
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
    });
  };

  const regg = () => {
    if (pass_daccess === pass_acces[0].pass_acces) {
      setIfpass_daccess(true);
      setprogress1(false);
      setpass_daccess("");
    } else {
      setIfpass_daccess(false);
      setpass_daccess("");
      setprogress1(false);
      setShowToast4(true);
    }
  };

  const modifaccesprincipal = () => {
    presentAlert({
      header: "Modification du code pin d'accès principal",
      buttons: [
        {
          text: "Ok",
          cssClass: "secondary",
          handler: (alertData) => {
            //takes the data store_name  boutiqueName
            senddata1(alertData.name1, 1);
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
  };

  const modifaccessecondaire = (id_acces_secondaire) => {
    presentAlert({
      header: "Modification du code pin d'accès secondaire",
      buttons: [
        {
          text: "Ok",
          cssClass: "secondary",
          handler: (alertData) => {
            //takes the data store_name  boutiqueName
            sendupdatedata(alertData.name1, id_acces_secondaire);
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
  };

  const senddata1 = (data, uporadd) => {
    setprogress2(true);
    Axios.post("https://backendtrader.digitalfirst.space/update_acces_principal", {
      id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      acces_principal: "ACTIF",
      code_acces_principal: data,
    }).then((ret) => {
      console.log(ret.data);
      Axios.post(
        "https://backendtrader.digitalfirst.space/getaccescompteprincipal",
        {
          id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setaccescompteprincipal(ret.data));
        setprogress2(false);
        if (uporadd === 0) {
          setShowToast3(true);
        } else if (uporadd === 1) {
          setShowToast6(true);
        }
      });
    });
  };
  const sendadddata = (data) => {
    setprogress2(true);
    Axios.post("https://backendtrader.digitalfirst.space/add_acces_secondaire", {
      id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      acces_secondaire: "ACTIF",
      code_acces_secondaire: data,
    }).then((ret) => {
      console.log(ret.data);
      Axios.post(
        "https://backendtrader.digitalfirst.space/getaccescomptesecondaire",
        {
          id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setaccescomptesecondaire(ret.data));
        setprogress2(false);
        setShowToast5(true);
      });
    });
  };
  const sendupdatedata = (data, id_acces_secondaire) => {
    setprogress2(true);
    Axios.post(
      "https://backendtrader.digitalfirst.space/update_acces_secondaire",
      {
        id_acces_secondaire: id_acces_secondaire,
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
        acces_secondaire: "ACTIF",
        code_acces_secondaire: data,
      }
    ).then((ret) => {
      console.log(ret.data);
      setmessagetoast("Code pin d'accès secondaire modifier avec succès");
      Axios.post(
        "https://backendtrader.digitalfirst.space/getaccescomptesecondaire",
        {
          id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setaccescomptesecondaire(ret.data));
        setprogress2(false);
        setShowToast7(true);
      });
    });
  };
  const senddeletedata = (id_acces_secondaire) => {
    Axios.post(
      "https://backendtrader.digitalfirst.space/delete_acces_secondaire",
      {
        id_acces_secondaire: id_acces_secondaire,
      }
    ).then((ret) => {
      console.log(ret.data);
      setmessagetoast("Code pin d'accès secondaire supprimer avec succès");
      Axios.post(
        "https://backendtrader.digitalfirst.space/getaccescomptesecondaire",
        {
          id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setaccescomptesecondaire(ret.data));
        setShowToast7(true);
      });
    });
  };

  const getaccescompteprincipal = () => {
    Axios.post(
      "https://backendtrader.digitalfirst.space/getaccescompteprincipal",
      {
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      }
    ).then((ret) => {
      dispatch(setaccescompteprincipal(ret.data));
    });
  };
  const getaccescomptesecondaire = () => {
    Axios.post(
      "https://backendtrader.digitalfirst.space/getaccescomptesecondaire",
      {
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      }
    ).then((ret) => {
      dispatch(setaccescomptesecondaire(ret.data));
    });
  };

  useEffect(() => {
    console.log(pass_acces[0]);
  }, [pass_acces, accescompteprincipal, accescomptesecondaire]);

  // useEffect(() => {
  //   getaccescompteprincipal();
  //   getaccescomptesecondaire();
  // }, []);

  const detecttap = (e) => {
    console.log("cliked key : ", e.key);
    if (e.key === "Enter") {
      regg();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", detecttap, true);
  }, []);

  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
      <>
        {pass_acces[0] && pass_acces[0].pass_acces === "" ? (
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
              message="Code pin ajouter avec succès"
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
              message="Code pin d'accès incorrect "
              duration={5000}
              position="top"
            />
            <IonContent>
              <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                  <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                      <div className="w-full flex flex-col">
                        <div className="w-full items-center justify-center text-center">
                          <h1 className="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                            Ajouter un code pin d'accès pour la modification des
                            droits d'accès
                          </h1>
                        </div>

                        <label className=" text-sm">
                          {/* <span className="text-gray-700 dark:text-gray-400">
                        Username
                      </span> */}
                          <IonInput
                            className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Choisissez le code pin d'accès"
                            value={pass_dacces}
                            onIonChange={(e) => setpass_dacces(e.detail.value)}
                          />
                        </label>
                        {ifpass_dacces && (
                          <div className="empty_full mt-3">
                            Veuillez entrez un code pin
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
          </IonPage>
        ) : (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonRouterLink
                    routerLink={`/home`}
                    color="dark"
                    onClick={() => {
                      setIfpass_daccess(false);
                    }}
                  >
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
              message="Code pin ajouter avec succès"
              duration={5000}
              position="top"
            />
            <IonToast
              isOpen={showToast3}
              onDidDismiss={() => setShowToast3(false)}
              message="Accès principal créer avec succès"
              duration={5000}
              position="top"
            />
            <IonToast
              isOpen={showToast5}
              onDidDismiss={() => setShowToast5(false)}
              message="Accès secondaire créer avec succès "
              duration={5000}
              position="top"
            />
            <IonToast
              isOpen={showToast6}
              onDidDismiss={() => setShowToast6(false)}
              message="Code pin d'accès principal modifier avec succès"
              duration={5000}
              position="top"
            />
            <IonToast
              isOpen={showToast7}
              onDidDismiss={() => setShowToast7(false)}
              message={messagetoast}
              // message=
              duration={5000}
              position="top"
            />
            <IonToast
              isOpen={showToast4}
              onDidDismiss={() => setShowToast4(false)}
              message="Code pin incorrect "
              duration={5000}
              position="top"
            />

            {ifpass_daccess ? (
              <>
                <IonContent>
                  <div className="homes">
                    {accescompteprincipal[0] &&
                    accescompteprincipal[0].acces_principal === "ACTIF" ? (
                      <>
                        {" "}
                        <div className="w-full flex bg-white px-3 py-3 my-3 rounded-1xl justify-between">
                          Acces principal
                          <div className="flex gap-10">
                            <div
                              className="justify-start items-center flex cursor-pointer"
                              onClick={() => {
                                modifaccesprincipal();
                              }}
                            >
                              <img
                                src="edit.png"
                                alt=""
                                className="w-7 h-7 object-cover"
                              />
                            </div>
                            <div
                              className="justify-start items-center flex cursor-pointer"
                              onClick={() => {
                                setShowmodal(true);
                              }}
                            >
                              <img
                                src="search.png"
                                alt=""
                                className="w-7 h-7 object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {accescomptesecondaire.map((bat, index) => {
                      return (
                        <>
                          {" "}
                          <div className="w-full flex bg-white px-3 py-3 my-3 rounded-1xl justify-between">
                            Acces secondaire {index + 1}
                            <div className="flex gap-10">
                              <div
                                className="justify-start items-center flex cursor-pointer"
                                onClick={() => {
                                  modifaccessecondaire(bat.id);
                                }}
                              >
                                <img
                                  src="edit.png"
                                  alt=""
                                  className="w-7 h-7 object-cover"
                                />
                              </div>
                              <div
                                className="justify-start items-center flex cursor-pointer"
                                onClick={() => {
                                  setShowmodal1(true);
                                  setvaleur(bat.code_acces_secondaire);
                                  // console.log(bat.code_acces_secondaire,"index");
                                }}
                              >
                                <img
                                  src="search.png"
                                  alt=""
                                  className="w-7 h-7 object-cover"
                                />
                              </div>
                              <div
                                className="justify-start items-center flex cursor-pointer"
                                onClick={() => {
                                  senddeletedata(bat.id);
                                }}
                              >
                                <img
                                  src="trash.png"
                                  alt=""
                                  className="w-7 h-7 object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}

                    {progress2 ? (
                      <>
                        <IonProgressBar
                          type="indeterminate"
                          className="absolute bottom-2"
                        ></IonProgressBar>
                      </>
                    ) : (
                      <>
                        <a
                          className="block w-full absolute bottom-2 left-0 no-underline px-4 py-2 cursor-pointer text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                          // onClick={() => {
                          //   regg(bat.id);
                          // }}
                          onClick={() => {
                            rege();
                          }}
                        >
                          Crée un accès
                        </a>
                      </>
                    )}
                    <IonModal
                      isOpen={showmodal}
                      onDidDismiss={() => {
                        setShowmodal(false);
                      }}
                      id="example-modal"
                    >
                      <div className="flex items-center justify-center flex-col mt-20">
                        <h3>Code d'accès :</h3>{" "}
                        <p className="font-bold text-2xl">
                          {accescompteprincipal[0] &&
                            accescompteprincipal[0].code_acces_principal}
                        </p>
                      </div>
                    </IonModal>
                    <IonModal
                      isOpen={showmodal1}
                      onDidDismiss={() => {
                        setShowmodal1(false);
                      }}
                      id="example-modal"
                    >
                      <div className="flex items-center justify-center flex-col mt-20">
                        <h3>Code d'accès :</h3>{" "}
                        <p className="font-bold text-2xl">{valeur}</p>
                      </div>
                    </IonModal>
                  </div>
                </IonContent>
              </>
            ) : (
              <>
                <IonContent>
                  <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                      <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                          <div className="w-full flex flex-col">
                            <div className="w-full items-center justify-center text-center">
                              <h1 className="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                                Entrez le code pin pour accéder à la page
                                des modifications des accès
                              </h1>
                            </div>

                            <label className=" text-sm">
                              {/* <span className="text-gray-700 dark:text-gray-400">
                        Username
                      </span> */}
                              <IonInput
                                className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="Entrez le code pin d'accès"
                                value={pass_daccess}
                                onIonChange={(e) =>
                                  setpass_daccess(e.detail.value)
                                }
                              />
                            </label>
                            {ifpass_dacces && (
                              <div className="empty_full mt-3">
                                Veuillez entrez le code pin
                              </div>
                            )}
                            {progress1 ? (
                              <>
                                <IonProgressBar
                                  type="indeterminate"
                                  className="absolute bottom-2"
                                ></IonProgressBar>
                              </>
                            ) : (
                              <>
                                <a
                                  className="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                  onClick={() => {
                                    regg();
                                  }}
                                >
                                  valider
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
              </>
            )}
          </IonPage>
        )}
      </>
    );
  } else {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {pass_acces[0] && pass_acces[0].pass_acces === "" ? (
                <>
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
                    message="Code pin ajouter avec succès"
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
                    message="Code pin incorrect "
                    duration={5000}
                    position="top"
                  />
                  <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                      <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div class="h-32 md:h-auto md:w-1/2">
                          <img
                            aria-hidden="true"
                            class="object-cover w-full h-full dark:hidden"
                            src="login-office.jpeg"
                            alt="Office"
                          />
                          <img
                            aria-hidden="true"
                            class="hidden object-cover w-full h-full dark:block"
                            src="create-account-office-dark.jpeg"
                            alt="Office"
                          />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                          <div className="w-full flex flex-col">
                            <div className="w-full items-center justify-center text-center">
                              <h1 className="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                                Ajouter un code pin pour la modification des
                                droits d'accès
                              </h1>
                            </div>

                            <label className=" text-sm">
                              {/* <span className="text-gray-700 dark:text-gray-400">
                        Username
                      </span> */}
                              <IonInput
                                className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="Choisissez le code pin"
                                value={pass_dacces}
                                onIonChange={(e) =>
                                  setpass_dacces(e.detail.value)
                                }
                              />
                            </label>
                            {ifpass_dacces && (
                              <div className="empty_full mt-3">
                                Veuillez entrez un code pin
                                {/* Veuillez entrez le nom de la Boutique */}
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
                </>
              ) : (
                <>
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
                    message="Code pin ajouter avec succès"
                    duration={5000}
                    position="top"
                  />
                  <IonToast
                    isOpen={showToast3}
                    onDidDismiss={() => setShowToast3(false)}
                    message="Accès principal créer avec succès"
                    duration={5000}
                    position="top"
                  />
                  <IonToast
                    isOpen={showToast5}
                    onDidDismiss={() => setShowToast5(false)}
                    message="Accès secondaire créer avec succès "
                    duration={5000}
                    position="top"
                  />
                  <IonToast
                    isOpen={showToast6}
                    onDidDismiss={() => setShowToast6(false)}
                    message="Code pin d'accès principal modifier avec succès"
                    duration={5000}
                    position="top"
                  />
                  <IonToast
                    isOpen={showToast7}
                    onDidDismiss={() => setShowToast7(false)}
                    message={messagetoast}
                    // message=
                    duration={5000}
                    position="top"
                  />
                  <IonToast
                    isOpen={showToast4}
                    onDidDismiss={() => setShowToast4(false)}
                    message="Code pin incorrect "
                    duration={5000}
                    position="top"
                  />

                  {ifpass_daccess ? (
                    <>
                      <div className="homes">
                        {accescompteprincipal[0] &&
                        accescompteprincipal[0].acces_principal === "ACTIF" ? (
                          <>
                            {" "}
                            <div className="w-full flex bg-white px-3 py-3 my-3 rounded-1xl justify-between">
                              Acces principal
                              <div className="flex gap-10">
                                <div
                                  className="justify-start items-center flex cursor-pointer"
                                  onClick={() => {
                                    modifaccesprincipal();
                                  }}
                                >
                                  <img
                                    src="edit.png"
                                    alt=""
                                    className="w-7 h-7 object-cover"
                                  />
                                </div>
                                <div
                                  className="justify-start items-center flex cursor-pointer"
                                  onClick={() => {
                                    setShowmodal(true);
                                  }}
                                >
                                  <img
                                    src="search.png"
                                    alt=""
                                    className="w-7 h-7 object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}

                        {accescomptesecondaire.map((bat, index) => {
                          return (
                            <>
                              {" "}
                              <div className="w-full flex bg-white px-3 py-3 my-3 rounded-1xl justify-between">
                                Acces secondaire {index + 1}
                                <div className="flex gap-10">
                                  <div
                                    className="justify-start items-center flex cursor-pointer"
                                    onClick={() => {
                                      modifaccessecondaire(bat.id);
                                    }}
                                  >
                                    <img
                                      src="edit.png"
                                      alt=""
                                      className="w-7 h-7 object-cover"
                                    />
                                  </div>
                                  <div
                                    className="justify-start items-center flex cursor-pointer"
                                    onClick={() => {
                                      setShowmodal1(true);
                                      setvaleur(bat.code_acces_secondaire);
                                      // console.log(bat.code_acces_secondaire,"index");
                                    }}
                                  >
                                    <img
                                      src="search.png"
                                      alt=""
                                      className="w-7 h-7 object-cover"
                                    />
                                  </div>
                                  <div
                                    className="justify-start items-center flex cursor-pointer"
                                    onClick={() => {
                                      senddeletedata(bat.id);
                                    }}
                                  >
                                    <img
                                      src="trash.png"
                                      alt=""
                                      className="w-7 h-7 object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}

                        {progress2 ? (
                          <>
                            <IonProgressBar
                              type="indeterminate"
                              className="absolute bottom-2"
                            ></IonProgressBar>
                          </>
                        ) : (
                          <>
                            <a
                              className="block w-48 absolute bottom-2 left-1/2 -translate-x-1/2 no-underline px-4 py-2 cursor-pointer text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                              // onClick={() => {
                              //   regg(bat.id);
                              // }}
                              onClick={() => {
                                rege();
                              }}
                            >
                              Crée un accès
                            </a>
                          </>
                        )}
                        <IonModal
                          isOpen={showmodal}
                          onDidDismiss={() => {
                            setShowmodal(false);
                          }}
                          id="example-modal"
                        >
                          <div className="flex items-center justify-center flex-col mt-20">
                            <h3>Code d'accès :</h3>{" "}
                            <p className="font-bold text-2xl">
                              {accescompteprincipal[0] &&
                                accescompteprincipal[0].code_acces_principal}
                            </p>
                          </div>
                        </IonModal>
                        <IonModal
                          isOpen={showmodal1}
                          onDidDismiss={() => {
                            setShowmodal1(false);
                          }}
                          id="example-modal"
                        >
                          <div className="flex items-center justify-center flex-col mt-20">
                            <h3>Code d'accès :</h3>{" "}
                            <p className="font-bold text-2xl">{valeur}</p>
                          </div>
                        </IonModal>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center min-h-screen p-6 bg-white dark:bg-gray-900">
                        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                          <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div class="h-32 md:h-auto md:w-1/2">
                              <img
                                aria-hidden="true"
                                class="object-cover w-full h-full dark:hidden"
                                src="login-office.jpeg"
                                alt="Office"
                              />
                              <img
                                aria-hidden="true"
                                class="hidden object-cover w-full h-full dark:block"
                                src="create-account-office-dark.jpeg"
                                alt="Office"
                              />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                              <div className="w-full flex flex-col">
                                <div className="w-full items-center justify-center text-center">
                                  <h1 className="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                                    Entrez le code pin pour accéder à la
                                    page des modifications des accès
                                  </h1>
                                </div>

                                <label className=" text-sm">
                                  {/* <span className="text-gray-700 dark:text-gray-400">
                        Username
                      </span> */}
                                  <IonInput
                                    className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    placeholder="Entrez le code pin"
                                    value={pass_daccess}
                                    onIonChange={(e) =>
                                      setpass_daccess(e.detail.value)
                                    }
                                  />
                                </label>
                                {ifpass_dacces && (
                                  <div className="empty_full mt-3">
                                    Veuillez entrez le code pin
                                  </div>
                                )}
                                {progress1 ? (
                                  <>
                                    <IonProgressBar
                                      type="indeterminate"
                                      className="absolute bottom-2"
                                    ></IonProgressBar>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      className="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                      onClick={() => {
                                        regg();
                                      }}
                                    >
                                      valider
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
                    </>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default Acces;
