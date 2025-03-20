/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  IonApp,
  IonButton,
  IonCol,
  IonList,
  IonModal,
  IonThumbnail,
  IonSearchbar,
  IonContent,
  IonAvatar,
  IonSelectOption,
  IonPage,
  IonItemDivider,
  IonSelect,
  IonRadioGroup,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonAlert,
  IonButtons,
  IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonNote,
  IonBadge,
  IonRouterLink,
  IonSegment,
  IonSegmentButton,
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox,
  IonToast,
  IonProgressBar,
} from "@ionic/react";

import {
  triangle,
  ellipse,
  square,
  arrowBack,
  arrowForward,
  personCircleOutline,
  globeOutline,
  personCircle,
  arrowDownCircle,
  informationCircle,
  chevronBack,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
import Axios from "axios";

import { IonReactRouter } from "@ionic/react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Commandes } from "./Commandes";
import { Vendus } from "./Vendus";
import { recupCommande } from "../../Feature/CommandeSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setcaisse, sethisto_tresorerie } from "../../Feature/CaisseSlice";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
  onclose: () => void;
  Invoice: String;
  Prix: number;
  Datec: any;
  Whatsapp: String;
  Statut: boolean;
  Etat: boolean;
}

export const ModalCom: React.SFC<Ajout_utiliformprops> = ({
  onclose,
  Invoice,
  Prix,
  Datec,
  Statut,
  Etat,
  Whatsapp,
}) => {
  const [showmodal, setShowmodal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [produit, setProduitlist] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [libstat, setLibstatlist] = useState<any[]>([]);
  const [etat, setEtat] = useState<any>(Etat);
  const [titre, setTitre] = useState<String>();
  const [age, setAge] = useState<any>(0);
  const [statut1, setStatut1] = useState<any>(Statut);
  const [statut, setStatut] = useState<any>(Statut);
  const [selectval, setSelectval] = useState<any>(Statut);
  const commart = useSelector((state: any) => state.commande.commandeart);
  const [groupee, setGroupee] = useState<String>("rr");
  const [nomCli, setNomCli] = useState<String>("rr");
  const [telephone, setTelephone] = useState<String>("rr");
  const [remarque, setRemarque] = useState<String>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("rr");
  const [id, setId] = useState<number>(0);
  const [checked, setChecked] = useState(false);
  const userid = useSelector((state: any) => state.auth.user);

  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);

  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);

  const caisse_value = useSelector((state: any) => state.Caisse.caisse);

  const [showToast4, setShowToast4] = useState(false);

  const totalSteps = 10;
  const [currentStep, setCurrentStep] = useState(0);
  // Calculer la largeur de la barre de progression en pourcentage
  const [progressWidth, setprogressWidth] = useState(
    (currentStep / totalSteps) * 100
  );

  const [isTimerRunning, setTimerRunning] = useState(false);
  const [tache, settache] = useState(false);
  const [invoicer, setinvoicer] = useState("");

  useEffect(() => {
    setprogressWidth((currentStep / totalSteps) * 100);
  }, [currentStep]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startTimer = () => {
      setTimerRunning(true);
      timer = setTimeout(() => {
        // Vérification de l'état de la variable après 1 minute
        if (progress) {
          if (tache) {
            // La variable est à true, exécuter la fonction
            Axios.post("https://backendtrader.digitalfirst.space/deletevente", {
              invoice: invoicer,
            }).then((rets) => {
              setTimeout(() => {
                setCurrentStep(0);
                setprogress(false);
                setShowToast4(true);
              }, 1000);
            });
          } else {
            // La variable est à false, exécuter la fonction
            console.log("etat critique passer");
            getCaisse1();
          }
        }

        setTimerRunning(false);
      }, 60000); // 1 minute = 60000 millisecondes
    };

    if (isTimerRunning) {
      startTimer();
    }

    return () => {
      clearTimeout(timer);
    }; // Nettoyage du timer lors du démontage du composant
  }, [isTimerRunning]);

  const handleClick = () => {
    setTimerRunning(true);
  };

  const getartcom = () => {
    // Axios.post('https://backendtrader.digitalfirst.space/afficheartcom', {
    //     invoice: Invoice,
    //     id_boutique: userid.userId
    // }).then((ret) => {
    //     setProduitlist(ret.data);
    //     console.log(ret.data);

    // })

    setProduitlist(commart.filter((t: any) => t.invoice === Invoice));
  };

  // const permu = (
  //     n: any | React.SetStateAction<any>
  // ) => {
  // }

  const majstatut = async (n: any | React.SetStateAction<any>) => {
    if (statut == statut1) {
      setShowToast2(true);
    } else {
      if (statut1 == 3 && n == 2) {
        setShowToast3(true);
      } else if (statut1 == 4 && n == 3) {
        setShowToast3(true);
      } else {
        setprogress(true);
        setTimeout(() => {
          setCurrentStep(1);
        }, 500);
        setTimeout(() => {
          setCurrentStep(2);
        }, 1000);
        setTimeout(() => {
          setCurrentStep(3);
        }, 1000);
        // setprogress1(true);
        // setprogress1(true);
        // toast.loading(
        //   "Opération en cours de traitement....\n\nVeuillez patienter.",
        //   {
        //     duration: 60000,
        //   }
        // );
        Axios.post("https://backendtrader.digitalfirst.space/majstatut", {
          invoice: Invoice,
          stat: n,
          id_boutique: userid.BoutiqueId,
        }).then((ret) => {
          console.log(ret.data, "majstatus");
          if (ret.data == "success") {
            if (n == 2) {
              if (n == 2 && statut == 1) {
                setTimeout(() => {
                  setCurrentStep(4);
                }, 1000);
                console.log("ici");

                // if (progress) {
                const last_caisse = caisse_value[0].caisse;
                console.log(last_caisse);
                const end_caisse = parseInt(last_caisse) + Prix;
                console.log(end_caisse);
                setinvoicer(String(Invoice));
                for (let index = 0; index < produit.length; index++) {
                  const tt =
                    parseInt(produit[index].stock) -
                    parseInt(produit[index].product_quantity);
                  const ti =
                    parseInt(produit[index].total_sold) +
                    parseInt(produit[index].product_quantity);
                  Axios.post(
                    "https://backendtrader.digitalfirst.space/reducquant",
                    {
                      id_boutique: userid.BoutiqueId,
                      product_id: produit[index].product_id,
                      stock:
                        produit[index].quantifiable_product == "oui" ? tt : 0,
                      total_sold: ti,
                      quantifiable_product: produit[index].quantifiable_product,
                      caisse: end_caisse,
                    }
                  ).then((rets) => {
                    console.log(ret.data);
                    setTimeout(() => {
                      setCurrentStep(5);
                    }, 1000);
                  });
                }
                console.log("labas");

                Axios.post(
                  "https://backendtrader.digitalfirst.space/affichecommande",
                  {
                    id_boutique: userid.BoutiqueId,
                  }
                ).then((ret) => {
                  dispatch(recupCommande(ret.data));
                  console.log(ret.data);
                  setTimeout(() => {
                    setCurrentStep(6);
                  }, 1000);
                  settache(true);
                  getCaisse1();
                });
                // }
              }
            } else if (n == 3) {
              setTimeout(() => {
                setCurrentStep(4);
              }, 1000);
              setTimeout(() => {
                setCurrentStep(5);
              }, 1000);
              Axios.post(
                "https://backendtrader.digitalfirst.space/affichecommande",
                {
                  id_boutique: userid.BoutiqueId,
                }
              ).then((ret) => {
                dispatch(recupCommande(ret.data));
                console.log(ret.data);
                setTimeout(() => {
                  setCurrentStep(6);
                }, 1000);
                setTimeout(() => {
                  setCurrentStep(7);
                }, 1000);
                getCaisse2();
              });
            } else if (n == 4) {
              setTimeout(() => {
                setCurrentStep(4);
              }, 1000);
              setTimeout(() => {
                setCurrentStep(5);
              }, 1000);
              Axios.post(
                "https://backendtrader.digitalfirst.space/affichecommande",
                {
                  id_boutique: userid.BoutiqueId,
                }
              ).then((ret) => {
                dispatch(recupCommande(ret.data));
                console.log(ret.data);
                setTimeout(() => {
                  setCurrentStep(6);
                }, 1000);
                setTimeout(() => {
                  setCurrentStep(7);
                }, 1000);
                getCaisse2();
              });
            }
          }
        });
      }
    }
  };

  const getCaisse1 = () => {
    Axios.post("https://backendtrader.digitalfirst.space/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setcaisse(ret.data));
      setTimeout(() => {
        setCurrentStep(7);
      }, 1000);
      add_tresorerie();
    });
  };
  const getCaisse2 = () => {
    setTimeout(() => {
      setCurrentStep(8);
    }, 1000);
    Axios.post("https://backendtrader.digitalfirst.space/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setcaisse(ret.data));
      setTimeout(() => {
        setCurrentStep(9);
      }, 1000);
      setTimeout(() => {
        setCurrentStep(10);
      }, 1000);
      setTimeout(() => {
        setprogress(false);
        setprogress1(false);
        setShowToast(true);
      }, 2000);
    });
  };
  const add_tresorerie = () => {
    console.log(Invoice, "invoice crée");
    console.log(Prix, "totalprix vendus");
    const last_caisse = caisse_value[0].caisse;
    console.log(last_caisse);
    const end_caisse = parseInt(last_caisse) + Prix;
    console.log(end_caisse);
    Axios.post("https://backendtrader.digitalfirst.space/addtresorerie", {
      id_boutique: userid.BoutiqueId,
      montant: Prix,
      last_caisse: last_caisse,
      end_caisse: end_caisse,
      type: "caisse",
      invoice: Invoice,
    }).then((ret) => {
      console.log(ret.data);
      // onclose();
      setTimeout(() => {
        setCurrentStep(8);
      }, 1000);
      gethisto_tresorerie();
    });
  };

  const gethisto_tresorerie = () => {
    setTimeout(() => {
      setCurrentStep(9);
    }, 1000);
    Axios.post("https://backendtrader.digitalfirst.space/histo_tresorerie", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_tresorerie(ret.data));
      setTimeout(() => {
        setCurrentStep(10);
      }, 1000);
      setTimeout(() => {
        setShowToast(true);
        setprogress(false);
        setprogress1(false);
      }, 2000);
    });
  };

  const getlibstat = () => {
    fetch("https://backendtrader.digitalfirst.space/affichelibstat")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        setLibstatlist(data);
      });
  };

  useEffect(() => {
    getartcom();
    getlibstat();
    console.log(statut);
  }, []);

  // useEffect(() => {
  //   if (caisse_value[0]) {
  //     console.log(caisse_value[0].caisse);
  //   }
  //   console.log(userid.userId);
  // }, [caisse_value]);
  return (
    <>
      <IonApp>
        <IonItem className="Item1" lines="none">
          <IonButtons
            slot="start"
            onClick={() => {
              onclose();
            }}
          >
            <IonIcon icon={chevronBack} />
          </IonButtons>
          Détails Commande
        </IonItem>

        {progress1 && (
          <div>
            <Toaster />
          </div>
        )}
        <IonContent fullscreen>
          <IonList lines="full" class="ion-no-margin">
            {/* <IonItem>
              <IonCol className="nereide" size="3">
                Date:
              </IonCol>
              <IonCol className="nereide" size="7">
                {String(new Date(Datec)).split("(")[0]}
              </IonCol>
            </IonItem> */}

            {/* <IonItem>
              <IonCol className="nereide" size="4">
                Facture:
              </IonCol>
              <IonCol className="nereide" size="6">
                {Invoice}
              </IonCol>
            </IonItem> */}

            {/* <IonItem>
              <IonCol className="nereide" size="4">
                Montant:
              </IonCol>
              <IonCol className="nereide" size="6">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XOF",
                }).format(Prix)}
              </IonCol>
            </IonItem> */}

            <IonItem>
              <IonCol className="nereide" size="4">
                Statut:
              </IonCol>
              <IonCol className="nereide">
                <IonSelect
                  value={selectval}
                  placeholder="Selectionner"
                  onIonChange={(e) => {
                    setStatut1(e.detail.value);
                    setSelectval(e.detail.value);
                    console.log(e.detail.value);
                  }}
                >
                  {libstat.map((card, index) => {
                    return (
                      <IonSelectOption
                        disabled={
                          statut > card.id ||
                          (card.id - statut > 1 && card.id !== 4) ||
                          statut === 3
                            ? true
                            : false
                        }
                        value={card.id}
                      >
                        {card.libeller === "Waiting" ? "En attente" : null}
                        {card.libeller === "Pending" ? "En cours" : null}
                        {card.libeller === "Proceed" ? "Terminer" : null}
                        {card.libeller === "Cancel" ? "Annuler" : null}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonCol>
            </IonItem>
            {/* (card.id-statut) <= 1 */}
            {/* <IonItem>
              <IonCol className="nereide" size="4">
                N°Client:
              </IonCol>
              <IonCol className="nereide" size="6">
                {Whatsapp === "" ? "Non définis" : Whatsapp}
              </IonCol>
            </IonItem> */}

            <IonAccordionGroup>
              <IonAccordion value="colors" toggleIcon={arrowDownCircle}>
                <IonItem slot="header">
                  <IonLabel>Liste des produits de la commande </IonLabel>
                </IonItem>
                <IonList slot="content">
                  {produit.map((card, index) => {
                    return (
                      <IonItem>
                        <IonLabel>{card.product_name}</IonLabel>
                        <IonLabel>{card.product_quantity}</IonLabel>
                        <IonLabel>{card.total_price}</IonLabel>
                      </IonItem>
                    );
                  })}
                </IonList>
              </IonAccordion>
            </IonAccordionGroup>

            {statut >= 3 ? null : (
              // choiceacces === "aucun" ||
              //   choiceacces === "principal"
              //    ?
              <>
                {progress ? (
                  <>
                    {/* <IonProgressBar
                      type="indeterminate"
                      className="mt-3"
                    ></IonProgressBar> */}
                    <div>
                      <div className="progress-container">
                        <div
                          className="progress-barrrs"
                          style={{ width: `${progressWidth}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-center text-xl text-neutral-800 mt-4">
                        <span className="ml-0">Chargement des données</span>
                        <div className="ml-3 dot-spinner">
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                        </div>
                      </div>
                      {/* <div className="step-container">
                      <div
                        className={`step ${currentStep <= 5 ? "active" : ""}`}
                      >
                        Étape 1
                      </div>
                      <div
                        className={`step ${currentStep >= 6 ? "active" : ""}`}
                      >
                        Étape 2
                      </div>
                    </div> */}
                    </div>
                  </>
                ) : (
                  <>
                    <IonCol>
                      <IonButton
                        color="success"
                        onClick={() => {
                          majstatut(statut1);
                          // console.log(produit);
                        }}
                      >
                        Mettre à jour le status
                      </IonButton>
                    </IonCol>
                  </>
                )}
              </>
            )}

            {/* //  : (
            //   <IonCol>
            //     <IonButton color="success">Mettre à jour le status</IonButton>
            //   </IonCol>
            // )} */}
          </IonList>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Status mis à jour avec  succès"
            icon={informationCircle}
            position="top"
            duration={3000}
          />
          <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="Passez à un autre status avant de la mettre à jour"
            icon={informationCircle}
            position="top"
            duration={3000}
          />
          <IonToast
            isOpen={showToast3}
            onDidDismiss={() => setShowToast3(false)}
            message="Vous ne pouvez pas passez à un status anterieur !"
            icon={informationCircle}
            position="top"
            duration={3000}
          />
        </IonContent>
      </IonApp>
    </>
  );
};
