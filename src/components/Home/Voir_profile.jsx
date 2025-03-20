/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaAddressBook,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaHome,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
  FaWeebly,
  FaWhatsapp,
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
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  setadress,
  setBadge,
  setBoutiquecompte,
  setclik1,
  setclik2,
  setclik3,
  setclik4,
  setclik5,
  setclik6,
  setclik7,
  setdescription,
  setfacebook,
  setpays,
  setstore_name,
  setwebsite,
  setwhatsapp,
} from "../../Feature/HashSlice";
import { chevronBack, informationCircle } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import * as imageConversion from "image-conversion";
import { BsCamera, BsCamera2, BsCameraFill } from "react-icons/bs";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./homes.css";

const Voir_profile = () => {
  const router = useIonRouter();

  const clic1 = useSelector((state) => state.Hash.click1);
  const clic2 = useSelector((state) => state.Hash.click2);
  const clic3 = useSelector((state) => state.Hash.click3);
  const click4 = useSelector((state) => state.Hash.click4);
  const click5 = useSelector((state) => state.Hash.click5);
  const click6 = useSelector((state) => state.Hash.click6);
  const click7 = useSelector((state) => state.Hash.click7);

  const [clicker1, setClicker1] = useState(true);
  const [clicker2, setClicker2] = useState(true);
  const [clicker3, setClicker3] = useState(true);
  const [clicker4, setClicker4] = useState(true);
  const [clicker5, setClicker5] = useState(true);
  const [clicker6, setClicker6] = useState(true);
  const [showToast1, setShowToast1] = useState(false);
  const [loader, setLoad] = useState(false);
  const [whatsapp, setwhatsapped] = useState("");
  const [messerr, setMesserr] = useState("debut");
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast5, setShowToast5] = useState(false);
  const [showToast6, setShowToast6] = useState(false);
  const [showToast7, setShowToast7] = useState(false);
  const choiceacces = useSelector((state) => state.Hash.choiceacces);
  const [message, setmessage] = useState(
    "La taille des images doit être inférieure à 1Mo"
  );
  const userid = useSelector((state) => state.auth.user);

  const [flagImg, setflagImg] = useState("australia.png");
  const [indicatif, setindicatif] = useState(
    JSON.parse(localStorage.getItem("pays") + "")
  );

  const [copy, setCopy] = useState(false);
  const [cc, setCc] = useState(false);
  // const Regex = /^\+229\d{8}$/;
  const Regex = /^\+\d{1,3}\d{8,9}$/;

  const dispatch = useDispatch();

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  const handleInputChange = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      // if (parseInt(event.target.files[0].size) > 4000000) {
      //   setShowToast4(true);
      //   setmessage("La taille des images doit être inférieure à 4Mo");
      // } else {
      const res = await imageConversion.compressAccurately(
        event.target.files[0],
        300
      );
      const myFile = new File([res], event.target.files[0].name, {
        type: res.type,
      });
      setLoad(true);
      const formdata = new FormData();
      formdata.append("avatar", myFile);
      Axios.put(
        `https://backendtrader.digitalfirst.space/majimgprofil/${userid.BoutiqueId}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      ).then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          setLoad(false);
          setuserInfo({
            ...userInfo,
            file: myFile,
            filepreview: URL.createObjectURL(myFile),
          });
          recupboutiqueuser();
          profile_full();
        } else {
          setMesserr(
            "Image non pris en charge dans la base de donnée.Veillez réessayer"
          );
        }
      });
      // }
    }
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

  const modif1 = () => {
    try {
      Axios.post("https://backendtrader.digitalfirst.space/majprofile1", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        boutique: JSON.parse(localStorage.getItem("store_name")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif2 = () => {
    try {
      Axios.post("https://backendtrader.digitalfirst.space/majprofile2", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        adress: JSON.parse(localStorage.getItem("adress")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif3 = () => {
    try {
      Axios.post("https://backendtrader.digitalfirst.space/majprofile3", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        description: JSON.parse(localStorage.getItem("description")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif4 = () => {
    try {
      Axios.post("https://backendtrader.digitalfirst.space/majprofile4", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        website: JSON.parse(localStorage.getItem("website")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif5 = () => {
    try {
      Axios.post("https://backendtrader.digitalfirst.space/majprofile5", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        facebook: JSON.parse(localStorage.getItem("facebook")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif6 = (i) => {
    console.log(
      String(JSON.parse(localStorage.getItem("whatsapp"))).length +
        "   longeur de mon wathapps "
    );
    if (String(JSON.parse(localStorage.getItem("whatsapp"))).length === 11) {
      if (i > 1) {
        dispatch(setclik6(false));
      } else {
        setClicker6(false);
      }
      Axios.post("https://backendtrader.digitalfirst.space/majprofile6", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        whatsapp: JSON.parse(localStorage.getItem("whatsapp")),
      }).then((ret) => {
        console.log(ret.data);
      });
      console.log(
        String(JSON.parse(localStorage.getItem("whatsapp"))).length +
          "   longeur de mon wathapps est egale a  11"
      );
    } else if (
      String(JSON.parse(localStorage.getItem("whatsapp"))).length < 11
    ) {
      console.log(
        String(JSON.parse(localStorage.getItem("whatsapp"))).length +
          "   longeur de mon wathapps n'a pas atteint 11"
      );
      setShowToast1(true);
    } else if (
      String(JSON.parse(localStorage.getItem("whatsapp"))).length > 11
    ) {
      console.log(
        String(JSON.parse(localStorage.getItem("whatsapp"))).length +
          "   longeur de mon wathapps a depasser 11"
      );
      setShowToast1(true);
    }
  };
  const modif7 = () => {
    try {
      Axios.post("https://backendtrader.digitalfirst.space/majprofile7", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        pays: JSON.parse(localStorage.getItem("pays")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const clipboard = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, [1000]);
  };

  const choixPays = (e) => {
    // console.log(e.split("/")[0]);
    // console.log(e.split("/")[1]);
    // console.log(select.selectedIonSelectOptions);
    if (e) {
      setindicatif(e.split("/")[1]);
      dispatch(setpays(e));
      // setflagImg(
      //   `https://flagpedia.net/data/flags/h80/${e
      //     .split("/")[0]
      //     .toLowerCase()}.webp`
      // );
      modif7();
    } else {
      setindicatif("");
      setflagImg("australia.png");
    }

    // flagImg: `https://flagpedia.net/data/flags/h80/${select.selectedIonSelectOptions[0].dataset.countrycode.toLowerCase()}.webp`
  };

  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton routerLink="/home">
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Le numéros doit contenir onze carartères"
          duration={3000}
          position="top"
        />
        <IonToast
          isOpen={showToast2}
          onDidDismiss={() => setShowToast2(false)}
          message="Vueillez configurer le numeros whatapps avant toute autres configurations "
          duration={4000}
          position="top"
        />
        <IonToast
          isOpen={showToast5}
          onDidDismiss={() => setShowToast5(false)}
          message="Vueillez configurer la section pays/ville avant toute autres configurations "
          duration={4000}
          position="top"
        />
        <IonToast
          isOpen={showToast6}
          onDidDismiss={() => setShowToast6(false)}
          message="Vueillez configurer le nom de la boutique avant toute autres configurations "
          duration={4000}
          position="top"
        />
        <IonToast
          isOpen={showToast7}
          onDidDismiss={() => setShowToast7(false)}
          message="Vueillez configurer le pays avant toute autres configurations "
          duration={4000}
          position="top"
        />

        <IonToast
          isOpen={showToast3}
          onDidDismiss={() => setShowToast3(false)}
          message={messerr}
          icon={informationCircle}
          position="top"
          duration={3000}
        />

        <IonToast
          isOpen={showToast4}
          onDidDismiss={() => setShowToast4(false)}
          message={message}
          icon={informationCircle}
          position="top"
          duration={3000}
        />
        <IonContent fullscreen className="alice">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large" className="page-title">
                <IonLabel>Mon </IonLabel>
                <IonNote>Compte</IonNote>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList className="">
            <div className="w-full flex items-center justify-center mt-3 mb-7">
              {/* ********************************************    part image profile ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("image")) === "" ? (
                <>
                  <div className="flex items-center justify-center relative">
                    {userInfo.filepreview != null ? (
                      loader === true ? (
                        <img
                          src="gitload.gif"
                          alt=""
                          className="w-44 h-44 rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src={userInfo.filepreview}
                          alt=""
                          className="w-44 h-44 rounded-full object-fill"
                        />
                      )
                    ) : loader === true ? (
                      <img
                        src="gitload.gif"
                        alt=""
                        className="w-44 h-44 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="store.png"
                        alt=""
                        className="w-44 h-44 rounded-full object-fill"
                      />
                    )}

                    {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
                    {JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
                      <div
                        className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer chooseimg"
                        onClick={() => {
                          setShowToast2(true);
                        }}
                      >
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          {/* <input
                              type="file"
                              style={{ display: "none" }}
                              id="file"
                              name="upload_file"
                              onChange={handleInputChange}
                            /> */}
                        </label>
                      </div>
                    ) : (
                      <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                    )}

                    {/* ) : (
                      <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                          />
                        </label>
                      </div>
                    )} */}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center relative">
                    {userInfo.filepreview != null ? (
                      loader === true ? (
                        <img
                          src="gitload.gif"
                          alt=""
                          className="w-44 h-44 rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src={userInfo.filepreview}
                          alt=""
                          className="w-44 h-44 rounded-full object-fill"
                        />
                      )
                    ) : loader === true ? (
                      <img
                        src="gitload.gif"
                        alt=""
                        className="w-44 h-44 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={`https://backendtrader.digitalfirst.space/uploads/${JSON.parse(
                          localStorage.getItem("image")
                        )}`}
                        alt=""
                        className="w-44 h-44 rounded-full object-cover"
                      />
                    )}
                    {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
                    {JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
                      <div
                        className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer chooseimg"
                        onClick={() => {
                          setShowToast2(true);
                        }}
                      >
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          {/* <input
                              type="file"
                              style={{ display: "none" }}
                              id="file"
                              name="upload_file"
                              onChange={handleInputChange}
                            /> */}
                        </label>
                      </div>
                    ) : (
                      <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                    )}

                    {/* ) : (
                      <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                          />
                        </label>
                      </div>
                    )} */}
                  </div>
                </>
              )}
            </div>

            {/* ********************************************    part copy code boutique  ***********************************************************************************************/}

            {copy ? (
              <div class="alert alert-success text-center" role="alert">
                copier dans le papier press
              </div>
            ) : null}
            <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
              <div className="tailo">
                <h1 className="tailo">Code de la Boutique</h1>
              </div>
              <div className="container-fluid flex conter famit">
                <div className="ima1">
                  <img
                    src="boutique.png"
                    alt="Bout"
                    className="rounded-full w-10 h-10"
                  />
                </div>

                <div className="conter1 flex">
                  <div className="pp mt-2">
                    <CopyToClipboard
                      text={JSON.parse(localStorage.getItem("code_boutique"))}
                      onCopy={() => clipboard()}
                    >
                      <p className="">
                        {JSON.parse(localStorage.getItem("code_boutique"))}
                      </p>
                    </CopyToClipboard>
                  </div>
                  <div
                    className="ima2"
                    onClick={() => {
                      // dispatch(setclik1(true));
                    }}
                  >
                    <CopyToClipboard
                      text={JSON.parse(localStorage.getItem("code_boutique"))}
                      onCopy={() => clipboard()}
                    >
                      <img src="copy.png" alt="Bout" className=" w-10 h-10" />
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>

            {/* ********************************************    part store_name  ***********************************************************************************************/}

            {JSON.parse(localStorage.getItem("store_name")) === "" ? (
              <>
                {/* <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Nom de la Boutique</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="boutique.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp mt-2">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div
                        className="ima2"
                        onClick={() => {
                          window.location.href = "/profile";
                        }}
                        // routerLink="/home"
                      >
                        <img
                          src="ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}{" "}
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Nom de la Boutique</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="boutique.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clicker1 ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Nom de votre entreprise"
                          // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                          value={JSON.parse(localStorage.getItem("store_name"))}
                          onIonChange={(e) =>
                            dispatch(setstore_name(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            setClicker1(false);
                            modif1();
                          }}
                        >
                          Enregistrer
                        </button>

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("store_name"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <div
                          className="ima2"
                          onClick={() => {
                            setClicker1(true);
                          }}
                        >
                          <img
                            src="editer.png"
                            alt="Bout"
                            className="rounded-full w-9 h-9"
                          />
                        </div>

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Nom de la Boutique</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="boutique.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clic1 === true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Nom de votre entreprise"
                          value={JSON.parse(localStorage.getItem("store_name"))}
                          onIonChange={(e) =>
                            dispatch(setstore_name(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            dispatch(setclik1(false));
                            modif1();
                          }}
                        >
                          Enregistrer
                        </button>

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("store_name"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                        <div
                          className="ima2"
                          onClick={() => {
                            dispatch(setclik1(true));
                          }}
                        >
                          <img
                            src="editer.png"
                            alt="Bout"
                            className="rounded-full w-9 h-9"
                          />
                        </div>

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ********************************************    part description ***********************************************************************************************/}

            {JSON.parse(localStorage.getItem("description")) === "" ? (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Description</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="description-de-lemploi.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clicker2 ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Description de l'entreprise"
                          // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                          value={JSON.parse(
                            localStorage.getItem("description")
                          )}
                          onIonChange={(e) =>
                            dispatch(setdescription(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setClicker2(false);
                              modif3();
                            }}
                          >
                            Enregistrer
                          </button>
                        )}

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp">
                          <p className="">
                            {JSON.parse(localStorage.getItem("description"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : (
                          <div
                            className="ima2"
                            onClick={() => {
                              setClicker2(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )}

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1 className="tailo">Description</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="description-de-lemploi.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clic2 === true ? (
                      <div className="conter1 flex flex-col">
                        <IonTextarea
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Description de l'entreprise"
                          value={JSON.parse(
                            localStorage.getItem("description")
                          )}
                          onIonChange={(e) =>
                            dispatch(setdescription(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              dispatch(setclik2(false));
                              modif3();
                            }}
                          >
                            Enregistrer
                          </button>
                        )}

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp">
                          <p className="">
                            {JSON.parse(localStorage.getItem("description"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : (
                          <div
                            className="ima2"
                            onClick={() => {
                              dispatch(setclik2(true));
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )}

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ********************************************    part pays ***********************************************************************************************/}

            {JSON.parse(localStorage.getItem("pays")) === "" ? (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Pays</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src={flagImg}
                        alt="country-flag"
                        id="img"
                        className={
                          flagImg === "australia.png"
                            ? "rounded-full w-12 h-12"
                            : "rounded-full w-12 h-12"
                        }
                      />
                    </div>
                    <div className="conter1 flex flex-col w-full justify-between items-center">
                      {/* <div className="flex items-center justify-between w-full h-10"> */}

                      <div className="flex items-center justify-center text-lg">
                        {indicatif === "" && (
                          <label
                            htmlFor="country"
                            className="text-lg text-stone-800"
                          >
                            {" "}
                            Selectionnez le pays
                          </label>
                        )}
                        <IonSelect
                          id="country"
                          onIonChange={(e) => choixPays(e.detail.value)}
                          // onIonChange={(e) => console.log(e.detail.value)}
                          defaultValue={indicatif}
                          className="w-full text-lg ml-0"
                        >
                          {/* <IonSelectOption value="" className="text-black">
                            Selectionnez le pays
                          </IonSelectOption> */}
                          {/* <IonSelectOption data-countryCode="AF" value="AF/93">
                            Afghanistan (+93)
                          </IonSelectOption> */}
                          <IonSelectOption
                            data-countryCode="AF"
                            value="Afghanistan"
                          >
                            Afghanistan (+93)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AL"
                            value="Albania"
                          >
                            Albania (+355)
                          </IonSelectOption>
                          {/* <IonSelectOption data-countryCode="DZ" value="DZ/213">
                            Algeria (+213)
                          </IonSelectOption> */}
                          <IonSelectOption
                            data-countryCode="DZ"
                            value="Algeria"
                          >
                            Algeria (+213)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AS"
                            value="American Samoa"
                          >
                            American Samoa (+1684)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AD"
                            value="Andorra"
                          >
                            Andorra (+376)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="AO" value="Angola">
                            Angola (+244)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AI"
                            value="Anguilla"
                          >
                            Anguilla (+1264)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AQ"
                            value="Antartica"
                          >
                            Antartica (+672)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AG"
                            value="Antigua Barbuda"
                          >
                            Antigua &amp; Barbuda (+1268)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AR"
                            value="Argentina"
                          >
                            Argentina (+54)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AM"
                            value="Armenia"
                          >
                            Armenia (+374)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="AW" value="Aruba">
                            Aruba (+297)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AU"
                            value="Australia"
                          >
                            Australia (+61)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AT"
                            value="Austria"
                          >
                            Austria (+43)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AZ"
                            value="Azerbaijan"
                          >
                            Azerbaijan (+994)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BS"
                            value="Bahamas"
                          >
                            Bahamas (+1242)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BH"
                            value="Bahrain"
                          >
                            Bahrain (+973)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BD"
                            value="Bangladesh"
                          >
                            Bangladesh (+880)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BB"
                            value="Barbados"
                          >
                            Barbados (+1246)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BY"
                            value="Belarus"
                          >
                            Belarus (+375)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BE"
                            value="Belgium"
                          >
                            Belgium (+32)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="BZ" value="Belize">
                            Belize (+501)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="BJ" value="Benin">
                            Benin (+229)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BM"
                            value="Bermuda"
                          >
                            Bermuda (+1441)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="BT" value="Bhutan">
                            Bhutan (+975)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BO"
                            value="Bolivia"
                          >
                            Bolivia (+591)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BA"
                            value="Bosnia Herzegovina"
                          >
                            Bosnia &amp; Herzegovina (+387)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BW"
                            value="Botswana"
                          >
                            Botswana (+267)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="BR" value="Brazil">
                            Brazil (+55)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="IO"
                            value="British India Ocean Terrirory"
                          >
                            British India Ocean Terrirory (+246)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="VG"
                            value="British Virgin Islands"
                          >
                            British Virgin Islands (+1284)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="BN" value="Brunei">
                            Brunei (+673)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BG"
                            value="Bulgaria"
                          >
                            Bulgaria (+359)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BF"
                            value="Burkina Faso"
                          >
                            Burkina Faso (+226)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BI"
                            value="Burundi"
                          >
                            Burundi (+257)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KH"
                            value="Cambodia"
                          >
                            Cambodia (+855)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CM"
                            value="Cameroon"
                          >
                            Cameroon (+237)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="CA" value="Canada">
                            Canada (+1)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CV"
                            value="Cape Verde Islands"
                          >
                            Cape Verde Islands (+238)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KY"
                            value="Cayman Islands"
                          >
                            Cayman Islands (+1345)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CF"
                            value="Central African Republic"
                          >
                            Central African Republic (+236)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="TD" value="Chad">
                            Chad (+235)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="CL" value="Chile">
                            Chile (+56)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="CN" value="China">
                            China (+86)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CX"
                            value="Christmas Island"
                          >
                            Christmas Island (+61)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CC"
                            value="Cocos Islands"
                          >
                            Cocos Islands (+61)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CO"
                            value="Colombia"
                          >
                            Colombia (+57)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KM"
                            value="Comoros"
                          >
                            Comoros (+269)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CK"
                            value="Cook Islands"
                          >
                            Cook Islands (+682)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CI"
                            value="Côte d'Ivoire"
                          >
                            Côte d'Ivoire (+225)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CR"
                            value="Costa Rica"
                          >
                            Costa Rica (+506)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="HR"
                            value="Croatia"
                          >
                            Croatia (+385)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="CU" value="Cuba">
                            Cuba (+53)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CW"
                            value="Curacao"
                          >
                            Curacao (+599)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CY"
                            value="Cyprus - North"
                          >
                            Cyprus - North (+90)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CY"
                            value="Cyprus - South"
                          >
                            Cyprus - South (+357)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CZ"
                            value="Czech Republic"
                          >
                            Czech Republic (+420)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CD"
                            value="Democratic Republic of Congo"
                          >
                            Democratic Republic of Congo (+243)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="DK" value="DK/45">
                            Denmark (+45)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="DJ"
                            value="Denmark"
                          >
                            Djibouti (+253)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="DM"
                            value="Dominica"
                          >
                            Dominica (+1809)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="DO"
                            value="Dominican Republic"
                          >
                            Dominican Republic (+1809)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TL"
                            value="East Timor"
                          >
                            East Timor (+670)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="EC"
                            value="Ecuador"
                          >
                            Ecuador (+593)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="EG" value="Egypt">
                            Egypt (+20)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SV"
                            value="El Salvador"
                          >
                            El Salvador (+503)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GQ"
                            value="Equatorial Guinea"
                          >
                            Equatorial Guinea (+240)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="ER"
                            value="Eritrea"
                          >
                            Eritrea (+291)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="EE"
                            value="Estonia"
                          >
                            Estonia (+372)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="ET"
                            value="Ethiopia"
                          >
                            Ethiopia (+251)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="FK"
                            value="Falkland Islands"
                          >
                            Falkland Islands (+500)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="FO"
                            value="Faroe Islands"
                          >
                            Faroe Islands (+298)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="FJ" value="Fiji">
                            Fiji (+679)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="FI"
                            value="Finland"
                          >
                            Finland (+358)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="FR" value="France">
                            France (+33)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GF"
                            value="French Guiana"
                          >
                            French Guiana (+594)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PF"
                            value="French Polynesia"
                          >
                            French Polynesia (+689)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="GA" value="Gabon">
                            Gabon (+241)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="GM" value="Gambia">
                            Gambia (+220)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GE"
                            value="Georgia"
                          >
                            Georgia (+7880)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="DE"
                            value="Germany"
                          >
                            Germany (+49)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="GH" value="Ghana">
                            Ghana (+233)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GI"
                            value="Gibraltar"
                          >
                            Gibraltar (+350)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="GR" value="Greece">
                            Greece (+30)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GL"
                            value="Greenland"
                          >
                            Greenland (+299)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GD"
                            value="Grenada"
                          >
                            Grenada (+1473)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GP"
                            value="Guadeloupe"
                          >
                            Guadeloupe (+590)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="GU" value="Guam">
                            Guam (+671)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GT"
                            value="Guatemala"
                          >
                            Guatemala (+502)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GG"
                            value="Guernsey"
                          >
                            Guernsey (+44)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="GN" value="Guinea">
                            Guinea (+224)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GW"
                            value="Guinea-Bissau"
                          >
                            Guinea-Bissau (+245)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="GY" value="Guyana">
                            Guyana (+592)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="HT" value="HHaiti">
                            Haiti (+509)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="HN"
                            value="Honduras"
                          >
                            Honduras (+504)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="HK"
                            value="Hong Kong"
                          >
                            Hong Kong (+852)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="HU"
                            value="Hungary"
                          >
                            Hungary (+36)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="IS"
                            value="Iceland"
                          >
                            Iceland (+354)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="IN" value="India">
                            India (+91)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="ID"
                            value="Indonesia"
                          >
                            Indonesia (+62)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="IR" value="Iran">
                            Iran (+98)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="IQ" value="Iraq">
                            Iraq (+964)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="IE"
                            value="Ireland"
                          >
                            Ireland (+353)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="IM"
                            value="Isle of Man"
                          >
                            Isle of Man (+44)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="IL" value="Israel">
                            Israel (+972)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="IT" value="Italie">
                            Italie (+39)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="JM"
                            value="Jamaica"
                          >
                            Jamaica (+1876)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="JP" value="Japan">
                            Japan (+81)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="JE" value="Jersey">
                            Jersey (+44)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="JO" value="Jordan">
                            Jordan (+962)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KZ"
                            value="Kazakhstan"
                          >
                            Kazakhstan (+7)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="KE" value="Kenya">
                            Kenya (+254)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KI"
                            value="Kiribati"
                          >
                            Kiribati (+686)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="XK" value="Kosovo">
                            Kosovo (+383)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="KW" value="Kuwait">
                            Kuwait (+965)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KG"
                            value="Kyrgyzstan"
                          >
                            Kyrgyzstan (+996)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="LA" value="Laos">
                            Laos (+856)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="LV" value="Latvia">
                            Latvia (+371)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="LB"
                            value="Lebanon"
                          >
                            Lebanon (+961)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="LS"
                            value="Lesotho"
                          >
                            Lesotho (+266)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="LR"
                            value="Liberia"
                          >
                            Liberia (+231)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="LY" value="Libya">
                            Libya (+218)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="LI"
                            value="Liechtenstein"
                          >
                            Liechtenstein (+417)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="LT"
                            value="Lithuania"
                          >
                            Lithuania (+370)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="LU"
                            value="Luxembourg"
                          >
                            Luxembourg (+352)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="MO" value="Macao">
                            Macao (+853)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MK"
                            value="Macedonia"
                          >
                            Macedonia (+389)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MG"
                            value="Madagascar"
                          >
                            Madagascar (+261)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="MW" value="Malawi">
                            Malawi (+265)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MY"
                            value="Malaysia"
                          >
                            Malaysia (+60)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MV"
                            value="Maldives"
                          >
                            Maldives (+960)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="ML" value="Mali">
                            Mali (+223)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="MT" value="Malta">
                            Malta (+356)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MH"
                            value="Marshall Islands"
                          >
                            Marshall Islands (+692)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MQ"
                            value="Martinique"
                          >
                            Martinique (+596)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MR"
                            value="Mauritania"
                          >
                            Mauritania (+222)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="YT"
                            value="Mayotte"
                          >
                            Mayotte (+269)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="MX" value="Mexico">
                            Mexico (+52)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="FM"
                            value="Micronesia"
                          >
                            Micronesia (+691)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MD"
                            value="Moldova"
                          >
                            Moldova (+373)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="MC" value="Monaco">
                            Monaco (+377)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MN"
                            value="Mongolia"
                          >
                            Mongolia (+976)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="ME"
                            value="Montengro"
                          >
                            Montengro (+382)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MS"
                            value="Montserrat"
                          >
                            Montserrat (+1664)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MA"
                            value="Morocco"
                          >
                            Morocco (+212)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MZ"
                            value="Mozambique"
                          >
                            Mozambique (+258)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MN"
                            value="Myanmar"
                          >
                            Myanmar (+95)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NA"
                            value="Namibia"
                          >
                            Namibia (+264)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="NR" value="Nauru">
                            Nauru (+674)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="NP" value="Nepal">
                            Nepal (+977)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NL"
                            value="Netherlands"
                          >
                            Netherlands (+31)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AN"
                            value="Netherlands Antilles"
                          >
                            Netherlands Antilles (+599)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NC"
                            value="New Caledonia"
                          >
                            New Caledonia (+687)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NZ"
                            value="New Zealand"
                          >
                            New Zealand (+64)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NI"
                            value="Nicaragua"
                          >
                            Nicaragua (+505)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="NE" value="Niger">
                            Niger (+227)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NG"
                            value="Nigeria"
                          >
                            Nigeria (+234)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="NU" value="Niue">
                            Niue (+683)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KP"
                            value="North Korea"
                          >
                            North Korea (+850)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NF"
                            value="Norfolk Islands"
                          >
                            Norfolk Islands (+672)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="NP"
                            value="Northern Marianas (+670)"
                          >
                            Northern Marianas (+670)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="NO" value="Norway">
                            Norway (+47)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="OM" value="Oman">
                            Oman (+968)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PK"
                            value="Pakistan"
                          >
                            Pakistan (+92)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="PW" value="Palau">
                            Palau (+680)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PS"
                            value="Palestine"
                          >
                            Palestine (+970)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="PA" value="Panama">
                            Panama (+507)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PG"
                            value="Papua New Guinea"
                          >
                            Papua New Guinea (+675)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PY"
                            value="Paraguay"
                          >
                            Paraguay (+595)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="PE" value="Peru">
                            Peru (+51)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PH"
                            value="Philippines"
                          >
                            Philippines (+63)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PN"
                            value="Pitcairn"
                          >
                            Pitcairn (+64)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="PL" value="Poland">
                            Poland (+48)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PT"
                            value="Portugal"
                          >
                            Portugal (+351)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PR"
                            value="Puerto Rico"
                          >
                            Puerto Rico (+1787)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="QA" value="Qatar">
                            Qatar (+974)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CG"
                            value="Republic of the Congo"
                          >
                            Republic of the Congo (+242)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="RE"
                            value="Reunion"
                          >
                            Reunion (+262)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="RO"
                            value="Romania"
                          >
                            Romania (+40)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="RU" value="Russia">
                            Russia (+7)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="RW" value="Rwanda">
                            Rwanda (+250)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="BL"
                            value="Saint Barthelemy"
                          >
                            Saint Barthelemy (+590)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SH"
                            value="Saint Helena"
                          >
                            Saint Helena (+290)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KN"
                            value="Saint Kitts Nevis"
                          >
                            Saint Kitts &amp; Nevis (+1869)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SC"
                            value="SC/1758"
                          >
                            Saint Lucia (+1758)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SR"
                            value="Suriname"
                          >
                            Suriname (+597)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="MF"
                            value="Saint Martin"
                          >
                            Saint Martin (+590)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="PM"
                            value="Saint Saint Pierre and Miquelon"
                          >
                            Saint Saint Pierre and Miquelon (+508)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="VC"
                            value="Saint Vincent and the Grenadines"
                          >
                            Saint Vincent and the Grenadines (+1784)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="WS" value="Samoa">
                            Samoa (+685)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SM"
                            value="San Marino"
                          >
                            San Marino (+378)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="ST"
                            value="Sao Tome Principe"
                          >
                            Sao Tome &amp; Principe (+239)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SA"
                            value="Saudi Arabia"
                          >
                            Saudi Arabia (+966)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SN"
                            value="Senegal"
                          >
                            Senegal (+221)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="CS" value="Serbia">
                            Serbia (+381)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SC"
                            value="Seychelles"
                          >
                            Seychelles (+248)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SL"
                            value="Sierra Leone"
                          >
                            Sierra Leone (+232)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SG"
                            value="Singapore"
                          >
                            Singapore (+65)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SX"
                            value="Sint Maarten"
                          >
                            Sint Maarten (+1721)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SK"
                            value="Slovakia"
                          >
                            Slovakia (+421)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SI"
                            value="Slovenia"
                          >
                            Slovenia (+386)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SB"
                            value="Solomon Islands"
                          >
                            Solomon Islands (+677)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SO"
                            value="Somalia"
                          >
                            Somalia (+252)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="ZA"
                            value="South Africa"
                          >
                            South Africa (+27)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="KR"
                            value="South Korea"
                          >
                            South Korea (+82)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SS"
                            value="South Sudan"
                          >
                            South Sudan (+211)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="ES" value="Spain">
                            Spain (+34)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="LK"
                            value="Sri Lanka"
                          >
                            Sri Lanka (+94)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="SD" value="Sudan">
                            Sudan (+249)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SR"
                            value="Suriname"
                          >
                            Suriname (+597)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SJ"
                            value="Svalbard Jan Mayen"
                          >
                            Svalbard &amp; Jan Mayen (+47)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="SZ"
                            value="Swaziland"
                          >
                            Swaziland (+268)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="SE" value="Sweden">
                            Sweden (+46)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="CH"
                            value="Switzerland"
                          >
                            Switzerland (+41)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="SY" value="Syria">
                            Syria (+963)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="TW" value="Taiwan">
                            Taiwan (+886)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TJ"
                            value="Tajikistan"
                          >
                            Tajikistan (+992)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TZ"
                            value="Tanzania"
                          >
                            Tanzania (+255)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TH"
                            value="Thailand"
                          >
                            Thailand (+66)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="TG" value="Togo">
                            Togo (+228)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="TO" value="Tonga">
                            Tonga (+676)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TT"
                            value="Trinidad Tobago"
                          >
                            Trinidad &amp; Tobago (+1868)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TN"
                            value="Tunisia"
                          >
                            Tunisia (+216)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="TR" value="Turkey">
                            Turkey (+90)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TM"
                            value="Turkmenistan"
                          >
                            Turkmenistan (+993)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="TC"
                            value="Turks Caicos Islands"
                          >
                            Turks &amp; Caicos Islands (+1649)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="TV" value="Tuvalu">
                            Tuvalu (+688)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="UG" value="Uganda">
                            Uganda (+256)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="UA"
                            value="Ukraine"
                          >
                            Ukraine (+380)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="AE"
                            value="United Arab Emirates"
                          >
                            United Arab Emirates (+971)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="GB"
                            value="United Kingdom"
                          >
                            United Kingdom (+44)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="US"
                            value="United States"
                          >
                            United States (+1)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="UY"
                            value="Uruguay"
                          >
                            Uruguay (+598)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="UZ"
                            value="Uzbekistan"
                          >
                            Uzbekistan (+998)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="VU"
                            value="Vanuatu"
                          >
                            Vanuatu (+678)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="VA"
                            value="Vatican City"
                          >
                            Vatican City (+379)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="VE"
                            value="Venezuela"
                          >
                            Venezuela (+58)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="VN"
                            value="Vietnam"
                          >
                            Vietnam (+84)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="WF"
                            value="Wallis Futuna"
                          >
                            Wallis &amp; Futuna (+681)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="YE"
                            value="Yemen (North)"
                          >
                            Yemen (North)(+969)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="YE"
                            value="Yemen (South)"
                          >
                            Yemen (South)(+967)
                          </IonSelectOption>
                          <IonSelectOption data-countryCode="ZM" value="Zambia">
                            Zambia (+260)
                          </IonSelectOption>
                          <IonSelectOption
                            data-countryCode="ZW"
                            value="Zimbabwe"
                          >
                            Zimbabwe (+263)
                          </IonSelectOption>
                        </IonSelect>
                      </div>

                      {/* </div> */}

                      {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Pays</h1>
                  </div>
                  <div className="container-fluid flex justify-center items-center conter famit">
                    <div className="ima1">
                      <img
                        src={flagImg}
                        alt="country-flag"
                        id="img"
                        className={
                          flagImg === "australia.png"
                            ? "rounded-full w-12 h-12"
                            : "rounded-full w-12 h-12"
                        }
                      />
                    </div>
                    {click7 === true ? (
                      <div className="conter1 flex">
                        <div className="flex items-center justify-center text-lg">
                          {/* {indicatif === "" && ( */}
                          <label
                            htmlFor="country"
                            className="text-lg text-stone-800"
                          >
                            {" "}
                            Selectionnez le pays
                          </label>
                          {/* )} */}
                          <IonSelect
                            id="country"
                            onIonChange={(e) => {
                              choixPays(e.detail.value);
                              dispatch(setclik7(false));
                            }}
                            // onIonChange={(e) => console.log(e.detail.value)}
                            defaultValue={indicatif}
                            className="w-full text-lg ml-0"
                          >
                            {/* <IonSelectOption value="" className="text-black">
                          Selectionnez le pays
                        </IonSelectOption> */}
                            {/* <IonSelectOption data-countryCode="AF" value="AF/93">
                          Afghanistan (+93)
                        </IonSelectOption> */}
                            <IonSelectOption
                              data-countryCode="AF"
                              value="Afghanistan"
                            >
                              Afghanistan (+93)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AL"
                              value="Albania"
                            >
                              Albania (+355)
                            </IonSelectOption>
                            {/* <IonSelectOption data-countryCode="DZ" value="DZ/213">
                          Algeria (+213)
                        </IonSelectOption> */}
                            <IonSelectOption
                              data-countryCode="DZ"
                              value="Algeria"
                            >
                              Algeria (+213)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AS"
                              value="American Samoa"
                            >
                              American Samoa (+1684)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AD"
                              value="Andorra"
                            >
                              Andorra (+376)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AO"
                              value="Angola"
                            >
                              Angola (+244)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AI"
                              value="Anguilla"
                            >
                              Anguilla (+1264)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AQ"
                              value="Antartica"
                            >
                              Antartica (+672)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AG"
                              value="Antigua Barbuda"
                            >
                              Antigua &amp; Barbuda (+1268)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AR"
                              value="Argentina"
                            >
                              Argentina (+54)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AM"
                              value="Armenia"
                            >
                              Armenia (+374)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AW"
                              value="Aruba"
                            >
                              Aruba (+297)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AU"
                              value="Australia"
                            >
                              Australia (+61)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AT"
                              value="Austria"
                            >
                              Austria (+43)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AZ"
                              value="Azerbaijan"
                            >
                              Azerbaijan (+994)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BS"
                              value="Bahamas"
                            >
                              Bahamas (+1242)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BH"
                              value="Bahrain"
                            >
                              Bahrain (+973)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BD"
                              value="Bangladesh"
                            >
                              Bangladesh (+880)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BB"
                              value="Barbados"
                            >
                              Barbados (+1246)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BY"
                              value="Belarus"
                            >
                              Belarus (+375)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BE"
                              value="Belgium"
                            >
                              Belgium (+32)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BZ"
                              value="Belize"
                            >
                              Belize (+501)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BJ"
                              value="Benin"
                            >
                              Benin (+229)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BM"
                              value="Bermuda"
                            >
                              Bermuda (+1441)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BT"
                              value="Bhutan"
                            >
                              Bhutan (+975)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BO"
                              value="Bolivia"
                            >
                              Bolivia (+591)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BA"
                              value="Bosnia Herzegovina"
                            >
                              Bosnia &amp; Herzegovina (+387)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BW"
                              value="Botswana"
                            >
                              Botswana (+267)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BR"
                              value="Brazil"
                            >
                              Brazil (+55)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IO"
                              value="British India Ocean Terrirory"
                            >
                              British India Ocean Terrirory (+246)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VG"
                              value="British Virgin Islands"
                            >
                              British Virgin Islands (+1284)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BN"
                              value="Brunei"
                            >
                              Brunei (+673)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BG"
                              value="Bulgaria"
                            >
                              Bulgaria (+359)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BF"
                              value="Burkina Faso"
                            >
                              Burkina Faso (+226)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BI"
                              value="Burundi"
                            >
                              Burundi (+257)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KH"
                              value="Cambodia"
                            >
                              Cambodia (+855)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CM"
                              value="Cameroon"
                            >
                              Cameroon (+237)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CA"
                              value="Canada"
                            >
                              Canada (+1)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CV"
                              value="Cape Verde Islands"
                            >
                              Cape Verde Islands (+238)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KY"
                              value="Cayman Islands"
                            >
                              Cayman Islands (+1345)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CF"
                              value="Central African Republic"
                            >
                              Central African Republic (+236)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="TD" value="Chad">
                              Chad (+235)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CL"
                              value="Chile"
                            >
                              Chile (+56)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CN"
                              value="China"
                            >
                              China (+86)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CX"
                              value="Christmas Island"
                            >
                              Christmas Island (+61)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CC"
                              value="Cocos Islands"
                            >
                              Cocos Islands (+61)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CO"
                              value="Colombia"
                            >
                              Colombia (+57)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KM"
                              value="Comoros"
                            >
                              Comoros (+269)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CK"
                              value="Cook Islands"
                            >
                              Cook Islands (+682)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CI"
                              value="Côte d'Ivoire"
                            >
                              Côte d'Ivoire (+225)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CR"
                              value="Costa Rica"
                            >
                              Costa Rica (+506)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HR"
                              value="Croatia"
                            >
                              Croatia (+385)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="CU" value="Cuba">
                              Cuba (+53)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CW"
                              value="Curacao"
                            >
                              Curacao (+599)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CY"
                              value="Cyprus - North"
                            >
                              Cyprus - North (+90)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CY"
                              value="Cyprus - South"
                            >
                              Cyprus - South (+357)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CZ"
                              value="Czech Republic"
                            >
                              Czech Republic (+420)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CD"
                              value="Democratic Republic of Congo"
                            >
                              Democratic Republic of Congo (+243)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DK"
                              value="DK/45"
                            >
                              Denmark (+45)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DJ"
                              value="Denmark"
                            >
                              Djibouti (+253)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DM"
                              value="Dominica"
                            >
                              Dominica (+1809)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DO"
                              value="Dominican Republic"
                            >
                              Dominican Republic (+1809)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TL"
                              value="East Timor"
                            >
                              East Timor (+670)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="EC"
                              value="Ecuador"
                            >
                              Ecuador (+593)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="EG"
                              value="Egypt"
                            >
                              Egypt (+20)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SV"
                              value="El Salvador"
                            >
                              El Salvador (+503)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GQ"
                              value="Equatorial Guinea"
                            >
                              Equatorial Guinea (+240)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ER"
                              value="Eritrea"
                            >
                              Eritrea (+291)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="EE"
                              value="Estonia"
                            >
                              Estonia (+372)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ET"
                              value="Ethiopia"
                            >
                              Ethiopia (+251)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FK"
                              value="Falkland Islands"
                            >
                              Falkland Islands (+500)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FO"
                              value="Faroe Islands"
                            >
                              Faroe Islands (+298)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="FJ" value="Fiji">
                              Fiji (+679)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FI"
                              value="Finland"
                            >
                              Finland (+358)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FR"
                              value="France"
                            >
                              France (+33)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GF"
                              value="French Guiana"
                            >
                              French Guiana (+594)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PF"
                              value="French Polynesia"
                            >
                              French Polynesia (+689)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GA"
                              value="Gabon"
                            >
                              Gabon (+241)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GM"
                              value="Gambia"
                            >
                              Gambia (+220)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GE"
                              value="Georgia"
                            >
                              Georgia (+7880)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DE"
                              value="Germany"
                            >
                              Germany (+49)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GH"
                              value="Ghana"
                            >
                              Ghana (+233)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GI"
                              value="Gibraltar"
                            >
                              Gibraltar (+350)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GR"
                              value="Greece"
                            >
                              Greece (+30)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GL"
                              value="Greenland"
                            >
                              Greenland (+299)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GD"
                              value="Grenada"
                            >
                              Grenada (+1473)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GP"
                              value="Guadeloupe"
                            >
                              Guadeloupe (+590)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="GU" value="Guam">
                              Guam (+671)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GT"
                              value="Guatemala"
                            >
                              Guatemala (+502)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GG"
                              value="Guernsey"
                            >
                              Guernsey (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GN"
                              value="Guinea"
                            >
                              Guinea (+224)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GW"
                              value="Guinea-Bissau"
                            >
                              Guinea-Bissau (+245)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GY"
                              value="Guyana"
                            >
                              Guyana (+592)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HT"
                              value="HHaiti"
                            >
                              Haiti (+509)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HN"
                              value="Honduras"
                            >
                              Honduras (+504)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HK"
                              value="Hong Kong"
                            >
                              Hong Kong (+852)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HU"
                              value="Hungary"
                            >
                              Hungary (+36)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IS"
                              value="Iceland"
                            >
                              Iceland (+354)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IN"
                              value="India"
                            >
                              India (+91)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ID"
                              value="Indonesia"
                            >
                              Indonesia (+62)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="IR" value="Iran">
                              Iran (+98)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="IQ" value="Iraq">
                              Iraq (+964)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IE"
                              value="Ireland"
                            >
                              Ireland (+353)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IM"
                              value="Isle of Man"
                            >
                              Isle of Man (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IL"
                              value="Israel"
                            >
                              Israel (+972)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IT"
                              value="Italie"
                            >
                              Italie (+39)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JM"
                              value="Jamaica"
                            >
                              Jamaica (+1876)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JP"
                              value="Japan"
                            >
                              Japan (+81)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JE"
                              value="Jersey"
                            >
                              Jersey (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JO"
                              value="Jordan"
                            >
                              Jordan (+962)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KZ"
                              value="Kazakhstan"
                            >
                              Kazakhstan (+7)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KE"
                              value="Kenya"
                            >
                              Kenya (+254)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KI"
                              value="Kiribati"
                            >
                              Kiribati (+686)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="XK"
                              value="Kosovo"
                            >
                              Kosovo (+383)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KW"
                              value="Kuwait"
                            >
                              Kuwait (+965)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KG"
                              value="Kyrgyzstan"
                            >
                              Kyrgyzstan (+996)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="LA" value="Laos">
                              Laos (+856)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LV"
                              value="Latvia"
                            >
                              Latvia (+371)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LB"
                              value="Lebanon"
                            >
                              Lebanon (+961)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LS"
                              value="Lesotho"
                            >
                              Lesotho (+266)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LR"
                              value="Liberia"
                            >
                              Liberia (+231)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LY"
                              value="Libya"
                            >
                              Libya (+218)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LI"
                              value="Liechtenstein"
                            >
                              Liechtenstein (+417)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LT"
                              value="Lithuania"
                            >
                              Lithuania (+370)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LU"
                              value="Luxembourg"
                            >
                              Luxembourg (+352)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MO"
                              value="Macao"
                            >
                              Macao (+853)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MK"
                              value="Macedonia"
                            >
                              Macedonia (+389)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MG"
                              value="Madagascar"
                            >
                              Madagascar (+261)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MW"
                              value="Malawi"
                            >
                              Malawi (+265)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MY"
                              value="Malaysia"
                            >
                              Malaysia (+60)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MV"
                              value="Maldives"
                            >
                              Maldives (+960)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="ML" value="Mali">
                              Mali (+223)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MT"
                              value="Malta"
                            >
                              Malta (+356)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MH"
                              value="Marshall Islands"
                            >
                              Marshall Islands (+692)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MQ"
                              value="Martinique"
                            >
                              Martinique (+596)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MR"
                              value="Mauritania"
                            >
                              Mauritania (+222)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="YT"
                              value="Mayotte"
                            >
                              Mayotte (+269)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MX"
                              value="Mexico"
                            >
                              Mexico (+52)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FM"
                              value="Micronesia"
                            >
                              Micronesia (+691)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MD"
                              value="Moldova"
                            >
                              Moldova (+373)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MC"
                              value="Monaco"
                            >
                              Monaco (+377)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MN"
                              value="Mongolia"
                            >
                              Mongolia (+976)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ME"
                              value="Montengro"
                            >
                              Montengro (+382)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MS"
                              value="Montserrat"
                            >
                              Montserrat (+1664)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MA"
                              value="Morocco"
                            >
                              Morocco (+212)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MZ"
                              value="Mozambique"
                            >
                              Mozambique (+258)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MN"
                              value="Myanmar"
                            >
                              Myanmar (+95)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NA"
                              value="Namibia"
                            >
                              Namibia (+264)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NR"
                              value="Nauru"
                            >
                              Nauru (+674)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NP"
                              value="Nepal"
                            >
                              Nepal (+977)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NL"
                              value="Netherlands"
                            >
                              Netherlands (+31)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AN"
                              value="Netherlands Antilles"
                            >
                              Netherlands Antilles (+599)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NC"
                              value="New Caledonia"
                            >
                              New Caledonia (+687)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NZ"
                              value="New Zealand"
                            >
                              New Zealand (+64)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NI"
                              value="Nicaragua"
                            >
                              Nicaragua (+505)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NE"
                              value="Niger"
                            >
                              Niger (+227)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NG"
                              value="Nigeria"
                            >
                              Nigeria (+234)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="NU" value="Niue">
                              Niue (+683)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KP"
                              value="North Korea"
                            >
                              North Korea (+850)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NF"
                              value="Norfolk Islands"
                            >
                              Norfolk Islands (+672)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NP"
                              value="Northern Marianas (+670)"
                            >
                              Northern Marianas (+670)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NO"
                              value="Norway"
                            >
                              Norway (+47)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="OM" value="Oman">
                              Oman (+968)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PK"
                              value="Pakistan"
                            >
                              Pakistan (+92)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PW"
                              value="Palau"
                            >
                              Palau (+680)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PS"
                              value="Palestine"
                            >
                              Palestine (+970)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PA"
                              value="Panama"
                            >
                              Panama (+507)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PG"
                              value="Papua New Guinea"
                            >
                              Papua New Guinea (+675)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PY"
                              value="Paraguay"
                            >
                              Paraguay (+595)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="PE" value="Peru">
                              Peru (+51)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PH"
                              value="Philippines"
                            >
                              Philippines (+63)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PN"
                              value="Pitcairn"
                            >
                              Pitcairn (+64)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PL"
                              value="Poland"
                            >
                              Poland (+48)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PT"
                              value="Portugal"
                            >
                              Portugal (+351)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PR"
                              value="Puerto Rico"
                            >
                              Puerto Rico (+1787)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="QA"
                              value="Qatar"
                            >
                              Qatar (+974)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CG"
                              value="Republic of the Congo"
                            >
                              Republic of the Congo (+242)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RE"
                              value="Reunion"
                            >
                              Reunion (+262)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RO"
                              value="Romania"
                            >
                              Romania (+40)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RU"
                              value="Russia"
                            >
                              Russia (+7)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RW"
                              value="Rwanda"
                            >
                              Rwanda (+250)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BL"
                              value="Saint Barthelemy"
                            >
                              Saint Barthelemy (+590)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SH"
                              value="Saint Helena"
                            >
                              Saint Helena (+290)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KN"
                              value="Saint Kitts Nevis"
                            >
                              Saint Kitts &amp; Nevis (+1869)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SC"
                              value="SC/1758"
                            >
                              Saint Lucia (+1758)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SR"
                              value="Suriname"
                            >
                              Suriname (+597)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MF"
                              value="Saint Martin"
                            >
                              Saint Martin (+590)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PM"
                              value="Saint Saint Pierre and Miquelon"
                            >
                              Saint Saint Pierre and Miquelon (+508)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VC"
                              value="Saint Vincent and the Grenadines"
                            >
                              Saint Vincent and the Grenadines (+1784)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="WS"
                              value="Samoa"
                            >
                              Samoa (+685)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SM"
                              value="San Marino"
                            >
                              San Marino (+378)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ST"
                              value="Sao Tome Principe"
                            >
                              Sao Tome &amp; Principe (+239)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SA"
                              value="Saudi Arabia"
                            >
                              Saudi Arabia (+966)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SN"
                              value="Senegal"
                            >
                              Senegal (+221)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CS"
                              value="Serbia"
                            >
                              Serbia (+381)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SC"
                              value="Seychelles"
                            >
                              Seychelles (+248)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SL"
                              value="Sierra Leone"
                            >
                              Sierra Leone (+232)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SG"
                              value="Singapore"
                            >
                              Singapore (+65)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SX"
                              value="Sint Maarten"
                            >
                              Sint Maarten (+1721)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SK"
                              value="Slovakia"
                            >
                              Slovakia (+421)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SI"
                              value="Slovenia"
                            >
                              Slovenia (+386)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SB"
                              value="Solomon Islands"
                            >
                              Solomon Islands (+677)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SO"
                              value="Somalia"
                            >
                              Somalia (+252)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ZA"
                              value="South Africa"
                            >
                              South Africa (+27)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KR"
                              value="South Korea"
                            >
                              South Korea (+82)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SS"
                              value="South Sudan"
                            >
                              South Sudan (+211)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ES"
                              value="Spain"
                            >
                              Spain (+34)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LK"
                              value="Sri Lanka"
                            >
                              Sri Lanka (+94)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SD"
                              value="Sudan"
                            >
                              Sudan (+249)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SR"
                              value="Suriname"
                            >
                              Suriname (+597)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SJ"
                              value="Svalbard Jan Mayen"
                            >
                              Svalbard &amp; Jan Mayen (+47)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SZ"
                              value="Swaziland"
                            >
                              Swaziland (+268)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SE"
                              value="Sweden"
                            >
                              Sweden (+46)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CH"
                              value="Switzerland"
                            >
                              Switzerland (+41)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SY"
                              value="Syria"
                            >
                              Syria (+963)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TW"
                              value="Taiwan"
                            >
                              Taiwan (+886)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TJ"
                              value="Tajikistan"
                            >
                              Tajikistan (+992)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TZ"
                              value="Tanzania"
                            >
                              Tanzania (+255)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TH"
                              value="Thailand"
                            >
                              Thailand (+66)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="TG" value="Togo">
                              Togo (+228)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TO"
                              value="Tonga"
                            >
                              Tonga (+676)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TT"
                              value="Trinidad Tobago"
                            >
                              Trinidad &amp; Tobago (+1868)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TN"
                              value="Tunisia"
                            >
                              Tunisia (+216)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TR"
                              value="Turkey"
                            >
                              Turkey (+90)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TM"
                              value="Turkmenistan"
                            >
                              Turkmenistan (+993)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TC"
                              value="Turks Caicos Islands"
                            >
                              Turks &amp; Caicos Islands (+1649)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TV"
                              value="Tuvalu"
                            >
                              Tuvalu (+688)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UG"
                              value="Uganda"
                            >
                              Uganda (+256)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UA"
                              value="Ukraine"
                            >
                              Ukraine (+380)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AE"
                              value="United Arab Emirates"
                            >
                              United Arab Emirates (+971)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GB"
                              value="United Kingdom"
                            >
                              United Kingdom (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="US"
                              value="United States"
                            >
                              United States (+1)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UY"
                              value="Uruguay"
                            >
                              Uruguay (+598)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UZ"
                              value="Uzbekistan"
                            >
                              Uzbekistan (+998)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VU"
                              value="Vanuatu"
                            >
                              Vanuatu (+678)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VA"
                              value="Vatican City"
                            >
                              Vatican City (+379)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VE"
                              value="Venezuela"
                            >
                              Venezuela (+58)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VN"
                              value="Vietnam"
                            >
                              Vietnam (+84)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="WF"
                              value="Wallis Futuna"
                            >
                              Wallis &amp; Futuna (+681)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="YE"
                              value="Yemen (North)"
                            >
                              Yemen (North)(+969)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="YE"
                              value="Yemen (South)"
                            >
                              Yemen (South)(+967)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ZM"
                              value="Zambia"
                            >
                              Zambia (+260)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ZW"
                              value="Zimbabwe"
                            >
                              Zimbabwe (+263)
                            </IonSelectOption>
                          </IonSelect>
                        </div>

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex justify-between">
                        <div className=" mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("pays"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <div
                          className="ima2"
                          onClick={() => {
                            dispatch(setclik7(true));
                          }}
                        >
                          <img
                            src="editer.png"
                            alt="Bout"
                            className="rounded-full w-9 h-9"
                          />
                        </div>

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ********************************************    part adress ***********************************************************************************************/}

            {JSON.parse(localStorage.getItem("adress")) === "" ? (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Ville</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="adresse.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clicker3 ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Votre adresse"
                          // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                          value={JSON.parse(localStorage.getItem("adress"))}
                          onIonChange={(e) =>
                            dispatch(setadress(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            setClicker3(false);
                            modif2();
                          }}
                        >
                          Enregistrer
                        </button>

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("adress"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <div
                          className="ima2"
                          onClick={() => {
                            setClicker3(true);
                          }}
                        >
                          <img
                            src="editer.png"
                            alt="Bout"
                            className="rounded-full w-9 h-9"
                          />
                        </div>

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1 className="tailo">Ville</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="adresse.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clic3 === true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Votre adresse"
                          value={JSON.parse(localStorage.getItem("adress"))}
                          onIonChange={(e) =>
                            dispatch(setadress(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            dispatch(setclik3(false));
                            modif2();
                          }}
                        >
                          Enregistrer
                        </button>

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("adress"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <div
                          className="ima2"
                          onClick={() => {
                            dispatch(setclik3(true));
                          }}
                        >
                          <img
                            src="editer.png"
                            alt="Bout"
                            className="rounded-full w-9 h-9"
                          />
                        </div>

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {/* ********************************************    part website ***********************************************************************************************/}

            {JSON.parse(localStorage.getItem("website")) === "" ? (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Site Web</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="medias.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clicker4 ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Lien vers votre site web"
                          // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                          value={JSON.parse(localStorage.getItem("website"))}
                          onIonChange={(e) =>
                            dispatch(setwebsite(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setClicker4(false);
                              modif4();
                            }}
                          >
                            Enregistrer
                          </button>
                        )}

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("website"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : (
                          <div
                            className="ima2"
                            onClick={() => {
                              setClicker4(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )}

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Site Web</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="medias.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {click4 === true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Lien vers votre site web"
                          value={JSON.parse(localStorage.getItem("website"))}
                          onIonChange={(e) =>
                            dispatch(setwebsite(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              dispatch(setclik4(false));
                              modif4();
                            }}
                          >
                            Enregistrer
                          </button>
                        )}

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("website"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : (
                          <div
                            className="ima2"
                            onClick={() => {
                              dispatch(setclik4(true));
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )}

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ********************************************    part facebook ***********************************************************************************************/}

            {JSON.parse(localStorage.getItem("facebook")) === "" ? (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Facebook</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="facebook.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clicker5 ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Lien vers votre page facebook"
                          // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                          value={JSON.parse(localStorage.getItem("facebook"))}
                          onIonChange={(e) =>
                            dispatch(setfacebook(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setClicker5(false);
                              modif5();
                            }}
                          >
                            Enregistrer
                          </button>
                        )}

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("facebook"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : (
                          <div
                            className="ima2"
                            onClick={() => {
                              setClicker5(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )}

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Facebook</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="facebook.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {click5 === true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Lien vers votre page facebook"
                          value={JSON.parse(localStorage.getItem("facebook"))}
                          onIonChange={(e) =>
                            dispatch(setfacebook(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            Enregistrer
                          </button>
                        ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              dispatch(setclik5(false));
                              modif5();
                            }}
                          >
                            Enregistrer
                          </button>
                        )}

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("facebook"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        {JSON.parse(localStorage.getItem("store_name")) ===
                        "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast6(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("adress")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast5(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                          "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast2(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : JSON.parse(localStorage.getItem("pays")) === "" ? (
                          <div
                            className="ima2"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        ) : (
                          <div
                            className="ima2"
                            onClick={() => {
                              dispatch(setclik5(true));
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )}

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ********************************************    part whatapps ***********************************************************************************************/}

            {JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Whatsapp</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="whatsapp.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {clicker6 ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="EX : 22961940010"
                          type="number"
                          // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                          value={JSON.parse(localStorage.getItem("whatsapp"))}
                          onIonChange={(e) =>
                            dispatch(setwhatsapp(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            modif6(1);
                          }}
                        >
                          Enregistrer
                        </button>

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            {JSON.parse(localStorage.getItem("whatsapp"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <div
                          className="ima2"
                          onClick={() => {
                            setClicker6(true);
                          }}
                        >
                          <img
                            src="editer.png"
                            alt="Bout"
                            className="rounded-full w-9 h-9"
                          />
                        </div>

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Whatsapp</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="whatsapp.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    {click6 === true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="EX : 22961940010"
                          type="number"
                          value={JSON.parse(localStorage.getItem("whatsapp"))}
                          onIonChange={(e) =>
                            dispatch(setwhatsapp(e.target.value))
                          }
                        />
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            modif6(2);
                          }}
                        >
                          Enregistrer
                        </button>

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    ) : (
                      <div className="conter1 flex">
                        <div className="pp mt-2">
                          <p className="">
                            + {JSON.parse(localStorage.getItem("whatsapp"))}
                          </p>
                        </div>
                        {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                        <div
                          className="ima2"
                          onClick={() => {
                            dispatch(setclik6(true));
                          }}
                        >
                          <img
                            src="editer.png"
                            alt="Bout"
                            className="rounded-full w-9 h-9"
                          />
                        </div>

                        {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="mb-16"></div>
          </IonList>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <IonToast
              isOpen={showToast1}
              onDidDismiss={() => setShowToast1(false)}
              message="Le numéros doit contenir onze carartères"
              duration={3000}
              position="top"
            />
            <IonToast
              isOpen={showToast2}
              onDidDismiss={() => setShowToast2(false)}
              message="Vueillez configurer le numeros whatapps avant toute autres configurations "
              duration={4000}
              position="top"
            />
            <IonToast
              isOpen={showToast5}
              onDidDismiss={() => setShowToast5(false)}
              message="Vueillez configurer la section pays/ville avant toute autres configurations "
              duration={4000}
              position="top"
            />
            <IonToast
              isOpen={showToast6}
              onDidDismiss={() => setShowToast6(false)}
              message="Vueillez configurer le nom de la boutique avant toute autres configurations "
              duration={4000}
              position="top"
            />

            <IonToast
              isOpen={showToast7}
              onDidDismiss={() => setShowToast7(false)}
              message="Vueillez configurer le pays avant toute autres configurations "
              duration={4000}
              position="top"
            />

            <IonToast
              isOpen={showToast3}
              onDidDismiss={() => setShowToast3(false)}
              message={messerr}
              icon={informationCircle}
              position="top"
              duration={3000}
            />

            <IonToast
              isOpen={showToast4}
              onDidDismiss={() => setShowToast4(false)}
              message={message}
              icon={informationCircle}
              position="top"
              duration={3000}
            />
            <div className="w-96 border- rounded-lg shadow-xl absolute left-1/2 -translate-x-1/2 my-6">
              <div className="w-full flex items-center justify-center mt-3 mb-7">
                {/* ********************************************    part image profile ***********************************************************************************************/}

                {JSON.parse(localStorage.getItem("image")) === "" ? (
                  <>
                    <div className="flex items-center justify-center relative">
                      {userInfo.filepreview != null ? (
                        loader === true ? (
                          <img
                            src="gitload.gif"
                            alt=""
                            className="w-44 h-44 rounded-full object-cover"
                          />
                        ) : (
                          <img
                            src={userInfo.filepreview}
                            alt=""
                            className="w-44 h-44 rounded-full object-fill"
                          />
                        )
                      ) : loader === true ? (
                        <img
                          src="gitload.gif"
                          alt=""
                          className="w-44 h-44 rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src="store.png"
                          alt=""
                          className="w-44 h-44 rounded-full object-fill"
                        />
                      )}

                      {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
                      {JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
                        <div
                          className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer chooseimg"
                          onClick={() => {
                            setShowToast2(true);
                          }}
                        >
                          <label for="file" className="">
                            <BsCameraFill className="text-xl text-white" />
                            {/* <input
                              type="file"
                              style={{ display: "none" }}
                              id="file"
                              name="upload_file"
                              onChange={handleInputChange}
                            /> */}
                          </label>
                        </div>
                      ) : (
                        <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                          <label for="file" className="">
                            <BsCameraFill className="text-xl text-white" />
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="file"
                              name="upload_file"
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                      )}

                      {/* ) : (
                      <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                          />
                        </label>
                      </div>
                    )} */}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center relative">
                      {userInfo.filepreview != null ? (
                        loader === true ? (
                          <img
                            src="gitload.gif"
                            alt=""
                            className="w-44 h-44 rounded-full object-cover"
                          />
                        ) : (
                          <img
                            src={userInfo.filepreview}
                            alt=""
                            className="w-44 h-44 rounded-full object-fill"
                          />
                        )
                      ) : loader === true ? (
                        <img
                          src="gitload.gif"
                          alt=""
                          className="w-44 h-44 rounded-full object-cover"
                        />
                      ) : (
                        <img
                          src={`https://backendtrader.digitalfirst.space/uploads/${JSON.parse(
                            localStorage.getItem("image")
                          )}`}
                          alt=""
                          className="w-44 h-44 rounded-full object-cover"
                        />
                      )}
                      {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
                      {JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
                        <div
                          className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer chooseimg"
                          onClick={() => {
                            setShowToast2(true);
                          }}
                        >
                          <label for="file" className="">
                            <BsCameraFill className="text-xl text-white" />
                            {/* <input
                              type="file"
                              style={{ display: "none" }}
                              id="file"
                              name="upload_file"
                              onChange={handleInputChange}
                            /> */}
                          </label>
                        </div>
                      ) : (
                        <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                          <label for="file" className="">
                            <BsCameraFill className="text-xl text-white" />
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="file"
                              name="upload_file"
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                      )}

                      {/* ) : (
                      <div className="bg-green-700 w-14 h-14 rounded-full flex items-center justify-center chooseimg">
                        <label for="file" className="">
                          <BsCameraFill className="text-xl text-white" />
                          <input
                            type="file"
                            style={{ display: "none" }}
                            id="file"
                            name="upload_file"
                          />
                        </label>
                      </div>
                    )} */}
                    </div>
                  </>
                )}
              </div>

              {/* ********************************************    part copy code boutique  ***********************************************************************************************/}

              {copy ? (
                <div class="alert alert-success text-center" role="alert">
                  copier dans le papier press
                </div>
              ) : null}
              <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                <div className="tailo">
                  <h1 className="tailo">Code de la Boutique</h1>
                </div>
                <div className="container-fluid flex conter famit">
                  <div className="ima1">
                    <img
                      src="boutique.png"
                      alt="Bout"
                      className="rounded-full w-10 h-10"
                    />
                  </div>

                  <div className="conter1 flex">
                    <div className="pp mt-2">
                      <CopyToClipboard
                        text={JSON.parse(localStorage.getItem("code_boutique"))}
                        onCopy={() => clipboard()}
                      >
                        <p className="">
                          {JSON.parse(localStorage.getItem("code_boutique"))}
                        </p>
                      </CopyToClipboard>
                    </div>
                    <div
                      className="ima2"
                      onClick={() => {
                        // dispatch(setclik1(true));
                      }}
                    >
                      <CopyToClipboard
                        text={JSON.parse(localStorage.getItem("code_boutique"))}
                        onCopy={() => clipboard()}
                      >
                        <img src="copy.png" alt="Bout" className=" w-10 h-10" />
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>

              {/* ********************************************    part store_name  ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("store_name")) === "" ? (
                <>
                  {/* <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Nom de la Boutique</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="boutique.png"
                        alt="Bout"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp mt-2">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div
                        className="ima2"
                        onClick={() => {
                          window.location.href = "/profile";
                        }}
                        // routerLink="/home"
                      >
                        <img
                          src="ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}{" "}
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Nom de la Boutique</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="boutique.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clicker1 ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Nom de votre entreprise"
                            // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                            value={JSON.parse(
                              localStorage.getItem("store_name")
                            )}
                            onIonChange={(e) =>
                              dispatch(setstore_name(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setClicker1(false);
                              modif1();
                            }}
                          >
                            Enregistrer
                          </button>

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("store_name"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <div
                            className="ima2"
                            onClick={() => {
                              setClicker1(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Nom de la Boutique</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="boutique.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clic1 === true ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Nom de votre entreprise"
                            value={JSON.parse(
                              localStorage.getItem("store_name")
                            )}
                            onIonChange={(e) =>
                              dispatch(setstore_name(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              dispatch(setclik1(false));
                              modif1();
                            }}
                          >
                            Enregistrer
                          </button>

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("store_name"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                          <div
                            className="ima2"
                            onClick={() => {
                              dispatch(setclik1(true));
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ********************************************    part description ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("description")) === "" ? (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Description</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="description-de-lemploi.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clicker2 ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Description de l'entreprise"
                            // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                            value={JSON.parse(
                              localStorage.getItem("description")
                            )}
                            onIonChange={(e) =>
                              dispatch(setdescription(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setClicker2(false);
                                modif3();
                              }}
                            >
                              Enregistrer
                            </button>
                          )}

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp">
                            <p className="">
                              {JSON.parse(localStorage.getItem("description"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}

                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : (
                            <div
                              className="ima2"
                              onClick={() => {
                                setClicker2(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          )}

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="">
                      <h1 className="tailo">Description</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="description-de-lemploi.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clic2 === true ? (
                        <div className="conter1 flex flex-col">
                          <IonTextarea
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Description de l'entreprise"
                            value={JSON.parse(
                              localStorage.getItem("description")
                            )}
                            onIonChange={(e) =>
                              dispatch(setdescription(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                dispatch(setclik2(false));
                                modif3();
                              }}
                            >
                              Enregistrer
                            </button>
                          )}

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp">
                            <p className="">
                              {JSON.parse(localStorage.getItem("description"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : (
                            <div
                              className="ima2"
                              onClick={() => {
                                dispatch(setclik2(true));
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          )}

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ********************************************    part pays ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("pays")) === "" ? (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Pays</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src={flagImg}
                          alt="country-flag"
                          id="img"
                          className={
                            flagImg === "australia.png"
                              ? "rounded-full w-12 h-12"
                              : "rounded-full w-12 h-12"
                          }
                        />
                      </div>
                      <div className="conter1 flex flex-col w-full justify-between items-center">
                        {/* <div className="flex items-center justify-between w-full h-10"> */}

                        <div className="flex items-center justify-center text-lg">
                          {indicatif === "" && (
                            <label
                              htmlFor="country"
                              className="text-lg text-stone-800"
                            >
                              {" "}
                              Selectionnez le pays
                            </label>
                          )}
                          <IonSelect
                            id="country"
                            onIonChange={(e) => choixPays(e.detail.value)}
                            // onIonChange={(e) => console.log(e.detail.value)}
                            defaultValue={indicatif}
                            className="w-full text-lg ml-0"
                          >
                            {/* <IonSelectOption value="" className="text-black">
                            Selectionnez le pays
                          </IonSelectOption> */}
                            {/* <IonSelectOption data-countryCode="AF" value="AF/93">
                            Afghanistan (+93)
                          </IonSelectOption> */}
                            <IonSelectOption
                              data-countryCode="AF"
                              value="Afghanistan"
                            >
                              Afghanistan (+93)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AL"
                              value="Albania"
                            >
                              Albania (+355)
                            </IonSelectOption>
                            {/* <IonSelectOption data-countryCode="DZ" value="DZ/213">
                            Algeria (+213)
                          </IonSelectOption> */}
                            <IonSelectOption
                              data-countryCode="DZ"
                              value="Algeria"
                            >
                              Algeria (+213)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AS"
                              value="American Samoa"
                            >
                              American Samoa (+1684)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AD"
                              value="Andorra"
                            >
                              Andorra (+376)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AO"
                              value="Angola"
                            >
                              Angola (+244)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AI"
                              value="Anguilla"
                            >
                              Anguilla (+1264)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AQ"
                              value="Antartica"
                            >
                              Antartica (+672)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AG"
                              value="Antigua Barbuda"
                            >
                              Antigua &amp; Barbuda (+1268)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AR"
                              value="Argentina"
                            >
                              Argentina (+54)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AM"
                              value="Armenia"
                            >
                              Armenia (+374)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AW"
                              value="Aruba"
                            >
                              Aruba (+297)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AU"
                              value="Australia"
                            >
                              Australia (+61)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AT"
                              value="Austria"
                            >
                              Austria (+43)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AZ"
                              value="Azerbaijan"
                            >
                              Azerbaijan (+994)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BS"
                              value="Bahamas"
                            >
                              Bahamas (+1242)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BH"
                              value="Bahrain"
                            >
                              Bahrain (+973)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BD"
                              value="Bangladesh"
                            >
                              Bangladesh (+880)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BB"
                              value="Barbados"
                            >
                              Barbados (+1246)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BY"
                              value="Belarus"
                            >
                              Belarus (+375)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BE"
                              value="Belgium"
                            >
                              Belgium (+32)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BZ"
                              value="Belize"
                            >
                              Belize (+501)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BJ"
                              value="Benin"
                            >
                              Benin (+229)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BM"
                              value="Bermuda"
                            >
                              Bermuda (+1441)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BT"
                              value="Bhutan"
                            >
                              Bhutan (+975)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BO"
                              value="Bolivia"
                            >
                              Bolivia (+591)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BA"
                              value="Bosnia Herzegovina"
                            >
                              Bosnia &amp; Herzegovina (+387)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BW"
                              value="Botswana"
                            >
                              Botswana (+267)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BR"
                              value="Brazil"
                            >
                              Brazil (+55)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IO"
                              value="British India Ocean Terrirory"
                            >
                              British India Ocean Terrirory (+246)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VG"
                              value="British Virgin Islands"
                            >
                              British Virgin Islands (+1284)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BN"
                              value="Brunei"
                            >
                              Brunei (+673)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BG"
                              value="Bulgaria"
                            >
                              Bulgaria (+359)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BF"
                              value="Burkina Faso"
                            >
                              Burkina Faso (+226)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BI"
                              value="Burundi"
                            >
                              Burundi (+257)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KH"
                              value="Cambodia"
                            >
                              Cambodia (+855)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CM"
                              value="Cameroon"
                            >
                              Cameroon (+237)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CA"
                              value="Canada"
                            >
                              Canada (+1)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CV"
                              value="Cape Verde Islands"
                            >
                              Cape Verde Islands (+238)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KY"
                              value="Cayman Islands"
                            >
                              Cayman Islands (+1345)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CF"
                              value="Central African Republic"
                            >
                              Central African Republic (+236)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="TD" value="Chad">
                              Chad (+235)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CL"
                              value="Chile"
                            >
                              Chile (+56)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CN"
                              value="China"
                            >
                              China (+86)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CX"
                              value="Christmas Island"
                            >
                              Christmas Island (+61)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CC"
                              value="Cocos Islands"
                            >
                              Cocos Islands (+61)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CO"
                              value="Colombia"
                            >
                              Colombia (+57)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KM"
                              value="Comoros"
                            >
                              Comoros (+269)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CK"
                              value="Cook Islands"
                            >
                              Cook Islands (+682)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CI"
                              value="Côte d'Ivoire"
                            >
                              Côte d'Ivoire (+225)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CR"
                              value="Costa Rica"
                            >
                              Costa Rica (+506)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HR"
                              value="Croatia"
                            >
                              Croatia (+385)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="CU" value="Cuba">
                              Cuba (+53)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CW"
                              value="Curacao"
                            >
                              Curacao (+599)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CY"
                              value="Cyprus - North"
                            >
                              Cyprus - North (+90)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CY"
                              value="Cyprus - South"
                            >
                              Cyprus - South (+357)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CZ"
                              value="Czech Republic"
                            >
                              Czech Republic (+420)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CD"
                              value="Democratic Republic of Congo"
                            >
                              Democratic Republic of Congo (+243)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DK"
                              value="DK/45"
                            >
                              Denmark (+45)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DJ"
                              value="Denmark"
                            >
                              Djibouti (+253)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DM"
                              value="Dominica"
                            >
                              Dominica (+1809)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DO"
                              value="Dominican Republic"
                            >
                              Dominican Republic (+1809)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TL"
                              value="East Timor"
                            >
                              East Timor (+670)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="EC"
                              value="Ecuador"
                            >
                              Ecuador (+593)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="EG"
                              value="Egypt"
                            >
                              Egypt (+20)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SV"
                              value="El Salvador"
                            >
                              El Salvador (+503)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GQ"
                              value="Equatorial Guinea"
                            >
                              Equatorial Guinea (+240)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ER"
                              value="Eritrea"
                            >
                              Eritrea (+291)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="EE"
                              value="Estonia"
                            >
                              Estonia (+372)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ET"
                              value="Ethiopia"
                            >
                              Ethiopia (+251)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FK"
                              value="Falkland Islands"
                            >
                              Falkland Islands (+500)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FO"
                              value="Faroe Islands"
                            >
                              Faroe Islands (+298)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="FJ" value="Fiji">
                              Fiji (+679)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FI"
                              value="Finland"
                            >
                              Finland (+358)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FR"
                              value="France"
                            >
                              France (+33)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GF"
                              value="French Guiana"
                            >
                              French Guiana (+594)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PF"
                              value="French Polynesia"
                            >
                              French Polynesia (+689)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GA"
                              value="Gabon"
                            >
                              Gabon (+241)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GM"
                              value="Gambia"
                            >
                              Gambia (+220)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GE"
                              value="Georgia"
                            >
                              Georgia (+7880)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="DE"
                              value="Germany"
                            >
                              Germany (+49)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GH"
                              value="Ghana"
                            >
                              Ghana (+233)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GI"
                              value="Gibraltar"
                            >
                              Gibraltar (+350)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GR"
                              value="Greece"
                            >
                              Greece (+30)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GL"
                              value="Greenland"
                            >
                              Greenland (+299)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GD"
                              value="Grenada"
                            >
                              Grenada (+1473)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GP"
                              value="Guadeloupe"
                            >
                              Guadeloupe (+590)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="GU" value="Guam">
                              Guam (+671)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GT"
                              value="Guatemala"
                            >
                              Guatemala (+502)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GG"
                              value="Guernsey"
                            >
                              Guernsey (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GN"
                              value="Guinea"
                            >
                              Guinea (+224)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GW"
                              value="Guinea-Bissau"
                            >
                              Guinea-Bissau (+245)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GY"
                              value="Guyana"
                            >
                              Guyana (+592)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HT"
                              value="HHaiti"
                            >
                              Haiti (+509)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HN"
                              value="Honduras"
                            >
                              Honduras (+504)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HK"
                              value="Hong Kong"
                            >
                              Hong Kong (+852)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="HU"
                              value="Hungary"
                            >
                              Hungary (+36)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IS"
                              value="Iceland"
                            >
                              Iceland (+354)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IN"
                              value="India"
                            >
                              India (+91)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ID"
                              value="Indonesia"
                            >
                              Indonesia (+62)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="IR" value="Iran">
                              Iran (+98)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="IQ" value="Iraq">
                              Iraq (+964)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IE"
                              value="Ireland"
                            >
                              Ireland (+353)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IM"
                              value="Isle of Man"
                            >
                              Isle of Man (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IL"
                              value="Israel"
                            >
                              Israel (+972)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="IT"
                              value="Italie"
                            >
                              Italie (+39)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JM"
                              value="Jamaica"
                            >
                              Jamaica (+1876)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JP"
                              value="Japan"
                            >
                              Japan (+81)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JE"
                              value="Jersey"
                            >
                              Jersey (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="JO"
                              value="Jordan"
                            >
                              Jordan (+962)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KZ"
                              value="Kazakhstan"
                            >
                              Kazakhstan (+7)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KE"
                              value="Kenya"
                            >
                              Kenya (+254)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KI"
                              value="Kiribati"
                            >
                              Kiribati (+686)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="XK"
                              value="Kosovo"
                            >
                              Kosovo (+383)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KW"
                              value="Kuwait"
                            >
                              Kuwait (+965)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KG"
                              value="Kyrgyzstan"
                            >
                              Kyrgyzstan (+996)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="LA" value="Laos">
                              Laos (+856)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LV"
                              value="Latvia"
                            >
                              Latvia (+371)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LB"
                              value="Lebanon"
                            >
                              Lebanon (+961)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LS"
                              value="Lesotho"
                            >
                              Lesotho (+266)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LR"
                              value="Liberia"
                            >
                              Liberia (+231)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LY"
                              value="Libya"
                            >
                              Libya (+218)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LI"
                              value="Liechtenstein"
                            >
                              Liechtenstein (+417)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LT"
                              value="Lithuania"
                            >
                              Lithuania (+370)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LU"
                              value="Luxembourg"
                            >
                              Luxembourg (+352)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MO"
                              value="Macao"
                            >
                              Macao (+853)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MK"
                              value="Macedonia"
                            >
                              Macedonia (+389)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MG"
                              value="Madagascar"
                            >
                              Madagascar (+261)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MW"
                              value="Malawi"
                            >
                              Malawi (+265)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MY"
                              value="Malaysia"
                            >
                              Malaysia (+60)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MV"
                              value="Maldives"
                            >
                              Maldives (+960)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="ML" value="Mali">
                              Mali (+223)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MT"
                              value="Malta"
                            >
                              Malta (+356)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MH"
                              value="Marshall Islands"
                            >
                              Marshall Islands (+692)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MQ"
                              value="Martinique"
                            >
                              Martinique (+596)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MR"
                              value="Mauritania"
                            >
                              Mauritania (+222)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="YT"
                              value="Mayotte"
                            >
                              Mayotte (+269)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MX"
                              value="Mexico"
                            >
                              Mexico (+52)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="FM"
                              value="Micronesia"
                            >
                              Micronesia (+691)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MD"
                              value="Moldova"
                            >
                              Moldova (+373)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MC"
                              value="Monaco"
                            >
                              Monaco (+377)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MN"
                              value="Mongolia"
                            >
                              Mongolia (+976)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ME"
                              value="Montengro"
                            >
                              Montengro (+382)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MS"
                              value="Montserrat"
                            >
                              Montserrat (+1664)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MA"
                              value="Morocco"
                            >
                              Morocco (+212)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MZ"
                              value="Mozambique"
                            >
                              Mozambique (+258)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MN"
                              value="Myanmar"
                            >
                              Myanmar (+95)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NA"
                              value="Namibia"
                            >
                              Namibia (+264)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NR"
                              value="Nauru"
                            >
                              Nauru (+674)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NP"
                              value="Nepal"
                            >
                              Nepal (+977)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NL"
                              value="Netherlands"
                            >
                              Netherlands (+31)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AN"
                              value="Netherlands Antilles"
                            >
                              Netherlands Antilles (+599)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NC"
                              value="New Caledonia"
                            >
                              New Caledonia (+687)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NZ"
                              value="New Zealand"
                            >
                              New Zealand (+64)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NI"
                              value="Nicaragua"
                            >
                              Nicaragua (+505)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NE"
                              value="Niger"
                            >
                              Niger (+227)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NG"
                              value="Nigeria"
                            >
                              Nigeria (+234)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="NU" value="Niue">
                              Niue (+683)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KP"
                              value="North Korea"
                            >
                              North Korea (+850)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NF"
                              value="Norfolk Islands"
                            >
                              Norfolk Islands (+672)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NP"
                              value="Northern Marianas (+670)"
                            >
                              Northern Marianas (+670)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="NO"
                              value="Norway"
                            >
                              Norway (+47)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="OM" value="Oman">
                              Oman (+968)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PK"
                              value="Pakistan"
                            >
                              Pakistan (+92)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PW"
                              value="Palau"
                            >
                              Palau (+680)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PS"
                              value="Palestine"
                            >
                              Palestine (+970)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PA"
                              value="Panama"
                            >
                              Panama (+507)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PG"
                              value="Papua New Guinea"
                            >
                              Papua New Guinea (+675)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PY"
                              value="Paraguay"
                            >
                              Paraguay (+595)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="PE" value="Peru">
                              Peru (+51)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PH"
                              value="Philippines"
                            >
                              Philippines (+63)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PN"
                              value="Pitcairn"
                            >
                              Pitcairn (+64)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PL"
                              value="Poland"
                            >
                              Poland (+48)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PT"
                              value="Portugal"
                            >
                              Portugal (+351)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PR"
                              value="Puerto Rico"
                            >
                              Puerto Rico (+1787)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="QA"
                              value="Qatar"
                            >
                              Qatar (+974)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CG"
                              value="Republic of the Congo"
                            >
                              Republic of the Congo (+242)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RE"
                              value="Reunion"
                            >
                              Reunion (+262)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RO"
                              value="Romania"
                            >
                              Romania (+40)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RU"
                              value="Russia"
                            >
                              Russia (+7)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="RW"
                              value="Rwanda"
                            >
                              Rwanda (+250)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="BL"
                              value="Saint Barthelemy"
                            >
                              Saint Barthelemy (+590)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SH"
                              value="Saint Helena"
                            >
                              Saint Helena (+290)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KN"
                              value="Saint Kitts Nevis"
                            >
                              Saint Kitts &amp; Nevis (+1869)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SC"
                              value="SC/1758"
                            >
                              Saint Lucia (+1758)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SR"
                              value="Suriname"
                            >
                              Suriname (+597)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="MF"
                              value="Saint Martin"
                            >
                              Saint Martin (+590)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="PM"
                              value="Saint Saint Pierre and Miquelon"
                            >
                              Saint Saint Pierre and Miquelon (+508)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VC"
                              value="Saint Vincent and the Grenadines"
                            >
                              Saint Vincent and the Grenadines (+1784)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="WS"
                              value="Samoa"
                            >
                              Samoa (+685)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SM"
                              value="San Marino"
                            >
                              San Marino (+378)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ST"
                              value="Sao Tome Principe"
                            >
                              Sao Tome &amp; Principe (+239)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SA"
                              value="Saudi Arabia"
                            >
                              Saudi Arabia (+966)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SN"
                              value="Senegal"
                            >
                              Senegal (+221)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CS"
                              value="Serbia"
                            >
                              Serbia (+381)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SC"
                              value="Seychelles"
                            >
                              Seychelles (+248)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SL"
                              value="Sierra Leone"
                            >
                              Sierra Leone (+232)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SG"
                              value="Singapore"
                            >
                              Singapore (+65)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SX"
                              value="Sint Maarten"
                            >
                              Sint Maarten (+1721)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SK"
                              value="Slovakia"
                            >
                              Slovakia (+421)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SI"
                              value="Slovenia"
                            >
                              Slovenia (+386)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SB"
                              value="Solomon Islands"
                            >
                              Solomon Islands (+677)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SO"
                              value="Somalia"
                            >
                              Somalia (+252)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ZA"
                              value="South Africa"
                            >
                              South Africa (+27)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="KR"
                              value="South Korea"
                            >
                              South Korea (+82)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SS"
                              value="South Sudan"
                            >
                              South Sudan (+211)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ES"
                              value="Spain"
                            >
                              Spain (+34)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="LK"
                              value="Sri Lanka"
                            >
                              Sri Lanka (+94)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SD"
                              value="Sudan"
                            >
                              Sudan (+249)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SR"
                              value="Suriname"
                            >
                              Suriname (+597)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SJ"
                              value="Svalbard Jan Mayen"
                            >
                              Svalbard &amp; Jan Mayen (+47)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SZ"
                              value="Swaziland"
                            >
                              Swaziland (+268)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SE"
                              value="Sweden"
                            >
                              Sweden (+46)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="CH"
                              value="Switzerland"
                            >
                              Switzerland (+41)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="SY"
                              value="Syria"
                            >
                              Syria (+963)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TW"
                              value="Taiwan"
                            >
                              Taiwan (+886)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TJ"
                              value="Tajikistan"
                            >
                              Tajikistan (+992)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TZ"
                              value="Tanzania"
                            >
                              Tanzania (+255)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TH"
                              value="Thailand"
                            >
                              Thailand (+66)
                            </IonSelectOption>
                            <IonSelectOption data-countryCode="TG" value="Togo">
                              Togo (+228)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TO"
                              value="Tonga"
                            >
                              Tonga (+676)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TT"
                              value="Trinidad Tobago"
                            >
                              Trinidad &amp; Tobago (+1868)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TN"
                              value="Tunisia"
                            >
                              Tunisia (+216)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TR"
                              value="Turkey"
                            >
                              Turkey (+90)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TM"
                              value="Turkmenistan"
                            >
                              Turkmenistan (+993)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TC"
                              value="Turks Caicos Islands"
                            >
                              Turks &amp; Caicos Islands (+1649)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="TV"
                              value="Tuvalu"
                            >
                              Tuvalu (+688)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UG"
                              value="Uganda"
                            >
                              Uganda (+256)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UA"
                              value="Ukraine"
                            >
                              Ukraine (+380)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="AE"
                              value="United Arab Emirates"
                            >
                              United Arab Emirates (+971)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="GB"
                              value="United Kingdom"
                            >
                              United Kingdom (+44)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="US"
                              value="United States"
                            >
                              United States (+1)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UY"
                              value="Uruguay"
                            >
                              Uruguay (+598)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="UZ"
                              value="Uzbekistan"
                            >
                              Uzbekistan (+998)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VU"
                              value="Vanuatu"
                            >
                              Vanuatu (+678)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VA"
                              value="Vatican City"
                            >
                              Vatican City (+379)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VE"
                              value="Venezuela"
                            >
                              Venezuela (+58)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="VN"
                              value="Vietnam"
                            >
                              Vietnam (+84)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="WF"
                              value="Wallis Futuna"
                            >
                              Wallis &amp; Futuna (+681)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="YE"
                              value="Yemen (North)"
                            >
                              Yemen (North)(+969)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="YE"
                              value="Yemen (South)"
                            >
                              Yemen (South)(+967)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ZM"
                              value="Zambia"
                            >
                              Zambia (+260)
                            </IonSelectOption>
                            <IonSelectOption
                              data-countryCode="ZW"
                              value="Zimbabwe"
                            >
                              Zimbabwe (+263)
                            </IonSelectOption>
                          </IonSelect>
                        </div>

                        {/* </div> */}

                        {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Pays</h1>
                    </div>
                    <div className="container-fluid flex justify-center items-center conter famit">
                      <div className="ima1">
                        <img
                          src={flagImg}
                          alt="country-flag"
                          id="img"
                          className={
                            flagImg === "australia.png"
                              ? "rounded-full w-12 h-12"
                              : "rounded-full w-12 h-12"
                          }
                        />
                      </div>
                      {click7 === true ? (
                        <div className="conter1 flex">
                          <div className="flex items-center justify-center text-lg">
                            {/* {indicatif === "" && ( */}
                            <label
                              htmlFor="country"
                              className="text-lg text-stone-800"
                            >
                              {" "}
                              Selectionnez le pays
                            </label>
                            {/* )} */}
                            <IonSelect
                              id="country"
                              onIonChange={(e) => {
                                choixPays(e.detail.value);
                                dispatch(setclik7(false));
                              }}
                              // onIonChange={(e) => console.log(e.detail.value)}
                              defaultValue={indicatif}
                              className="w-full text-lg ml-0"
                            >
                              {/* <IonSelectOption value="" className="text-black">
                          Selectionnez le pays
                        </IonSelectOption> */}
                              {/* <IonSelectOption data-countryCode="AF" value="AF/93">
                          Afghanistan (+93)
                        </IonSelectOption> */}
                              <IonSelectOption
                                data-countryCode="AF"
                                value="Afghanistan"
                              >
                                Afghanistan (+93)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AL"
                                value="Albania"
                              >
                                Albania (+355)
                              </IonSelectOption>
                              {/* <IonSelectOption data-countryCode="DZ" value="DZ/213">
                          Algeria (+213)
                        </IonSelectOption> */}
                              <IonSelectOption
                                data-countryCode="DZ"
                                value="Algeria"
                              >
                                Algeria (+213)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AS"
                                value="American Samoa"
                              >
                                American Samoa (+1684)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AD"
                                value="Andorra"
                              >
                                Andorra (+376)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AO"
                                value="Angola"
                              >
                                Angola (+244)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AI"
                                value="Anguilla"
                              >
                                Anguilla (+1264)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AQ"
                                value="Antartica"
                              >
                                Antartica (+672)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AG"
                                value="Antigua Barbuda"
                              >
                                Antigua &amp; Barbuda (+1268)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AR"
                                value="Argentina"
                              >
                                Argentina (+54)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AM"
                                value="Armenia"
                              >
                                Armenia (+374)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AW"
                                value="Aruba"
                              >
                                Aruba (+297)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AU"
                                value="Australia"
                              >
                                Australia (+61)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AT"
                                value="Austria"
                              >
                                Austria (+43)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AZ"
                                value="Azerbaijan"
                              >
                                Azerbaijan (+994)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BS"
                                value="Bahamas"
                              >
                                Bahamas (+1242)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BH"
                                value="Bahrain"
                              >
                                Bahrain (+973)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BD"
                                value="Bangladesh"
                              >
                                Bangladesh (+880)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BB"
                                value="Barbados"
                              >
                                Barbados (+1246)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BY"
                                value="Belarus"
                              >
                                Belarus (+375)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BE"
                                value="Belgium"
                              >
                                Belgium (+32)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BZ"
                                value="Belize"
                              >
                                Belize (+501)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BJ"
                                value="Benin"
                              >
                                Benin (+229)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BM"
                                value="Bermuda"
                              >
                                Bermuda (+1441)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BT"
                                value="Bhutan"
                              >
                                Bhutan (+975)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BO"
                                value="Bolivia"
                              >
                                Bolivia (+591)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BA"
                                value="Bosnia Herzegovina"
                              >
                                Bosnia &amp; Herzegovina (+387)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BW"
                                value="Botswana"
                              >
                                Botswana (+267)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BR"
                                value="Brazil"
                              >
                                Brazil (+55)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IO"
                                value="British India Ocean Terrirory"
                              >
                                British India Ocean Terrirory (+246)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="VG"
                                value="British Virgin Islands"
                              >
                                British Virgin Islands (+1284)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BN"
                                value="Brunei"
                              >
                                Brunei (+673)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BG"
                                value="Bulgaria"
                              >
                                Bulgaria (+359)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BF"
                                value="Burkina Faso"
                              >
                                Burkina Faso (+226)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BI"
                                value="Burundi"
                              >
                                Burundi (+257)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KH"
                                value="Cambodia"
                              >
                                Cambodia (+855)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CM"
                                value="Cameroon"
                              >
                                Cameroon (+237)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CA"
                                value="Canada"
                              >
                                Canada (+1)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CV"
                                value="Cape Verde Islands"
                              >
                                Cape Verde Islands (+238)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KY"
                                value="Cayman Islands"
                              >
                                Cayman Islands (+1345)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CF"
                                value="Central African Republic"
                              >
                                Central African Republic (+236)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TD"
                                value="Chad"
                              >
                                Chad (+235)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CL"
                                value="Chile"
                              >
                                Chile (+56)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CN"
                                value="China"
                              >
                                China (+86)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CX"
                                value="Christmas Island"
                              >
                                Christmas Island (+61)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CC"
                                value="Cocos Islands"
                              >
                                Cocos Islands (+61)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CO"
                                value="Colombia"
                              >
                                Colombia (+57)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KM"
                                value="Comoros"
                              >
                                Comoros (+269)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CK"
                                value="Cook Islands"
                              >
                                Cook Islands (+682)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CI"
                                value="Côte d'Ivoire"
                              >
                                Côte d'Ivoire (+225)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CR"
                                value="Costa Rica"
                              >
                                Costa Rica (+506)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="HR"
                                value="Croatia"
                              >
                                Croatia (+385)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CU"
                                value="Cuba"
                              >
                                Cuba (+53)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CW"
                                value="Curacao"
                              >
                                Curacao (+599)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CY"
                                value="Cyprus - North"
                              >
                                Cyprus - North (+90)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CY"
                                value="Cyprus - South"
                              >
                                Cyprus - South (+357)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CZ"
                                value="Czech Republic"
                              >
                                Czech Republic (+420)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CD"
                                value="Democratic Republic of Congo"
                              >
                                Democratic Republic of Congo (+243)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="DK"
                                value="DK/45"
                              >
                                Denmark (+45)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="DJ"
                                value="Denmark"
                              >
                                Djibouti (+253)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="DM"
                                value="Dominica"
                              >
                                Dominica (+1809)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="DO"
                                value="Dominican Republic"
                              >
                                Dominican Republic (+1809)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TL"
                                value="East Timor"
                              >
                                East Timor (+670)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="EC"
                                value="Ecuador"
                              >
                                Ecuador (+593)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="EG"
                                value="Egypt"
                              >
                                Egypt (+20)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SV"
                                value="El Salvador"
                              >
                                El Salvador (+503)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GQ"
                                value="Equatorial Guinea"
                              >
                                Equatorial Guinea (+240)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ER"
                                value="Eritrea"
                              >
                                Eritrea (+291)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="EE"
                                value="Estonia"
                              >
                                Estonia (+372)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ET"
                                value="Ethiopia"
                              >
                                Ethiopia (+251)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="FK"
                                value="Falkland Islands"
                              >
                                Falkland Islands (+500)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="FO"
                                value="Faroe Islands"
                              >
                                Faroe Islands (+298)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="FJ"
                                value="Fiji"
                              >
                                Fiji (+679)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="FI"
                                value="Finland"
                              >
                                Finland (+358)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="FR"
                                value="France"
                              >
                                France (+33)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GF"
                                value="French Guiana"
                              >
                                French Guiana (+594)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PF"
                                value="French Polynesia"
                              >
                                French Polynesia (+689)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GA"
                                value="Gabon"
                              >
                                Gabon (+241)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GM"
                                value="Gambia"
                              >
                                Gambia (+220)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GE"
                                value="Georgia"
                              >
                                Georgia (+7880)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="DE"
                                value="Germany"
                              >
                                Germany (+49)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GH"
                                value="Ghana"
                              >
                                Ghana (+233)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GI"
                                value="Gibraltar"
                              >
                                Gibraltar (+350)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GR"
                                value="Greece"
                              >
                                Greece (+30)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GL"
                                value="Greenland"
                              >
                                Greenland (+299)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GD"
                                value="Grenada"
                              >
                                Grenada (+1473)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GP"
                                value="Guadeloupe"
                              >
                                Guadeloupe (+590)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GU"
                                value="Guam"
                              >
                                Guam (+671)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GT"
                                value="Guatemala"
                              >
                                Guatemala (+502)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GG"
                                value="Guernsey"
                              >
                                Guernsey (+44)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GN"
                                value="Guinea"
                              >
                                Guinea (+224)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GW"
                                value="Guinea-Bissau"
                              >
                                Guinea-Bissau (+245)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GY"
                                value="Guyana"
                              >
                                Guyana (+592)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="HT"
                                value="HHaiti"
                              >
                                Haiti (+509)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="HN"
                                value="Honduras"
                              >
                                Honduras (+504)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="HK"
                                value="Hong Kong"
                              >
                                Hong Kong (+852)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="HU"
                                value="Hungary"
                              >
                                Hungary (+36)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IS"
                                value="Iceland"
                              >
                                Iceland (+354)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IN"
                                value="India"
                              >
                                India (+91)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ID"
                                value="Indonesia"
                              >
                                Indonesia (+62)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IR"
                                value="Iran"
                              >
                                Iran (+98)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IQ"
                                value="Iraq"
                              >
                                Iraq (+964)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IE"
                                value="Ireland"
                              >
                                Ireland (+353)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IM"
                                value="Isle of Man"
                              >
                                Isle of Man (+44)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IL"
                                value="Israel"
                              >
                                Israel (+972)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="IT"
                                value="Italie"
                              >
                                Italie (+39)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="JM"
                                value="Jamaica"
                              >
                                Jamaica (+1876)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="JP"
                                value="Japan"
                              >
                                Japan (+81)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="JE"
                                value="Jersey"
                              >
                                Jersey (+44)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="JO"
                                value="Jordan"
                              >
                                Jordan (+962)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KZ"
                                value="Kazakhstan"
                              >
                                Kazakhstan (+7)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KE"
                                value="Kenya"
                              >
                                Kenya (+254)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KI"
                                value="Kiribati"
                              >
                                Kiribati (+686)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="XK"
                                value="Kosovo"
                              >
                                Kosovo (+383)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KW"
                                value="Kuwait"
                              >
                                Kuwait (+965)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KG"
                                value="Kyrgyzstan"
                              >
                                Kyrgyzstan (+996)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LA"
                                value="Laos"
                              >
                                Laos (+856)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LV"
                                value="Latvia"
                              >
                                Latvia (+371)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LB"
                                value="Lebanon"
                              >
                                Lebanon (+961)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LS"
                                value="Lesotho"
                              >
                                Lesotho (+266)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LR"
                                value="Liberia"
                              >
                                Liberia (+231)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LY"
                                value="Libya"
                              >
                                Libya (+218)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LI"
                                value="Liechtenstein"
                              >
                                Liechtenstein (+417)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LT"
                                value="Lithuania"
                              >
                                Lithuania (+370)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LU"
                                value="Luxembourg"
                              >
                                Luxembourg (+352)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MO"
                                value="Macao"
                              >
                                Macao (+853)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MK"
                                value="Macedonia"
                              >
                                Macedonia (+389)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MG"
                                value="Madagascar"
                              >
                                Madagascar (+261)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MW"
                                value="Malawi"
                              >
                                Malawi (+265)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MY"
                                value="Malaysia"
                              >
                                Malaysia (+60)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MV"
                                value="Maldives"
                              >
                                Maldives (+960)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ML"
                                value="Mali"
                              >
                                Mali (+223)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MT"
                                value="Malta"
                              >
                                Malta (+356)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MH"
                                value="Marshall Islands"
                              >
                                Marshall Islands (+692)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MQ"
                                value="Martinique"
                              >
                                Martinique (+596)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MR"
                                value="Mauritania"
                              >
                                Mauritania (+222)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="YT"
                                value="Mayotte"
                              >
                                Mayotte (+269)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MX"
                                value="Mexico"
                              >
                                Mexico (+52)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="FM"
                                value="Micronesia"
                              >
                                Micronesia (+691)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MD"
                                value="Moldova"
                              >
                                Moldova (+373)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MC"
                                value="Monaco"
                              >
                                Monaco (+377)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MN"
                                value="Mongolia"
                              >
                                Mongolia (+976)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ME"
                                value="Montengro"
                              >
                                Montengro (+382)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MS"
                                value="Montserrat"
                              >
                                Montserrat (+1664)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MA"
                                value="Morocco"
                              >
                                Morocco (+212)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MZ"
                                value="Mozambique"
                              >
                                Mozambique (+258)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MN"
                                value="Myanmar"
                              >
                                Myanmar (+95)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NA"
                                value="Namibia"
                              >
                                Namibia (+264)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NR"
                                value="Nauru"
                              >
                                Nauru (+674)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NP"
                                value="Nepal"
                              >
                                Nepal (+977)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NL"
                                value="Netherlands"
                              >
                                Netherlands (+31)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AN"
                                value="Netherlands Antilles"
                              >
                                Netherlands Antilles (+599)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NC"
                                value="New Caledonia"
                              >
                                New Caledonia (+687)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NZ"
                                value="New Zealand"
                              >
                                New Zealand (+64)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NI"
                                value="Nicaragua"
                              >
                                Nicaragua (+505)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NE"
                                value="Niger"
                              >
                                Niger (+227)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NG"
                                value="Nigeria"
                              >
                                Nigeria (+234)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NU"
                                value="Niue"
                              >
                                Niue (+683)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KP"
                                value="North Korea"
                              >
                                North Korea (+850)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NF"
                                value="Norfolk Islands"
                              >
                                Norfolk Islands (+672)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NP"
                                value="Northern Marianas (+670)"
                              >
                                Northern Marianas (+670)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="NO"
                                value="Norway"
                              >
                                Norway (+47)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="OM"
                                value="Oman"
                              >
                                Oman (+968)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PK"
                                value="Pakistan"
                              >
                                Pakistan (+92)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PW"
                                value="Palau"
                              >
                                Palau (+680)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PS"
                                value="Palestine"
                              >
                                Palestine (+970)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PA"
                                value="Panama"
                              >
                                Panama (+507)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PG"
                                value="Papua New Guinea"
                              >
                                Papua New Guinea (+675)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PY"
                                value="Paraguay"
                              >
                                Paraguay (+595)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PE"
                                value="Peru"
                              >
                                Peru (+51)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PH"
                                value="Philippines"
                              >
                                Philippines (+63)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PN"
                                value="Pitcairn"
                              >
                                Pitcairn (+64)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PL"
                                value="Poland"
                              >
                                Poland (+48)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PT"
                                value="Portugal"
                              >
                                Portugal (+351)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PR"
                                value="Puerto Rico"
                              >
                                Puerto Rico (+1787)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="QA"
                                value="Qatar"
                              >
                                Qatar (+974)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CG"
                                value="Republic of the Congo"
                              >
                                Republic of the Congo (+242)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="RE"
                                value="Reunion"
                              >
                                Reunion (+262)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="RO"
                                value="Romania"
                              >
                                Romania (+40)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="RU"
                                value="Russia"
                              >
                                Russia (+7)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="RW"
                                value="Rwanda"
                              >
                                Rwanda (+250)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="BL"
                                value="Saint Barthelemy"
                              >
                                Saint Barthelemy (+590)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SH"
                                value="Saint Helena"
                              >
                                Saint Helena (+290)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KN"
                                value="Saint Kitts Nevis"
                              >
                                Saint Kitts &amp; Nevis (+1869)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SC"
                                value="SC/1758"
                              >
                                Saint Lucia (+1758)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SR"
                                value="Suriname"
                              >
                                Suriname (+597)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="MF"
                                value="Saint Martin"
                              >
                                Saint Martin (+590)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="PM"
                                value="Saint Saint Pierre and Miquelon"
                              >
                                Saint Saint Pierre and Miquelon (+508)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="VC"
                                value="Saint Vincent and the Grenadines"
                              >
                                Saint Vincent and the Grenadines (+1784)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="WS"
                                value="Samoa"
                              >
                                Samoa (+685)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SM"
                                value="San Marino"
                              >
                                San Marino (+378)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ST"
                                value="Sao Tome Principe"
                              >
                                Sao Tome &amp; Principe (+239)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SA"
                                value="Saudi Arabia"
                              >
                                Saudi Arabia (+966)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SN"
                                value="Senegal"
                              >
                                Senegal (+221)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CS"
                                value="Serbia"
                              >
                                Serbia (+381)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SC"
                                value="Seychelles"
                              >
                                Seychelles (+248)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SL"
                                value="Sierra Leone"
                              >
                                Sierra Leone (+232)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SG"
                                value="Singapore"
                              >
                                Singapore (+65)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SX"
                                value="Sint Maarten"
                              >
                                Sint Maarten (+1721)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SK"
                                value="Slovakia"
                              >
                                Slovakia (+421)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SI"
                                value="Slovenia"
                              >
                                Slovenia (+386)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SB"
                                value="Solomon Islands"
                              >
                                Solomon Islands (+677)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SO"
                                value="Somalia"
                              >
                                Somalia (+252)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ZA"
                                value="South Africa"
                              >
                                South Africa (+27)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="KR"
                                value="South Korea"
                              >
                                South Korea (+82)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SS"
                                value="South Sudan"
                              >
                                South Sudan (+211)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ES"
                                value="Spain"
                              >
                                Spain (+34)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="LK"
                                value="Sri Lanka"
                              >
                                Sri Lanka (+94)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SD"
                                value="Sudan"
                              >
                                Sudan (+249)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SR"
                                value="Suriname"
                              >
                                Suriname (+597)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SJ"
                                value="Svalbard Jan Mayen"
                              >
                                Svalbard &amp; Jan Mayen (+47)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SZ"
                                value="Swaziland"
                              >
                                Swaziland (+268)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SE"
                                value="Sweden"
                              >
                                Sweden (+46)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="CH"
                                value="Switzerland"
                              >
                                Switzerland (+41)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="SY"
                                value="Syria"
                              >
                                Syria (+963)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TW"
                                value="Taiwan"
                              >
                                Taiwan (+886)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TJ"
                                value="Tajikistan"
                              >
                                Tajikistan (+992)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TZ"
                                value="Tanzania"
                              >
                                Tanzania (+255)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TH"
                                value="Thailand"
                              >
                                Thailand (+66)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TG"
                                value="Togo"
                              >
                                Togo (+228)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TO"
                                value="Tonga"
                              >
                                Tonga (+676)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TT"
                                value="Trinidad Tobago"
                              >
                                Trinidad &amp; Tobago (+1868)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TN"
                                value="Tunisia"
                              >
                                Tunisia (+216)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TR"
                                value="Turkey"
                              >
                                Turkey (+90)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TM"
                                value="Turkmenistan"
                              >
                                Turkmenistan (+993)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TC"
                                value="Turks Caicos Islands"
                              >
                                Turks &amp; Caicos Islands (+1649)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="TV"
                                value="Tuvalu"
                              >
                                Tuvalu (+688)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="UG"
                                value="Uganda"
                              >
                                Uganda (+256)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="UA"
                                value="Ukraine"
                              >
                                Ukraine (+380)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="AE"
                                value="United Arab Emirates"
                              >
                                United Arab Emirates (+971)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="GB"
                                value="United Kingdom"
                              >
                                United Kingdom (+44)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="US"
                                value="United States"
                              >
                                United States (+1)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="UY"
                                value="Uruguay"
                              >
                                Uruguay (+598)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="UZ"
                                value="Uzbekistan"
                              >
                                Uzbekistan (+998)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="VU"
                                value="Vanuatu"
                              >
                                Vanuatu (+678)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="VA"
                                value="Vatican City"
                              >
                                Vatican City (+379)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="VE"
                                value="Venezuela"
                              >
                                Venezuela (+58)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="VN"
                                value="Vietnam"
                              >
                                Vietnam (+84)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="WF"
                                value="Wallis Futuna"
                              >
                                Wallis &amp; Futuna (+681)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="YE"
                                value="Yemen (North)"
                              >
                                Yemen (North)(+969)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="YE"
                                value="Yemen (South)"
                              >
                                Yemen (South)(+967)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ZM"
                                value="Zambia"
                              >
                                Zambia (+260)
                              </IonSelectOption>
                              <IonSelectOption
                                data-countryCode="ZW"
                                value="Zimbabwe"
                              >
                                Zimbabwe (+263)
                              </IonSelectOption>
                            </IonSelect>
                          </div>

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex justify-between">
                          <div className=" mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("pays"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <div
                            className="ima2"
                            onClick={() => {
                              dispatch(setclik7(true));
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ********************************************    part adress ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("adress")) === "" ? (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Ville</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="adresse.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clicker3 ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Votre adresse"
                            // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                            value={JSON.parse(localStorage.getItem("adress"))}
                            onIonChange={(e) =>
                              dispatch(setadress(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              setClicker3(false);
                              modif2();
                            }}
                          >
                            Enregistrer
                          </button>

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("adress"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <div
                            className="ima2"
                            onClick={() => {
                              setClicker3(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="">
                      <h1 className="tailo">Ville</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="adresse.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clic3 === true ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Votre adresse"
                            value={JSON.parse(localStorage.getItem("adress"))}
                            onIonChange={(e) =>
                              dispatch(setadress(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              dispatch(setclik3(false));
                              modif2();
                            }}
                          >
                            Enregistrer
                          </button>

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("adress"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <div
                            className="ima2"
                            onClick={() => {
                              dispatch(setclik3(true));
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* ********************************************    part website ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("website")) === "" ? (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Site Web</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="medias.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clicker4 ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Lien vers votre site web"
                            // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                            value={JSON.parse(localStorage.getItem("website"))}
                            onIonChange={(e) =>
                              dispatch(setwebsite(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setClicker4(false);
                                modif4();
                              }}
                            >
                              Enregistrer
                            </button>
                          )}

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("website"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : (
                            <div
                              className="ima2"
                              onClick={() => {
                                setClicker4(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          )}

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Site Web</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="medias.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {click4 === true ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Lien vers votre site web"
                            value={JSON.parse(localStorage.getItem("website"))}
                            onIonChange={(e) =>
                              dispatch(setwebsite(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                dispatch(setclik4(false));
                                modif4();
                              }}
                            >
                              Enregistrer
                            </button>
                          )}

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("website"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : (
                            <div
                              className="ima2"
                              onClick={() => {
                                dispatch(setclik4(true));
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          )}

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ********************************************    part facebook ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("facebook")) === "" ? (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Facebook</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="facebook.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clicker5 ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Lien vers votre page facebook"
                            // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                            value={JSON.parse(localStorage.getItem("facebook"))}
                            onIonChange={(e) =>
                              dispatch(setfacebook(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setClicker5(false);
                                modif5();
                              }}
                            >
                              Enregistrer
                            </button>
                          )}

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("facebook"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : (
                            <div
                              className="ima2"
                              onClick={() => {
                                setClicker5(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          )}

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Facebook</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="facebook.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {click5 === true ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="Lien vers votre page facebook"
                            value={JSON.parse(localStorage.getItem("facebook"))}
                            onIonChange={(e) =>
                              dispatch(setfacebook(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              Enregistrer
                            </button>
                          ) : (
                            <button
                              className="btn btn-success mt-2"
                              type="button"
                              onClick={() => {
                                dispatch(setclik5(false));
                                modif5();
                              }}
                            >
                              Enregistrer
                            </button>
                          )}

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("facebook"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          {JSON.parse(localStorage.getItem("store_name")) ===
                          "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast6(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("adress")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast5(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("whatsapp")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast2(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : JSON.parse(localStorage.getItem("pays")) ===
                            "" ? (
                            <div
                              className="ima2"
                              onClick={() => {
                                setShowToast7(true);
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          ) : (
                            <div
                              className="ima2"
                              onClick={() => {
                                dispatch(setclik5(true));
                              }}
                            >
                              <img
                                src="editer.png"
                                alt="Bout"
                                className="rounded-full w-9 h-9"
                              />
                            </div>
                          )}

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ********************************************    part whatapps ***********************************************************************************************/}

              {JSON.parse(localStorage.getItem("whatsapp")) === "" ? (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Whatsapp</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="whatsapp.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {clicker6 ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="EX : 22961940010"
                            type="number"
                            // value={JSON.parse(localStorage.getItem("store_name")) === "null" ? "" : JSON.parse(localStorage.getItem("store_name"))}
                            value={JSON.parse(localStorage.getItem("whatsapp"))}
                            onIonChange={(e) =>
                              dispatch(setwhatsapp(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              modif6(1);
                            }}
                          >
                            Enregistrer
                          </button>

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              {JSON.parse(localStorage.getItem("whatsapp"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <div
                            className="ima2"
                            onClick={() => {
                              setClicker6(true);
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                    <div className="tailo">
                      <h1 className="tailo">Whatsapp</h1>
                    </div>
                    <div className="container-fluid flex conter famit">
                      <div className="ima1">
                        <img
                          src="whatsapp.png"
                          alt="Bout"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      {click6 === true ? (
                        <div className="conter1 flex flex-col">
                          <IonInput
                            className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                            placeholder="EX : 22961940010"
                            type="number"
                            value={JSON.parse(localStorage.getItem("whatsapp"))}
                            onIonChange={(e) =>
                              dispatch(setwhatsapp(e.target.value))
                            }
                          />
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                            onClick={() => {
                              modif6(2);
                            }}
                          >
                            Enregistrer
                          </button>

                          {/* ) : (
                          <button
                            className="btn btn-success mt-2"
                            type="button"
                          >
                            Enregistrer
                          </button>
                        )} */}
                        </div>
                      ) : (
                        <div className="conter1 flex">
                          <div className="pp mt-2">
                            <p className="">
                              + {JSON.parse(localStorage.getItem("whatsapp"))}
                            </p>
                          </div>
                          {/* {choiceacces === "aucun" ||
                        choiceacces === "principal" ? ( */}
                          <div
                            className="ima2"
                            onClick={() => {
                              dispatch(setclik6(true));
                            }}
                          >
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>

                          {/* ) : (
                          <div className="ima2">
                            <img
                              src="editer.png"
                              alt="Bout"
                              className="rounded-full w-9 h-9"
                            />
                          </div>
                        )} */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="mb-16"></div>
            </div>
            {/* <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div class="flex items-center min-h-screen p-6 bg-white dark:bg-gray-900">
                <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                  <div class="flex flex-col overflow-y-auto md:flex-row"></div>
                </div>
              </div>
            </div> */}
          </main>
        </div>
      </div>
    );
  }
};

export default Voir_profile;
