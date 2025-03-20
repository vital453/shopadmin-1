/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setCredentials } from "../../Feature/auth/AuthSlice";
import {
  IonContent,
  IonInput,
  IonLoading,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { setBadge, setBoutiquecompte, setdate, setHash_code } from "../../Feature/HashSlice";
import { body } from "ionicons/icons";

const License = () => {
  const [Hashval, setHashval] = useState("");
  const [type, settype] = useState("sellers");
  const [ifHash, setIfHash] = useState(false);
  // const [loginStatus, setloginStatus] = useState(false);
  const [hashExist, setHashExist] = useState(false);
  const [hashExistt, setHashExistt] = useState(false);
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [date_actu, setDate_actu] = useState("");
  const [Result, setResult] = useState("");
  const [hash, setHash] = useState([]);
  const datahash = useSelector((state) => state.Hash.hash_user);
  const dateActu = useSelector((state) => state.Hash.date_actu);
  const userid = useSelector((state) => state.auth.user);
  const [showToast, setShowToast] = useState(false);
  const [showToastt, setShowToastt] = useState(false);
  const [showToastto, setShowToastto] = useState(false);
  const [showToasttop, setShowToasttop] = useState(false);
  const [tEXT, setTExt] = useState("");
  const [dateserveur, setdateserveur] = useState("");

  const recup_date_server = () => {
    Axios.get("https://backendtrader.digitalfirst.space/date_time").then(
      (res) => {
        setdateserveur(res.data[0].time_actu);
      }
    );
  };

  const verifhash = () => {
    if (!Hashval) {
      setIfHash(true);
      setTimeout(() => {
        setIfHash(false);
      }, [4000]);
    } else {
      setIfHash(false);
    }

    if (Hashval) {
      setShowLoading(true);
      var js = 0;
      console.log(JSON.parse(String(localStorage.getItem("user"))).userId);
      Axios.post("https://backendtrader.digitalfirst.space/onehash", {
        id: JSON.parse(String(localStorage.getItem("user"))).userId,
      }).then((res) => {
        if (res.data.message === "boutique a hash") {
          console.log(res.data.message);
          setShowToasttop(true);
          setTimeout(() => {
            setShowToasttop(false);
          }, [4000]);
        } else if (res.data.message === "boutique not hash") {
          for (let index = 0; index < datahash.length; index++) {
            if (datahash[index].hash_code === Hashval) {
              console.log("hash trouver");
              console.log(dateActu);
              console.log(
                JSON.parse(String(localStorage.getItem("user"))).userId
              );
              const tempsEnMillisecondes = Date.parse(dateserveur);

              // Créer un objet Date à partir des millisecondes
              const dateActuelle = new Date(tempsEnMillisecondes);
              // Ajouter le nombre de jours saisi par l'utilisateur
              dateActuelle.setDate(
                dateActuelle.getDate() +
                parseInt(
                  JSON.parse(
                    String(localStorage.getItem("validity_paiement"))
                  )
                )
              );
              // Récupérer les composantes de la date
              const annee = dateActuelle.getFullYear().toString();
              // const annee = dateActuelle.getFullYear().toString().substring(2);
              const mois = (dateActuelle.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const jour = dateActuelle.getDate().toString().padStart(2, "0");
              // Afficher la date dans x jours
              console.log(
                `Dans ${JSON.parse(
                  String(localStorage.getItem("validity_paiement"))
                )} jours, nous serons le ${annee}-${mois}-${jour}`
              );
              const y = new Date(`${annee}-${mois}-${jour}`);
              const x = new Date(dateActu);
              const date1utc = Date.UTC(
                x.getFullYear(),
                x.getMonth(),
                x.getDate()
              );
              const date2utc = Date.UTC(
                y.getFullYear(),
                y.getMonth(),
                y.getDate()
              );
              const dayunit = 1000 * 60 * 60 * 24;
              const numberday = (date2utc - date1utc) / dayunit;
              const date_end = `${annee}-${mois}-${jour}`;
              console.log(numberday);
              Axios.post("https://backendtrader.digitalfirst.space/majhash", {
                id: datahash[index].id,
                date_start: dateActu,
                date_end: date_end,
                status_hash: "ACTIF",
                id_boutique: JSON.parse(String(localStorage.getItem("user")))
                  .userId,
                validity: numberday,
                // eslint-disable-next-line no-loop-func
              }).then((ret) => {
                setResult(ret.data);
                console.log(ret.data);
                if (ret.data === "deja") {
                  js = 1;
                  setShowToastto(true);
                  setTimeout(() => {
                    setShowToastto(false);
                  }, [4000]);
                  setHashExist(true);
                  setTimeout(() => {
                    setHashExist(false);
                  }, [4000]);
                  setShowLoading(false);
                } else if (ret.data === "success") {
                  js = 2;
                  setShowToastt(true);
                  setTimeout(() => {
                    setShowToastt(false);
                  }, [4000]);
                  setHashExist(true);
                  Axios.post(
                    "https://backendtrader.digitalfirst.space/afficheboutiqueparcompte",
                    {
                      idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
                    }
                  ).then((ret) => {
                    dispatch(setBoutiquecompte(ret.data));
                    if (JSON.parse(localStorage.getItem("badge") + "")) {
                      dispatch(setBadge(JSON.parse(localStorage.getItem("badge") + "")));
                    } else {
                      console.log(ret.data[0].id, "je viens de faire ceci");
                      dispatch(setBadge(parseInt(ret.data[0].id)));
                    }
                  })
                  setTimeout(() => {
                    setHashExist(false);
                  }, [4000]);
                  setShowLoading(false);

                  setTimeout(() => {
                    window.location.href = "/home";
                  }, [2000]);
                }
              });

              break;
            }
          }
          setTimeout(() => {
            if (js > 0) {
              setShowToast(false);
            } else if (js <= 0) {
              setTimeout(() => {
                setShowToast(true);
                setTimeout(() => {
                  setShowToast(false);
                }, [3000]);
                setHashExistt(true);
                setTimeout(() => {
                  setHashExistt(false);
                }, [4000]);
              }, [2000]);
            }
          }, [1000]);
          console.log(res.data.message);
        } else if (res.data.message === "aucun hash atribuer") {
          console.log(res.data.message);

          for (let index = 0; index < datahash.length; index++) {
            if (datahash[index].hash_code === Hashval) {
              console.log("hash trouver");
              console.log(dateActu);
              console.log(userid.userId);
              const tempsEnMillisecondes = Date.parse(dateserveur);

              // Créer un objet Date à partir des millisecondes
              const dateActuelle = new Date(tempsEnMillisecondes);
              // Ajouter le nombre de jours saisi par l'utilisateur
              dateActuelle.setDate(dateActuelle.getDate() + parseInt(7));
              // Récupérer les composantes de la date
              const annee = dateActuelle.getFullYear().toString();
              // const annee = dateActuelle.getFullYear().toString().substring(2);
              const mois = (dateActuelle.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const jour = dateActuelle.getDate().toString().padStart(2, "0");
              // Afficher la date dans x jours
              console.log(
                `Dans ${7} jours, nous serons le ${annee}-${mois}-${jour}`
              );
              const y = new Date(`${annee}-${mois}-${jour}`);
              const x = new Date(dateActu);
              const date1utc = Date.UTC(
                x.getFullYear(),
                x.getMonth(),
                x.getDate()
              );
              const date2utc = Date.UTC(
                y.getFullYear(),
                y.getMonth(),
                y.getDate()
              );
              const dayunit = 1000 * 60 * 60 * 24;
              const numberday = (date2utc - date1utc) / dayunit;
              const date_end = `${annee}-${mois}-${jour}`;
              console.log(numberday);
              Axios.post("https://backendtrader.digitalfirst.space/majhash", {
                id: datahash[index].id,
                date_start: dateActu,
                date_end: date_end,
                status_hash: "ACTIF",
                id_boutique: JSON.parse(String(localStorage.getItem("user")))
                  .userId,
                validity: numberday,
                // eslint-disable-next-line no-loop-func
              }).then((ret) => {
                setResult(ret.data);
                console.log(ret.data);
                if (ret.data === "deja") {
                  js = 1;
                  setShowToastto(true);
                  setTimeout(() => {
                    setShowToastto(false);
                  }, [4000]);
                  setHashExist(true);
                  setTimeout(() => {
                    setHashExist(false);
                  }, [4000]);
                  setShowLoading(false);
                } else if (ret.data === "success") {
                  js = 2;
                  setShowToastt(true);
                  Axios.post(
                    "https://backendtrader.digitalfirst.space/afficheboutiqueparcompte",
                    {
                      idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
                    }
                  ).then((ret) => {
                    dispatch(setBoutiquecompte(ret.data));
                    if (JSON.parse(localStorage.getItem("badge") + "")) {
                      dispatch(setBadge(JSON.parse(localStorage.getItem("badge") + "")));
                    } else {
                      console.log(ret.data[0].id, "je viens de faire ceci");
                      dispatch(setBadge(parseInt(ret.data[0].id)));
                    }
                  })
                  setTimeout(() => {
                    setShowToastt(false);
                  }, [4000]);
                  setHashExist(true);
                  setTimeout(() => {
                    setHashExist(false);
                  }, [4000]);
                  envoie_hash();
                  setShowLoading(false);
                  setTimeout(() => {
                    window.location.href = "/home";
                  }, [2000]);
                }
              });

              break;
            }
          }
          setTimeout(() => {
            if (js > 0) {
              setShowToast(false);
            } else if (js <= 0) {
              setTimeout(() => {
                setShowToast(true);
                setTimeout(() => {
                  setShowToast(false);
                }, [3000]);
                setHashExistt(true);
                setTimeout(() => {
                  setHashExistt(false);
                }, [4000]);
              }, [2000]);
            }
          }, [1000]);
        }
      });
    }
  };

  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const envoie_hash = () => {
    Axios.post("https://backendtrader.digitalfirst.space/licence_hash", {
      hash: makeid(150),
    }).then((ret) => {
      console.log(ret.data);
    });
  };

  const update_hash = () => {
    verifhash();
  };
  const recupe_hash = () => {
    try {
      fetch("https://backendtrader.digitalfirst.space/list_hash")
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          console.log(data.length);
          setHash(data);
          // setDate_actu(data[0].time_actu.split("T")[0] + "");
          // setyear1(data[0].time_actu.split("-")[0]);
          // setmonth1(data[0].time_actu.split("-")[1]);
          // const dd = data[0].time_actu.split("-")[2];
          // setday1(dd.split("T")[0]);
          dispatch(setHash_code(data));
        });
    } catch (e) { }
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
    } catch (e) { }
  };
  useEffect(() => {
    // window.setInterval(() => {
    recupe_hash();
    actu_time();
    recup_date_server();

    // }, 2000);
  }, []);
  return (
    <>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={2500}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Licence non valide "
        duration={4000}
        position="top"
      />
      <IonToast
        isOpen={showToastt}
        onDidDismiss={() => setShowToastt(false)}
        message="Licence valide"
        duration={4000}
        position="top"
      />
      <IonToast
        isOpen={showToastto}
        onDidDismiss={() => setShowToastto(false)}
        message="Licence Déja actif sur une autre boutique "
        duration={4000}
        position="top"
      />

      <IonToast
        isOpen={showToasttop}
        onDidDismiss={() => setShowToasttop(false)}
        message="Une boutique n'a droit qu'a une licence valide"
        duration={4000}
        position="top"
      />
      <IonContent>
        <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div class="flex flex-col overflow-y-auto md:flex-row">
              {/* <div class="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                class="object-cover w-full h-full dark:hidden"
                src="login-office.jpeg"
                alt="Office"
              />
              <img
                aria-hidden="true"
                class="hidden object-cover w-full h-full dark:block"
                src="login-office-dark.jpeg"
                alt="Office"
              />
            </div> */}
              <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div class="w-full flex flex-col">
                  <div className="w-full items-center justify-center text-center">
                    <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Configuration de la Licence
                    </h1>
                  </div>

                  <label class=" text-sm">
                    <IonTextarea
                      className="w-full mt-1 h-30 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                      placeholder="Veuillez entrez le code de votre licence reçus par mail"
                      value={Hashval}
                      onIonChange={(e) => setHashval(e.target.value)}
                    />
                  </label>

                  {ifHash ? (
                    <div className="empty_full">
                      Veuillez entrer votre Licence
                    </div>
                  ) : null}

                  {hashExist
                    ? // <div className="empty_full">licence exist</div>
                    null
                    : hashExistt
                      ? // <div className="empty_full">licence non exist</div>
                      null
                      : null}

                  <a
                    class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    onClick={() => {
                      verifhash();
                      // console.log(dateserveur);
                    }}
                  >
                    Valider
                  </a>

                  <hr class="my-3" />

                  <p class="">
                    <Link
                      class="text-sm no-underline font-medium text-deep_sky_blue dark:text-deep_sky_blue hover:underline"
                      to={"/pricing"}
                    >
                      Vous n'avez pas de licence ? Consulter nos prix.
                    </Link>
                  </p>
                  {/* <button class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaInstagram className="text-icon-color text-xl" /> &nbsp;
                  &nbsp; Instagram
                </button>
                <button class="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaTwitter className="text-icon-color text-xl" /> &nbsp;
                  &nbsp; Twitter
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default License;
