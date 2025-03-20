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
import Axios from "axios";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonPage,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBadge,
  setBoutiquecompte,
  setHash_code,
  settype_product,
} from "../../Feature/HashSlice";
import { chevronBack, informationCircle } from "ionicons/icons";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "./homes.css";

const Typeofproduct = () => {
  const router = useIonRouter();

  const [codeparrain, setcodeparrain] = useState("");
  const [ifcodeparrain, setIfcodeparrain] = useState(false);
  const [ifsupcode, setIfsupcode] = useState(false);
  const [username, setusername] = useState("");

  const [ifUsername, setIfUsername] = useState(false);
  const [ifUsernameExist, setIfUsernameExist] = useState(false);
  const [ifcodeExist, setIfcodeExist] = useState(false);
  const [type, settype] = useState("sellers");
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);
  // let [hash, setHash] = useState(useSelector((state) => state.Hash.hash_user));
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);
  const boutiquecompte = useSelector((state) => state.Hash.boutiquecompte);

  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [segg, setSegg] = useState("Physique");
  const [modalShow, setModalShow] = React.useState(false);

  const settypeofproductt = () => {
    setprogress(true);
    Axios.post("https://backendtrader.digitalfirst.space/update_typeof_product", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      type_product: segg,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(settype_product(segg));
      setprogress(false);
      setModalShow(false);
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    });
  };

  if (width < 500) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            {/* <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  router.goBack();
                }}
              >
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons> */}
            <IonTitle className="nereide">Digital trader</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={5000}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Boutique créé avec succès."
          duration={7000}
          position="top"
        />
        <IonToast
          isOpen={showToast2}
          onDidDismiss={() => setShowToast2(false)}
          message="Vous avez atteint la limitte de creation de nouvelle boutique"
          duration={7000}
          position="top"
        />
        {/* <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Boutique créé avec succès."
              icon={informationCircle}
              position="top"
              // buttons={[
              //   {
              //     text: "OK",
              //     // role: "cancel",
              //     handler: () => {
              //       window.location.href = "/logt";
              //     },
              //   },
              // ]}
            /> */}

        <IonModal
          isOpen={modalShow}
          onDidDismiss={() => {
            setModalShow(false);
          }}
          initialBreakpoint={0.2}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent className="ion-padding">
            <IonItem>
              <div className="flex flex-col text-xs">
                <span className="mb-2">
                  Voulez-vous réellement configurer ce type de produit pour
                  votre boutique ?
                </span>
                <span className="">Elle ne pourras plus être modifier.</span>
              </div>
            </IonItem>
            <div class="flex flex-shrink-0 flex-wrap items-center mt-3 gap-3 justify-end">
              {progress ? (
                <div class="three-body">
                  <div class="three-body__dot"></div>
                  <div class="three-body__dot"></div>
                  <div class="three-body__dot"></div>
                </div>
              ) : (
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  onClick={() => {
                    settypeofproductt();
                  }}
                >
                  Oui
                </button>
              )}

              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                id="serviceDeleteClose"
                onClick={() => {
                  // setserviceDeleteId(0);
                  setModalShow(false);
                  // setDec(!dec);
                }}
              >
                Non
              </button>
            </div>
          </IonContent>
        </IonModal>
        <IonContent>
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
                        Quel type de produit voulez-vous gerer ?
                      </h1>
                    </div>
                    <div className="mt-2">
                      <IonSegment
                        className="nereide"
                        onIonChange={(e) => {
                          setSegg(e.detail.value);
                        }}
                        value={segg}
                        scrollable={true}
                        mode="ios"
                      >
                        <IonSegmentButton value="Physique">
                          <IonLabel>Physique</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="Numerique">
                          <IonLabel>Numerique</IonLabel>
                        </IonSegmentButton>
                      </IonSegment>
                    </div>

                    <a
                      class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                      onClick={() => {
                        setModalShow(true);
                      }}
                    >
                      Continuer
                    </a>

                    <hr class="my-8" />

                    {/* <button class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                          <FaInstagram /> &nbsp; &nbsp; Instagram
                        </button>
                        <button class="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                          <FaTwitter /> &nbsp; &nbsp; Twitter
                        </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div>
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
            duration={5000}
          />
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Boutique créé avec succès."
            duration={7000}
            position="top"
          />
          <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="Vous avez atteint la limitte de creation de nouvelle boutique"
            duration={7000}
            position="top"
          />
          <IonModal
            isOpen={modalShow}
            onDidDismiss={() => {
              setModalShow(false);
            }}
            initialBreakpoint={0.2}
            breakpoints={[0, 0.25, 0.5, 0.75]}
          >
            <IonContent className="ion-padding">
              <IonItem>
                <div className="flex flex-col text-xs">
                  <span className="mb-2">
                    Voulez-vous réellement configurer ce type de produit pour
                    votre boutique ?
                  </span>
                  <span className="">Elle ne pourras plus être modifier.</span>
                </div>
              </IonItem>
              <div class="flex flex-shrink-0 flex-wrap items-center mt-3 gap-3 justify-end">
                {progress ? (
                  <div class="three-body">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    onClick={() => {
                      settypeofproductt();
                    }}
                  >
                    Oui
                  </button>
                )}
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                  id="serviceDeleteClose"
                  onClick={() => {
                    // setserviceDeleteId(0);
                    setModalShow(false);
                    // setDec(!dec);
                  }}
                >
                  Non
                </button>
              </div>
            </IonContent>
          </IonModal>
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
                          Quel type de produit voulez-vous gerer ?
                        </h1>
                      </div>
                      <div className="mt-2">
                        <IonSegment
                          className="nereide"
                          onIonChange={(e) => {
                            setSegg(e.detail.value);
                          }}
                          value={segg}
                          scrollable={true}
                          mode="ios"
                        >
                          <IonSegmentButton value="Physique">
                            <IonLabel>Physique</IonLabel>
                          </IonSegmentButton>
                          <IonSegmentButton value="Numerique">
                            <IonLabel>Numerique</IonLabel>
                          </IonSegmentButton>
                        </IonSegment>
                      </div>

                      <a
                        class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        onClick={() => {
                          setModalShow(true);
                        }}
                      >
                        Continuer
                      </a>

                      <hr class="my-8" />

                      {/* <button class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                          <FaInstagram /> &nbsp; &nbsp; Instagram
                        </button>
                        <button class="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                          <FaTwitter /> &nbsp; &nbsp; Twitter
                        </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
      // <div className="flex h-screen overflow-hidden">
      //   {/* Sidebar */}
      //   <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      //   {/* Content area */}
      //   <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      //     {/*  Site header */}
      //     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      //     <main>

      //     </main>
      //   </div>
      // </div>
    );
  }
};

export default Typeofproduct;
