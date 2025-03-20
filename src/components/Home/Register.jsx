/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
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
  IonToast,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { setHash_code } from "../../Feature/HashSlice";
import { informationCircle } from "ionicons/icons";
import emailjs from "@emailjs/browser";

const Register = () => {
  const [codeparrain, setcodeparrain] = useState("");
  const [message, setmessage] = useState("dzdzdz");
  const [email, setemail] = useState("");
  const [ifcodeparrain, setIfcodeparrain] = useState(false);
  const [ifsupcode, setIfsupcode] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirm, setpassword_confirm] = useState("");
  const [ifUsername, setIfUsername] = useState(false);
  const [ifPassword, setIfPassword] = useState(false);
  const [ifemail, setIfemail] = useState(false);
  const [ifemailval, setIfemailval] = useState(false);
  const [ifPassword_confirm, setIfPassword_confirm] = useState(false);
  const [ifpasscomfrom, setIfpasscomfrom] = useState(false);
  const [ifUsernameExist, setIfUsernameExist] = useState(false);
  const [ifcodeExist, setIfcodeExist] = useState(false);
  const [type, settype] = useState("sellers");
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [progress, setprogress] = useState(false);
  let [hash, setHash] = useState(useSelector((state) => state.Hash.hash_user));
  const dispatch = useDispatch();
  const form = useRef();

  const reg = () => {
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
    if (!password_confirm) {
      setIfPassword_confirm(true);
      setTimeout(() => {
        setIfPassword_confirm(false);
      }, [4000]);
    } else {
      setIfPassword_confirm(false);
    }
    // if (!codeparrain) {
    //   setIfcodeparrain(true);
    //   setTimeout(() => {
    //     setIfcodeparrain(false);
    //   }, [4000]);
    // } else {
    //   setIfcodeparrain(false);
    // }
    if (!email) {
      setIfemail(true);
      setTimeout(() => {
        setIfemail(false);
      }, [4000]);
    } else {
      setIfemail(false);
    }
    // if (codeparrain.length < 6) {
    //   setIfsupcode(true);
    //   setTimeout(() => {
    //     setIfsupcode(false);
    //   }, [4000]);
    // } else {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setIfemailval(false);
      if (username && password && password_confirm) {
        if (password === password_confirm) {
          // setShowLoading(true);
          setprogress(true);
          const parraincode = makeid(5) + username + makeid(5);
          console.log(parraincode);
          Axios.post("https://backendtrader.digitalfirst.space/register", {
            username: username,
            password: password,
            code_parrain: parraincode,
            type: type,
            emaill: email,
          }).then((res) => {
            if (res.data.regist === false) {
              if (res.data.message === "Ce nom d'utilisateur existe déjà !") {
                // if(response.data.error === "L'utilisateur n'existe pas"){
                setShowLoading(false);
                setIfUsernameExist(true);
                setprogress(false);
                setTimeout(() => {
                  setIfUsernameExist(false);
                }, [5000]);
              }
              if (res.data.message === "Ce code de parrainage existe déjà !") {
                // if(response.data.error === "L'utilisateur n'existe pas"){
                setShowLoading(false);
                setIfcodeExist(true);
                setprogress(false);

                setTimeout(() => {
                  setIfcodeExist(false);
                }, [5000]);
              }
            } else {
              // console.log("Succès");
              sendEmail();
              // envoiemail1();
              // envoiemail();
              // setTimeout(() => {
              //   window.location.href="/logt"
              // }, [6000]);
            }
          });
        } else {
          setIfpasscomfrom(true);
          setprogress(false);
          setTimeout(() => {
            setIfpasscomfrom(false);
          }, [4000]);
        }
      }
    } else {
      setIfemailval(true);
      setprogress(false);

      setTimeout(() => {
        setIfemailval(false);
      }, [4000]);
    }
    // }
  };
  const aleatoire_hash = () => {
    if (hash[0]) {
      var randomNumber = Math.floor(Math.random() * hash.length);
      // console.log(datahash[randomNumber].hash_code);
      const result = hash[randomNumber].hash_code;

      return result;
    } else {
      recupe_hash();
    }
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
          dispatch(setHash_code(data));
        });
    } catch (e) {}
  };
  const initialise_acces = () => {
    try {
      fetch("https://backendtrader.digitalfirst.space/initialse_access")
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          console.log(data.length);
        });
    } catch (e) {}
  };
  const subject = "Votre licence Digital Trader";
  const body = `${aleatoire_hash()}`;
  // const body = `Le code de votre licence est : ${aleatoire_hash()}`;

  // const body = `Votre Licence est :`;

  const sendEmail = () => {
    // e.preventDefault();
    emailjs
      .sendForm(
        "service_8ban597",
        "template_n7b1nuj",
        form.current,
        // {
        //   name: "fati",
        //   email: "africaversatile@gmail.com",
        //   message: "je suis ton pire cauchemar",
        // },
        "user_PCLS04dz1sYWS0FeEByct"
      )
      .then(
        (result) => {
          setShowLoading(false);
          setShowToast(true);
          setusername("");
          setpassword("");
          setpassword_confirm("");
          setemail("");
          setcodeparrain("");
          setprogress(false);
          initialise_acces();
          // setTimeout(() => {
          //   form.current.reset();
          //   setprogress(false);
          //   // setprogress1(true);
          //   toast.success("Message envoyer avec succes");
          //   setmessage("");
          //   setname("");
          //   setemail("");
          // }, 2000);
        },
        (error) => {
          console.log(error.text);
          // setprogress(false);
          // toast.error("ça c'est mal passer");
          alert("ça c'est mal passer");
        }
      );
  };
  const envoiemail = () => {
    Axios.get(
      "https://backendtrader.digitalfirst.space/sendmail/sendMail.php?email=" +
        email +
        "&body=" +
        body +
        "&subject=" +
        subject
    );
  };
  const envoiemail1 = () => {
    // Faites une requête POST à votre API backend PHP
    // Création de l'objet de données
    const data = {
      to: email,
      subject: subject,
      message: body,
    };

    fetch("http://localhost:3005/sendEmailtest", {
      // fetch("https://backendtrader.digitalfirst.space/sendmail/sendMail1.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Réponse de l'API backend
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
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

  useEffect(() => {
    recupe_hash();
    window.setInterval(() => {
      recupe_hash();
    }, 10000);
  }, []);
  return (
    <IonPage>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={5000}
      />
      {/* <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Compte créer avec succèss. Veillez accéder a la Licence dans votre mail"
        duration={7000}
        position="top"
      /> */}
      <IonToast
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
      />
      <IonContent>
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
                      Inscription
                    </h1>
                  </div>

                  <label class="text-sm">
                    {/* <span class="text-gray-700 dark:text-gray-400">
                      Username
                    </span> */}
                    <IonInput
                      className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                      placeholder="Choisissez un nom d'utilisateur"
                      value={username}
                      onIonChange={(e) => setusername(e.target.value)}
                    />
                  </label>
                  {ifUsername && (
                    <div className="empty_full">
                      Veuillez entrez votre nom d'utilisateur!
                    </div>
                  )}
                  <div className="w-full">
                    <form ref={form} className="w-[100%]">
                      <label class="mt-4 text-sm w-[100%]">
                        {/* <span class="text-gray-700 dark:text-gray-400">Email</span> */}
                        <IonInput
                          className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Votre adresse email"
                          type="email"
                          name="email"
                          value={email}
                          onIonChange={(e) => setemail(e.target.value)}
                        />
                      </label>
                      {ifemail && (
                        <div className="empty_full">
                          Veuillez entrez votre email!
                        </div>
                      )}
                      {ifemailval && (
                        <div className="empty_full">
                          Veuillez entrez un email au bon format!
                        </div>
                      )}
                      <label class="mt-4 text-sm w-[100%] hidden">
                        {/* <span class="text-gray-700 dark:text-gray-400">Email</span> */}
                        <IonInput
                          className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder=""
                          name="message"
                          type="text"
                          value={body}
                        />
                      </label>
                      <label class="mt-4 text-sm w-[100%] hidden">
                        {/* <span class="text-gray-700 dark:text-gray-400">Email</span> */}
                        <IonInput
                          className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder=""
                          name="name"
                          type="text"
                          value={"name"}
                        />
                      </label>
                    </form>
                  </div>

                  <label class="mt-4 text-sm">
                    {/* <span class="text-gray-700 dark:text-gray-400">
                      Password
                    </span> */}
                    <IonInput
                      className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                      placeholder="Choisissez un mot de passe"
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
                      onIonChange={(e) => setpassword_confirm(e.target.value)}
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
                  {/* <label class="mt-4 text-sm">
                    <span class="text-gray-700 dark:text-gray-400">
                      Code de la Boutique
                    </span>
                    <IonInput
                      className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                      placeholder="UTXFA60"
                      value={codeparrain}
                      onIonChange={(e) => setcodeparrain(e.target.value)}
                    />
                  </label>
                  {ifcodeparrain && (
                    <div className="empty_full">
                      Veuillez créer un le nom de la boutique!
                    </div>
                  )} */}
                  {/* {ifsupcode && (
                    <div className="empty_full">
                      Veuillez entrez au moins 6 cararctères!
                    </div>
                  )} */}
                  {/* <div class="flex mt-6 text-sm">
                    <label class="flex items-center dark:text-gray-400">
                      <input
                        type="checkbox"
                        class="text-purple-600 bg-white form-checkbox cursor-pointer focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      />
                      <span class="ml-2">
                        I agree to the &nbsp;
                        <span class="underline">privacy policy</span>
                      </span>
                    </label>
                  </div> */}
                  {ifUsernameExist && (
                    <div className="userExistAlreadyy">
                      Ce nom d'utilisateur existe déjà !
                    </div>
                  )}
                  {/* {ifcodeExist && (
                    <div className="userExistAlreadyy">
                      Ce nom existe déjà !
                    </div>
                  )} */}

                  {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                  {/* <Link
                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  to={"/"}
                >
                  Create account
                </Link> */}
                  {progress ? (
                    <div className="w-full flex items-center justify-center ">
                      <svg
                      class="pl"
                      width="240"
                      height="240"
                      viewBox="0 0 240 240"
                    >
                      <circle
                        class="pl__ring pl__ring--a"
                        cx="120"
                        cy="120"
                        r="105"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 660"
                        stroke-dashoffset="-330"
                        stroke-linecap="round"
                      ></circle>
                      <circle
                        class="pl__ring pl__ring--b"
                        cx="120"
                        cy="120"
                        r="35"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 220"
                        stroke-dashoffset="-110"
                        stroke-linecap="round"
                      ></circle>
                      <circle
                        class="pl__ring pl__ring--c"
                        cx="85"
                        cy="120"
                        r="70"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 440"
                        stroke-linecap="round"
                      ></circle>
                      <circle
                        class="pl__ring pl__ring--d"
                        cx="155"
                        cy="120"
                        r="70"
                        fill="none"
                        stroke="#000"
                        stroke-width="20"
                        stroke-dasharray="0 440"
                        stroke-linecap="round"
                      ></circle>
                    </svg>
                    </div>
                  ) : (
                    <a
                      class="block cursor-pointer w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                      onClick={reg}
                    >
                      Enregistrer
                    </a>
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
                      Si vous avez déjà un compte,cliquez ici pour vous
                      connecter
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
