/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setCredentials } from "../../Feature/auth/AuthSlice";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLoading,
  IonModal,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { setdate, setHash_code } from "../../Feature/HashSlice";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { FiLink, FiRefreshCw } from "react-icons/fi";
import { chevronBack, informationCircle } from "ionicons/icons";
import WelcomeBanner from "../dashboard/WelcomeBanner";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Partager = () => {
  const [mobile, setmobile] = React.useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [dec, setDec] = useState(false);
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const share = (message) => {
    var options = {
      url: message,
    };
    SocialSharing.shareWithOptions(options);
  };
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setmobile(true);
    }
  }, []);
  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
      <>
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
                    window.location.href = "/partager";
                  }}
                >
                  <FiRefreshCw />
                </IonButtons>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent className="">
            <>
              <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message="Lien de partage copié avec success"
                icon={informationCircle}
                position="top"
                duration={2000}
              />

              <IonModal
                isOpen={modalShow2}
                onDidDismiss={() => {
                  setModalShow2(false);
                  setDec(!dec);
                }}
                initialBreakpoint={0.2}
                breakpoints={[0, 0.25, 0.5, 0.75]}
              >
                <IonContent className="ion-padding">
                  <IonItem>
                    <span className="">Partagé le produit public</span>
                  </IonItem>
                  <div className="flex mt-4 items-center justify-center gap-3">
                    <div className="flex flex-col justify-center items-center w-8 h-8 rounded-full shadow bg-purple-700 text-white text-xl cursor-pointer">
                      <CopyToClipboard
                        text={`https://versatileskills.space/download/Digital_Traders.apk`}
                        onCopy={() => {
                          setShowToast1(true);
                          setModalShow2(false);
                          // setDec(!dec);
                        }}
                      >
                        <FiLink className="" />
                      </CopyToClipboard>
                    </div>
                  </div>
                </IonContent>
              </IonModal>
              <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
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
                    <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                      <div class="w-full flex flex-col">
                        <div className="w-full items-center justify-center text-center">
                          <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                            Lien de partage du produit client
                          </h1>
                        </div>
                        <a
                          class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                          onClick={() => {
                            if (mobile) {
                              share(
                                `https://versatileskills.space/download/Digital_Traders.apk`
                              );
                              setDec(!dec);
                            } else {
                              setModalShow2(true);
                            }

                            // setDec(!dec);
                            // { window.location.href = ` /home/articledesc/${Id} ` };
                          }}
                        >
                          Partager
                        </a>
                        <hr class="my-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </IonContent>
        </IonPage>
      </>
    );
  } else {
    return (
      <>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                <IonToast
                  isOpen={showToast1}
                  onDidDismiss={() => setShowToast1(false)}
                  message="Lien de partage copié avec success"
                  icon={informationCircle}
                  position="top"
                  duration={2000}
                />
                <IonModal
                  isOpen={modalShow2}
                  onDidDismiss={() => {
                    setModalShow2(false);
                    setDec(!dec);
                  }}
                  initialBreakpoint={0.2}
                  breakpoints={[0, 0.25, 0.5, 0.75]}
                >
                  <IonContent className="ion-padding">
                    <IonItem>
                      <span className="">Partagé le produit public</span>
                    </IonItem>
                    <div className="flex mt-4 items-center justify-center gap-3">
                      <div className="flex flex-col justify-center items-center w-8 h-8 rounded-full shadow bg-purple-700 text-white text-xl cursor-pointer">
                        <CopyToClipboard
                          text={`https://versatileskills.space/download/Digital_Traders.apk`}
                          onCopy={() => {
                            setShowToast1(true);
                            setModalShow2(false);
                            // setDec(!dec);
                          }}
                        >
                          <FiLink className="" />
                        </CopyToClipboard>
                      </div>
                    </div>
                  </IonContent>
                </IonModal>
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
                      <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div class="w-full flex flex-col">
                          <div className="w-full items-center justify-center text-center">
                            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                              Lien de partage du produit client
                            </h1>
                          </div>
                          <a
                            class="block w-full cursor-pointer no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            onClick={() => {
                              if (mobile) {
                                share(
                                  `https://versatileskills.space/download/Digital_Traders.apk`
                                );
                                setDec(!dec);
                              } else {
                                setModalShow2(true);
                              }

                              // setDec(!dec);
                              // { window.location.href = ` /home/articledesc/${Id} ` };
                            }}
                          >
                            Partager
                          </a>
                          <hr class="my-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
};

export default Partager;
