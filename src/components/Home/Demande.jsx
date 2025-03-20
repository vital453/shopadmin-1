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
  IonTextarea,
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
import { setdate, setHash_code } from "../../Feature/HashSlice";
import { chevronBack } from "ionicons/icons";
import { setcaisse } from "../../Feature/CaisseSlice";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { FiRefreshCw } from "react-icons/fi";


const Demande = () => {
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
  const boutiquecompte = useSelector((state) => state.Hash.boutiquecompte);
  const badge = useSelector((state) => state.Hash.badge);
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  const dep = (id_boutique, nom_boutique, whatsapp_boutique) => {
    if (!observation) {
      setIfobservation(true);
      setTimeout(() => {
        setIfobservation(false);
      }, [4000]);
    } else {
      setIfobservation(false);
      // setShowLoading(true);
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
        "https://backendtrader.digitalfirst.space/demande_fonctionnalite",
        {
          id_boutique: id_boutique,
          store_name: nom_boutique,
          whatsapp: whatsapp_boutique,
          demande: observation,
        }
      ).then((res) => {
        // setShowLoading(false);
        setShowToast(true);
        setobservation("");
        setprogress(false);
        setprogress1(false);
        console.log(res.data);
      });
    }
  };

  // useEffect(() => {
  //   // if(userid[0]){
  //   //   console.log(userid.userId);
  //   // }
  // }, [userid]);

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
                  window.location.href = "/demande_fonctionnalite";
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
        {/* <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Patienter s'il vous plait..."}
          duration={5000}
        /> */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Demande éffectué avec succèss"
          duration={5000}
          position="top"
        />
        {progress1 && (
          <div>
            <Toaster />
          </div>
        )}
        <IonContent className="">
          {boutiquecompte[0] && badge ? (
            <>
              {boutiquecompte
                .filter((t) => t.id === badge)
                .map((bout, index) => {
                  return (
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
                                  <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Demande de Fonctionnalité
                                  </h1>
                                </div>
                                <label class=" mt-4 text-sm">
                                  {/* <span class="text-gray-700 dark:text-gray-400">
                        Observation
                      </span> */}
                                  <IonTextarea
                                    className="w-full mt-1 h-50 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    placeholder="Décrivez-nous ce que vous voulez"
                                    // type="password"
                                    value={observation}
                                    onIonChange={(e) =>
                                      setobservation(e.target.value)
                                    }
                                  />
                                </label>
                                {ifobservation && (
                                  <div className="empty_full mt-2">
                                    Veuillez remplir le champs!
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
                                    <a
                                      class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                      onClick={() => {
                                        dep(
                                          bout.id,
                                          bout.store_name,
                                          bout.whatsapp
                                        );
                                      }}
                                    >
                                      Envoyer
                                    </a>
                                  </>
                                )}
                                <hr class="my-8" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          ) : (
            <>
              <div className="items-center justify-center text-center mb-3">
                <img className="" src="delai-de-traitement.png" alt="d" />
                <h2 className="items-center justify-center text-center ">
                  Chargement des données
                </h2>
              </div>
            </>
          )}
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
              {/* <IonLoading
                cssClass="my-custom-class"
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={"Patienter s'il vous plait..."}
                duration={5000}
              /> */}
              <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Demande éffectué avec succèss"
                duration={5000}
                position="top"
              />
              {progress1 && (
                <div>
                  <Toaster />
                </div>
              )}
              {boutiquecompte[0] && badge ? (
                <>
                  {boutiquecompte
                    .filter((t) => t.id === badge)
                    .map((bout, index) => {
                      return (
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
                                      <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                        Demande de Fonctionnalité
                                      </h1>
                                    </div>
                                    <label class=" mt-4 text-sm">
                                      {/* <span class="text-gray-700 dark:text-gray-400">
                          Observation
                        </span> */}
                                      <IonTextarea
                                        className="w-full mt-1 h-50 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Décrivez-nous ce que vous voulez"
                                        // type="password"
                                        value={observation}
                                        onIonChange={(e) =>
                                          setobservation(e.target.value)
                                        }
                                      />
                                    </label>
                                    {ifobservation && (
                                      <div className="empty_full mt-2">
                                        Veuillez remplir le champs!
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
                                        <a
                                          class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                          onClick={() => {
                                            dep(
                                              bout.id,
                                              bout.store_name,
                                              bout.whatsapp
                                            );
                                          }}
                                        >
                                          Envoyer
                                        </a>
                                      </>
                                    )}
                                    <hr class="my-8" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </>
              ) : (
                <>
                  <div className="items-center justify-center text-center mb-3">
                    <img className="" src="delai-de-traitement.png" alt="d" />
                    <h2 className="items-center justify-center text-center ">
                      Chargement des données
                    </h2>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default Demande;
