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
import Nouv2 from "../../pages/Nouv2.js";
import Nouv1 from "../../pages/Nouv1.js";
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
import Approv from "./Approv";
import { Conteneur0 } from "../conteneur0";

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
      .post("https://backend-shop.benindigital.com/supprart", {
        id: idsuppr,
      })
      .then((ret) => {
        console.log(ret.data);
        if (ret.data == "succes") {
          console.log("supprimé avec succes");
        }
      });
  };

  useEffect(() => {}, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {accesparcompte
          .filter((t) => t.id_boutique === boutiqueid.BoutiqueId)
          .map((bat) => {
            return bat.gestion_produit === 1 ? (
              <>
                <IonHeader collapse="condense">
                  <IonToolbar>
                    <IonTitle size="large" className="page-title">
                      <IonLabel>Vos </IonLabel>
                      <IonNote>Produits</IonNote>
                    </IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonItem className="Item1" lines="none">
                  <IonButton
                    color="secondary"
                    onClick={(e) => {
                      setShowmodal2(true);
                    }}
                  >
                    Ajouter un produit
                  </IonButton>
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
                    ></IonSearchbar>

                    <IonGrid className="grid1">
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
                  <Nouv2 />
                </IonModal>

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
                    Modifier
                  </IonItem>
                  <Nouv1
                    nomprod={nomprod}
                    prixv={priv}
                    prixa={prixa}
                    desc={desc}
                    stockrest={stockrest}
                    idcateg={idcateg}
                    nbrelike={nbrelike}
                    img1={img1}
                    img2={img2}
                    img3={img3}
                    img4={img4}
                    video={video}
                    idprod={idprod}
                  />
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
            ) : (
              <div className="flex items-center justify-center text-2xl mt-14">
                vous n'avez pas accès à cette page
              </div>
            );
          })}
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
};

export default Article;
