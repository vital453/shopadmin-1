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
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setadress,
  setdescription,
  setfacebook,
  setstore_name,
  setwebsite,
  setwhatsapp,
} from "../../Feature/HashSlice";
import { chevronBack } from "ionicons/icons";

const Profile = () => {
  const [Boutik, setBoutik] = useState("");
  const [ifBoutik, setIfBoutik] = useState(false);
  const [Website, setWebsite] = useState("");
  const [ifWebsite, setIfWebsite] = useState(false);
  const [Adress, setAdress] = useState("");
  const [ifAdress, setIfAdress] = useState(false);
  const [Descip, setDescip] = useState("");
  const [ifDescip, setIfDescip] = useState(false);
  const [Face, setFace] = useState("");
  const [ifFace, setIfFace] = useState(false);
  const [Whatsapp, setWhatsapp] = useState("");
  const [ifWhatsapp, setIfWhatsapp] = useState(false);
  const [ifUsernameExist, setIfUsernameExist] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [tabprofile, setTabprofile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const dispatch = useDispatch();

  // const website = useSelector((state) => state.Hash.website);
  // const adress = useSelector((state) => state.Hash.adress);
  // const description = useSelector((state) => state.Hash.description);
  // const facebook = useSelector((state) => state.Hash.facebook);
  // const store_name = useSelector((state) => state.Hash.store_name);
  // const whatsapp = useSelector((state) => state.Hash.whatsapp);

  const reg = () => {
    if (!Boutik) {
      setIfBoutik(true);
      setTimeout(() => {
        setIfBoutik(false);
      }, [4000]);
    } else {
      setIfBoutik(false);
    }
    if (!Descip) {
      setIfDescip(true);
      setTimeout(() => {
        setIfDescip(false);
      }, [4000]);
    } else {
      setIfDescip(false);
    }
    if (!Whatsapp) {
      setIfWhatsapp(true);
      setTimeout(() => {
        setIfWhatsapp(false);
      }, [4000]);
    } else {
      setIfWhatsapp(false);
    }

    if (Boutik && Descip && Whatsapp) {
      setShowLoading(true);
      Axios.post("https://backend-shop.benindigital.com/majprofile", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        boutique: Boutik,
        adress: Adress,
        description: Descip,
        website: Website,
        facebook: Face,
        whatsapp: Whatsapp,
      }).then((res) => {
        console.log(res.data);
        window.location.href = "/home";
      });
    }
  };

  const reg1 = () => {
    setShowLoading(true);
    // if (tabprofile[0].website != "") {
    //   dispatch(
    //     setwebsite(tabprofile[0].website)
    //   );
    // }
    // if (tabprofile[0].adress != "") {
    //   dispatch(
    //     setadress(tabprofile[0].adress)
    //   );
    // }
    // if (tabprofile[0].description != "") {
    //   dispatch(
    //     setdescription(tabprofile[0].description)
    //   );

    // }
    // if (tabprofile[0].facebook != "") {
    //   dispatch(
    //     setfacebook(tabprofile[0].facebook)
    //   );
    // }
    // if (tabprofile[0].store_name != "") {
    //   dispatch(
    //     setstore_name(tabprofile[0].store_name)
    //   );

    // }
    // if (tabprofile[0].whatsapp != "") {
    //   dispatch(
    //     setwhatsapp(tabprofile[0].whatsapp)
    //   );
    // }
    // console.log(store_name+"ets"+adress+"eta"+description+"etd"+website+"etwe"+facebook+"etf"+whatsapp+"etwha");
    setTimeout(() => {
      setShowLoading(true);
      Axios.post("https://backend-shop.benindigital.com/majprofile", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        boutique:
          tabprofile[0].store_name === "" ? Boutik : tabprofile[0].store_name,
        adress: tabprofile[0].adress === "" ? Adress : tabprofile[0].adress,
        description:
          tabprofile[0].description === "" ? Descip : tabprofile[0].description,
        website: tabprofile[0].website === "" ? Website : tabprofile[0].website,
        facebook: tabprofile[0].facebook === "" ? Face : tabprofile[0].facebook,
        whatsapp:
          tabprofile[0].whatsapp === "" ? Whatsapp : tabprofile[0].whatsapp,
      }).then((res) => {
        console.log(res.data);
        window.location.href = "/home";
      });
    }, [4000]);
  };
  const profile_full = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/profile_full", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
      }).then((ret) => {
        console.log(ret.data);
        localStorage.setItem("profile", JSON.stringify(ret.data));
      });
    } catch (e) {}
  };

  useEffect(() => {
    profile_full();
    console.log(tabprofile[0].store_name);
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton routerLink="/voir_profile">
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
          message="Compte créer avec succèss"
          duration={1500}
          position="top"
        />
        <IonContent>
          <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <div class="flex flex-col overflow-y-auto md:flex-row">
                <div class="h-32 md:h-auto md:w-1/2">
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
                </div>
                <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                  <div class="w-full flex flex-col">
                    <div className="w-full items-center justify-center text-center">
                      <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Completer le profile
                      </h1>
                    </div>
                    {/* {tabprofile[0].store_name != ""
                  ?  */}

                    {/* // : null} */}

                    {tabprofile[0].store_name === "null" ? (
                      <div className="w-full mt-2">
                        <label class="w-full text-sm">
                          <span class="text-gray-700 dark:text-gray-400">
                            NOM de la boutique{" "}
                            <span class="text-red-700 mb-2 dark:text-gray-400">
                              {" "}
                              *{" "}
                            </span>
                          </span>
                          <IonInput
                            className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Entreprise"
                            value={Boutik}
                            onIonChange={(e) => setBoutik(e.target.value)}
                          />
                        </label>

                        {ifBoutik == true ? (
                          <div className="empty_full">
                            Veuillez entrez le nom de L'entreprise!
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {tabprofile[0].adress === "null" ? (
                      <div className="w-full mt-2">
                        <label class="w-full mt-4 text-sm">
                          <span class="text-gray-700 dark:text-gray-400">
                            Adresse
                          </span>
                          <IonInput
                            className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Ville / Quartier"
                            value={Adress}
                            onIonChange={(e) => setAdress(e.target.value)}
                          />
                        </label>
                        {/* {ifAdress && (
                  <div className="empty_full">
                    Veuillez entrez votre Adreess!
                  </div>
                )} */}
                      </div>
                    ) : null}

                    {tabprofile[0].description === "null" ? (
                      <div className="w-full mt-2">
                        <label class="w-full text-sm">
                          <span class="text-gray-700 dark:text-gray-400">
                            Description{" "}
                            <span class="text-red-700 mb-2 dark:text-gray-400">
                              {" "}
                              *{" "}
                            </span>
                          </span>
                          <IonTextarea
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Entreprise"
                            value={Descip}
                            onIonChange={(e) => setDescip(e.target.value)}
                          />
                        </label>

                        {ifDescip && (
                          <div className="empty_full">
                            Veuillez entrez une description brève!
                          </div>
                        )}
                      </div>
                    ) : null}
                    {tabprofile[0].website === "null" ? (
                      <div className="w-full mt-2">
                        <label class="w-full mt-4 text-sm">
                          <span class="text-gray-700 dark:text-gray-400">
                            Website
                          </span>
                          <IonInput
                            className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Mon_entreprise.com"
                            value={Website}
                            onIonChange={(e) => setWebsite(e.target.value)}
                          />
                        </label>
                        {/* {ifWebsite && (
                  <div className="empty_full">
                    Veuillez entrer votre nom d'utilisateur!
                  </div>
                )} */}
                      </div>
                    ) : null}

                    {tabprofile[0].facebook === "null" ? (
                      <div className="w-full mt-2">
                        <label class="w-full mt-4 text-sm">
                          <span class="text-gray-700 dark:text-gray-400">
                            Facebook
                          </span>
                          <IonInput
                            className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Votre nom Facebook"
                            value={Face}
                            onIonChange={(e) => setFace(e.target.value)}
                          />
                        </label>
                        {/* {ifFace && (
                  <div className="empty_full">
                    Veuillez entrer votre nom d'utilisateur!
                  </div>
                )} */}
                      </div>
                    ) : null}

                    {tabprofile[0].whatsapp === "null" ? (
                      <div className="w-full mt-2">
                        <label class="w-full text-sm">
                          <span class="text-gray-700 dark:text-gray-400">
                            Whatsapp{" "}
                            <span class="text-red-700 mb-2 dark:text-gray-400">
                              {" "}
                              *{" "}
                            </span>
                          </span>
                          <IonInput
                            className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Votre numéros Whatsapp"
                            value={Whatsapp}
                            onIonChange={(e) => setWhatsapp(e.target.value)}
                          />
                        </label>

                        {ifWhatsapp && (
                          <div className="empty_full">
                            Veuillez entrez votre numéros Whatsapp!
                          </div>
                        )}
                      </div>
                    ) : null}

                    {ifUsernameExist && (
                      <div className="userExistAlreadyy">
                        Ce nom d'utilisateur existe déjà !
                      </div>
                    )}

                    {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                    {/* <Link
                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  to={"/"}
                >
                  Create account
                </Link> */}
                    <a
                      class="block w-full no-underline px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                      onClick={() => {
                        if (
                          tabprofile[0].store_name === "" &&
                          tabprofile[0].description === "" &&
                          tabprofile[0].whatsapp === ""
                        ) {
                          reg();
                        } else {
                          reg1();
                        }
                      }}
                    >
                      Complèter
                    </a>

                    <hr class="my-8" />

                    {/* <button class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaInstagram /> &nbsp; &nbsp; Instagram
                </button>
                <button class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaTwitter /> &nbsp; &nbsp; Twitter
                </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Profile;
