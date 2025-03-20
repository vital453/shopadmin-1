/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setCredentials } from "../../Feature/auth/AuthSlice";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import toast, { Toaster } from "react-hot-toast";
import { FiRefreshCw } from "react-icons/fi";
import { setdate, setHash_code } from "../../Feature/HashSlice";
import { chevronBack } from "ionicons/icons";
import { setcaisse } from "../../Feature/CaisseSlice";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Caisse = () => {
  const caisse_value = useSelector((state) => state.Caisse.caisse);
  const [caisse, setcaissee] = useState("");
  const [ifcaisse, setifcaisse] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showLoading2, setShowLoading2] = useState(false);
  const [showtoast, setShowtoast] = useState(false);
  const [show, setShow] = useState(false);
  const userid = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [montant, setmontant] = useState("");
  const [ifmontant, setIfmontant] = useState(false);
  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);
  const boutiqueid = useSelector((state) => state.auth.user);
  const accesparcompte = useSelector((state) => state.Hash.accesparcompte);

  const choiceacces = useSelector((state) => state.Hash.choiceacces);
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  const initcaisse = () => {
    if (!caisse) {
      setifcaisse(true);
      setTimeout(() => {
        setifcaisse(false);
      }, [4000]);
    } else {
      setifcaisse(false);
    }

    if (caisse && ifcaisse == false) {
      setShowLoading(true);
      Axios.post("https://backendtrader.digitalfirst.space/update_caisse", {
        id_boutique: userid.BoutiqueId,
        caisse: caisse,
      }).then((res) => {
        getCaisse();
        setShowLoading(false);
        setcaissee(" ");
        console.log(res.data);
      });
    }
  };

  const dep = () => {
    if (!montant) {
      setIfmontant(true);
      setTimeout(() => {
        setIfmontant(false);
      }, [4000]);
    } else {
      setIfmontant(false);
      setprogress(true);
      setprogress1(true);
      setprogress1(true);
      toast.loading(
        "Opération en cours de traitement....\n\nVeuillez patienter.",
        {
          duration: 6000,
        }
      );
      Axios.post("https://backendtrader.digitalfirst.space/update_caisse", {
        id_boutique: userid.BoutiqueId,
        caisse: parseInt(caisse_value[0].caisse) + parseInt(montant),
      }).then((res) => {
        getCaisse();
        setmontant(" ");
        console.log(res.data);
        setprogress(false);
        setprogress1(false);
        setShow(false);
        setShowLoading2(true);
      });
    }
  };

  const getCaisse = () => {
    Axios.post("https://backendtrader.digitalfirst.space/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      // console.log(ret.data);
      dispatch(setcaisse(ret.data));
    });
  };

  function handleRefresh(event) {
    setTimeout(() => {
      getCaisse();
      event.detail.complete();
    }, 2000);
  }
  useEffect(() => {
    getCaisse();
    if (caisse_value[0]) {
      console.log(caisse_value[0].caisse);
      getCaisse();
    }
    // console.log(userid.userId);
  }, []);

  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div className="flex justify-between items-center">
              <IonButtons slot="start">
                <IonButton routerLink="/home">
                  <IonIcon color="medium" icon={chevronBack} />
                </IonButton>
              </IonButtons>
              <IonTitle className="nereide">Digital trader</IonTitle>

              <IonButtons
                slot="end"
                className="mr-5 text-xl cursor-pointer"
                onClick={() => {
                  window.location.href = "/caisse";
                }}
              >
                <FiRefreshCw />
              </IonButtons>
            </div>
            {/* <IonButtons slot="start">
              <IonButton routerLink="/home">
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Patienter s'il vous plait..."}
          duration={5000}
        />
        <IonToast
          isOpen={showLoading2}
          onDidDismiss={() => setShowLoading2(false)}
          message="La valeur de la caisse à été ajouté avec succèss"
          duration={3000}
          position="top"
        />
        <IonToast
          isOpen={showtoast}
          onDidDismiss={() => setShowtoast(false)}
          message="Vueillez configurer le numeros whatapps avant tout autres configurations"
          duration={4000}
          position="top"
        />
        {progress1 && (
          <div>
            <Toaster />
          </div>
        )}
        <IonContent className="">
          <>
            <IonRefresher
              slot="fixed"
              onIonRefresh={handleRefresh}
              pull-factor="0.5"
              pull-min="100"
              pull-max="200"
            >
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <div className="">
              <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                  <div class="flex flex-col overflow-y-auto md:flex-row">
                    {/* <div class="h-32 md:h-auto md:w-1/2">
                    <img
                      aria-hidden="true"
                      class="object-cover w-full h-full dark:hidden"
                      src="login-office.jpeg"
                      alt="Office"
                    />
                    <img
                      aria-hidden="true"
                      class="hidden object-cover w-full h-full dark:block"
                      src="login-office-dark.jpeg"
                      alt="Office"
                    />
                  </div> */}
                    {caisse_value[0] &&
                      parseInt(caisse_value[0].caisse) === parseInt(0) && (
                        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                          <div class="w-full flex flex-col">
                            <div className="w-full items-center justify-center text-center">
                              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Caisse
                              </h1>
                            </div>
                            <div className="w-full mt-2">
                              <label class="w-full text-sm">
                                <span class="text-gray-700 dark:text-gray-400">
                                  Initialiser la Caisse{" "}
                                  <span class="text-red-700 mb-2 dark:text-gray-400">
                                    {" "}
                                    *{" "}
                                  </span>
                                </span>
                                <IonInput
                                  className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                  placeholder="Entrer un montant"
                                  value={caisse}
                                  onIonChange={(e) =>
                                    setcaissee(e.target.value)
                                  }
                                />
                              </label>

                              {ifcaisse === true ? (
                                <div className="empty_full">
                                  Veuillez initialiser la caisse
                                </div>
                              ) : null}
                            </div>
                            <hr class="my-3" />
                            {/* {choiceacces === "aucun" ||
                            choiceacces === "principal" ? ( */}
                            {JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                              <a
                                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={() => {
                                  setShowtoast(true);
                                }}
                              >
                                Initialiser
                              </a>
                            ) : (
                              <a
                                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={() => {
                                  initcaisse();
                                }}
                              >
                                Initialiser
                              </a>
                            )}

                            {/* ) : (
                              <a class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Initialiser
                              </a>
                            )} */}
                          </div>
                        </div>
                      )}
                    {caisse_value[0] &&
                      parseInt(caisse_value[0].caisse) !== parseInt(0) && (
                        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                          <div class="w-full flex flex-col">
                            <div className="w-full items-center justify-center text-center">
                              <h1 class="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                                Le solde de votre caisse est de :{" "}
                                {new Intl.NumberFormat("de-DE", {
                                  style: "currency",
                                  currency: "XOF",
                                }).format(caisse_value[0].caisse)}
                              </h1>
                            </div>
                            <hr class="mt-1" />
                            {/* {choiceacces === "aucun" ||
                            choiceacces === "principal" ? ( */}
                            <Link
                              to="/decaissement"
                              class="flex items-center mb-3 no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                            >
                              &nbsp; &nbsp; Effectuer un décaissement
                            </Link>
                            {/* ) : (
                              <Link class="flex items-center mb-3 no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                                &nbsp; &nbsp; Effectuer un décaissement
                              </Link>
                            )} */}
                            {show ? (
                              <>
                                <div className="w-full flex flex-col items-center justify-center">
                                  <label class="w-full text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">
                                      Montant
                                    </span>
                                    <IonInput
                                      className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                      placeholder="Entrez un montant"
                                      type="number"
                                      value={montant}
                                      onIonChange={(e) =>
                                        setmontant(e.target.value)
                                      }
                                    />
                                  </label>
                                  {ifmontant && (
                                    <div className="empty_full">
                                      Veuillez entrez un montant!
                                    </div>
                                  )}
                                  {
                                    progress ? (
                                      <>
                                        <div className="mb-3"></div>
                                        <IonProgressBar type="indeterminate"></IonProgressBar>
                                      </>
                                    ) : (
                                      // choiceacces === "aucun" ||
                                      //   choiceacces === "principal" ? (
                                      <span
                                        class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                        onClick={() => dep()}
                                      >
                                        Valider
                                      </span>
                                    )
                                    // ) : (
                                    //   <span class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    //     Valider
                                    //   </span>
                                    // )
                                  }
                                </div>
                              </>
                            ) : (
                              <>
                                {/* {choiceacces === "aucun" ||
                                choiceacces === "principal" ? ( */}
                                <span
                                  onClick={() => {
                                    setShow(true);
                                  }}
                                  class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                                >
                                  &nbsp; &nbsp; Ajouter a la caisse
                                </span>
                                {/* ) : (
                                  <span class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                                    &nbsp; &nbsp; Ajouter a la caisse
                                  </span>
                                )} */}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </IonContent>
      </IonPage>
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
            <IonToast
              isOpen={showtoast}
              onDidDismiss={() => setShowtoast(false)}
              message="Vueillez configurer le numeros whatapps avant tout autres configurations"
              duration={4000}
              position="top"
            />
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div>
                <IonLoading
                  cssClass="my-custom-class"
                  isOpen={showLoading}
                  onDidDismiss={() => setShowLoading(false)}
                  message={"Patienter s'il vous plait..."}
                  duration={5000}
                />
                <IonToast
                  isOpen={showLoading2}
                  onDidDismiss={() => setShowLoading2(false)}
                  message="La valeur de la caisse à été ajouté avec succèss"
                  duration={3000}
                  position="top"
                />
                {progress1 && (
                  <div>
                    <Toaster />
                  </div>
                )}
                <div className="">
                  <div class="flex items-center min-h-screen p-6 bg-white dark:bg-gray-900">
                    <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                      <div class="flex flex-col overflow-y-auto md:flex-row">
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
                            src="login-office-dark.jpeg"
                            alt="Office"
                          />
                        </div>

                        {caisse_value[0] &&
                          parseInt(caisse_value[0].caisse) === parseInt(0) && (
                            <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                              <div class="w-full flex flex-col">
                                <div className="w-full items-center justify-center text-center">
                                  <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Caisse
                                  </h1>
                                </div>
                                <div className="w-full mt-2">
                                  <label class="w-full text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">
                                      Initialiser la Caisse{" "}
                                      <span class="text-red-700 mb-2 dark:text-gray-400">
                                        {" "}
                                        *{" "}
                                      </span>
                                    </span>
                                    <IonInput
                                      className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                      placeholder="Entrer un montant"
                                      value={caisse}
                                      onIonChange={(e) =>
                                        setcaissee(e.target.value)
                                      }
                                    />
                                  </label>

                                  {ifcaisse === true ? (
                                    <div className="empty_full">
                                      Veuillez initialiser la caisse
                                    </div>
                                  ) : null}
                                </div>
                                <hr class="my-3" />
                                {/* {choiceacces === "aucun" ||
                                choiceacces === "principal" ? ( */}
                                {JSON.parse(
                                  localStorage.getItem("whatsapp")
                                ) === "" ? (
                                  <a
                                    class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    onClick={() => {
                                      setShowtoast(true);
                                    }}
                                  >
                                    Initialiser
                                  </a>
                                ) : (
                                  <a
                                    class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    onClick={() => {
                                      initcaisse();
                                    }}
                                  >
                                    Initialiser
                                  </a>
                                )}

                                {/* ) : (
                                  <a class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    Initialiser
                                  </a>
                                )} */}
                              </div>
                            </div>
                          )}
                        {caisse_value[0] &&
                          parseInt(caisse_value[0].caisse) !== parseInt(0) && (
                            <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                              <div class="w-full flex flex-col">
                                <div className="w-full items-center justify-center text-center">
                                  <h1 class="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                                    Le solde de votre caisse est de :{" "}
                                    {new Intl.NumberFormat("de-DE", {
                                      style: "currency",
                                      currency: "XOF",
                                    }).format(caisse_value[0].caisse)}
                                  </h1>
                                </div>
                                <hr class="mt-1" />
                                {/* {choiceacces === "aucun" ||
                                choiceacces === "principal" ? ( */}
                                <Link
                                  to="/decaissement"
                                  class="flex items-center mb-3 no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                                >
                                  &nbsp; &nbsp; Effectuer un décaissement
                                </Link>
                                {/* ) : (
                                  <Link class="flex items-center mb-3 no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                                    &nbsp; &nbsp; Effectuer un décaissement
                                  </Link>
                                )} */}
                                {show ? (
                                  <>
                                    <div className="w-full flex flex-col items-center justify-center">
                                      <label class="w-full text-sm">
                                        <span class="text-gray-700 dark:text-gray-400">
                                          Montant
                                        </span>
                                        <IonInput
                                          className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                          placeholder="Entrez un montant"
                                          type="number"
                                          value={montant}
                                          onIonChange={(e) =>
                                            setmontant(e.target.value)
                                          }
                                        />
                                      </label>
                                      {ifmontant && (
                                        <div className="empty_full">
                                          Veuillez entrez un montant!
                                        </div>
                                      )}
                                      {
                                        progress ? (
                                          <>
                                            <div className="mb-3"></div>
                                            <IonProgressBar type="indeterminate"></IonProgressBar>
                                          </>
                                        ) : (
                                          // choiceacces === "aucun" ||
                                          //   choiceacces === "principal" ? (
                                          <span
                                            class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                            onClick={() => dep()}
                                          >
                                            Valider
                                          </span>
                                        )
                                        // ) : (
                                        //   <span class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                        //     Valider
                                        //   </span>
                                        // )
                                      }
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {/* {choiceacces === "aucun" ||
                                    choiceacces === "principal" ? ( */}
                                    <span
                                      onClick={() => {
                                        setShow(true);
                                      }}
                                      class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                                    >
                                      &nbsp; &nbsp; Ajouter a la caisse
                                    </span>
                                    {/* ) : (
                                      <span class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                                        &nbsp; &nbsp; Ajouter a la caisse
                                      </span>
                                    )} */}
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default Caisse;
