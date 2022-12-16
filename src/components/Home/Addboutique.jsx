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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBadge,
  setBoutiquecompte,
  setHash_code,
} from "../../Feature/HashSlice";
import { chevronBack, informationCircle } from "ionicons/icons";

const Addboutique = () => {
  const router = useIonRouter();

  const [codeparrain, setcodeparrain] = useState("");
  const [ifcodeparrain, setIfcodeparrain] = useState(false);
  const [ifsupcode, setIfsupcode] = useState(false);
  const [username, setusername] = useState("");

  const [ifUsername, setIfUsername] = useState(false);
  const [ifUsernameExist, setIfUsernameExist] = useState(false);
  const [ifcodeExist, setIfcodeExist] = useState(false);
  const [type, settype] = useState("sellers");
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [progress, setprogress] = useState(false);
  // let [hash, setHash] = useState(useSelector((state) => state.Hash.hash_user));
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);
  const boutiquecompte = useSelector((state) => state.Hash.boutiquecompte);

  const reg = () => {
    if (boutiquecompte.length > 2) {
      setShowToast2(true);
    } else {
      if (!username) {
        setIfUsername(true);
        setTimeout(() => {
          setIfUsername(false);
        }, [4000]);
      } else {
        setIfUsername(false);
        // setShowLoading(true);
        setprogress(true);
        const parraincode = makeid(5) + username + makeid(5);
        console.log(parraincode);
        Axios.post("https://backend-shop.benindigital.com/addboutique", {
          store_name: username,
          boutiqueName: parraincode,
          id_compte: user.userId,
        }).then((res) => {
          if (res.data.regist === false) {
            if (res.data.message === "Ce nom d'utilisateur existe déjà !") {
              // if(response.data.error === "L'utilisateur n'existe pas"){
              setShowLoading(false);
              setIfUsernameExist(true);
              setTimeout(() => {
                setIfUsernameExist(false);
              }, [5000]);
            }
            if (res.data.message === "Ce code de parrainage existe déjà !") {
              // if(response.data.error === "L'utilisateur n'existe pas"){
              setShowLoading(false);
              setIfcodeExist(true);
              setTimeout(() => {
                setIfcodeExist(false);
              }, [5000]);
            }
          } else {
            setusername("");
            recupboutparcompte();
          }
        });
      }
    }
  };
  const recupboutparcompte = () => {
    try {
      Axios.post(
        "https://backend-shop.benindigital.com/afficheboutiqueparcompte",
        {
          idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
        }
      ).then((ret) => {
        dispatch(setBoutiquecompte(ret.data));
        dispatch(setBadge(parseInt(localStorage.getItem("badge") + "")));
        setShowToast(true);
        setprogress(false);
        console.log(ret.data);
      });
    } catch (e) {}
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

  useEffect(() => {}, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                router.goBack();
              }}
            >
              <IonIcon color="medium" icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className="nereide">Digital trader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={5000}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Boutique créé avec succès."
        duration={7000}
        position="top"
      />
        <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Vous avez atteint la limitte de creation de nouvelle boutique"
        duration={7000}
        position="top"
      />
      {/* <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Boutique créé avec succès."
        icon={informationCircle}
        position="top"
        // buttons={[
        //   {
        //     text: "OK",
        //     // role: "cancel",
        //     handler: () => {
        //       window.location.href = "/logt";
        //     },
        //   },
        // ]}
      /> */}
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
                      Ajouter une Boutique
                    </h1>
                  </div>

                  <label class=" text-sm">
                    {/* <span class="text-gray-700 dark:text-gray-400">
                      Username
                    </span> */}
                    <IonInput
                      className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                      placeholder="Choisissez le nom de Boutique"
                      value={username}
                      onIonChange={(e) => setusername(e.target.value)}
                    />
                  </label>
                  {ifUsername && (
                    <div className="empty_full mt-3">
                      Veuillez entrez le nom de la Boutique
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
                      Ce nom de boutique existe déjà !
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
                    <>
                      <IonProgressBar type="indeterminate" className="mt-3"></IonProgressBar>
                    </>
                  ) : (
                    <>
                      <a
                        class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        onClick={reg}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Addboutique;
