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
import InscriptionPat from "./pages/patient/Inscription";
import Medecin from "./pages/medecin/Medecin";
import AffichagePat from "./components/Patient/AffichagePat";
import Affichagemed from "./components/Medecin/Affichagemed";
import { Rdv_page } from "./pages/rdv/Rdv_page";
import { ModalExample1 } from "./components/Patient/ModalExample1";
import { Modaldetailspat } from "./components/Patient/Modaldetailspat";
import { Mod } from "./components/Patient/Mod";
import { Modaldetails1 } from "./components/Patient/Modaldetails1";
import Menu from "./components/menu/Menu";
import { SegmentExamples } from "./components/RDV/SegmentExamples";
import { Rdvpage } from "./pages/rdv/Rdvpage";
import { Rdvpagelist } from "./pages/rdv/Rdvpagelist";
import InscriptionPat1 from "./pages/patient/Inscription1";
import Medecin1 from "./pages/medecin/Medecin1";
import { DateTimeExamples } from "./components/DateTimeExamples";
import { Details_pat } from "./components/Patient/Details_pat";
import Secretaire from "./pages/secretaire/Secretaire";
import Secretaire1 from "./pages/secretaire/Secretaire1";
import Affichagesecret from "./components/secretaire/Affichagesecret";
import { NouvDiag } from "./pages/diag/NouvDiag";
import { ListDiag } from "./pages/diag/ListDiag";
import { Formrdv_nouv } from "./components/RDV/Formrdv_nouv";
import InscriptionPat2 from "./pages/patient/Inscription2";
import { NouvDiagg } from "./pages/diag2/NouvDiagg";
import { ListDiagg } from "./pages/diag2/ListDiagg";
import { Listdiagglo } from "./components/diag2/Listdiagglo";
import Articledesc from "./pages/article/Articledesc";
import Panier from "./pages/article/Panier";
import Nouv2 from "./pages/Nouv2.js";
import PanierArt from "./components/articles/PanierArt";
import {
  homeOutline,
  listOutline,
  cogOutline,
  cart,
  person,
  logOut,
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
import Nouv1 from "./pages/Nouv1";
import { Ventes } from "./components/pages/Ventes";
import Axios from "axios";
import {
  setaccesparcompte,
  setBadge,
  setBoutiquecompte,
  setdate,
  setPassacces,
} from "./Feature/HashSlice";
import { logOutt, recupUser, decc } from "./Feature/auth/AuthSlice";
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
} from "./Feature/CaisseSlice";
import Nouvpage from "./pages/Nouvpage";
import Caisse from "./components/Home/Caisse";
import Version1 from "./components/Home/Version1";
import { ModalComAdd } from "./components/pages/ModalComAdd";
import { FinancesCompta } from "./components/pages/FinancesCompta";
import { Finance } from "./components/pages/Finance";
import {
  FinancesComptaPeriod,
  FinancesComptaPeriodArt,
} from "./components/pages/FinancesComptaPeriod";
import Addboutique from "./components/Home/Addboutique";
import { DroitAcces } from "./components/Home/DroitAcces";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();
  let user = useSelector((state: any) => state.auth.user);
  let wal = useSelector((state: any) => state.auth.whale);
  const [tour, setTour] = useState<any>(1);
  // const userid = useSelector((state: any) => state.auth.user);
  const [delaiactif, setDelaiactif] = useState(true);
  const [version, setversion] = useState(true);
  const [joursrest, setJoursrest] = useState(0);
  const [autt, setAutt] = useState<[]>([]);
  const [present, dismiss] = useIonLoading();
  const dateActu = useSelector((state: any) => state.Hash.date_actu);
  let comm = [].concat(useSelector((state: any) => state.commande.commande));

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
      userAuthentificated();
      try {
        dispatch(recupUser(JSON.parse(localStorage.getItem("user") + "")));
        setAutt(JSON.parse(localStorage.getItem("user") + ""));
        dispatch(recupPan(JSON.parse(localStorage.getItem("panier") + "")));
        dispatch(
          recupApprovision(JSON.parse(localStorage.getItem("approvision") + ""))
        );
      } catch (e) {}
      // userAuthentificated();
      // verifhash();
      actu_time();
      profile_full();

      Axios.post("https://backend-shop.benindigital.com/afficheart", {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      }).then((ret) => {
        dispatch(recupProduct(ret.data));
        console.log(ret.data);
      });

      // fetch('https://backend-shop.benindigital.com/afficheart').then((res) => {
      //   const data = res.json();
      //   return data
      // }).then((data) => {
      //   dispatch(recupProduct(data));
      //   console.log(data);
      // })

      try {
        Axios.post("https://backend-shop.benindigital.com/affichecategory", {
          id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        }).then((ret) => {
          dispatch(recupCateg(ret.data));
          console.log(ret.data);
        });
      } catch (e) {}

      try {
        Axios.post(
          "https://backend-shop.benindigital.com/afficheboutiqueparcompte",
          {
            idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
          }
        ).then((ret) => {
          dispatch(setBoutiquecompte(ret.data));
          dispatch(setBadge(parseInt(localStorage.getItem("badge") + "")));
          console.log(ret.data);
        });
      } catch (e) {}

      Axios.post("https://backend-shop.benindigital.com/affichecommande", {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      }).then((ret) => {
        dispatch(recupCommande(ret.data));
        console.log(ret.data);
      });

      Axios.post("https://backend-shop.benindigital.com/affichecommandeart", {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      }).then((ret) => {
        dispatch(recupCommandeart(ret.data));
        console.log(ret.data);
      });

      // try {
      //   fetch('https://backend-shop.benindigital.com/affichecommande').then((res) => {
      //     const data = res.json()
      //     return data
      //   }).then((data) => {
      //     dispatch(recupCommande(data));
      //   })
      // } catch (e) { };
      Axios.post("https://backend-shop.benindigital.com/afficheartapprov", {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
      }).then((ret) => {
        dispatch(recupApprovisionnement(ret.data));
        console.log(ret.data);
      });

      recuppass_acces();
      recupallaccesboutique();
      // try {
      //   fetch('https://backend-shop.benindigital.com/afficheapprov').then((res) => {
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
          recupboutiqueuser();
          recuppass_acces();
          recupallaccesboutique();
        }
      }, 60000);
    } else {
      if (window.location.pathname !== "/logt") {
        window.location.href = "/logt";
      }
    }
  }, []);

  const recupboutiqueuser = () => {
    try {
      Axios.post(
        "https://backend-shop.benindigital.com/afficheboutiqueparcompte",
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
    Axios.post("https://backend-shop.benindigital.com/exithash", {
      id: JSON.parse(localStorage.getItem("user") + "").userId,
    }).then((ret) => {
      console.log(ret.data.message);
      if (ret.data.message === "il a un hash actif") {
        console.log("1");
        setDelaiactif(true);
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
          Axios.post("https://backend-shop.benindigital.com/majvalidity", {
            id: ret.data.id_actif,
            validity: numberday,
          }).then((ret) => {
            console.log(ret.data);
          });
        } else if (numberday <= 0) {
          setJoursrest(0);
          console.log("en dessous de 0 OU EGAL A 0");
          Axios.post("https://backend-shop.benindigital.com/majvalidhash", {
            id: ret.data.id_actif,
            status_hash: "NON ACTIF",
          }).then((ret) => {
            console.log(ret.data);
          });
        } else if (numberday > 10) {
          console.log("AU DELA DE 10");
          Axios.post("https://backend-shop.benindigital.com/validityday", {
            id: ret.data.id_actif,
            validity: numberday,
          }).then((ret) => {
            console.log(ret.data);
          });
        }
      } else if (ret.data.message === "aucun hash actif") {
        setDelaiactif(false);
        console.log("2");
      } else if (ret.data.message === "aucun hash atribuer") {
        setDelaiactif(false);
        console.log("3");
      }
    });
  };
  const actu_time = () => {
    try {
      fetch("https://backend-shop.benindigital.com/date_time")
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
        localStorage.setItem("image", JSON.stringify(ret.data[0].image));
        localStorage.setItem(
          "code_boutique",
          JSON.stringify(ret.data[0].boutiqueName)
        );
      });
    } catch (e) {}
  };

  const userAuthentificated = () => {
    Axios.get("https://backend-shop.benindigital.com/isUserAuth", {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user") + "").token,
      },
    }).then((response) => {
      // console.log(response);
      // console.log(response);
      if (response.data.message) {
        //connexion expiée
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
    Axios.get("https://backend-shop.benindigital.com/versionapp", {}).then(
      (response) => {
        if (response.data === "1.0.0") {
          console.log(response.data);
          setversion(true);
        } else {
          console.log(response.data);
          setversion(false);
        }
      }
    );
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

  const recuppass_acces = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/affichepassacess", {
        idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
      }).then((ret) => {
        dispatch(setPassacces(ret.data));
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const recupallaccesboutique = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/afficheaccesparboutique", {
        id_compte: JSON.parse(localStorage.getItem("user") + "").userId,
      }).then((ret) => {
        dispatch(setaccesparcompte(ret.data));
        console.log(ret.data);
      });
    } catch (e) {}
  };
  return (
    <IonApp>
      <IonReactRouter>
        {/* <Menu /> */}

        <IonRouterOutlet animation={animationBuilder} mode="ios" id="main">
          <ProtectedRoute
            path="/home"
            component={Home}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/homecom"
            component={Homecom}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/Article"
            component={Article}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/voir_profile"
            component={Voir_profile}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/Historique/:id"
            component={Historique}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/Ventes"
            component={Ventes}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/panier"
            component={Panier}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/add"
            component={Nouvpage}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/edd"
            component={Nouv2}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/home/:id"
            component={Home}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />

          <ProtectedRoute
            path="/depense"
            component={Depense}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/decaissement"
            component={Decaissement}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/caisse"
            component={Caisse}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/FinancesCompta"
            component={FinancesCompta}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/Finances"
            component={Finance}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/FinancesComptaPeriode"
            component={FinancesComptaPeriod}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/addboutique"
            component={Addboutique}
            isAuth={user.auth}
            delaiactif={delaiactif}
            jours={joursrest}
            version={version}
          />
          <ProtectedRoute
            path="/droit_dacces"
            component={DroitAcces}
            isAuth={user.auth}
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
          <Route exact path="/rrt">
            <ModalComAdd />
          </Route>
          {/* <Route exact path="/home/categorie/:id">
            < Home />
          </Route> */}
          <Route exact path="/reg">
            <Register />
          </Route>
          <Route exact path="/logt">
            <Login />
          </Route>
          <Route exact path="/licence">
            <License />
          </Route>
          <Route exact path="/version">
            <Version />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
