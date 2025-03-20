/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonApp,
  IonContent,
  IonList,
  IonItem,
  IonRow,
  IonCol,
  IonInput,
  IonGrid,
  IonLabel,
  IonMenuButton,
  IonThumbnail,
  IonAvatar,
  IonBadge,
  IonImg,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonCardSubtitle,
  IonFooter,
  IonLoading,
  IonSpinner,
  IonModal,
  IonToast,
  IonProgressBar,
} from "@ionic/react";
import {
  arrowBack,
  arrowForward,
  checkmarkSharp,
  closeCircle,
  closeCircleOutline,
  informationCircle,
  trash,
  trashOutline,
  trashSharp,
} from "ionicons/icons";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper";
import "./paniermodal.css";
import { PanierItem } from "./PanierItem";
import "./swip.css";
import { tab5 } from "./PanierItem";
// import { RDVV } from '../../pages/Home';
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
  vider,
} from "../../Feature/PanierSlice";
import toast, { Toaster } from "react-hot-toast";
import { recupProduct } from "../../Feature/ProductSlice";
import { recupCommande, recupCommandeart } from "../../Feature/CommandeSlice";
import { setcaisse, sethisto_tresorerie } from "../../Feature/CaisseSlice";
import { setdeclenche1 } from "../../Feature/DeclencheursSlice";
import { format } from "date-fns";
import { async } from "rxjs";

// export const Tableau13 = (namet: boolean, prenomt: number) => [
//   {
//     Formation: namet,
//     Cible: prenomt,
//   },
// ];

export let tab4 = 12;

const aff = () => {
  setTimeout(() => {
    tab4 = 12;
  }, 500);
  tab4 = 14;
};
export const atr = () => {
  console.log("er");
};

// interface Ajout_utiliformprops {
//   // nom: String;
//   // prenom: String;

//   Panier: [][];
//   trigg: () => void;
// }

const Paniermodal = ({ Panier, trigg }) => {
  const [idant, setIdant] = useState(
    parseInt(window.location.pathname.split("/")[2])
  );
  // const [panier, setPanier] = useState<any[]>(useSelector((state:any) => state.panier.panier));
  const [showmodal, setShowmodal] = useState(false);
  const [verif, setverif] = useState(false);

  const [totalquant, setTotalquant] = useState(0);
  const [totalprix, setTotalprix] = useState(0);
  const [invoice, setInvoice] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [sexe, setSexe] = useState("");
  const [trashed, setTrash] = useState(false);
  const [edited, setEdited] = useState(false);
  const [telephone2, setTelephone2] = useState(0);
  const [quartier, setQuartier] = useState("Quartier");
  const [ville, setVille] = useState("Ville");
  const [maison, setMaison] = useState("Maison");
  const [adresse, setAdresse] = useState("");
  let [antecedants, setAntecedants] = useState(" ");
  let [date, setdate] = useState("");
  const [remarque, setRemarque] = useState(" ");
  // const [commande, setCommande] = useState();
  const trigger = useSelector((state) => state.panier.trigg);
  const [showLoading, setShowLoading] = useState(true);
  const [zer, setZer] = useState(useSelector((state) => state.panier.panier));
  // const [trigger, setTrigger] = useState<any>(
  //   useSelector((state) => state.panier.trigg)
  // );
  const [progress1, setprogress1] = useState(false);
  let panier = useSelector((state) => state.panier.panier);
  const badge = useSelector((state) => state.Hash.badge);
  const boutiquecompte = useSelector((state) => state.Hash.boutiquecompte);

  const [reclusia, setRec] = useState([]);

  // const Regex = /^\+229\d{8}$/;
  const Regex = /^\+\d{1,3}\d{8,9}$/;

  const [showToast1, setShowToast1] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [progress, setprogress] = useState(false);
  let commande = "";
  const userid = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const choiceacces = useSelector((state) => state.Hash.choiceacces);

  const caisse_value = useSelector((state) => state.Caisse.caisse);

  const [datedebut, setDatedebut] = useState();
  const [dateserveur, setdateserveur] = useState("");
  const [datedebutt, setDatedebutt] = useState();

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
    let timer;

    const startTimer = () => {
      setTimerRunning(true);
      timer = setTimeout(() => {
        // Vérification de l'état de la variable après 1 minute
        // if (progress) {
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
          getCaisse(invoicer);
        }
        // }

        setTimerRunning(false);
      }, 60000); // 1 minute = 60000 millisecondes
    };

    if (isTimerRunning) {
      startTimer();
    }

    return () => clearTimeout(timer); // Nettoyage du timer lors du démontage du composant
  }, [isTimerRunning]);

  const handleClick = () => {
    setTimerRunning(true);
  };

  const recup_date_server = () => {
    Axios.get("https://backendtrader.digitalfirst.space/date_time").then(
      (res) => {
        // setdateserveur(res.data[0].time_actu);
        setDatedebut(format(Date.parse(res.data[0].time_actu), "yyyy-MM-dd"));
        setdateserveur(res.data[0].time_actu);
      }
    );
  };

  const getpan = () => {
    // fetch('https://backendtrader.digitalfirst.space/affichepanier').then((res) => {
    //     const data = res.json()
    //     return data
    // }).then((data) => {
    //     setPanier(data);
    //     setInvoice(data[0].invoice);
    // })
    setTotalquant(
      panier
        .map((e) => e.product_quantity)
        .reduce((prev, curr) => prev + curr, 0)
    );
    setTotalprix(
      panier.map((e) => e.total_price).reduce((prev, curr) => prev + curr, 0)
    );

    for (var i = 0; i < panier.length; i++) {
      commande = [
        ...commande,
        panier[i].product_name + "x" + panier[i].product_quantity,
      ];
    }
  };
  const suppression = (ide) => {
    Axios.delete(`https://backendtrader.digitalfirst.space/deletepan/${ide}`);
    getpan();
    aff();
    getpan();
  };

  const calc = () => {
    console.log(whatsapp);

    if (whatsapp.match(Regex)) {
      envoi1();
    } else {
      setShowToast1(true);
    }
  };

  const envoi1 = () => {
    console.log(userid.BoutiqueId);
    console.log(panier[0].product_id);
    console.log(
      String(panier[0].quantifiable_product) === "oui"
        ? parseInt(panier[0].stock) - parseInt(panier[0].product_quantity)
        : 0
    );
    console.log(
      parseInt(panier[0].total_sold) + parseInt(panier[0].product_quantity)
    );
    console.log(panier[0].quantifiable_product);
    const tempsEnMillisecondes = Date.parse(dateserveur);
    const dateActuelle = Math.floor(tempsEnMillisecondes / 1000);
    setprogress(true);
    // dispatch(setdeclenche1(true));
    // dispatch(setdeclenche1(false));

    // toast.loading(
    //   "Opération en cours de traitement....\n\nVeuillez patienter.",
    //   {
    //     duration: 6000,
    //   }
    // );
    console.log("1ere etape");
    if (parseInt(panier.length) > 0) {
      setTimeout(() => {
        setCurrentStep(1);
      }, 500);
      setTimeout(() => {
        setCurrentStep(2);
      }, 1000);

      console.log(userid.BoutiqueId, "boutique ID");
      console.log(
        boutiquecompte.find((t) => t.id === badge).whatsapp === "<empty string>"
          ? ""
          : boutiquecompte.find((t) => t.id === badge).whatsapp
      );

      // Axios.post("https://backendtrader.digitalfirst.space/ajoutventeList", {
      //   panier: panier,
      //   tail: parseInt(panier.length),
      //   whatsapp:
      //     boutiquecompte.find((t) => t.id === badge).whatsapp ===
      //     "<empty string>"
      //       ? ""
      //       : boutiquecompte.find((t) => t.id === badge).whatsapp,
      //   id_boutique: userid.BoutiqueId,
      // }).then((ret) => {
      //   console.log(ret.data);
      //   envoi(ret.data);
      //   // setprogress(false);
      // });
      console.log(panier, "valeur du panier juste avant la fonction");

      Axios.post(
        "https://backendtrader.digitalfirst.space/ajoutventeList",
        {}
      ).then((ret) => {
        console.log(ret.data, "valeur attendus");
        console.log(panier, "valeur du panier");
        const promises = [];
        for (let index = 0; index < panier.length; index++) {
          const promise = Axios.post("https://backendtrader.digitalfirst.space/ajoutventeList2", {
            whatsapp: "",
            id_boutique: userid.BoutiqueId,
            product_quantity: panier[index].product_quantity,
            total_price: panier[index].total_price,
            unite_price: panier[index].unite_price,
            product_name: panier[index].product_name,
            product_id: panier[index].product_id,
            stock: panier[index].stock,
            invoice: ret.data,
            total_sold: panier[index].total_sold,
            quantifiable_product: panier[index].quantifiable_product,
            command_date: verif ? datedebutt : dateActuelle,
          }).then((rets) => {
            console.log(rets.data, "inserted");
            setTimeout(() => {
              setCurrentStep(3);
            }, 1000);
          });
          promises.push(promise);
        }
        Promise.all(promises).then(() => {
          envoi(ret.data);
        });
      });
    } else {
      setShowToast3(true);
      setprogress(false);
      // setprogress1(false);
    }
  };
  const suppr = () => {
    fetch("https://backendtrader.digitalfirst.space/supprpan", {}).then(
      (data) => {
        if (data) {
        } else {
        }
      }
    );
    getpan();
    aff();
  };

  const envoi = (ide) => {
    setTimeout(() => {
      setCurrentStep(4);
    }, 1000);
    const tempsEnMillisecondes = Date.parse(dateserveur);
    const dateActuelle = Math.floor(tempsEnMillisecondes / 1000);

    Axios.post("https://backendtrader.digitalfirst.space/ajoutvente", {
      totalquant: totalquant,
      totalprix: totalprix,
      invoice: ide,
      whatsapp: "",
      // boutiquecompte.find((t: any) => t.id === badge).whatsapp ===
      // "<empty string>"
      //   ? ""
      //   : boutiquecompte.find((t: any) => t.id === badge).whatsapp,
      id_boutique: userid.BoutiqueId,
      date: verif ? datedebutt : dateActuelle,
    }).then((ret) => {
      if (ret.data == "suc") {
        setTimeout(() => {
          setCurrentStep(5);
        }, 1000);
        console.log("vente ajoutée");
        console.log("2ere etape");
        envoi3(ide);
      } else {
      }
    });
  };

  const envoi3 = async (invoices) => {
    if (parseInt(panier.length) > 0) {
      // setinvoicer(invoices);
      console.log(progress);
      // if (progress) {
      setTimeout(() => {
        setCurrentStep(6);
      }, 1000);
      const last_caisse = caisse_value[0].caisse;
      console.log(last_caisse);
      const end_caisse = parseInt(last_caisse) + totalprix;
      console.log(end_caisse);
      console.log("ici");

      for (let index = 0; index < panier.length; index++) {
        const tt =
          parseInt(panier[index].stock) -
          parseInt(panier[index].product_quantity);
        const ti =
          parseInt(panier[index].total_sold) +
          parseInt(panier[index].product_quantity);
        await Axios.post("https://backendtrader.digitalfirst.space/reducquant", {
          id_boutique: userid.BoutiqueId,
          product_id: panier[index].product_id,
          stock: panier[index].quantifiable_product == "oui" ? tt : 0,
          total_sold: ti,
          quantifiable_product: panier[index].quantifiable_product,
          caisse: end_caisse,
        }).then((rets) => {
          console.log(rets.data, "inserted FASTER");
          setTimeout(() => {
            setCurrentStep(3);
          }, 1000);
        });
      }
      console.log("labas");

      Axios.post("https://backendtrader.digitalfirst.space/afficheart", {
        id_boutique: userid.BoutiqueId,
      }).then((ret) => {
        dispatch(recupProduct(ret.data));
        console.log(ret.data);
        Axios.post("https://backendtrader.digitalfirst.space/affichecommande", {
          id_boutique: userid.BoutiqueId,
        }).then((ret) => {
          dispatch(recupCommande(ret.data));
          Axios.post(
            "https://backendtrader.digitalfirst.space/affichecommandeart",
            {
              id_boutique: userid.BoutiqueId,
            }
          ).then((ret) => {
            dispatch(recupCommandeart(ret.data));
            setTimeout(() => {
              setCurrentStep(7);
            }, 1000);
            // settache(true);
            getCaisse(invoices);
            console.log("3ere etape");
          });
        });
      });
      // }
    } else {
      setShowToast3(true);
    }
  };

  const refr = () => {
    Axios.post("http://127.0.0.1:8000/api/auth/checkToken", {
      token: "",
    }).then((ret) => {
      if (ret.data.success) {
        console.log("success");
      } else {
        console.log("non success");
      }
    });
  };

  const getCaisse = (invoices) => {
    Axios.post("https://backendtrader.digitalfirst.space/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setcaisse(ret.data));
      setTimeout(() => {
        setCurrentStep(8);
      }, 1000);
      add_tresorerie(invoices);
    });
  };
  const add_tresorerie = (invoices) => {
    console.log(invoices, "invoice crée");
    console.log(totalprix, "totalprix vendus");
    const last_caisse = caisse_value[0].caisse;
    console.log(last_caisse);
    const end_caisse = parseInt(last_caisse) + totalprix;
    console.log(end_caisse);
    Axios.post("https://backendtrader.digitalfirst.space/addtresorerie", {
      id_boutique: userid.BoutiqueId,
      montant: totalprix,
      last_caisse: last_caisse,
      end_caisse: end_caisse,
      type: "caisse",
      invoice: invoices,
    }).then((ret) => {
      console.log(ret.data);
      setTimeout(() => {
        setCurrentStep(9);
      }, 1000);
      gethisto_tresorerie();
    });
  };

  const gethisto_tresorerie = () => {
    Axios.post("https://backendtrader.digitalfirst.space/histo_tresorerie", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_tresorerie(ret.data));
      setTimeout(() => {
        setCurrentStep(10);
      }, 1000);
      setTimeout(() => {
        setShowToast2(true);
        dispatch(setdeclenche1(false));
        dispatch(vider(""));
        dispatch(dec(!trigger));
        setShowmodal(false);
        setprogress(false);
      }, 2000);
    });
  };
  useEffect(() => {
    getpan();
    recup_date_server();
  }, []);

  useEffect(() => {
    getpan();
  }, [trigger]);

  useEffect(() => {
    if (caisse_value[0]) {
      console.log(caisse_value[0].caisse);
    }
    console.log(userid.userId);
  }, [caisse_value]);

  return (
    <>
      <IonContent fullscreen>
        <IonList lines="full" class="ion-no-margin">
          <IonList>
            {panier.map((val, key) => {
              return (
                <PanierItem
                  Id={val.product_id}
                  Stock={val.stock}
                  Add={val.product_quantity}
                  Name={val.product_name}
                  Unit={val.unite_price}
                  Total={val.total_price}
                  Ig={val.picture1}
                />
              );
            })}
          </IonList>
        </IonList>
      </IonContent>
      <IonFooter className={progress ? "p-2 cartFooters" : "cartFooter"}>
        <div className="mb-2">
          <IonItem lines="none">
            <IonLabel position="stacked" className="mb-2">
              <h2 className="text-xl labh">Date de la vente </h2>
            </IonLabel>
            <IonInput
              color="dark"
              className="border-1 rounded-sm shadow-md border-x-stone-400"
              type="date"
              value={datedebut}
              onIonChange={(e) => {
                setDatedebutt(
                  Math.floor(new Date(e.detail.value).getTime() / 1000)
                );
                // setDatedebutt(new Date(e.detail.value).getTime());
                setDatedebut(format(new Date(e.detail.value), "yyyy-MM-dd"));
                setverif(true);
              }}
            // onIonChange={(e) => {
            //   console.log((new Date(e.detail.value)).getTime());
            // }}
            ></IonInput>
          </IonItem>
        </div>
        {progress ? (
          <>
            {/* <IonProgressBar
              type="indeterminate"
              className="mt-3"
            ></IonProgressBar> */}
            <div className="mt-1">
              <div className="progress-container">
                <div
                  className="progress-barrrs"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-center text-xl text-neutral-800 mt-3">
                <span className="ml-0">Chargement des données</span>
                <div class="ml-3 dot-spinner">
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
                  <div class="dot-spinner__dot"></div>
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
            {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
            <div className="cartCheckout">
              <IonCardSubtitle>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XOF",
                }).format(totalprix)}
              </IonCardSubtitle>
              <IonButton
                color="dark"
                onClick={() => {
                  handleClick();
                  envoi1();
                  // console.log(panier);
                  // setShowmodal(true)
                }}
              >
                <IonIcon icon={checkmarkSharp} />
                &nbsp;Enrégistrer
              </IonButton>
            </div>
            {/* ) : (
              <div className="cartCheckout">
                <IonCardSubtitle>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "XOF",
                  }).format(totalprix)}
                </IonCardSubtitle>
                <IonButton color="dark">
                  <IonIcon icon={checkmarkSharp} />
                  &nbsp;Enrégistrer
                </IonButton>
              </div>
            )} */}
          </>
        )}
      </IonFooter>

      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Veuillez entrer un numéro valide"
        icon={informationCircle}
        position="top"
        duration={3000}
      />
      <IonToast
        isOpen={showToast4}
        onDidDismiss={() => setShowToast4(false)}
        message="Vente non éffectuer ! veuillez vérifier votre connection "
        icon={informationCircle}
        position="top"
        duration={3000}
      />

      <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Vente enregistrée"
        icon={informationCircle}
        position="top"
        buttons={[
          {
            text: "fermer",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ]}
      />
      <IonToast
        isOpen={showToast3}
        onDidDismiss={() => setShowToast3(false)}
        message="Veuillez ajouter un produit"
        icon={informationCircle}
        position="top"
        duration={3000}
      />
    </>
  );
};

export default Paniermodal;
