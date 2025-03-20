/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonicSlides,
  IonBadge,
  IonCardSubtitle,
  IonFab,
  IonFabButton,
  IonFabList,
  IonRefresher,
  IonRefresherContent,
  IonModal,
  IonItem,
  IonCol,
  IonRouterLink,
  IonGrid,
  IonToast,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import PanierArt from "../components/articles/PanierArt";
// import Paniermodal from "../components/articles/Paniermodal";
import Homecom from "../pages/Homecom";
import Axios from "axios";
import { logOutt, recupUser } from "../Feature/auth/AuthSlice";

import { ProductStore } from "../data/ProductStore";
import { FavouritesStore } from "../data/FavouritesStore";
import { CartStore } from "../data/CartStore";
import styles from "./Home.module.css";
import {
  add,
  cart,
  chevronUpCircle,
  chevronUpCircleOutline,
  closeCircleOutline,
  globeOutline,
  heart,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  share,
} from "ionicons/icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import { Tableau13 } from "../components/articles/Paniermodal";
// import { tab4 } from "../components/articles/Paniermodal";
import { boolcont } from "../components/conteneurxx";

import PlaceCard from "../components/PlaceCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { RefresherEventDetail } from "@ionic/core";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  arrowBack,
  personAdd,
  personCircleOutline,
  personCircleSharp,
} from "ionicons/icons";
import Bannier_home from "../components/Home/Bannier_home";
import { Homes } from "../components/Home/Homes";
import Description from "../components/articles/description";
import { Ventes } from "../components/pages/Ventes";
import Nouv2 from "./Nouvphy.js";
import { useSelector, useDispatch } from "react-redux";
import { dectriggmod } from "../Feature/DeclencheursSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import DashboardCard07 from "../components/dashboard/DashboardCard07";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";

// const refr = () => {
//   if (tab4 == 14) {
//     setTimeout(() => {
//       {
//         window.location.href = "/Home";
//       }
//     }, 500);
//     alert("Commande validé");
//   }
// };
const ajoutmed = () => {
  {
    window.location.href = "/ajoutmed";
  }
};

const listepat = () => {
  {
    window.location.href = "/listepat";
  }
};
const listemed = () => {
  {
    window.location.href = "/listemed";
  }
};
const RDV = () => {
  {
    window.location.href = "/rdv";
  }
};
const RDVV = () => {
  {
    window.location.href = "/panier";
  }
};

const Home: React.FC = () => {
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);

  const products = ProductStore.useState((s: { products: any }) => s.products);
  const favourites = FavouritesStore.useState(
    (s: { product_ids: any }) => s.product_ids
  );
  const shopCart = CartStore.useState(
    (s: { product_ids: any }) => s.product_ids
  );
  const triggermod = useSelector((state: any) => state.triggers.triggermod);
  let user = useSelector((state: any) => state.auth.user);
  let wal = useSelector((state: any) => state.auth.whale);
  let command1 = useSelector((state: any) => state.commande.commande);

  const [showmodal, setShowmodal] = useState(false);
  const [ty, setTy] = useState<any>(1);
  const dispatch = useDispatch();
  const [panier, setPanier] = useState<any[]>([]);
  const [cont, setCont] = useState<any>(window.location.pathname.split("/")[2]);
  const [lien, setLien] = useState<any>(window.location.pathname.split("/")[3]);

  const [patient, setPatientlist] = useState<any[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [afficherToast, setAfficherToast] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const getpan = () => {
    fetch("https://backendtrader.digitalfirst.space/affichepanier")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        // console.log(data);
        setPanier(data);
      });
    // console.log(boolcont);
  };

  document.getElementById("far")?.addEventListener("touchmove", (e) => {
    document.getElementById("far")!.style.left =
      ((e.changedTouches[0].clientX - 25) / window.innerWidth) * 100 + "%";
    document.getElementById("far")!.style.top =
      ((e.changedTouches[0].clientY - 25) / window.innerHeight) * 100 + "%";
  });

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => { 
      // Any calls to load data go here
      console.log("nlanla");
      event.detail.complete();
    }, 2000);
  }

  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  const cacherToast = () => {
    setAfficherToast(false);
  };
  // useEffect(() => {
  //   window.addEventListener("resize", updateDimensions);
  //   return ()=> window.removeEventListener("resize", updateDimensions);
  // }, []);

  useEffect(() => {
    console.log(ty);
    setTy(ty + 1);
  }, [wal]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const estDejaLance = localStorage.getItem("estDejaLance");

      if (localStorage.getItem("change_version") === "oui") {
        if (localStorage.getItem("status_version") === "obligatoire") {
          window.location.href = "/version";
        } else if (localStorage.getItem("status_version") === "facultative") {
          if (!estDejaLance) {
            // setAfficherToast(true);
            setModalShow(true);
            localStorage.setItem("estDejaLance", "true");
          }
        }
      }
    }
  }, []);

  const sortir = () => {
    localStorage.removeItem("estDejaLance");
    setTimeout(() => {
      App.exitApp();
    }, 1000);
  };
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      App.addListener("backButton", () => {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/home"
        ) {
          sortir();
        }
      });
    }
  });

  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
      <>
        <IonToast
          isOpen={afficherToast}
          onDidDismiss={cacherToast}
          message="Lien copier dans le papier presse avec succès"
          duration={3000}
          position="top"
        />
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            onClick={() => {
              setModalShow(false);
            }}
          >
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-red-800" 
            >
              Version Dépassée !
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col items-center justify-center">
              <span> 
                Accéder à la dernière version de l'application sur ce lien.
              </span>
              {/* <CopyToClipboard
                text={"http://www.benindigital.com"}
                onCopy={() => {
                  setAfficherToast(true);
                }}
              > */}
              <span className="text-blue-800 cursor-pointer ">
                https://versatileskills.space/
              </span>
              {/* </CopyToClipboard> */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={() => setModalShow(false)}>Close</Button> */}
          </Modal.Footer>
        </Modal>
        <IonContent fullscreen>
          {/* <IonRefresher
            slot="fixed"
            onIonRefresh={doRefresh}
            pullFactor={0.5}
            pullMin={100}
            pullMax={200}
            className="refresh"
          >
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher> */}
          {cont ? null : <Homes />}
          {/* {(cont == 'Ventes') ? (
           <Ventes Titre={cont}/>
         ) : (  
           null
         )} */}
          {cont == "Ajout" ? <Nouv2 /> : null}
        </IonContent>
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
              {/* Welcome banner */}
              <WelcomeBanner />
              {/* <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="font-medium leading-tight">Personal Info</h3>
                  <p className="text-sm">Step details here</p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="font-medium leading-tight">Account Info</h3>
                  <p className="text-sm">Step details here</p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="font-medium leading-tight">Review</h3>
                  <p className="text-sm">Step details here</p>
                </li>
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="font-medium leading-tight">Confirmation</h3>
                  <p className="text-sm">Step details here</p>
                </li>
              </ol> */}
              {/* Table (Top Channels) */}
              <DashboardCard07 />
            </div>
          </main>
        </div>
      </div>
    );
  }
};

export default Home;
