/* eslint-disable no-self-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonSplitPane,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToast,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Nouv from "./pages/Nouvpage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { DateTimeExamples } from "./components/DateTimeExamples";
import Articledesc from "./pages/article/Articledesc";
import Panier from "./pages/article/Panier";
import Nouv2 from "./pages/Nouvphy.js";
import PanierArt from "./components/articles/PanierArt";
import {
  homeOutline,
  listOutline,
  cogOutline,
  cart,
  person,
  logOut,
  informationCircle,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { recupPan } from "./Feature/PanierSlice";
import { recupProduct } from "./Feature/ProductSlice";
import { recupCateg } from "./Feature/ProductSlice";
import { recupCommande, recupCommandeart } from "./Feature/CommandeSlice";
import { recupApprovision } from "./Feature/ApprovisionSlice";
import { recupApprovisionnement } from "./Feature/ApprovisionnementSlice";
import { IonButton, useIonLoading } from "@ionic/react";
import Categories from "./components/articles/categorie";
import Article from "./components/pages/Article";
import Historique from "./components/pages/Historique";
import Homecom from "./pages/Homecom";
import { createAnimation } from "@ionic/react";
import Nouv1 from "./pages/Modifphy";
import { Ventes } from "./components/pages/Ventes";
import Axios from "axios";
import {
  setaccescompteprincipal,
  setaccescomptesecondaire,
  setaccesparcompte,
  setBadge,
  setBoutiquecompte,
  setchoiceacces,
  setdate,
  setPassacces,
} from "./Feature/HashSlice";
import {
  logOutt,
  recupUser,
  decc,
  setCredentials,
} from "./Feature/auth/AuthSlice";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./components/Home/Register";
import Login from "./components/Home/Login";
import License from "./components/Home/Licence";
import { FuncAuth } from "./FonctionsGlobales";
import Profile from "./components/Home/Profile";
import Voir_profile from "./components/Home/Voir_profile";
import Version from "./components/Home/Version";
import Depense from "./components/Home/Depense";
import Nouvc from "./components/Home/Nouvc";
import Decaissement from "./components/Home/Decaissement";
import {
  setcaisse,
  sethisto_decaisse,
  sethisto_depense,
  sethisto_tresorerie,
} from "./Feature/CaisseSlice";
import Nouvpage from "./pages/Nouvpage";
import Caisse from "./components/Home/Caisse";
import Version1 from "./components/Home/Partager";
import { ModalComAdd } from "./components/pages/ModalComAdd";
import { FinancesCompta } from "./components/pages/FinancesCompta";
import { Finance } from "./components/pages/Finance";
import {
  FinancesComptaPeriod,
  FinancesComptaPeriodArt,
} from "./components/pages/FinancesComptaPeriod";
import Addboutique from "./components/Home/Addboutique";
import { DroitAcces } from "./components/Home/DroitAcces";
import Demande from "./components/Home/Demande";
import Acces from "./components/Home/Acces";
import Gestion_acces from "./components/Home/Gestion_acces";
import Forgotpassword from "./components/Home/Forgotpassword";
import Testsendimage from "./components/Testsendimage";
import Pricing from "./components/Home/Pricing";
import { Network } from "@capacitor/network";
import Detectnet from "./components/Detectnet";
import Typeofproduct from "./components/Home/Typeofproduct";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Partager from "./components/Home/Partager";
import Paiement from "./components/Home/Paiement";
import Onboarding from "./components/Home/Onboarding";

setupIonicReact();

// "homepage": "http://shop.benindigital.com/",

const App = () => {
  const dispatch = useDispatch();
  let user = useSelector((state: any) => state.auth.user);
  let wal = useSelector((state: any) => state.auth.whale);
  const [tour, setTour] = useState<any>(1);
  // const userid = useSelector((state: any) => state.auth.user);
  const [delaiactif, setDelaiactif] = useState(true);
  const [version, setversion] = useState(true);
  const [changeapp, setchangeapp] = useState(false);
  const [joursrest, setJoursrest] = useState(0);
  const [autt, setAutt] = useState<[]>([]);
  const [present, dismiss] = useIonLoading();
  const dateActu = useSelector((state: any) => state.Hash.date_actu);
  let comm = [].concat(useSelector((state: any) => state.commande.commande));
  const boutiquecompte = useSelector((state: any) => state.Hash.boutiquecompte);
  const badge = useSelector((state: any) => state.Hash.badge);
  const userid = useSelector((state: any) => state.auth.user);

  const [showToast8, setShowToast8] = useState(false);

  const [network_status, setNetwork_status] = useState(true);

  const animationBuilder = (baseEl: any, opts: any) => {
    const enteringAnimation = createAnimation()
      .addElement(opts.enteringEl)
      .fromTo("opacity", 0, 1)
      .duration(250);

    const leavingAnimation = createAnimation()
      .addElement(opts.leavingEl)
      .fromTo("opacity", 1, 0)
      .duration(250);

    const animation = createAnimation()
      .addAnimation(enteringAnimation)
      .addAnimation(leavingAnimation);

    return animation;
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user") + "")) {
      console.log("user");

      profile_full();
      verifhash();
      console.log(delaiactif, "delaiactif");
      console.log(
        JSON.parse(localStorage.getItem("delaiactif") + ""),
        "delaiactif1"
      );
      setTimeout(() => {
        if (JSON.parse(localStorage.getItem("delaiactif") + "") === true) {
          console.log("user1");
          setTimeout(() => {
            if (window.location.pathname !== "/typeofproduct") {
              if (
                JSON.parse(localStorage.getItem("type_product") + "") === ""
              ) {
                window.location.href = "/typeofproduct";
              } else {
                userAuthentificated();
                verifacces();
                getVersion();
                console.log("====================================");
                console.log(user.auth, "valeurs de auth");
                console.log("====================================");
                try {
                  dispatch(
                    recupUser(JSON.parse(localStorage.getItem("user") + ""))
                  );
                  setAutt(JSON.parse(localStorage.getItem("user") + ""));
                  dispatch(
                    recupPan(JSON.parse(localStorage.getItem("panier") + ""))
                  );
                  dispatch(
                    recupApprovision(
                      JSON.parse(localStorage.getItem("approvision") + "")
                    )
                  );
                  dispatch(
                    setchoiceacces(localStorage.getItem("choiceacces") + "")
                  );
                } catch (e) {}
                // userAuthentificated();
                // verifhash();
                actu_time(); 
                profile_full();
                getaccescompteprincipal();
                getaccescomptesecondaire();
                getCaisse();
                gethisto_decaissement();
                gethisto_depense();
                gethisto_tresorerie();

                Axios.post(
                  "https://backendtrader.digitalfirst.space/afficheart",
                  {
                    id_boutique: JSON.parse(localStorage.getItem("user") + "")
                      .BoutiqueId,
                  }
                ).then((ret) => {
                  dispatch(recupProduct(ret.data));
                  console.log(ret.data);
                });

                // fetch('https://backendtrader.digitalfirst.space/afficheart').then((res) => {
                //   const data = res.json();
                //   return data
                // }).then((data) => {
                //   dispatch(recupProduct(data));
                //   console.log(data);
                // })

                try {
                  Axios.post(
                    "https://backendtrader.digitalfirst.space/affichecategory",
                    {
                      id_boutique: JSON.parse(localStorage.getItem("user") + "")
                        .BoutiqueId,
                    }
                  ).then((ret) => {
                    dispatch(recupCateg(ret.data));
                    console.log(ret.data);
                  });
                } catch (e) {}
                recupboutiqueuser();
                // try {
                //   Axios.post(
                //     "https://backendtrader.digitalfirst.space/afficheboutiqueparcompte",
                //     {
                //       idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
                //     }
                //   ).then((ret) => {
                //     dispatch(setBoutiquecompte(ret.data));
                //     dispatch(setBadge(parseInt(localStorage.getItem("badge") + "")));
                //     console.log(ret.data);
                //   });
                // } catch (e) {}

                Axios.post(
                  "https://backendtrader.digitalfirst.space/affichecommande",
                  {
                    id_boutique: JSON.parse(localStorage.getItem("user") + "")
                      .BoutiqueId,
                  }
                ).then((ret) => {
                  dispatch(recupCommande(ret.data));
                  console.log(ret.data);
                });

                Axios.post(
                  "https://backendtrader.digitalfirst.space/affichecommandeart",
                  {
                    id_boutique: JSON.parse(localStorage.getItem("user") + "")
                      .BoutiqueId,
                  }
                ).then((ret) => {
                  dispatch(recupCommandeart(ret.data));
                  // console.log(ret.data);
                });

                // try {
                //   fetch('https://backendtrader.digitalfirst.space/affichecommande').then((res) => {
                //     const data = res.json()
                //     return data
                //   }).then((data) => {
                //     dispatch(recupCommande(data));
                //   })
                // } catch (e) { };
                Axios.post(
                  "https://backendtrader.digitalfirst.space/afficheartapprov",
                  {
                    id_boutique: JSON.parse(localStorage.getItem("user") + "")
                      .BoutiqueId,
                  }
                ).then((ret) => {
                  dispatch(recupApprovisionnement(ret.data));
                  // console.log(ret.data);
                });

                recuppass_acces();
                recupallaccesboutique();

                // try {
                //   fetch('https://backendtrader.digitalfirst.space/afficheapprov').then((res) => {
                //     const data = res.json()
                //     return data
                //   }).then((data) => {
                //     dispatch(recupApprovisionnement(data));
                //   })
                // } catch (e) { };
                getCaisse();
                gethisto_decaissement();
                gethisto_depense();
                setTour(tour + 1);
                window.setInterval(() => {
                  if (window.location.pathname != "/logt") {
                    userAuthentificated();
                    actu_time();
                    verifhash();
                    profile_full();
                    getVersion();
                    getCaisse();
                    gethisto_decaissement();
                    gethisto_depense();
                    gethisto_tresorerie();
                    recupboutiqueuser();
                    recuppass_acces();
                    recupallaccesboutique();
                    getaccescompteprincipal();
                    getaccescomptesecondaire();
                    if (badge === 0) {
                      // dispatch(setBadge(boutiquecompte[0].id));
                    }
                  }
                }, 60000);
              }
            }
          }, 3000);
        } else {
          if (
            window.location.pathname !== "/licence" &&
            window.location.pathname !== "/pricing" &&
            window.location.pathname !== "/paiement" &&
            window.location.pathname !== "/logt" &&
            window.location.pathname !== "/reg"
          ) {
            window.location.href = "/licence";
          }
        }
      }, 2000);
    } else {
      if (window.location.pathname !== "/logt") {
        window.location.href = "/logt";
      }
      // if (window.location.pathname !== "/onboard") {
      //   window.location.href = "/onboard";
      // }
      // login();
    }
  }, []);

  const verifacces = () => {
    Axios.post(
      "https://backendtrader.digitalfirst.space/verif_create_acces",
      {
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      }
    ).then((ret) => {
      if (
        ret.data === "acces principal creer pour ce compte" &&
        !JSON.parse(localStorage.getItem("choiceacces") + "") &&
        window.location.pathname !== "/gestion_droit_dacces"
      ) {
        window.location.href = "/gestion_droit_dacces";
      }
    });
  };
  const recupboutiqueuser = () => {
    try {
      Axios.post(
        "https://backendtrader.digitalfirst.space/afficheboutiqueparcompte",
        {
          idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setBoutiquecompte(ret.data));
        dispatch(setBadge(parseInt(localStorage.getItem("badge") + "")));
        console.log(ret.data);
      });
    } catch (e) {}
  };

  const verifhash = () => {
    // console.log(user.auth);
    // const valo = parseInt(userid.userId);
    // console.log(8);
    Axios.post("https://backendtrader.digitalfirst.space/exithash", {
      id: JSON.parse(localStorage.getItem("user") + "").userId,
    }).then((ret) => {
      console.log(ret.data.message);
      if (ret.data.message === "il a un hash actif") {
        console.log("1");
        setDelaiactif(true);
        localStorage.setItem("delaiactif", "true");

        const y = new Date(ret.data.date_end);
        // const x = new Date(ret.data.date_start);
        console.log(JSON.parse(localStorage.getItem("dateActu") + ""));
        const x = new Date(JSON.parse(localStorage.getItem("dateActu") + ""));
        const date1utc = Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
        const date2utc = Date.UTC(y.getFullYear(), y.getMonth(), y.getDate());
        const dayunit = 1000 * 60 * 60 * 24;
        const numberday = (date2utc - date1utc) / dayunit;
        //const numberday = 8;
        console.log(numberday);
        if (numberday > 0 && numberday <= 10) {
          console.log("entre 1 et 10");
          setJoursrest(numberday);
          setDelaiactif(true);
          localStorage.setItem("delaiactif", "true");

          Axios.post(
            "https://backendtrader.digitalfirst.space/majvalidity",
            {
              id: ret.data.id_actif,
              validity: numberday,
            }
          ).then((ret) => {
            console.log(ret.data);
          });
        } else if (numberday < 0) {
          setJoursrest(0);
          console.log("en dessous de 0 OU EGAL A 0");
          setDelaiactif(false);
          localStorage.setItem("delaiactif", "false");

          Axios.post(
            "https://backendtrader.digitalfirst.space/majvalidhash",
            {
              id: ret.data.id_actif,
              status_hash: "NON ACTIF",
            }
          ).then((ret) => {
            console.log(ret.data);
            Axios.post(
              "https://backendtrader.digitalfirst.space/majvalidity",
              {
                id: ret.data.id_actif,
                validity: numberday,
              }
            ).then((ret) => {
              console.log(ret.data);
            });
          });
        } else if (numberday > 10) {
          console.log("AU DELA DE 10");
          setDelaiactif(true);
          localStorage.setItem("delaiactif", "true");

          Axios.post(
            "https://backendtrader.digitalfirst.space/validityday",
            {
              id: ret.data.id_actif,
              validity: numberday,
            }
          ).then((ret) => {
            console.log(ret.data);
          });
        }
      } else if (ret.data.message === "aucun hash actif") {
        setDelaiactif(false);
        localStorage.setItem("delaiactif", "false");

        console.log("2");
      } else if (ret.data.message === "aucun hash atribuer") {
        setDelaiactif(false);
        localStorage.setItem("delaiactif", "false");

        console.log("3");
      }
    });
  };
  const actu_time = () => {
    try {
      fetch("https://backendtrader.digitalfirst.space/date_time")
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          console.log(data[0].time_actu.split("T")[0]);
          dispatch(setdate(data[0].time_actu.split("T")[0]));
        });
    } catch (e) {}
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
        // localStorage.setItem("email", JSON.stringify(ret.data[0].email));
        localStorage.setItem("website", JSON.stringify(ret.data[0].website));
        localStorage.setItem("facebook", JSON.stringify(ret.data[0].facebook));
        localStorage.setItem("whatsapp", JSON.stringify(ret.data[0].whatsapp));
        localStorage.setItem("image", JSON.stringify(ret.data[0].image));
        localStorage.setItem("pays", JSON.stringify(ret.data[0].pays));
        localStorage.setItem(
          "type_product",
          JSON.stringify(ret.data[0].type_product)
        );
        localStorage.setItem(
          "code_boutique",
          JSON.stringify(ret.data[0].boutiqueName)
        );
      });
    } catch (e) {}
  };

  const userAuthentificated = () => {
    Axios.get("https://backendtrader.digitalfirst.space/isUserAuth", {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user") + "").token,
      },
    }).then((response) => {
      // console.log(response);
      // console.log(response);
      if (response.data.message) {
        //connexion expiée
        setTimeout(() => {
          localStorage.setItem("authentificator", "false");
        }, 1000);
        dispatch(logOutt([]));
        dispatch(recupUser([]));
        // console.log(user.token)
        // localStorage.setItem('user', JSON.stringify([]));
      } else if (response.data === "Vous etes authentifier") {
        dispatch(recupUser(JSON.parse(localStorage.getItem("user") + "")));
      }
    });
  };

  const getVersion = () => {
    Axios.get("https://backendtrader.digitalfirst.space/version", {}).then(
      (response) => {
        if (response.data[0].version === "1.0.2") {
          console.log(response.data);
          setversion(true);
          localStorage.setItem("change_version", "non");
        } else {
          console.log(response.data);
          setversion(false);
          localStorage.setItem("change_version", "oui");
          if (response.data[0].status === "obligatoire") {
            localStorage.setItem("status_version", response.data[0].status);
          } else if (response.data[0].status === "facultative") {
            localStorage.setItem("status_version", response.data[0].status);
          }
        }
      }
    );
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

  const gethisto_tresorerie = () => {
    Axios.post("https://backendtrader.digitalfirst.space/histo_tresorerie", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_tresorerie(ret.data));
    });
  };

  const recuppass_acces = () => {
    try {
      Axios.post(
        "https://backendtrader.digitalfirst.space/affichepassacess",
        {
          idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setPassacces(ret.data));
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const recupallaccesboutique = () => {
    try {
      Axios.post(
        "https://backendtrader.digitalfirst.space/afficheaccesparboutique",
        {
          id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setaccesparcompte(ret.data));
        console.log(ret.data);
      });
    } catch (e) {}
  };

  const getaccescompteprincipal = () => {
    Axios.post(
      "https://backendtrader.digitalfirst.space/getaccescompteprincipal",
      {
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      }
    ).then((ret) => {
      dispatch(setaccescompteprincipal(ret.data));
    });
  };
  const getaccescomptesecondaire = () => {
    Axios.post(
      "https://backendtrader.digitalfirst.space/getaccescomptesecondaire",
      {
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      }
    ).then((ret) => {
      dispatch(setaccescomptesecondaire(ret.data));
    });
  };

  Network.addListener("networkStatusChange", (status) => {
    // console.log("Network status changed", status);
    if (status.connected === false) {
      setTimeout(async () => {
        const status1 = await Network.getStatus();
        if (status1.connected === false) {
          // setNetwork_status(false);
          setShowToast8(true);
        } else {
          // window.location.pathname = window.location.pathname;
        }
      }, 5000);
    } else {
      // window.location.pathname = window.location.pathname;
    }
  });
  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();

    // console.log("Network status:", status);
    if (status.connected === false) {
      // setNetwork_status(false);
      setShowToast8(true);
    }
  };

  useEffect(() => {
    logCurrentNetworkStatus();
  }, []);

  useEffect(() => {
    if (boutiquecompte[0]) {
      // console.log(boutiquecompte, "les boutique du compte ");
      if (badge === 0) {
        console.log(boutiquecompte[0].id, "id boutique ");

        // dispatch(setBadge(boutiquecompte[0].id));
      }
    }
  }, [boutiquecompte]);

  // if (network_status) {
  return (
    // <Detectnet>
    <>
      <GoogleOAuthProvider clientId="726361237630-779kn12iqfen9li1gbmrh9qigk1gna45.apps.googleusercontent.com">
        <IonApp>
          <IonReactRouter>
            {/* <Menu /> */}

            <IonRouterOutlet animation={animationBuilder} mode="ios" id="main">
              <ProtectedRoute
                path="/home"
                component={Home}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/homecom"
                component={Homecom}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/Article"
                component={Article}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/profile"
                component={Profile}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/voir_profile"
                component={Voir_profile}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/Historique/:id"
                component={Historique}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/Ventes"
                component={Ventes}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/panier"
                component={Panier}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/add"
                component={Nouvpage}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/edd"
                component={Nouv2}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/home/:id"
                component={Home}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />

              <ProtectedRoute
                path="/depense"
                component={Depense}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/decaissement"
                component={Decaissement}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/caisse"
                component={Caisse}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/FinancesCompta"
                component={FinancesCompta}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/Finances"
                component={Finance}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/FinancesComptaPeriode"
                component={FinancesComptaPeriod}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/addboutique"
                component={Addboutique}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              {/* <ProtectedRoute
              path="/droit_dacces"
              component={DroitAcces}
              isAuth={user.auth}
              delaiactif={delaiactif}
              jours={joursrest}
              version={version}
            />
            <ProtectedRoute
              path="/create_droit_dacces"
              component={Acces}
              isAuth={user.auth}
              delaiactif={delaiactif}
              jours={joursrest}
              version={version}
            /> */}
              <ProtectedRoute
                path="/gestion_droit_dacces"
                component={Gestion_acces}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/demande_fonctionnalite"
                component={Demande}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              <ProtectedRoute
                path="/partager"
                component={Partager}
                // isAuth={user.auth}
                isAuth={
                  localStorage.getItem("authentificator") === "true"
                    ? localStorage.getItem("authentificator")
                    : "false"
                }
                delaiactif={delaiactif}
                jours={joursrest}
                version={version}
              />
              {/* <ProtectedRoute
              path="/"
              component={Home}
              isAuth={user.auth}
              delaiactif={delaiactif}
              jours={joursrest}
            /> */}
              {/* <Route exact path="/Nouvc">
              <Nouvc />
            </Route> */}

              <Route exact path="/">
                <Home />
              </Route> 
               {/*
              <Route exact path="/rrt">
                <ModalComAdd />
              </Route> */}
              {/* <Route exact path="/home/categorie/:id">
              < Home />
            </Route> */}
              <Route exact path="/reg">
                <Register />
              </Route>
              <Route exact path="/logt">
                <Login />
              </Route>
              <Route exact path="/onboard">
                <Onboarding />
              </Route>
              {/* <Route exact path="/">
                <Onboarding />
              </Route> */}
              <Route exact path="/pricing">
                <Pricing />
              </Route>
              <Route exact path="/paiement">
                <Paiement />
              </Route>
              <Route exact path="/forgot_password">
                <Forgotpassword />
              </Route>
              <Route exact path="/licence">
                <License />
              </Route>
              <Route exact path="/version">
                <Version />
              </Route>
              <Route exact path="/typeofproduct">
                <Typeofproduct />
              </Route>
              <Route exact path="/Testsendimage">
                <Testsendimage />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </GoogleOAuthProvider>

      <IonToast
        isOpen={showToast8}
        onDidDismiss={() => setShowToast8(false)}
        message={"Ton réseau est instable "}
        icon={informationCircle}
        position="top"
        duration={5000}
        mode="ios"
      />
    </>

    // </Detectnet>
  );
  //   } else {
  //    return ( <div className="flex justify-center items-center w-full h-[100vh]">
  //    <img
  //      src="no-internet2.jpg"
  //      alt="Pas de connection internet"
  //      className="w-full object-cover"
  //     //  style={{ height: "100%", width: "100%", objectFit: "fill" }}
  //    />
  //  </div>)
  //   }
};

export default App;

// "splash": {
// 	"imagePath": "../shopadmin/src/splash.jpg",
// 	"splashFullScreen": true,
// 	"splashImmersive": true,
// 	"splashDelay": 5000
//   }
