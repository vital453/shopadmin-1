/* eslint-disable react-hooks/exhaustive-deps */
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
import Axios from "axios";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  setcaisse,
  sethisto_decaisse,
  sethisto_depense,
} from "../../Feature/CaisseSlice";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { FiRefreshCw } from "react-icons/fi";

const Decaissement = () => {
  const [montant, setmontant] = useState("");
  const [bankaire, setbankaire] = useState("");
  const [observation, setobservation] = useState("");
  const [ifmontant, setIfmontant] = useState(false);
  const [ifobservation, setIfobservation] = useState(false);
  const [ifbankaire, setIfbankaire] = useState(false);
  const [type, settype] = useState("sellers");
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const caisse_value = useSelector((state) => state.Caisse.caisse);
  const userid = useSelector((state) => state.auth.user);
  const [ifmontdepa, setIfmontdepa] = useState(false);
  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);
  const dispatch = useDispatch();
  const boutiqueid = useSelector((state) => state.auth.user);
  const accesparcompte = useSelector((state) => state.Hash.accesparcompte);
  const choiceacces = useSelector((state) => state.Hash.choiceacces);

  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dep = () => {
    if (!montant) {
      setIfmontant(true);
      setTimeout(() => {
        setIfmontant(false);
      }, [4000]);
    } else {
      setIfmontant(false);
    }
    if (!observation) {
      setIfobservation(true);
      setTimeout(() => {
        setIfobservation(false);
      }, [4000]);
    } else {
      setIfobservation(false);
    }
    if (!bankaire) {
      setIfbankaire(true);
      setTimeout(() => {
        setIfbankaire(false);
      }, [4000]);
    } else {
      setIfbankaire(false);
    }

    if (montant && observation && bankaire) {
      const last_caisse = caisse_value[0].caisse;
      console.log(last_caisse);
      const end_caisse = parseInt(last_caisse) - parseInt(montant);
      console.log(end_caisse);
      if (montant > parseInt(last_caisse)) {
        setIfmontdepa(true);
        setTimeout(() => {
          setIfmontdepa(false);
        }, [4000]);
      } else {
        setShowLoading(true);
        setprogress(true);
        setprogress1(true);
        setprogress1(true);
        toast.loading(
          "Opération en cours de traitement....\n\nVeuillez patienter.",
          {
            duration: 6000,
          }
        );
        Axios.post(
          "https://backendtrader.digitalfirst.space/create_decaissement",
          {
            id_boutique: userid.BoutiqueId,
            numeros_compte: bankaire,
            montant: montant,
            last_caisse: last_caisse,
            end_caisse: end_caisse,
            observation: observation,
          }
        ).then((res) => {
          getCaisse();
          gethisto_decaissement();
          gethisto_depense();
          setShowLoading(false);
          setShowToast(true);
          setbankaire("");
          setmontant("");
          setobservation("");
          setprogress(false);
          setprogress1(false);
          console.log(res.data);
        });
      }
    }
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
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  // useEffect(() => {
  //   getCaisse();
  //   if (caisse_value[0]) {
  //     getCaisse();
  //     console.log(caisse_value[0].caisse);
  //   }
  //   console.log(userid.userId);
  // }, [caisse_value]);
  window.addEventListener("resize", updateDimensions);
  if (width < 500) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div className="flex justify-between items-center">
              <IonButtons slot="start">
                <IonButton routerLink="/caisse">
                  <IonIcon color="medium" icon={chevronBack} />
                </IonButton>
              </IonButtons>
              <IonTitle className="nereide">Digital trader</IonTitle>

              <IonButtons
                slot="end"
                className="mr-5 text-xl cursor-pointer"
                onClick={() => {
                  window.location.href = "/decaissement";
                }}
              >
                <FiRefreshCw />
              </IonButtons>
            </div>
            {/* <IonButtons slot="start">
              <IonButton routerLink="/caisse">
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        {/* <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={5000}
        /> */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Décaissement éffectué avec succèss"
          duration={1500}
          position="top"
        />
        {progress1 && (
          <div>
            <Toaster />
          </div>
        )}
        <IonContent>
          <>
            <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
              <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div class="flex flex-col overflow-y-auto md:flex-row">
                  {/* <div class="h-32 md:h-auto md:w-1/2">
                  <img
                    aria-hidden="true"
                    class="object-cover w-full h-full dark:hidden"
                    src="create-account-office.jpeg"
                    alt="Office"
                  />
                  <img
                    aria-hidden="true"
                    class="hidden object-cover w-full h-full dark:block"
                    src="create-account-office-dark.jpeg"
                    alt="Office"
                  />
                </div> */}
                  <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                    <div class="w-full flex flex-col">
                      <div className="w-full items-center justify-center text-center">
                        <h1 class="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                          Le solde de votre caisse est de :{" "}
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "XOF",
                          }).format(caisse_value[0] && caisse_value[0].caisse)}
                        </h1>
                        <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                          Ajouter un décaissement
                        </h1>
                      </div>

                      <label class=" text-sm">
                        <span class="text-gray-700 dark:text-gray-400">
                          Identifiant de Compte
                        </span>
                        <IonInput
                          className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entrez un montant"
                          type="number"
                          value={bankaire}
                          onIonChange={(e) => setbankaire(e.target.value)}
                        />
                      </label>
                      {ifbankaire && (
                        <div className="empty_full">
                          Veuillez entrez un numeros de compte!
                        </div>
                      )}
                      <label class="mt-4 text-sm">
                        <span class="text-gray-700 dark:text-gray-400">
                          Montant
                        </span>
                        <IonInput
                          className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entrez un montant"
                          type="number"
                          value={montant}
                          onIonChange={(e) => setmontant(e.target.value)}
                        />
                      </label>
                      {ifmontant && (
                        <div className="empty_full">
                          Veuillez entrez un montant!
                        </div>
                      )}
                      <label class=" mt-4 text-sm">
                        <span class="text-gray-700 dark:text-gray-400">
                          Observation
                        </span>
                        <IonTextarea
                          className="w-full mt-1 h-50 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="observation"
                          // type="password"
                          value={observation}
                          onIonChange={(e) => setobservation(e.target.value)}
                        />
                      </label>
                      {ifobservation && (
                        <div className="empty_full">
                          Veuillez entrez l'observation!
                        </div>
                      )}
                      {ifmontdepa && (
                        <div className="empty_full">
                          Le montant entrez est superieur a la caisse
                        </div>
                      )}
                      {progress ? (
                        <>
                          <IonProgressBar
                            type="indeterminate"
                            className="mt-4"
                          ></IonProgressBar>
                        </>
                      ) : (
                        <>
                          {/* {choiceacces === "aucun" ||
                          choiceacces === "principal" ? ( */}
                          <a
                            class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            onClick={dep}
                          >
                            Valider le décaissement
                          </a>
                          {/* ) : (
                            <a class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                              Valider le décaissement
                            </a>
                          )} */}
                        </>
                      )}
                      <hr class="my-8" />
                    </div>
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
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div>
                {/* <IonLoading
                  cssClass="my-custom-class"
                  isOpen={showLoading}
                  onDidDismiss={() => setShowLoading(false)}
                  message={"Please wait..."}
                  duration={5000}
                /> */}
                <IonToast
                  isOpen={showToast}
                  onDidDismiss={() => setShowToast(false)}
                  message="Décaissement éffectué avec succèss"
                  duration={1500}
                  position="top"
                />
                {progress1 && (
                  <div>
                    <Toaster />
                  </div>
                )}
                <>
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
                            src="create-account-office-dark.jpeg"
                            alt="Office"
                          />
                        </div>
                        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                          <div class="w-full flex flex-col">
                            <div className="w-full items-center justify-center text-center">
                              <h1 class="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                                Le solde de votre caisse est de :{" "}
                                {new Intl.NumberFormat("de-DE", {
                                  style: "currency",
                                  currency: "XOF",
                                }).format(
                                  caisse_value[0] && caisse_value[0].caisse
                                )}
                              </h1>
                              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Ajouter un décaissement
                              </h1>
                            </div>

                            <label class=" text-sm">
                              <span class="text-gray-700 dark:text-gray-400">
                                Identifiant de Compte
                              </span>
                              <IonInput
                                className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="Entrez un montant"
                                type="number"
                                value={bankaire}
                                onIonChange={(e) => setbankaire(e.target.value)}
                              />
                            </label>
                            {ifbankaire && (
                              <div className="empty_full">
                                Veuillez entrez un numeros de compte!
                              </div>
                            )}
                            <label class="mt-4 text-sm">
                              <span class="text-gray-700 dark:text-gray-400">
                                Montant
                              </span>
                              <IonInput
                                className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="Entrez un montant"
                                type="number"
                                value={montant}
                                onIonChange={(e) => setmontant(e.target.value)}
                              />
                            </label>
                            {ifmontant && (
                              <div className="empty_full">
                                Veuillez entrez un montant!
                              </div>
                            )}
                            <label class=" mt-4 text-sm">
                              <span class="text-gray-700 dark:text-gray-400">
                                Observation
                              </span>
                              <IonTextarea
                                className="w-full mt-1 h-50 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                placeholder="observation"
                                // type="password"
                                value={observation}
                                onIonChange={(e) =>
                                  setobservation(e.target.value)
                                }
                              />
                            </label>
                            {ifobservation && (
                              <div className="empty_full">
                                Veuillez entrez l'observation!
                              </div>
                            )}
                            {ifmontdepa && (
                              <div className="empty_full">
                                Le montant entrez est superieur a la caisse
                              </div>
                            )}
                            {progress ? (
                              <>
                                <IonProgressBar
                                  type="indeterminate"
                                  className="mt-4"
                                ></IonProgressBar>
                              </>
                            ) : (
                              <>
                                {/* {choiceacces === "aucun" ||
                                choiceacces === "principal" ? ( */}
                                <a
                                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                  onClick={dep}
                                >
                                  Valider le décaissement
                                </a>
                                {/* ) : (
                                  <a class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    Valider le décaissement
                                  </a>
                                )} */}
                              </>
                            )}
                            <hr class="my-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default Decaissement;
