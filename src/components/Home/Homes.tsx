/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import { ModalExample1 } from "./ModalExample1";
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
  IonMenu,
  IonMenuToggle,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonAccordionGroup,
  IonAccordion,
} from "@ionic/react";
import About from "./About";
import "./homes.css";
import {
  triangle,
  ellipse,
  square,
  arrowBack,
  arrowForward,
  personCircleOutline,
  globeOutline,
  calendar,
  informationCircle,
  map,
  personCircle,
  chevronBack,
  link,
  menu,
  logOut,
  logOutOutline,
  menuOutline,
  personCircleSharp,
  personSharp,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
import { Conteneur1 } from "../Conteneur1";
import { Conteneur } from "../conteneur";
import Nouv2 from "../../pages/Nouvphy.js";
import { Ventes } from "../../components/pages/Ventes";
import Article from "../pages/Article";
import Homecom from "../../pages/Homecom";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
  vider,
  declien,
  deccont,
  recupPan,
} from "../../Feature/PanierSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  logOutt,
  recupUser,
  decc,
  setCredentials,
} from "../../Feature/auth/AuthSlice";

import { IonReactRouter } from "@ionic/react-router";
import Tab1 from "./Tab1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { ModalCom } from "../pages/ModalCom";
import {
  FaDiscord,
  FaListUl,
  FaOutdent,
  FaRegMoneyBillAlt,
  FaShopify,
} from "react-icons/fa";
import { AiOutlineBank, AiOutlineImport } from "react-icons/ai";
import {
  BsBoxArrowInLeft,
  BsCameraFill,
  BsDashCircle,
  BsFillHouseFill,
  BsShop,
} from "react-icons/bs";
import Axios from "axios";
import { setBadge, setBoutiquecompte, setdate } from "../../Feature/HashSlice";
import {
  setcaisse,
  sethisto_decaisse,
  sethisto_depense,
} from "../../Feature/CaisseSlice";
import { recupApprovision } from "../../Feature/ApprovisionSlice";
import { recupCateg, recupProduct } from "../../Feature/ProductSlice";
import { recupCommande, recupCommandeart } from "../../Feature/CommandeSlice";
import { recupApprovisionnement } from "../../Feature/ApprovisionnementSlice";
import { FiRefreshCw } from "react-icons/fi";
import "intro.js/introjs.css";
import introJs from "intro.js";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

// import { setUsercompte } from "../../Feature/HashSlice";

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

// export const Homes: React.FC<{}> = () => {
export const Homes: React.FC<{}> = () => {
  const [showmodal, setShowmodal] = useState<any>(false);
  const [showmodal2, setShowmodal2] = useState<any>(false);
  const [showmodal3, setShowmodal3] = useState<any>(false);
  const [showmodal4, setShowmodal4] = useState<any>(false);
  const [article, setArticlelist] = useState<any[]>(
    useSelector((state: any) => state.product.product)
  );
  let ar = useSelector((state: any) => state.product.product);
  let panier = useSelector((state: any) => state.panier.panier);
  let command1 = useSelector((state: any) => state.commande.commande);
  const [category, setCategoryList] = useState<any[]>([]);
  const [command, setCommandList] = useState<any[]>([]);
  const [prenom, setPrenom] = useState<String>("rr");
  const [age, setAge] = useState<any>(0);
  const [sexe, setSexe] = useState<String>("rr");
  const [groupee, setGroupee] = useState<String>("rr");
  const [nomCli, setNomCli] = useState<String>("rr");
  const [telephone, setTelephone] = useState<String>("rr");
  const [remarque, setRemarque] = useState<String>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("rr");
  const [credential, setcredential] = useState<String>("rr");
  const [dern1, setDern1] = useState<any>(0);
  const [dern2, setDern2] = useState<any>(0);
  const [dern3, setDern3] = useState<any>(0);
  const [accorde, setaccorde] = useState<any>(true);
  const [id, setId] = useState<number>(0);
  let lien = useSelector((state: any) => state.panier.lien);
  let wal = useSelector((state: any) => state.auth.whale);
  let far = useSelector((state: any) => state.auth.user.username);
  const boutiquecompte = useSelector((state: any) => state.Hash.boutiquecompte);
  const badge = useSelector((state: any) => state.Hash.badge);
  const userid = useSelector((state: any) => state.auth.user);
  const [user, setUser] = useState(false);
  const [progress, setprogress] = useState(false);
  const [invoice, setInvoice] = useState<any>("ee");
  const [statut, setStatut] = useState<any>();
  const [date, setDate] = useState<any>();
  const [prixt, setPrixt] = useState<any>("rr");
  const [whatsapp, setWhatsapp] = useState<any>();
  const [etatstat, setEtatstat] = useState<any>(false);

  // const [currentStep, setCurrentStep] = useState(2);
  // const totalSteps = 2;

  // const [badge, setbadge] = useState<any>(0);
  let username =
    JSON.parse(localStorage.getItem("store_name") + "") === ""
      ? far
      : JSON.parse(localStorage.getItem("store_name") + "");

  let numberwhat =
    JSON.parse(localStorage.getItem("whatsapp") + "") === ""
      ? ""
      : // ? "229 xxxxxxxxx"
        JSON.parse(localStorage.getItem("whatsapp") + "");
  const dispatch = useDispatch();

  const getpatient = () => {
    fetch("https://backendtrader.digitalfirst.space/afficheart")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setArticlelist(data);
        console.log(data);
      });
  };

  const getcat = () => {
    fetch("https://backendtrader.digitalfirst.space/affichecategory")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        setCategoryList(data);
      });
    // console.log(badge);
  };
  //   const addcomptee= ()=>{
  // console.log(usercompte);
  // for (let i = 0; i < usercompte.length; i++) {
  //   Axios.post("https://backendtrader.digitalfirst.space/addcompte", {
  //     username: usercompte[i].username,
  //     password: usercompte[i].password,
  //     email: usercompte[i].email,
  //   }).then((res)=>{
  // console.log(res.data);
  //   })
  // }
  // }

  const closemod = () => {
    if (lien > 0) {
      dispatch(declien(0));
    } else {
      setShowmodal(false);
    }
  };

  const redig = () => {
    console.log(id);
    //  { window.location.href = "/NouvDiag/:id" }
  };
  const redige = () => {
    {
      window.location.href = "/listepat";
    }
  };
  const rediger = () => {
    {
      window.location.href = "/diagnostic";
    }
  };

  const data = [
    {
      title: "Enrégistrer une vente",
      subtitle: "homecom",
      dec: (e: any) => {
        // setShowmodal(e);
      },
      id: 1,
    },
    {
      title: "Gérer les produits",
      subtitle: "Article",
      dec: (e: any) => {
        // setShowmodal2(e)
      },
      id: 2,
    },
    {
      title: "Historique des opérations",
      subtitle: "Historique/0",
      dec: (e: any) => {
        // setShowmodal3(e)
      },
      id: 3,
    },
    {
      title: "Finances et comptabilité",
      subtitle: "Finances",
      dec: (e: any) => {
        // setShowmodal4(e)
      },
      id: 4,
    },
    {
      title: "Caisse",
      subtitle: "caisse",
      dec: showmodal,
      id: 5,
    },
    {
      title: "Dépenses",
      subtitle: "depense",
      dec: (e: any) => {
        // setShowmodal4(e)
      },
      id: 6,
    },
    // {
    //     title: "Cosmétique",
    //     subtitle: "This is unknown",
    //     dec: showmodal,
    //     id: 6
    // }
  ];
  const subject = "lalalallaala";
  const body = "vitallllllll";
  const email = "mevivital@gmail.com";
  const envoiemail = () => {
    Axios.get(
      "https://backendtrader.digitalfirst.space/sendmail/sendMail.php?email=" +
        email +
        "&body=" +
        body +
        "&subject" +
        subject
      // "&email"+
      // email
    );
  };

  const selectboutique = (boutiqueid: any) => {
    dispatch(
      setCredentials({
        userId: userid.userId,
        username: userid.username,
        token: userid.token,
        auth: userid.auth,
        BoutiqueId: boutiqueid,
      })
    );
    window.location.href = "/home";
  };

  const profile_full = () => {
    try {
      Axios.post("https://backendtrader.digitalfirst.space/profile_full", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      }).then((ret) => {
        console.log(ret.data);
        localStorage.setItem("profile", JSON.stringify(ret.data));
        localStorage.setItem(
          "store_name",
          JSON.stringify(ret.data[0].store_name)
        );
        localStorage.setItem(
          "description",
          JSON.stringify(ret.data[0].description)
        );
        localStorage.setItem("adress", JSON.stringify(ret.data[0].adress));
        localStorage.setItem("email", JSON.stringify(ret.data[0].email));
        localStorage.setItem("website", JSON.stringify(ret.data[0].website));
        localStorage.setItem("facebook", JSON.stringify(ret.data[0].facebook));
        localStorage.setItem("whatsapp", JSON.stringify(ret.data[0].whatsapp));
        localStorage.setItem(
          "code_boutique",
          JSON.stringify(ret.data[0].boutiqueName)
        );
      });
    } catch (e) {}
  };

  const getCaisse = () => {
    Axios.post("https://backendtrader.digitalfirst.space/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setcaisse(ret.data));
    });
  };
  const gethisto_depense = () => {
    Axios.post("https://backendtrader.digitalfirst.space/histo_depense", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_depense(ret.data));
    });
  };
  const gethisto_decaissement = () => {
    Axios.post(
      "https://backendtrader.digitalfirst.space/histo_decaissement",
      {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      }
    ).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_decaisse(ret.data));
    });
  };

  const recupfullinfos = () => {
    dispatch(recupPan(JSON.parse(localStorage.getItem("panier") + "")));
    dispatch(recupUser(JSON.parse(localStorage.getItem("user") + "")));
    dispatch(
      recupApprovision(JSON.parse(localStorage.getItem("approvision") + ""))
    );
    Axios.post("https://backendtrader.digitalfirst.space/afficheart", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      dispatch(recupProduct(ret.data));
      console.log(ret.data);
      Axios.post(
        "https://backendtrader.digitalfirst.space/affichecategory",
        {
          id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        }
      ).then((ret) => {
        dispatch(recupCateg(ret.data));
        console.log(ret.data);
        Axios.post(
          "https://backendtrader.digitalfirst.space/afficheboutiqueparcompte",
          {
            idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
          }
        ).then((ret) => {
          dispatch(setBoutiquecompte(ret.data));
          dispatch(setBadge(parseInt(localStorage.getItem("badge") + "")));
          console.log(ret.data);
          Axios.post(
            "https://backendtrader.digitalfirst.space/affichecommande",
            {
              id_boutique: JSON.parse(localStorage.getItem("user") + "")
                .BoutiqueId,
            }
          ).then((ret) => {
            dispatch(recupCommande(ret.data));
            console.log(ret.data);
            Axios.post(
              "https://backendtrader.digitalfirst.space/affichecommandeart",
              {
                id_boutique: JSON.parse(localStorage.getItem("user") + "")
                  .BoutiqueId,
              }
            ).then((ret) => {
              dispatch(recupCommandeart(ret.data));
              console.log(ret.data);
              Axios.post(
                "https://backendtrader.digitalfirst.space/afficheartapprov",
                {
                  id_boutique: JSON.parse(localStorage.getItem("user") + "")
                    .BoutiqueId,
                }
              ).then((ret) => {
                dispatch(recupApprovisionnement(ret.data));
                console.log(ret.data);
              });
            });
          });
        });
      });
    });
  };

  const sendapk = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("fileToUpload", file);

    Axios.post(
      "https://backendtrader.digitalfirst.space/upload_numerique.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        console.log(response);
        // console.log("Fichier téléversé avec succès.");
      })
      .catch((error) => {
        console.error("Erreur lors du téléversement du fichier.", error);
      });
  };
  const testdate = (nbJours: any) => {
    // const dateActuelle = new Date();
    // // Ajouter le nombre de jours saisi par l'utilisateur
    // dateActuelle.setDate(dateActuelle.getDate() + parseInt(nbJours));
    // // Afficher la date dans x jours
    // console.log(`Dans ${nbJours} jours, nous serons le ${dateActuelle.toLocaleDateString('fr-FR')}`);
    // Récupérer la date actuelle

    fetch("https://backendtrader.digitalfirst.space/date_time")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        const tempsEnMillisecondes = Date.parse(data[0].time_actu);

        // Créer un objet Date à partir des millisecondes
        const dateActuelle = new Date(tempsEnMillisecondes);
        // Ajouter le nombre de jours saisi par l'utilisateur
        dateActuelle.setDate(dateActuelle.getDate() + parseInt(nbJours));
        // Récupérer les composantes de la date
        const annee = dateActuelle.getFullYear().toString();
        // const annee = dateActuelle.getFullYear().toString().substring(2);
        const mois = (dateActuelle.getMonth() + 1).toString().padStart(2, "0");
        const jour = dateActuelle.getDate().toString().padStart(2, "0");
        // Afficher la date dans x jours
        console.log(
          `Dans ${nbJours} jours, nous serons le ${annee}-${mois}-${jour}`
        );
      });
  };

  const enregistr = () => {
    setprogress(true);
    Axios.post("https://backendtrader.digitalfirst.space/save_in_drive", {
      REFRESH_TOKEN: credential,
    }).then((ret) => {
      setprogress(false);
      console.log(ret.data + "reponse enregistrement ");
      // dispatch(sethisto_decaisse(ret.data));
    });
  };

  const googleUserInfos = (e: any) => {
    console.log(e);
    console.log(e.credential + "credentials");
    setcredential(String(e.credential));

    console.log(e.credential.email); // email
    console.log(e.credential.name); // nom
    console.log(e.credential.picture); // image
    console.log(e.credential.sub); // id

    // const decoded : {
    //   name: string,
    //   picture: String,
    //   sub: String,

    // } = jwt_decode(e.credential);
  };

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
    setShowmodal4(true);
  };

  const open = () => {
    openKkiapayWidget({
      amount: 1,
      api_key: "f360c365307f9afa1c1cded51173173beef6f22b",
      // sandbox: true,
      email: "mevivital@gmail.com",
      phone: "61940010",
      name: "viyt",
    });
  };

  function successHandler(response: any) {
    console.log(response);
  }

  useEffect(() => {
    // getpatient();
    getcat();

    // console.log(boutiquecompte[0].id);

    // getcommand();
  }, []);

  useEffect(() => {
    addKkiapayListener("success", successHandler);
    return () => {
      removeKkiapayListener("success");
    };
  }, []);

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id : ""
  //   })
  // }, []);

  // useEffect(() => {
  //   setCurrentStep(currentStep);
  // }, [currentStep]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // const showTutorial = localStorage.getItem('showTutorial');
  //     const step1Element = document.querySelector("#step1");
  //     const step2Element = document.querySelector("#step2");
  //     // if (showTutorial === null || showTutorial === 'true') {
  //     if (step1Element && step2Element) {
  //       introJs()
  //         .setOptions({
  //           steps: [
  //             {
  //               element: step1Element,
  //               intro: "Ceci est la première étape du tutoriel.",
  //               // tooltipClass: 'custom-class',
  //             },
  //             {
  //               element: step2Element,
  //               intro: "Ceci est la deuxième étape du tutoriel.",
  //               // tooltipClass: 'custom-class',
  //             },
  //           ],
  //           nextLabel: "Suivant",
  //           prevLabel: "Retour",
  //           doneLabel: "Terminer",
  //         })
  //         .start();
  //       // localStorage.setItem('showTutorial', 'false');
  //     }
  //     // }
  //   }, 200);
  // }, []);

  // useEffect(() => {
  //   profile_full();
  //   getCaisse();
  //   gethisto_decaissement();
  //   gethisto_depense();
  //   recupfullinfos();
  // }, [badge]);
  return (
    <>
      <IonMenu contentId="main-content">
        <div className="w-full  flex flex-col">
          <div className="flex mt-0 justify-between items-center bg-alice_blue-color2">
            {boutiquecompte.filter((t: any) => t.id == badge) &&
              boutiquecompte
                .filter((t: any) => t.id == badge)
                .map((bat: any) => {
                  return bat.image === "" ? (
                    <img
                      src="store.png"
                      alt=""
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={
                        boutiquecompte.filter((t: any) => t.id == badge) &&
                        `https://backendtrader.digitalfirst.space/uploads/${bat.image}`
                      }
                      alt=""
                      className="w-24 h-24 rounded-full object-fill"
                    />
                  );
                })}
            <div className="flex flex-col items-center justify-center m-3">
              <div className="w-10 h-10 items-center justify-center mb-3">
                <img src="brightness.png" alt="" className="object-cover" />
              </div>{" "}
              {/* <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                <img
                  src="save-instagram.png"
                  alt=""
                  className="w-5 h-5 items-center justify-center object-cover"
                />
              </div> */}
            </div>
          </div>

          <div className="slidenav">
            <div>
              {/* accordeon ionic */}
              <div className="">
                <IonAccordionGroup>
                  <IonAccordion value="first">
                    <IonItem slot="header">
                      <IonLabel>
                        <h3 className="mb-2">{username}</h3>
                        <p>{numberwhat}</p>
                      </IonLabel>
                    </IonItem>
                    {/* <IonItem slot="header" >
                  </IonItem> */}
                    <div className="ion-padding" slot="content">
                      <div className="flex flex-col">
                        {boutiquecompte.map((bout: any, index: any) => {
                          return (
                            <>
                              <IonMenuToggle>
                                <div
                                  className="flex w-full items-center justify-start mb-3"
                                  onClick={() => {
                                    dispatch(setBadge(bout.id));
                                    // console.log(bout.id);
                                    selectboutique(bout.id);
                                  }}
                                >
                                  <div className="w-10 h-10">
                                    {bout.image === "" ? (
                                      <img
                                        src="store.png"
                                        alt=""
                                        className="w-10 h-10 object-cover rounded-full"
                                      />
                                    ) : (
                                      <img
                                        src={`https://backendtrader.digitalfirst.space/uploads/${bout.image}`}
                                        alt=""
                                        className="w-10 h-10 object-cover rounded-full"
                                      />
                                    )}

                                    {badge == bout.id ? (
                                      <img
                                        src="correct.png"
                                        alt=""
                                        className="w-4 h-4 object-cover badgecor"
                                      />
                                    ) : null}
                                  </div>
                                  <h2 className="text-lg text-gray-900">
                                    {bout.store_name === ""
                                      ? bout.boutiqueName
                                      : bout.store_name}
                                  </h2>
                                </div>
                              </IonMenuToggle>
                            </>
                          );
                        })}
                        <IonMenuToggle>
                          <IonRouterLink
                            routerLink="/addboutique"
                            className="text-black"
                          >
                            <div className="justify-start items-center flex mt-2 ml-1">
                              <img
                                src="add.png"
                                alt=""
                                className="w-7 h-7 object-cover"
                              />
                              <h3 className="text-lg mt-2">
                                Ajouter une boutique{" "}
                              </h3>
                            </div>
                          </IonRouterLink>
                        </IonMenuToggle>
                      </div>
                    </div>
                  </IonAccordion>
                </IonAccordionGroup>
              </div>
              {/* <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <div className="flex justify-between items-center">
                    <div
                      className="flex flex-col justify-center items-start ml-2"
                      id="headingOne"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      onClick={() => {
                        setaccorde(!accorde);
                      }}
                    >
                      <h1 className="text-xl">{username}</h1>
                      <h3 className="text-sm ml-0 text-gray-700">
                        {"+" + numberwhat}
                      </h3>
                    </div>
                    {accorde ? (
                      <div
                        className="w-5 h-5 m-3"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        onClick={() => {
                          setaccorde(!accorde);
                        }}
                      >
                        <img
                          src="arrow-up.png"
                          alt=""
                          className="w-5 h-5 object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-5 h-5 m-3"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        onClick={() => {
                          setaccorde(!accorde);
                        }}
                      >
                        <img
                          src="down-arrow.png"
                          alt=""
                          className="w-5 h-5 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <IonMenuToggle>
              <IonRouterLink
                routerLink="/create_droit_dacces"
                className="text-black"
              >
                <div className="justify-start items-center flex mt-7 ml-3">
                  <img
                    src="authorization.png"
                    alt=""
                    className="w-7 h-7 object-cover"
                  />
                  <h3 className="text-lg mt-2">Droit d'accès </h3>
                </div>
              </IonRouterLink>
            </IonMenuToggle> */}
            <IonMenuToggle>
              <IonRouterLink routerLink="/voir_profile" className="text-black">
                <div className="justify-start items-center flex mt-7 ml-3">
                  <img
                    src="resume.png"
                    alt=""
                    className="w-7 h-7 object-cover"
                  />
                  <h3 className="text-lg mt-2">Ma Boutique </h3>
                </div>
              </IonRouterLink>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonRouterLink
                routerLink="/demande_fonctionnalite"
                // onClick={()=>{window.location.href = "/demande_fonctionnalite"}}
                className="text-black"
              >
                <div className="justify-start items-center flex mt-7 ml-3">
                  <img
                    src="refresh.png"
                    alt=""
                    className="w-7 h-7 object-cover"
                  />
                  <h3 className="text-lg mt-2">Demander une fonctionnalité </h3>
                </div>
              </IonRouterLink>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonRouterLink
                routerLink="/partager"
                // onClick={()=>{window.location.href = "/demande_fonctionnalite"}}
                className="text-black"
              >
                <div className="justify-start items-center flex mt-7 ml-3 text-black">
                  <img
                    src="network.png"
                    alt=""
                    className="w-7 h-7 object-cover"
                  />
                  <h3 className="text-lg mt-2">Partager</h3>
                </div>
              </IonRouterLink>
            </IonMenuToggle>
            <IonMenuToggle>
              <div
                className="justify-start items-center flex mt-7 ml-3 text-black"
                onClick={() => {
                  const numUser = "22969889350";
                  const whats = `https://wa.me/${numUser}`;
                  {
                    window.location.href = whats;
                  }
                }}
              >
                <img
                  src="whatsapps.png"
                  alt=""
                  className="w-7 h-7 object-cover"
                />
                <h3 className="text-lg mt-2">Nous contactez</h3>
              </div>
            </IonMenuToggle>
            <IonMenuToggle>
              <div
                className="justify-start items-center flex mt-7 ml-3 text-black"
                onClick={() => {
                  const download = `https://versatileskills.space/download/Digital_Traders.apk`;
                  window.location.href = download;
                }}
              >
                <img
                  src="cloud-computing.png"
                  alt=""
                  className="w-7 h-7 object-cover"
                />
                <h3 className="text-lg mt-2"> Version client</h3>
              </div>
            </IonMenuToggle>
            <IonMenuToggle>
              <div
                className="justify-start items-center flex mt-7 ml-3"
                onClick={() => {
                  setTimeout(() => {
                    localStorage.setItem("authentificator", "false");
                  }, 1000);
                  dispatch(logOutt([]));
                }}
              >
                <img src="plug.png" alt="" className="w-7 h- 7object-cover" />
                <h3 className="text-lg mt-2">Se deconnecter</h3>
              </div>
            </IonMenuToggle>
          </div>
        </div>
        {/* <IonHeader>
          <IonToolbar>
            <IonTitle>{username}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonRouterLink routerLink="/voir_profile" color="dark">
          <IonMenuToggle>
            <IonItem lines="none" className="mt-3 cursor-pointer">
              <IonAvatar slot="start" className="ion-margin-top">
                <BsShop className="text-icon-color items-center text-2xl" />
              </IonAvatar>
              <IonLabel slot="">{username}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          </IonRouterLink> */}
        {/* <IonRouterLink routerLink="/voir_profile" color="dark">
            <IonMenuToggle>
              <IonItem lines="none" className="mt-3 cursor-pointer">
                <IonAvatar slot="start" className="ion-margin-top">
                  <IonIcon icon={personCircleOutline} size="large" />
                  <BsShop className="text-icon-color items-center text-2xl" />
                </IonAvatar>
                <IonLabel slot="">Mon Compte</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonRouterLink> */}
        {/* <IonRouterLink routerLink={"/depense"} color="dark">
            <IonMenuToggle>
              <IonItem lines="none" className="mt-3 cursor-pointer">
                <IonAvatar slot="start" className="ion-margin-top">
                  <IonIcon icon={personCircleOutline} size="large" />
                  <FaRegMoneyBillAlt className="text-icon-color items-center text-2xl" />
                </IonAvatar>
                <IonLabel slot="">Dépense</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonRouterLink> */}
        {/*           
          <IonRouterLink routerLink={"/decaissement"} color="dark">
            <IonMenuToggle>
              <IonItem lines="none" className="mt-3 cursor-pointer">
                <IonAvatar slot="start">
                  {/* <IonIcon icon={personCircleOutline} size="large" /> */}
        {/* <AiOutlineBank className="text-icon-color items-center text-4xl" />
                </IonAvatar>
                <IonLabel slot="">Décaissement</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonRouterLink> 
        
        */}

        {/* <IonItem
            lines="none"
            className="mt-3 cursor-pointer"
            onClick={() => {
              dispatch(logOutt([]));
            }}
          >
            <IonAvatar slot="start" className="ion-margin-top">
              <IonIcon icon={personCircleOutline} size="large" />
              <AiOutlineImport className="text-icon-color items-center text-2xl" />
            </IonAvatar>
            <IonLabel slot="">Se deconnecter</IonLabel>
          </IonItem> */}
        {/* </IonContent> */}
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <div className="flex justify-between items-center">
              <IonMenuButton color="dark"></IonMenuButton>

              <IonTitle className="nereide">Digital trader</IonTitle>

              <IonButtons
                slot="end"
                className="mr-5 text-xl cursor-pointer"
                onClick={() => {
                  window.location.href = "/home";
                }}
              >
                <FiRefreshCw />
              </IonButtons>
            </div>
            {/* <IonButtons slot="start">
          
              <IonMenuButton color="dark"></IonMenuButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="alice">
          <IonModal
            isOpen={showmodal4}
            onDidDismiss={() => {
              setShowmodal4(false);
            }}
          >
            <ModalCom
              onclose={() => {
                setShowmodal4(false);
                // getcom();
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large" className="page-title">
                <IonLabel>Tableau</IonLabel>
                <IonNote> de Bord</IonNote>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList className="alice">
            <div className="homes">
              <IonGrid
                className="grid1"
                onClick={() => {
                  // { window.location.href = ` /home/Ventes ` };
                }}
                id="step1"
              >
                <div className="Titre22">
                  <IonCol className="silk" size="7">
                    Vos commandes en attente{" "}
                  </IonCol>
                  {/* <IonRouterLink routerLink={} color="dark"> */}
                  <p
                    className="cursor-pointer para"
                    onClick={() => {
                      window.location.href = `/Historique/${1}`;
                    }}
                  >
                    Tout voir
                  </p>
                  {/* </IonRouterLink> */}
                </div>
                {command1.filter((e: any) => e.status_id_command < 3).length ==
                0 ? (
                  <div className="items-center justify-center text-center">
                    <img className="" src="delai-de-traitement.png" alt="d" />
                    <h2 className="items-center justify-center text-center">
                      aucune commande en attente
                    </h2>
                  </div>
                ) : (
                  <>
                    {command1
                      .filter((e: any) => e.status_id_command < 3)
                      .map((card: any, index: any) => {
                        return index >= 5 ? null : (
                          // index <
                          //   command1.filter((e: any) => e.status_id_command < 3)
                          //     .length -
                          //     4 ? null :
                          <IonItem
                            className="cursor-pointer itemlv nereide"
                            lines="full"
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
                            <IonCol className="add1">{card.whatsapp}</IonCol>
                            <IonCol>{card.date.split("T")[0]}</IonCol>
                            <IonCol>
                              {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "XOF",
                              }).format(card.total_price)}
                            </IonCol>
                          </IonItem>
                        );
                      })}
                  </>
                )}
              </IonGrid>

              {/* <IonRouterLink routerLink="/Testsendimage">
                <IonButton>ccc</IonButton>
              </IonRouterLink> */}
              {/* <div
                onClick={() => testdate(500)}
                className="cursor-pointer bg-green-400 p-3 rounded-md mt-3"
              >
                Test img
              </div>

              <div className="cursor-pointer bg-green-400 p-3 rounded-md mt-3">
                <label htmlFor="fileToUpload" className="flex gap-3">
                  <BsDashCircle className="text-xl text-white" /> send apk or
                  exe or zip
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="fileToUpload"
                    name="fileToUpload"
                    onChange={sendapk}
                  />
                </label>
              </div> */}

              {/* {user ? (
                <div>Connecté</div>
              ) : (
                <div className="mt-4">
                  <GoogleLogin
                    onSuccess={(response) => {
                      googleUserInfos(response);
                      setUser(true);
                    }}
                    onError={() => console.log("Erreur")}
                  />
                </div>
              )}

              {user ? (
                <div className="flex items-center justify-center gap-2">
                  <IonButton
                    onClick={() => {
                      googleLogout();
                      setUser(false);
                    }}
                  >
                    Se Déconnecter
                  </IonButton>
                  {progress ? (
                    <div className="three-body">
                      <div className="three-body__dot"></div>
                      <div className="three-body__dot"></div>
                      <div className="three-body__dot"></div>
                    </div>
                  ) : (
                    <IonButton
                      onClick={() => {
                        enregistr();
                      }}
                    >
                      enregistrer
                    </IonButton>
                  )}
                </div>
              ) : // <div>''''</div>
              null} */}

              {/* <div className="mt-3 flex flex-col justify-center items-center w-full">
                <IonButton
                  onClick={() => {
                    open();
                  }}
                >
                  Envoyer
                </IonButton>
              </div> */}
              {/* <div className="mt-3 flex flex-col justify-center items-center w-full">
                <IonButton
                  onClick={() => {
                    initializeDatabase();
                  }}
                >
                  Appeler
                </IonButton>
              </div> */}
              <IonGrid className="grid1" id="step2">
                <IonRow>
                  {data.map((card, index) => {
                    return (
                      <IonCol
                        key={index}
                        onClick={() => {
                          // { window.location.href = ` /home/${card.title} ` };
                          card.dec(true);
                        }}
                      >
                        <IonRouterLink
                          routerLink={`/${card.subtitle}`}
                          color="dark"
                        >
                          <Conteneur1 Titre={card.title} Desc={card.subtitle} />
                        </IonRouterLink>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>

              {/* <IonGrid className='grid1'>
                            <IonRow className='dry'>
                                {ar.map((card: any, index: any) => {
                                    return (

                                        <IonCol key={index} className='dril'>
                                            <Conteneur Nom={card.name}
                                                Prix={card.price}
                                                Id={card.id}
                                                Stock={card.stock}
                                                Ig={card.picture1}
                                                Panier={panier}
                                            />
                                        </IonCol>

                                    )
                                })}
                            </IonRow>
                        </IonGrid> */}

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
                  Gérer les produits
                </IonItem>
                <Article />
              </IonModal>

              <IonModal
                isOpen={showmodal}
                onDidDismiss={() => {
                  setShowmodal(false);
                }}
              >
                <IonHeader mode="ios">
                  <IonToolbar>
                    <IonButtons
                      slot="start"
                      onClick={() => {
                        closemod();
                      }}
                    >
                      <IonIcon icon={chevronBack} />
                    </IonButtons>
                    <IonTitle>Ajouter une commande</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <Homecom />
              </IonModal>
            </div>
          </IonList>
          {/* <div className="absolute top-0 right-2 cursor-pointer" onClick={()=>{console.log(7);}}>
          <FaOutdent className="text-icon-color text-4xl" />  
          <AiOutlineImport className="text-icon-color text-3xl"/>
          <BsBoxArrowInLeft className="text-icon-color text-3xl cursor-pointer" onClick={()=>{console.log(7);}}/>
          <IonIcon icon={logOutOutline}  size="large" />
        </div> */}
        </IonContent>
      </IonPage>
    </>
  );
};
