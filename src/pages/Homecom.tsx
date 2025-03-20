/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  IonLoading,
  IonBackButton,
  IonItem,
  IonLabel,
  IonNote,
  IonCol,
  IonSearchbar,
  IonRow,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import toast, { Toaster } from "react-hot-toast";
import PanierArt from "../components/articles/PanierArt";
import Paniermodal from "../components/articles/Paniermodal";
import styles from "./Home.module.css";
import {
  analytics,
  cart,
  chevronBack,
  chevronUpCircle,
  chevronUpCircleOutline,
  closeCircleOutline,
  globeOutline,
  heart,
  home,
  homeOutline,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  share,
} from "ionicons/icons";
// import { Tableau13 } from "../components/articles/Paniermodal";
// import { tab4 } from "../components/articles/Paniermodal";
// import { atr } from "../components/articles/Paniermodal";
import { boolcont, Conteneur } from "../components/conteneur";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { RefresherEventDetail } from "@ionic/core";
import {
  arrowBack,
  personAdd,
  personCircleOutline,
  personCircleSharp,
} from "ionicons/icons";
import Bannier_home from "../components/Home/Bannier_home";
import { Homescom } from "../components/Home/Homescom";
import Description from "../components/articles/description";
import Categories from "../components/articles/categorie";
import { useIonRouter } from "@ionic/react";
import { App } from "@capacitor/app";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
  vider,
  declien,
  deccont,
} from "../Feature/PanierSlice";
import { dectriggmod } from "../Feature/DeclencheursSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EnregistrerModal from "../components/header/EnregistrerModal";
import { FiRefreshCw } from "react-icons/fi";

function doRefresh(event: Event | React.SetStateAction<any>) {
  console.log("Begin async operation");
  setTimeout(() => {
    console.log("Async operation has ended");
    event.detail.complete();
  }, 2000);
}

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
export const RDVV = (ide: number | React.SetStateAction<any>) => {
  return ide;
};

const Homecom: React.FC = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal2, setShowmodal2] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  // const [getab, setGettab] = useState<any>(tab4);
  const [sho, setSho] = useState<any>(false);
  // let [panier, setPanier] = useState<any[]>(useSelector((state:any) => state.panier.panier));
  // const [cont, setCont] = useState<any>((window.location.pathname.split("/")[2]));
  // const [lien, setLien] = useState<any>((window.location.pathname.split("/")[3]));
  // const [trigger, setTrigger] = useState<any>(useSelector((state:any) => state.panier.trigg))
  let panier = useSelector((state: any) => state.panier.panier);
  let cont = useSelector((state: any) => state.panier.cont);
  const dispatch = useDispatch();
  let trigger = useSelector((state: any) => state.panier.trigg);
  const [patient, setPatientlist] = useState<any[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  let lien = useSelector((state: any) => state.panier.lien);
  const router = useIonRouter();
  const triggermod = useSelector((state: any) => state.triggers.triggermod);
  const declenche1 = useSelector((state: any) => state.triggers.declenche1);
  const boutiqueid = useSelector((state: any) => state.auth.user);
  const accesparcompte = useSelector((state: any) => state.Hash.accesparcompte);
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let article = useSelector((state: any) => state.product.product);

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [data, setdata] = useState([]);

  const [searchText, setSearchText] = useState("");

  const ionRouter = useIonRouter();
  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  const getpan = () => {
    fetch("https://backendtrader.digitalfirst.space/affichepanier")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {});
  };

  document.getElementById("far")?.addEventListener("touchmove", (e) => {
    document.getElementById("far")!.style.left =
      ((e.changedTouches[0].clientX - 25) / window.innerWidth) * 100 + "%";
    document.getElementById("far")!.style.top =
      ((e.changedTouches[0].clientY - 25) / window.innerHeight) * 100 + "%";
  });

  const relance = () => {};
  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log(trigger);
  }, [(trigger: any) => {}]);

  useEffect(() => {
    getpan();
  }, []);
  useEffect(() => {
    console.log("zzz");
  }, [triggermod]);
  useEffect(() => {
    toast.loading(
      "Opération en cours de traitement....\n\nVeuillez patienter.",
      {
        duration: 60000,
      }
    );
  }, [declenche1]);

  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div className="flex justify-between items-center">
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    router.goBack();
                    setShowmodal(false);
                  }}
                >
                  <IonIcon color="medium" icon={chevronBack} />
                </IonButton>
              </IonButtons>
              <IonTitle className="nereide">Digital trader</IonTitle>

              <IonButtons
                slot="end"
                className="mr-5 text-xl cursor-pointer"
                onClick={() => {
                  window.location.href = "/homecom";
                }}
              >
                <FiRefreshCw />
              </IonButtons>
            </div>
            {/* <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  router.goBack();
                  setShowmodal(false);
                }}
              >
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle> */}
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="alice">
          <>
            {lien == 0 ? <Homescom Panier={panier} /> : null}
            {cont == "articledesc" ? <Description Id={lien} /> : null}
            {/* {lien > 0 ? <Categories Id={lien} Panier={panier} /> : null} */}

            {/* {choiceacces === "principal" ? ( */}
            <IonFab
              vertical="center"
              horizontal="center"
              slot="fixed"
              className="fab1"
              id="far"
            >
              <IonButton
                color="secondary"
                onClick={() => {
                  setShowmodal(true);
                }}
                size="small"
              >
                <IonBadge color="secondary">{panier.length}</IonBadge>
                <IonIcon icon={cart} className="animate__animated" /> vente
              </IonButton>
            </IonFab>
            {/* ) : null} */}

            <IonModal
              isOpen={showmodal}
              onDidDismiss={() => {
                setShowmodal(false);
              }}
              backdropBreakpoint={0.7}
              className="modal1"
            >
              <IonItem>
                <IonToolbar className="ion-text-center Titre1 ">
                  Détails de la vente
                  <IonIcon
                    icon={closeCircleOutline}
                    size="large"
                    slot="end"
                    className="iconmod"
                    onClick={() => {
                      setShowmodal(false);
                    }}
                  />
                </IonToolbar>
              </IonItem>
              {declenche1 && (
                <div>
                  <Toaster />
                </div>
              )}
              <Paniermodal
                Panier={panier}
                trigg={() => {
                  setSho(!sho);
                }}
              />
            </IonModal>

            {/* <IonModal
            // ref={modal}
            trigger="open-modal"
            isOpen={showmodal}
            initialBreakpoint={0.25}
            breakpoints={[0.25, 0.5, 0.75]}
            backdropDismiss={false}
            backdropBreakpoint={0.5}
          >
            <IonContent className="ion-padding">
              <IonItem>
                <IonToolbar className='ion-text-center Titre1 '   >
                  Panier
                  <IonIcon icon={closeCircleOutline} size='large' slot='end' className='iconmod'
                    onClick={() => { setShowmodal(false); }} />
                </IonToolbar>
              </IonItem>
              <Paniermodal Panier={panier} trigg={() => { setSho(!sho) }} />
  
            </IonContent>
          </IonModal> */}
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
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
              <IonModal
                isOpen={showmodal}
                onDidDismiss={() => {
                  setShowmodal(false);
                }}
              >
                <IonItem className="Item1" lines="none">
                  <IonButtons
                    slot="start"
                    onClick={() => {
                      setShowmodal(false);
                    }}
                  >
                    <IonIcon icon={chevronBack} />
                  </IonButtons>
                  Détails de la vente
                </IonItem>
                {declenche1 && (
                  <div>
                    <Toaster />
                  </div>
                )}
                <Paniermodal
                  Panier={panier}
                  trigg={() => {
                    setSho(!sho);
                  }}
                />
              </IonModal>

              <div className="w-full items-center justify-between mb-4">
                <div
                  className="flex justify-center items-center w-40 bg-deep_sky_blue rounded-xl cursor-pointer px-3 py-1 gap-0"
                  onClick={(e) => {
                    // e.stopPropagation();
                    // setSearchModalOpen(true);
                    // setdata(panier);
                    setShowmodal(true);
                  }}
                >
                  <div className="w-7 h-7 text-white text-xl flex items-center justify-center">
                    {panier.length}
                  </div>
                  <div className="text-sm text-white flex items-center justify-center gap-1">
                    <IonIcon
                      icon={cart}
                      className="animate__animated text-xl"
                    />{" "}
                    Vente
                  </div>
                </div>
              </div>
              <div className="mb-1">
                <IonSearchbar
                  mode="ios"
                  value={searchText}
                  placeholder={"rechercher un produit"}
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
              </div>
              <div className="w-full flex flex-wrap items-center justify-center gap-3">
                {article[0] ? (
                  <>
                    {article.filter(
                      (t: any) =>
                        t.name.toLowerCase().includes(searchText.toLowerCase())
                      // || t.status_id_command === filtrestat
                    )[0] ? (
                      article
                        .filter(
                          (t: any) =>
                            t.name
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                          // || t.status_id_command === filtrestat
                        )
                        .map((card: any, index: any) => {
                          return (
                            // <IonCol key={index} className="dril">
                            <Conteneur
                              Nom={card.name}
                              Prix={card.price}
                              Id={card.id}
                              Stock={card.stock}
                              Ig={card.picture1}
                              quantifiable_product={card.quantifiable_product}
                              type_product={card.type_product}
                              Panier={panier}
                            />
                            // </IonCol>
                          );
                        })
                    ) : (
                      <div>aucun resultat</div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="items-center justify-center text-center">
                      <img className="" src="delai-de-traitement.png" alt="d" />
                      <h2 className="items-center justify-center text-center">
                        aucun article enrégistré
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </div>
            <EnregistrerModal
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
              data={data}
            />
          </main>
        </div>
      </div>
    );
  }
};

export default Homecom;
