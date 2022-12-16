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
import { useDispatch } from "react-redux";
import Axios from "axios";
import { setCredentials } from "../../Feature/auth/AuthSlice";
import {
  IonContent,
  IonInput,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonToast,
} from "@ionic/react";
import { setBadge, setBoutiquecompte, setHash_code } from "../../Feature/HashSlice";
import { BsEyeFill, BsEyeSlashFill, BsFillEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const [username, setusername] = useState("");
  const [ifUsername, setIfUsername] = useState(false);
  const [password, setpassword] = useState("");
  const [type, settype] = useState("sellers");
  const [ifPassword, setIfPassword] = useState(false);
  // const [loginStatus, setloginStatus] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [wrongCombine, setWrongCombine] = useState(false);
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [delaiactif, setDelaiactif] = useState(true);
  const [joursrest, setJoursrest] = useState(0);
  const [progress, setprogress] = useState(false);
  const [visible, setvisible] = useState(false);
  const valtexte = visible ? "text" : "password";

  const verifhash1 = () => {
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
        // recupe_boutique();

        Axios.post(
          "https://backend-shop.benindigital.com/afficheboutiqueparcompte",
          {
            idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
          }
        ).then((ret) => {
          dispatch(setBoutiquecompte(ret.data));
          if (JSON.parse(localStorage.getItem("badge") + "")) {
            dispatch(setBadge(JSON.parse(localStorage.getItem("badge") + "")));
          }else{
            dispatch(setBadge(ret.data[0].id));
          }
          console.log(ret.data);
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
          window.location.href = "/home";
        });
        
      } else if (ret.data.message === "aucun hash actif") {
        window.location.href = "/licence";
        setDelaiactif(false);
        console.log("2");
      } else if (ret.data.message === "aucun hash atribuer") {
        window.location.href = "/licence";
        setDelaiactif(false);
        console.log("3");
      }
    });
  };

  const login = () => {
    if (!username) {
      setIfUsername(true);
      setTimeout(() => {
        setIfUsername(false);
      }, [4000]);
    } else {
      setIfUsername(false);
    }
    if (!password) {
      setIfPassword(true);
      setTimeout(() => {
        setIfPassword(false);
      }, [4000]);
    } else {
      setIfPassword(false);
    }

    if (username && password) {
      // setShowLoading(true)
      setprogress(true);
      Axios.post("https://backend-shop.benindigital.com/loginn", {
        username: username,
        password: password,
        type: type,
      }).then((response) => {
        // console.log(response);
        if (!response.data.auth) {
          // setloginStatus(false);
          // console.log(response.data);
          if (response.data.message === "L'utilisateur n'existe pas") {
            // if(response.data.error === "L'utilisateur n'existe pas"){
            setUserExist(true);
            setprogress(false);
            setTimeout(() => {
              setUserExist(false);
            }, [5000]);
          } else if (response.data.message === "Mauvaise combinaison") {
            // }else if(response.data.error === "Mauvaise combinaison"){
            setpassword("");
            setprogress(false);
            setWrongCombine(true);
            setTimeout(() => {
              setWrongCombine(false);
            }, [5000]);
          }
        } else {
          // console.log(response.data);
          setprogress(false);
          dispatch(
            setCredentials({
              userId: response.data.result[0].id,
              username: response.data.result[0].username,
              token: response.data.token,
              auth: response.data.auth,
              BoutiqueId: response.data.idbout,
            })
          );
          // [response.data.result[0].id, response.data.token, response.data.auth]
          // localStorage.setItem('token', response.data.token);
          // sessionStorage.setItem('token', response.data.token);
          // setloginStatus(true);
          // setShowToast(false)
          setusername("");
          setpassword("");
          // setTimeout(() => {
          verifhash1();
          // }, [2000]);
          // setloginStatus(response.data[0].username);
        }
      });
    }
  };
  const recupe_hash = () => {
    try {
      fetch("https://backend-shop.benindigital.com/list_hash")
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          dispatch(setHash_code(data));
          // console.log(data);
        });
    } catch (e) {}
  };

  // const recupe_boutique = () => {
  //   try {
  //     Axios.post(
  //       "https://backend-shop.benindigital.com/afficheboutiqueparcompte",
  //       {
  //         idcompte: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
  //       }
  //     ).then((ret) => {
  //       dispatch(setBoutiquecompte(ret.data));
  //       dispatch(setBadge(ret.data[0].id));
  //       console.log(ret.data);
  //     });
  //   } catch (e) {}
  // };
  useEffect(() => {
    recupe_hash();
    // recupe_boutique();
  }, []);
  return (
    <IonPage>
      {/* <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        // duration={5000}
      /> */}
      <IonContent>
        <div class="w-full flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <div class="w-full flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div class="w-full flex flex-col overflow-y-auto md:flex-row">
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
              <div class="w-full flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div class="w-full flex flex-col">
                  {/* <div className="w-full items-center justify-center text-center">
                    <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Login
                    </h1>
                  </div> */}

                  <label class=" text-sm">
                    {/* <span class="text-gray-700 dark:text-gray-400">
                      Username
                    </span> */}
                    <IonInput
                      className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                      placeholder="Nom d'utilisteur"
                      value={username}
                      onIonChange={(e) => setusername(e.target.value)}
                    />
                  </label>
                  {ifUsername ? (
                    <div className="empty_full">
                      Veuillez entrez votre nom d'utilisateur!
                    </div>
                  ) : null}
                  <label class="w-full h-20 mt-4 text-sm items-center justify-center">
                    {/* <span class="text-gray-700 dark:text-gray-400">
                      Password
                    </span> */}
                    <IonInput
                      className="w-full mt-1 h-10 text-sm border-2 pr-72 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                      placeholder="Mot de passe"
                      type={valtexte}
                      value={password}
                      onIonChange={(e) => setpassword(e.target.value)}
                    />
                    {visible ? (
                      <BsEyeFill
                        className="eyeview text-xl"
                        onClick={() => setvisible(!visible)}
                      />
                    ) : (
                      <BsEyeSlashFill
                        className="eyeview text-xl"
                        onClick={() => setvisible(!visible)}
                      />
                    )}
                  </label>
                  {ifPassword ? (
                    <div className="empty_full">
                      Veuillez entrez votre mot de passe!
                    </div>
                  ) : null}

                  {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                  {/* <Link
                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  to={"/"}
                >
                  Log in
                </Link> */}
                  {progress ? (
                    <>
                      <div className="mb-2"></div>
                      <IonProgressBar type="indeterminate"></IonProgressBar>
                    </>
                  ) : (
                    <a
                      class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                      onClick={login}
                    >
                      Connexion
                    </a>
                  )}

                  <hr class="my-8" />

                  {/* <button class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaInstagram className="text-icon-color text-xl" /> &nbsp;
                    &nbsp; Instagram
                  </button>
                  <button class="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaTwitter className="text-icon-color text-xl" /> &nbsp;
                    &nbsp; Twitter
                  </button> */}
                  {/* <p class="mt-4">
                    <Link
                      class="text-sm no-underline font-medium text-deep_sky_blue dark:text-deep_sky_blue hover:underline"
                      to={"#"}
                    >
                      Forgot your password?
                    </Link>
                  </p> */}
                  <p class="mt-1">
                    <Link
                      class="text-sm no-underline font-medium text-deep_sky_blue dark:text-deep_sky_blue hover:underline"
                      to={"/reg"}
                    >
                      Créer un compte
                    </Link>
                  </p>
                  {userExist ? (
                    <div className="failed_full">
                      Ce nom d'uilisateur n'a pas été retrouvé
                    </div>
                  ) : null}
                  {wrongCombine ? (
                    <div className="failed_full">Mot de passe incorrect!</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
