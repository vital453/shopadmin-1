/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
import Axios from "axios";
import {
  IonContent,
  IonInput,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonToast,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setcode_identifaction, setHash_code } from "../../Feature/HashSlice";
import { informationCircle } from "ionicons/icons";

const Forgotpassword = () => {
  const [codeparrain, setcodeparrain] = useState("");
  const [email, setemail] = useState("");
  const [ifcodeparrain, setIfcodeparrain] = useState(false);
  const [ifsupcode, setIfsupcode] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [valide_code, setvalide_code] = useState("");
  const [password_confirm, setpassword_confirm] = useState("");
  const [ifUsername, setIfUsername] = useState(false);
  const [ifPassword, setIfPassword] = useState(false);
  const [ifvalide_code, setIfvalide_code] = useState(false);
  const [ifemail, setIfemail] = useState(false);
  const [ifemailval, setIfemailval] = useState(false);
  const [ifPassword_confirm, setIfPassword_confirm] = useState(false);
  const [ifpasscomfrom, setIfpasscomfrom] = useState(false);
  const [ifUsernameExist, setIfUsernameExist] = useState(false);
  const [ifcodeExist, setIfcodeExist] = useState(false);
  const [generatecode, setgeneratecode] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);
  const [progress2, setprogress2] = useState(false);
  const [validation_code, setvalidation_code] = useState(false);
  const [message, setmessage] = useState("");
  let [hash, setHash] = useState(useSelector((state) => state.Hash.hash_user));
  const code_identifaction = useSelector(
    (state) => state.Hash.code_identifaction
  );

  const dispatch = useDispatch();

  const verifusername = () => {
    if (!username) {
      setIfUsername(true);
      setTimeout(() => {
        setIfUsername(false);
      }, [4000]);
    } else {
      setIfUsername(false);
      setprogress(true);
      setprogress2(true);
      setprogress2(true);
      toast.loading(
        "Opération en cours de traitement....\n\nVeuillez patienter.",
        {
          duration: 6000,
        }
      );
      Axios.post("https://backendtrader.digitalfirst.space/verifusername", {
        username: username,
      }).then((res) => {
        if (res.data.regist === false) {
          if (res.data.message === "Ce nom d'utilisateur existe déjà !") {
            setmessage(`${res.data.data[0].email}`);
            setemail(res.data.data[0].email);
            console.log(res.data.data[0].email);
            // setShowToast(true);
            setprogress(false);
            setprogress2(false);
            setIfUsernameExist(true);
            var result = "";
            var date = Date.now();
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            let code_identifaction;
            for (var i = 0; i < 10; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            code_identifaction = result + date;
            setgeneratecode(code_identifaction);
            dispatch(setcode_identifaction(code_identifaction));
            const subject = "Digital Trader";
            const body = `Le code de récupération de votre compte est : ${code_identifaction}`;
            Axios.get(
              "https://backendtrader.digitalfirst.space/sendmail/Mailrecup.php?email=" +
                res.data.data[0].email +
                "&body=" +
                body +
                "&subject=" +
                subject
            );
            // ver();
            // setTimeout(() => {
            // }, [4000]);
          } else if (res.data.message === "Ce nom d'utilisateur n'existe pas") {
            setmessage("Ce nom d'utilisateur n'existe pas");
            setIfUsernameExist(false);
            setShowToast(true);
            setprogress(false);
            setprogress2(false);
          }
        }
      });
    }
  };
  const ver = () => {
    if (code_identifaction === valide_code) {
      // setmessage("code correct");
      // setShowToast(true);
      setvalidation_code(true);
    } else {
      setmessage("code incorrect");
      setvalidation_code(false);
      setShowToast(true);
    }
    console.log(code_identifaction === "" ? "null" : code_identifaction);
    console.log(generatecode === "" ? "null" : generatecode);
    console.log(email === "" ? "null" : email);
  };
  const updatepassword = () => {
    if (!password) {
      setIfPassword(true);
      setTimeout(() => {
        setIfPassword(false);
      }, [4000]);
    } else {
      setIfPassword(false);
    }
    if (!password_confirm) {
      setIfPassword_confirm(true);
      setTimeout(() => {
        setIfPassword_confirm(false);
      }, [4000]);
    } else {
      setIfPassword_confirm(false);
    }
    if (password && password_confirm) {
      if (password === password_confirm) {
        setprogress1(true);
        setprogress2(true);
        setprogress2(true);
        toast.loading(
          "Opération en cours de traitement....\n\nVeuillez patienter.",
          {
            duration: 6000,
          }
        );
        Axios.post("https://backendtrader.digitalfirst.space/updatepassword", {
          username: username,
          password: password,
        }).then((res) => {
          setmessage("Mot de passe modifié avec succès");
          setShowToast(true);
          setprogress1(false);
          setprogress2(false);
          setTimeout(() => {
            window.location.href = "/logt";
          }, [4000]);
        });
      } else {
        setIfpasscomfrom(true);
        setTimeout(() => {
          setIfpasscomfrom(false);
        }, [4000]);
      }
    }
  };
  //   useEffect(() => {
  //     ver();
  //   }, [code_identifaction])

  return (
    <>
      <IonPage>
        {/* <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={5000}
        /> */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          // message="Compte créer avec succèss. Veillez accéder a la Licence dans votre mail"
          duration={7000}
          position="top"
        />
        {progress1 && (
          <div>
            <Toaster />
          </div>
        )}
        {/* <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Votre compte a été créé avec succès. Vous recevrez un code par mail, pour la configuration de votre boutique"
          icon={informationCircle}
          position="top"
          buttons={[
            {
              text: "OK",
              // role: "cancel",
              handler: () => {
                window.location.href = "/logt";
              },
            },
          ]}
        /> */}
        <IonContent>
          {ifUsernameExist ? (
            validation_code ? (
              <>
                <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                  <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div class="flex flex-col overflow-y-auto md:flex-row">
                      <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div class="w-full flex flex-col">
                          <div className="w-full items-center justify-center text-center">
                            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                              Réinitialisation du mot de passe
                            </h1>
                            {/* <h4 class="mb-4 text-xl text-gray-700 dark:text-gray-200">
                              Vous recevrez un code par mail, pour la
                              réinitialisation de votre mot de passe.
                            </h4> */}
                          </div>

                          <label class="mt-4 text-sm">
                            {/* <span class="text-gray-700 dark:text-gray-400">
                      Password
                    </span> */}
                            <IonInput
                              className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                              placeholder="Choisissez un nouveau mot de passe"
                              type="password"
                              value={password}
                              onIonChange={(e) => setpassword(e.target.value)}
                            />
                          </label>
                          {ifPassword && (
                            <div className="empty_full">
                              Veuillez entrez votre mot de passe!
                            </div>
                          )}
                          <label class=" mt-4 text-sm">
                            {/* <span class="text-gray-700 dark:text-gray-400">
                      Confirm password
                    </span> */}
                            <IonInput
                              className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                              placeholder="Confirmez votre mot de passe"
                              type="password"
                              value={password_confirm}
                              onIonChange={(e) =>
                                setpassword_confirm(e.target.value)
                              }
                            />
                          </label>
                          {ifPassword_confirm && (
                            <div className="empty_full">
                              Veuillez entrez votre mot de passe de comfirmation
                            </div>
                          )}
                          {ifpasscomfrom && (
                            <div className="empty_full">
                              Les mot de passe ne correspondent pas !
                            </div>
                          )}
                          {progress1 ? (
                            <>
                              <IonProgressBar
                                type="indeterminate"
                                className="mt-3"
                              ></IonProgressBar>
                            </>
                          ) : (
                            <>
                              <a
                                class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={() => {
                                  updatepassword();
                                }}
                              >
                                Valider
                              </a>
                            </>
                          )}

                          <hr class="my-8" />

                          {/* <button class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaInstagram /> &nbsp; &nbsp; Instagram
                  </button>
                  <button class="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaTwitter /> &nbsp; &nbsp; Twitter
                  </button> */}

                          {/* <p class="mt-4">
                        <Link
                          class="text-sm font-medium no-underline text-deep_sky_blue dark:text-purple-400 hover:underline"
                          to={"/logt"}
                        >
                          REtourner à la page de connection
                        </Link>
                      </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                  <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div class="flex flex-col overflow-y-auto md:flex-row">
                      <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div class="w-full flex flex-col">
                          <div className="w-full items-center justify-center text-center">
                            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                              Réinitialisation du mot de passe
                            </h1>
                            <h4 class="mb-4 text-xl text-gray-700 dark:text-gray-200">
                              Vous recevrez un code par mail, pour la
                              réinitialisation de votre mot de passe.
                            </h4>
                          </div>

                          <label class="mt-4 text-sm">
                            {/* <span class="text-gray-700 dark:text-gray-400">
                      Password
                    </span> */}
                            <IonInput
                              className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                              placeholder="Entrez le code "
                              type="text"
                              value={valide_code}
                              onIonChange={(e) =>
                                setvalide_code(e.target.value)
                              }
                            />
                          </label>
                          {ifvalide_code && (
                            <div className="empty_full">
                              Veuillez entrez le code de récupération !
                            </div>
                          )}

                          <a
                            class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            onClick={() => {
                              ver();
                            }}
                          >
                            Valider
                          </a>

                          <hr class="my-8" />

                          {/* <button class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaInstagram /> &nbsp; &nbsp; Instagram
                  </button>
                  <button class="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                    <FaTwitter /> &nbsp; &nbsp; Twitter
                  </button> */}

                          {/* <p class="mt-4">
                        <Link
                          class="text-sm font-medium no-underline text-deep_sky_blue dark:text-purple-400 hover:underline"
                          to={"/logt"}
                        >
                          REtourner à la page de connection
                        </Link>
                      </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
              <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div class="flex flex-col overflow-y-auto md:flex-row">
                  {/* <div class="h-32 md:h-auto md:w-1/2">
      <img
        aria-hidden="true"
        class="object-cover w-full h-full dark:hidden"
        src="create-account-office.jpeg"
        alt="Office"
      />
      <img
        aria-hidden="true"
        class="hidden object-cover w-full h-full dark:block"
        src="create-account-office-dark.jpeg"
        alt="Office"
      />
    </div> */}
                  <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                    <div class="w-full flex flex-col">
                      <div className="w-full items-center justify-center text-center">
                        <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                          Réinitialisation du mot de passe
                        </h1>
                        <h4 class="mb-4 text-xl text-gray-700 dark:text-gray-200">
                          Veillez saisir votre nom d'utilisateur
                        </h4>
                      </div>

                      <label class=" text-sm">
                        {/* <span class="text-gray-700 dark:text-gray-400">
            Username
          </span> */}
                        <IonInput
                          className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder=""
                          value={username}
                          onIonChange={(e) => setusername(e.target.value)}
                        />
                      </label>
                      {ifUsername && (
                        <div className="empty_full">
                          Veuillez entrez votre nom d'utilisateur!
                        </div>
                      )}
                      {progress ? (
                        <>
                          <IonProgressBar
                            type="indeterminate"
                            className="mt-3"
                          ></IonProgressBar>
                        </>
                      ) : (
                        <>
                          <a
                            class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            onClick={() => {
                              verifusername();
                            }}
                          >
                            Enregistrer
                          </a>
                        </>
                      )}
                      <hr class="my-8" />

                      {/* <button class="flex items-center no-underline justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
          <FaInstagram /> &nbsp; &nbsp; Instagram
        </button>
        <button class="flex items-center no-underline justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
          <FaTwitter /> &nbsp; &nbsp; Twitter
        </button> */}

                      <p class="mt-4">
                        <Link
                          class="text-sm font-medium no-underline text-deep_sky_blue dark:text-purple-400 hover:underline"
                          to={"/logt"}
                        >
                          Retourner à la page de connection
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Forgotpassword;
