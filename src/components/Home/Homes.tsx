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
import CoffeeCard from "../CoffeeCard";
import { Conteneur1 } from "../Conteneur1";
import { Conteneur } from "../conteneur";
import Nouv2 from "../../pages/Nouv2.js";
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
import { BsBoxArrowInLeft, BsFillHouseFill, BsShop } from "react-icons/bs";
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
// import { setUsercompte } from "../../Feature/HashSlice";

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

export const Homes: React.SFC<{}> = () => {
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

  // const [badge, setbadge] = useState<any>(0);
  let username =
    JSON.parse(localStorage.getItem("store_name") + "") === ""
      ? far
      : JSON.parse(localStorage.getItem("store_name") + "");

  let numberwhat =
    JSON.parse(localStorage.getItem("whatsapp") + "") === ""
      ? "229 xxxxxxxx"
      : JSON.parse(localStorage.getItem("whatsapp") + "");
  const dispatch = useDispatch();

  const getpatient = () => {
    fetch("https://backend-shop.benindigital.com/afficheart")
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
    fetch("https://backend-shop.benindigital.com/affichecategory")
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
  //   Axios.post("https://backend-shop.benindigital.com/addcompte", {
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
      "https://backend-shop.benindigital.com/sendmail/sendMail.php?email=" +
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
      Axios.post("https://backend-shop.benindigital.com/profile_full", {
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
    Axios.post("https://backend-shop.benindigital.com/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setcaisse(ret.data));
    });
  };
  const gethisto_depense = () => {
    Axios.post("https://backend-shop.benindigital.com/histo_depense", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_depense(ret.data));
    });
  };
  const gethisto_decaissement = () => {
    Axios.post("https://backend-shop.benindigital.com/histo_decaissement", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
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
    Axios.post("https://backend-shop.benindigital.com/afficheart", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      dispatch(recupProduct(ret.data));
      console.log(ret.data);
      Axios.post("https://backend-shop.benindigital.com/affichecategory", {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      }).then((ret) => {
        dispatch(recupCateg(ret.data));
        console.log(ret.data);
        Axios.post(
          "https://backend-shop.benindigital.com/afficheboutiqueparcompte",
          {
            idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
          }
        ).then((ret) => {
          dispatch(setBoutiquecompte(ret.data));
          dispatch(setBadge(parseInt(localStorage.getItem("badge") + "")));
          console.log(ret.data);
          Axios.post("https://backend-shop.benindigital.com/affichecommande", {
            id_boutique: JSON.parse(localStorage.getItem("user") + "")
              .BoutiqueId,
          }).then((ret) => {
            dispatch(recupCommande(ret.data));
            console.log(ret.data);
            Axios.post(
              "https://backend-shop.benindigital.com/affichecommandeart",
              {
                id_boutique: JSON.parse(localStorage.getItem("user") + "")
                  .BoutiqueId,
              }
            ).then((ret) => {
              dispatch(recupCommandeart(ret.data));
              console.log(ret.data);
              Axios.post(
                "https://backend-shop.benindigital.com/afficheartapprov",
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

  useEffect(() => {
    // getpatient();
    getcat();

    // console.log(boutiquecompte[0].id);

    // getcommand();
  }, []);
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
        <IonMenuToggle>
          <div className="w-full h-48 bg-alice_blue-color2 flex flex-col">
            <div className="flex mt-6 justify-between items-center">
              {boutiquecompte
                .filter((t: any) => t.id === badge)&& boutiquecompte
                .filter((t: any) => t.id === badge)
                .map((bat: any) => {
                  return (
                    bat.image === "" ?  <img
                    src="store.png"
                    alt=""
                    className="w-24 h-24 rounded-full object-cover"
                  /> :  <img
                    src={ boutiquecompte
                      .filter((t: any) => t.id === badge) && `https://backend-shop.benindigital.com/uploads/${bat.image}`}
                    alt=""
                    className="w-24 h-24 rounded-full object-fill"
                  />
                   
                  );
                })}
              <div className="flex flex-col items-center justify-center m-3">
                <div className="w-10 h-10 items-center justify-center mb-3">
                  <img src="brightness.png" alt="" className="object-cover" />
                </div>{" "}
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                  <img
                    src="save-instagram.png"
                    alt=""
                    className="w-5 h-5 items-center justify-center object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="accordion" id="accordionExample">
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
                      <div className="flex flex-col">
                        {boutiquecompte.map((bout: any, index: any) => {
                          return (
                            <>
                              <div
                                className="flex w-full items-center justify-start mb-3"
                                onClick={() => {
                                  dispatch(setBadge(bout.id));
                                  // console.log(bout.id);
                                  selectboutique(bout.id);
                                }}
                              >
                                <div className="w-10 h-10">
                                  {bout.image === "" ?  <img
                                    src="store.png"
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-full"
                                  /> :  <img
                                  src={`https://backend-shop.benindigital.com/uploads/${bout.image}`}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded-full"
                                />}
                                 
                                  {badge === bout.id ? (
                                    <img
                                      src="correct.png"
                                      alt=""
                                      className="w-4 h-4 object-cover badgecor"
                                    />
                                  ) : null}
                                </div>
                                <h2 className="text-lg text-gray-900">
                                  {bout.store_name === "" ? bout.boutiqueName : bout.store_name}
                                </h2>
                              </div>
                            </>
                          );
                        })}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <IonRouterLink routerLink="/droit_dacces" className="text-black">
              <div className="justify-start items-center flex mt-7 ml-3">
                <img src="authorization.png" alt="" className="w-7 h-7 object-cover" />
                <h3 className="text-lg">Droit d'accès </h3>
              </div>
            </IonRouterLink>
            <IonRouterLink routerLink="/voir_profile" className="text-black">
              <div className="justify-start items-center flex mt-7 ml-3">
                <img src="resume.png" alt="" className="w-7 h-7 object-cover" />
                <h3 className="text-lg">Ma Boutique </h3>
              </div>
            </IonRouterLink>
            <div
              className="justify-start items-center flex mt-7 ml-3"
              onClick={() => {
                dispatch(logOutt([]));
              }}
            >
              <img src="plug.png" alt="" className="w-7 h- 7object-cover" />
              <h3 className="text-lg">Se deconnecter</h3>
            </div>
          </div>
        </IonMenuToggle>
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
            <IonButtons slot="start">
              {/* <IonButton onClick={() => {}}>
                <IonIcon color="medium" icon={menuOutline} />
              </IonButton> */}
              <IonMenuButton color="dark"></IonMenuButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="alice">
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
              <IonRouterLink routerLink={`/Historique/${1}`} color="dark">
                <IonGrid
                  className="grid1"
                  onClick={() => {
                    // { window.location.href = ` /home/Ventes ` };
                  }}
                >
                  <div className="Titre22">
                    <IonCol className="silk" size="7">
                      Vos commandes en attente{" "}
                    </IonCol>
                    <p className="para">Tout voir</p>
                  </div>
                  {command1.filter((e: any) => e.status_id_command < 3)
                    .length == 0 ? (
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
                          return index <
                            command1.filter((e: any) => e.status_id_command < 3)
                              .length -
                              4 ? null : (
                            <IonItem className="itemlv nereide" lines="full">
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
              </IonRouterLink>
              {/* <IonRouterLink routerLink="/Nouvc">
                <IonButton>ccc</IonButton>
              </IonRouterLink> */}
              {/* <div onClick={() => {addcomptee()}} className="cursor-pointer">cccccc</div> */}
              <IonGrid className="grid1">
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
