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
  IonList,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { RefresherEventDetail } from "@ionic/core";
import Axios from "axios";

import {
  arrowBack,
  personAdd,
  personCircleOutline,
  personCircleSharp,
} from "ionicons/icons";
import { Commandes } from "./Commandes";
import { Operations } from "./Operations";
import { Approvisionnement } from "./Approvisionnement";
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
} from "../../Feature/PanierSlice";
import { setDate } from "rsuite/esm/utils/dateUtils";
import { ModalCom } from "./ModalCom";
import { recupCommande } from "../../Feature/CommandeSlice";
import { Depenses } from "./Depenses";

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

const Historique: React.FC = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal2, setShowmodal2] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const [getab, setGettab] = useState<any>();
  const [sho, setSho] = useState<any>(false);
  // let [panier, setPanier] = useState<any[]>(useSelector((state:any) => state.panier.panier));
  // const [cont, setCont] = useState<any>((window.location.pathname.split("/")[2]));
  // const [lien, setLien] = useState<any>((window.location.pathname.split("/")[3]));
  // const [trigger, setTrigger] = useState<any>(useSelector((state:any) => state.panier.trigg))
  let panier = useSelector((state: any) => state.panier.panier);
  // let cont = useSelector((state: any) => state.panier.cont);
  const dispatch = useDispatch();
  let trigger = useSelector((state: any) => state.panier.trigg);
  const [patient, setPatientlist] = useState<any[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  let lien = useSelector((state: any) => state.panier.lien);
  let comm = useSelector((state: any) => state.commande.commande);
  const [invoice, setInvoice] = useState<any>("ee");
  const [statut, setStatut] = useState<any>();
  const [date, setDate] = useState<any>();
  const [prixt, setPrixt] = useState<any>("rr");
  const [whatsapp, setWhatsapp] = useState<any>();
  const [etatstat, setEtatstat] = useState<any>(false);
  const router = useIonRouter();
  const [seg, setSeg] = useState<any>("Operations");
  const [cont, setCont] = useState<any>(window.location.pathname.split("/")[2]);
  const [titre, setTitre] = useState<any>("Votre");
  const [titre1, setTitre1] = useState<any>("Historique");
  const userid = useSelector((state: any) => state.auth.user);
  const [nub, setNub] = useState<any>(15);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const ionRouter = useIonRouter();
  const boutiqueid = useSelector((state: any) => state.auth.user);
  const accesparcompte = useSelector((state: any) => state.Hash.accesparcompte);

  const loadData = (ev: any) => {
    setTimeout(() => {
      setNub(nub + 10);
      ev.target.complete();
    }, 500);
  };

  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  const getpan = () => {
    fetch("https://backend-shop.benindigital.com/affichepanier")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {});
  };

  const getcom = () => {
    Axios.post("https://backend-shop.benindigital.com/affichecommande", {
      id_boutique: userid.BoutiqueId,
    }).then((ret) => {
      dispatch(recupCommande(ret.data));
    });
  };

  document.getElementById("far")?.addEventListener("touchmove", (e) => {
    document.getElementById("far")!.style.left =
      ((e.changedTouches[0].clientX - 25) / window.innerWidth) * 100 + "%";
    document.getElementById("far")!.style.top =
      ((e.changedTouches[0].clientY - 25) / window.innerHeight) * 100 + "%";
  });

  const permu = (
    n: String | React.SetStateAction<String>,
    p: String | React.SetStateAction<String>,
    a: String | React.SetStateAction<String>,
    s: String | React.SetStateAction<String>,
    z: String | React.SetStateAction<String>
  ) => {
    setInvoice(p);
    setDate(n);
    setStatut(a);
    setPrixt(s);
    setWhatsapp(z);
    setShowmodal(true);
  };

  const relance = () => {};

  useEffect(() => {
    console.log(trigger);
  }, [(trigger: any) => {}]);

  useEffect(() => {
    if (cont == 1) {
      setSeg("En Cours");
      setTitre("Commandes");
      setTitre1("en cours");
    }
    getcom();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => router.goBack()}>
              <IonIcon color="medium" icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className="nereide">{seg}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="alice">
        <IonHeader collapse="condense" mode="ios">
          <IonToolbar>
            <IonTitle size="large" className="page-title">
              <IonLabel>{titre} </IonLabel>
              <IonNote>{titre1}</IonNote>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList className="homes">
          {cont == 1 ? (
            <>
              {accesparcompte
                .filter((t: any) => t.id_boutique === boutiqueid.BoutiqueId)
                .map((bat: any) => {
                  return bat.gestion_commande_attente === 1 ? (
                    <div className="div2">
                      {comm
                        .slice(0, nub)
                        .filter((e: any) => e.status_id_command < 3) ? (
                        <>
                          {comm
                            .filter((e: any) => e.status_id_command < 3)
                            .map((card: any, index: any) => {
                              return (
                                <IonItem
                                  className=" Itemsv"
                                  onClick={() => {
                                    permu(
                                      card.date,
                                      card.invoice,
                                      card.status_id_command,
                                      card.total_price,
                                      card.whatsapp
                                    );
                                  }}
                                >
                                  <IonLabel>
                                    <h3 className="nereide">
                                      <span className="add1">
                                        {card.whatsapp}
                                      </span>{" "}
                                      <span className="adddate">
                                        {
                                          String(new Date(card.date)).split(
                                            "("
                                          )[0]
                                        }
                                      </span>{" "}
                                      <span className="add2">
                                        {card.invoice}
                                      </span>{" "}
                                    </h3>
                                    <p className=" add3">
                                      <span className="add1">Commandes:</span>
                                      <span className="add5">
                                        {new Intl.NumberFormat("de-DE", {
                                          style: "currency",
                                          currency: "XOF",
                                        }).format(card.total_price)}
                                      </span>
                                    </p>
                                  </IonLabel>
                                </IonItem>
                              );
                            })}
                          <IonInfiniteScroll
                            className="scroll1"
                            onIonInfinite={loadData}
                            threshold="100px"
                            disabled={isInfiniteDisabled}
                          >
                            <IonInfiniteScrollContent
                              loadingSpinner="lines-sharp-small"
                              loadingText="Chargement de données..."
                            ></IonInfiniteScrollContent>
                          </IonInfiniteScroll>
                        </>
                      ) : (
                        <>
                          <div className="items-center justify-center text-center mb-3">
                            <img
                              className=""
                              src="delai-de-traitement.png"
                              alt="d"
                            />
                            <h2 className="items-center justify-center text-center ">
                              aucune commande en cours
                            </h2>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-2xl mt-14">
                      vous n'avez pas accès à cette page
                    </div>
                  );
                })}
            </>
          ) : (
            <div>
              <IonSegment
                className="nereide"
                onIonChange={(e) => {
                  setSeg(e.detail.value);
                }}
                value={seg}
                scrollable={true}
                mode="ios"
              >
                <IonSegmentButton value="Operations">
                  <IonLabel>Operations</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Ventes">
                  <IonLabel>Ventes</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Depenses">
                  <IonLabel>Depenses</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Approvisionnement">
                  <IonLabel className="adin">Approvision...</IonLabel>
                </IonSegmentButton>
              </IonSegment>
              <div className="div2">
                {seg == "Ventes" ? <Commandes /> : null}
                {seg == "Approvisionnement" ? <Approvisionnement /> : null}
                {seg == "Operations" ? <Operations /> : null}
                {seg == "Depenses" ? <Depenses /> : null}
              </div>
            </div>
          )}
        </IonList>
      </IonContent>
      <IonModal
        isOpen={showmodal}
        onDidDismiss={() => {
          setShowmodal(false);
        }}
      >
        <ModalCom
          onclose={() => {
            setShowmodal(false);
            getcom();
          }}
          Invoice={invoice}
          Prix={prixt}
          Datec={date}
          Statut={statut}
          Etat={etatstat}
          Whatsapp={whatsapp}
          // tab={patient}
        />
      </IonModal>
    </IonPage>
  );
};

export default Historique;
