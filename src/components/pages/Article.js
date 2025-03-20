/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonProgressBar,
  IonActionSheet,
  useIonActionSheet,
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
  IonList,
  IonLabel,
  IonInput,
  IonCol,
  IonRow,
  IonGrid,
  IonNote,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonToast,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useIonRouter } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { RefresherEventDetail } from "@ionic/core";
import {
  caretForwardCircle,
  cart,
  checkmark,
  chevronBack,
  chevronForward,
  close,
  closeCircleOutline,
  heart,
  trash,
  trashBinOutline,
  trashOutline,
} from "ionicons/icons";
import Panierapprov from "../articles/Panierapprov";
import Nouv2 from "../../pages/Nouvphy.js";
import Nouv1 from "../../pages/Modifphy.js";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
  vider,
  declien,
  deccont,
} from "../../Feature/PanierSlice";
import toast, { Toaster } from "react-hot-toast";
import Approv from "./Approv";
import { Conteneur0 } from "../conteneur0";
import { recupProduct } from "../../Feature/ProductSlice";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { FiRefreshCw } from "react-icons/fi";
import Nouvphy from "../../pages/Nouvphy.js";
import Nouvnume from "../../pages/Nouvnume";
import Modifphy from "../../pages/Modifphy.js";
import "intro.js/introjs.css";
import introJs from "intro.js";

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

const Article = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal3, setShowmodal3] = useState(false);
  const [nomprod, setNomprod] = useState();
  const [priv, setPriv] = useState();
  const [prixa, setprixa] = useState();
  const [desc, setDesc] = useState();
  const [stockrest, setStockrest] = useState();
  const [idcateg, setIdcateg] = useState();
  const [nbrelike, setNbrelike] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [video, setvideo] = useState();
  const [idprod, setIdprod] = useState();
  const [idsuppr, setIdsuppr] = useState();
  let article = useSelector((state) => state.product.product);
  let [velk, setVelk] = useState(useSelector((state) => state.product.product));
  let panier = useSelector((state) => state.panier.panier);
  // let velk= article;
  const [progress, setProgress] = useState(false);
  const [cont, setCont] = useState(window.location.pathname.split("/")[2]);
  const [lien, setLien] = useState(window.location.pathname.split("/")[3]);
  const [showmodal2, setShowmodal2] = useState(false);
  const [showmodal4, setShowmodal4] = useState(false);
  const [showtoast, setShowtoast] = useState(false);
  const [showtoast1, setShowtoast1] = useState(false);
  const [showtoast2, setShowtoast2] = useState(false);
  const [produit, setProdList] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [nub, setNub] = useState(8);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  // const [change, setChange] = useState(true);
  const [augment, setAugment] = useState(0);
  const [searchText, setSearchText] = useState("");
  const router = useIonRouter();
  const boutiqueid = useSelector((state) => state.auth.user);
  const accesparcompte = useSelector((state) => state.Hash.accesparcompte);
  const choiceacces = useSelector((state) => state.Hash.choiceacces);
  const userid = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const declenche2 = useSelector((state) => state.triggers.declenche2);

  const loadData = (ev) => {
    setTimeout(() => {
      setNub(nub + 8);
      ev.target.complete();
    }, 500);
  };

  const change = (ide) => {
    setSearchText(ide);
    const query = ide.toLowerCase();
    // velk = article.filter((t) => t.name.toLowerCase().includes(ide.toLowerCase()));
    // setVelk(
    article.filter((t) => t.name.toLowerCase().includes(ide.toLowerCase()));
    // );
  };

  const supprimer = () => {
    console.log(idsuppr);
    axios
      .post("https://backendtrader.digitalfirst.space/supprart", {
        id: idsuppr,
      })
      .then((ret) => {
        console.log(ret.data);
        if (ret.data == "succes") {
          console.log("supprimé avec succes");
        }
      });
  };
  const getarticle = () => {
    axios
      .post("https://backendtrader.digitalfirst.space/afficheart", {
        id_boutique: userid.BoutiqueId,
      })
      .then((ret) => {
        dispatch(recupProduct(ret.data));
        // setShowToast2(true);
      });
  };
  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    getarticle();
  }, [article]);
  useEffect(() => {
    toast.loading(
      "Opération en cours de traitement....\n\nVeuillez patienter.",
      {
        duration: 60000,
      }
    );
  }, [declenche2]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const step1Element = document.querySelector("#step11");
  //     const step2Element = document.querySelector("#step12");
  //     const step3Element = document.querySelector("#step13");

  //     if (step1Element && step2Element && step3Element && article[0]) {
  //       const intro = introJs()
  //         .setOptions({
  //           steps: [
  //             {
  //               element: step1Element,
  //               intro: "Ceci est le bouton de création des produits",
  //             },
  //             {
  //               element: step2Element,
  //               intro: "Ceci est la zone de recherche",
  //             },
  //             {
  //               element: step3Element,
  //               intro: "Ceci est la zone d'affichage des différents produits",
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
                    setShowmodal3(false);
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
                  window.location.href = "/Article";
                }}
              >
                <FiRefreshCw />
              </IonButtons>
            </div>
            {/* <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  router.goBack();
                  setShowmodal3(false);
                }}
              >
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <>
            <IonToast
              isOpen={showtoast}
              onDidDismiss={() => setShowtoast(false)}
              message="Vueillez configurer le numeros whatapps avant toute autres configurations  dans la section 'Ma boutique'"
              duration={4000}
              position="top"
            />
            <IonToast
              isOpen={showtoast1}
              onDidDismiss={() => setShowtoast1(false)}
              message="Vueillez configurer la section pays/ville avant toute autres configurations  dans la section 'Ma boutique'"
              duration={4000}
              position="top"
            />
            <IonToast
              isOpen={showtoast2}
              onDidDismiss={() => setShowtoast2(false)}
              message="Vueillez configurer le nom de la boutique avant toute autres configurations dans la section 'Ma boutique'"
              duration={4000}
              position="top"
            />
            {declenche2 && (
              <div>
                <Toaster />
              </div>
            )}
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large" className="page-title">
                  <IonLabel>Vos </IonLabel>
                  <IonNote>Produits</IonNote>
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonItem className="Item1" lines="none">
              {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}

              {JSON.parse(localStorage.getItem("store_name")) === "" ? (
                <IonButton
                  color="secondary"
                  onClick={(e) => {
                    setShowtoast2(true);
                  }}
                  id="step11"
                >
                  Ajouter un produit
                </IonButton>
              ) : JSON.parse(localStorage.getItem("adress")) === "" ? (
                <IonButton
                  color="secondary"
                  onClick={(e) => {
                    setShowtoast1(true);
                  }}
                  id="step11"
                >
                  Ajouter un produit
                </IonButton>
              ) : JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
                <IonButton
                  color="secondary"
                  onClick={(e) => {
                    setShowtoast(true);
                  }}
                  id="step11"
                >
                  Ajouter un produit
                </IonButton>
              ) : (
                <IonButton
                  color="secondary"
                  onClick={() => {
                    if (
                      JSON.parse(localStorage.getItem("type_product") + "") ===
                      "Physique"
                    ) {
                      setShowmodal2(true);
                    } else if (
                      JSON.parse(localStorage.getItem("type_product") + "") ===
                      "Numerique"
                    ) {
                      setShowmodal4(true);
                    }
                  }}
                  id="step11"
                >
                  Ajouter un produit
                </IonButton>
              )}

              {/* ) : (
                <IonButton color="secondary" >Ajouter un produit</IonButton>
              )} */}
            </IonItem>
            <IonList>
              <div className="homes">
                <IonSearchbar
                  value={searchText}
                  animated={true}
                  onIonChange={(e) => {
                    setSearchText(e.detail.value);
                    change(e.detail.value);
                  }}
                  id="step12"
                ></IonSearchbar>

                <IonGrid className="grid1" id="step13">
                  <IonRow>
                    {article[0] ? (
                      <>
                        {article
                          .filter((t) =>
                            t.name
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                          )
                          .slice(0, nub)
                          .map((card, index) => {
                            return (
                              <IonCol
                                key={index}
                                size="6"
                                sizeXs="6"
                                sizeSm="3"
                                sizeMd="3"
                                sizeXl="2"
                              >
                                <Conteneur0
                                  Nom={card.name}
                                  Prix={card.price}
                                  Prixa={card.cost}
                                  Id={card.id}
                                  Desc={card.description}
                                  IdCateg={card.category_id}
                                  Stock={card.stock}
                                  Ig={card.picture1}
                                  Img1={card.picture1}
                                  Img2={card.picture2}
                                  Img3={card.picture3}
                                  Img4={card.picture4}
                                  Video={card.video}
                                  quantifiable_product={
                                    card.quantifiable_product
                                  }
                                  type_product={card.type_product}
                                  Panier={panier}
                                  Like={card.like_number}
                                />
                              </IonCol>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="items-center justify-center text-center">
                          <img
                            className=""
                            src="delai-de-traitement.png"
                            alt="d"
                          />
                          <h2 className="items-center justify-center text-center nereide">
                            aucun article enrégistré
                          </h2>
                        </div>
                      </>
                    )}
                  </IonRow>
                  <IonInfiniteScroll
                    onIonInfinite={loadData}
                    threshold="100px"
                    disabled={isInfiniteDisabled}
                  >
                    <IonInfiniteScrollContent
                      loadingSpinner="lines-sharp-small"
                      loadingText="Chargement de données..."
                    ></IonInfiniteScrollContent>
                  </IonInfiniteScroll>
                </IonGrid>
              </div>
            </IonList>

            <IonModal
              isOpen={showmodal2}
              onDidDismiss={() => {
                setShowmodal2(false);
              }}
            >
              <IonItem className="Item1" lines="none">
                <IonButtons
                  slot="start"
                  onClick={() => {
                    setShowmodal2(false);
                  }}
                >
                  <IonIcon icon={chevronBack} />
                </IonButtons>
                Ajouter un produit
              </IonItem>
              <Nouvphy />
            </IonModal>

            <IonModal
              isOpen={showmodal4}
              onDidDismiss={() => {
                setShowmodal4(false);
              }}
            >
              <IonItem className="Item1" lines="none">
                <IonButtons
                  slot="start"
                  onClick={() => {
                    setShowmodal4(false);
                  }}
                >
                  <IonIcon icon={chevronBack} />
                </IonButtons>
                Ajouter un produit
              </IonItem>
              <Nouvnume />
            </IonModal>
            <IonActionSheet
              isOpen={showActionSheet}
              onDidDismiss={() => setShowActionSheet(false)}
              cssClass="my-custom-class"
              buttons={[
                {
                  text: "Supprimer",
                  role: "destructive",
                  icon: trash,
                  id: "delete-button",
                  data: {
                    type: "delete",
                  },
                  handler: () => {
                    supprimer();
                  },
                },
                {
                  text: "Annuler",
                  icon: close,
                  role: "cancel",
                  handler: () => {
                    console.log("Cancel clicked");
                  },
                },
              ]}
            ></IonActionSheet>

            {/* <IonFab
            vertical="center"
            horizontal="center"
            slot="fixed"
            className="fab1"
            id="far"
          >
            <IonButton
              color="secondary"
              onClick={() => {
                setShowmodal3(true);
              }}
              size="small"
            >
              <IonBadge color="secondary">{approv.length}</IonBadge>
              Approvisionner
            </IonButton>
          </IonFab> */}
          </>
        </IonContent>

        <IonModal
          isOpen={showmodal3}
          onDidDismiss={() => {
            setShowmodal3(false);
          }}
          backdropBreakpoint={0.5}
          className="modal1"
        >
          <IonItem>
            <IonToolbar className="ion-text-center Titre1 ">
              Approvision
              <IonIcon
                icon={closeCircleOutline}
                size="large"
                slot="end"
                className="iconmod"
                onClick={() => {
                  setShowmodal3(false);
                }}
              />
            </IonToolbar>
          </IonItem>
          <Panierapprov Panier={panier} trigg={() => {}} />
        </IonModal>

        {/* <IonFab vertical="center" horizontal="center" slot="fixed" className='fab5' id='far' >
                  <IonFabButton color='secondary' onClick={() => {
                      setShowmodal(true); console.log('');;}
                  } size='small'  >             
                      <IonIcon icon={checkmark} className="animate__animated" />
                      
                  </IonFabButton>
              </IonFab> */}
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
              <IonToast
                isOpen={showtoast}
                onDidDismiss={() => setShowtoast(false)}
                message="Vueillez configurer le numeros whatapps avant toute autres configurations"
                duration={4000}
                position="top"
              />
              <IonToast
                isOpen={showtoast1}
                onDidDismiss={() => setShowtoast1(false)}
                message="Vueillez configurer la section pays/ville avant toute autres configurations "
                duration={4000}
                position="top"
              />
              <IonToast
                isOpen={showtoast2}
                onDidDismiss={() => setShowtoast2(false)}
                message="Vueillez configurer le nom de la boutique avant toute autres configurations "
                duration={4000}
                position="top"
              />
              <IonModal
                isOpen={showmodal2}
                onDidDismiss={() => {
                  setShowmodal2(false);
                }}
              >
                <IonItem className="Item1" lines="none">
                  <IonButtons
                    slot="start"
                    onClick={() => {
                      setShowmodal2(false);
                    }}
                  >
                    <IonIcon icon={chevronBack} />
                  </IonButtons>
                  Ajouter un produit
                </IonItem>
                <Nouvphy />
              </IonModal>

              <IonModal
                isOpen={showmodal4}
                onDidDismiss={() => {
                  setShowmodal4(false);
                }}
              >
                <IonItem className="Item1" lines="none">
                  <IonButtons
                    slot="start"
                    onClick={() => {
                      setShowmodal4(false);
                    }}
                  >
                    <IonIcon icon={chevronBack} />
                  </IonButtons>
                  Ajouter un produit
                </IonItem>
                <Nouvnume />
              </IonModal>
              <div className="w-full items-center justify-between mb-4">
                {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
                {JSON.parse(localStorage.getItem("store_name")) === "" ? (
                  <IonButton
                    color="secondary"
                    onClick={(e) => {
                      setShowtoast2(true);
                    }}
                  >
                    Ajouter un produit
                  </IonButton>
                ) : JSON.parse(localStorage.getItem("adress")) === "" ? (
                  <IonButton
                    color="secondary"
                    onClick={(e) => {
                      setShowtoast1(true);
                    }}
                  >
                    Ajouter un produit
                  </IonButton>
                ) : JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
                  <IonButton
                    color="secondary"
                    onClick={(e) => {
                      setShowtoast(true);
                    }}
                  >
                    Ajouter un produit
                  </IonButton>
                ) : (
                  <IonButton
                    color="secondary"
                    onClick={() => {
                      if (
                        JSON.parse(
                          localStorage.getItem("type_product") + ""
                        ) === "Physique"
                      ) {
                        setShowmodal2(true);
                      } else if (
                        JSON.parse(
                          localStorage.getItem("type_product") + ""
                        ) === "Numerique"
                      ) {
                        setShowmodal4(true);
                      }
                    }}
                  >
                    Ajouter un produit
                  </IonButton>
                )}

                {/* ) : (
                <IonButton color="secondary">Ajouter un produit</IonButton>
              )} */}
              </div>
              <div className="mb-1">
                <IonSearchbar
                  mode="ios"
                  value={searchText}
                  placeholder={"rechercher un produit"}
                  className="pl-0"
                  animated={true}
                  onIonChange={(e) => {
                    setSearchText(e.detail.value);
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
                      (t) =>
                        t.name.toLowerCase().includes(searchText.toLowerCase())
                      // || t.status_id_command === filtrestat
                    )[0] ? (
                      article
                        .filter(
                          (t) =>
                            t.name
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                          // || t.status_id_command === filtrestat
                        )
                        .map((card, index) => {
                          return (
                            // <IonCol key={index} className="dril">
                            <Conteneur0
                              Nom={card.name}
                              Prix={card.price}
                              Prixa={card.cost}
                              Id={card.id}
                              Desc={card.description}
                              IdCateg={card.category_id}
                              Stock={card.stock}
                              Ig={card.picture1}
                              Img1={card.picture1}
                              Img2={card.picture2}
                              Img3={card.picture3}
                              Img4={card.picture4}
                              Video={card.video}
                              quantifiable_product={card.quantifiable_product}
                              type_product={card.type_product}
                              Panier={panier}
                              Like={card.like_number}
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
          </main>
        </div>
      </div>
    );
  }
};

export default Article;
