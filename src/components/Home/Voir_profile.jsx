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
  setdescription,
  setfacebook,
  setstore_name,
  setwebsite,
  setwhatsapp,
} from "../../Feature/HashSlice";
import { chevronBack, informationCircle } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import * as imageConversion from "image-conversion";
import { BsCamera, BsCamera2, BsCameraFill } from "react-icons/bs";

const Voir_profile = () => {
  const router = useIonRouter();

  const clic1 = useSelector((state) => state.Hash.click1);
  const clic2 = useSelector((state) => state.Hash.click2);
  const clic3 = useSelector((state) => state.Hash.click3);
  const click4 = useSelector((state) => state.Hash.click4);
  const click5 = useSelector((state) => state.Hash.click5);
  const click6 = useSelector((state) => state.Hash.click6);

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
  const [message, setmessage] = useState(
    "La taille des images doit être inférieure à 1Mo"
  );
  const userid = useSelector((state) => state.auth.user);

  const [copy, setCopy] = useState(false);
  const [cc, setCc] = useState(false);
  const Regex = /^\+229\d{8}$/;
  const dispatch = useDispatch();

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const handleInputChange = async (event) => {
    if (
      event.target.files[0].type != "image/jpg" &&
      event.target.files[0].type != "image/png" &&
      event.target.files[0].type != "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 4000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 4Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          30
        );
        const myFile = new File(
          [res],
          event.target.files[0].name,
          {
            type: res.type,
          }
        );
        setLoad(true);
        const formdata = new FormData();
        formdata.append("avatar", myFile);
        Axios.put(
          `http://backend-shop.benindigital.com/majimgprofil/${userid.BoutiqueId}`,
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
      }
    }
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

  const modif1 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile1", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        boutique: JSON.parse(localStorage.getItem("store_name")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif2 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile2", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        adress: JSON.parse(localStorage.getItem("adress")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif3 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile3", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        description: JSON.parse(localStorage.getItem("description")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif4 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile4", {
        id: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        website: JSON.parse(localStorage.getItem("website")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif5 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile5", {
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
      Axios.post("https://backend-shop.benindigital.com/majprofile6", {
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

  const clipboard = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, [1000]);
  };

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
            {JSON.parse(localStorage.getItem("image")) === "" ? (
              <>
                <div className="flex items-center justify-center relative">
                  {userInfo.filepreview != null ? (
                  loader === true ? (<img
                    src="gitload.gif"
                    alt=""
                    className="w-44 h-44 rounded-full object-cover"
                  />) : (<img
                    src={userInfo.filepreview}
                    alt=""
                    className="w-44 h-44 rounded-full object-fill"
                  />)
                    
                  ) : (
                    loader === true ? (<img
                      src="gitload.gif"
                      alt=""
                      className="w-44 h-44 rounded-full object-cover"
                    />) : (<img
                      src="store.png"
                      alt=""
                      className="w-44 h-44 rounded-full object-fill"
                    />)
                    
                  )}

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
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center relative">
                  {userInfo.filepreview != null ? (
                     loader === true ? (<img
                      src="gitload.gif"
                      alt=""
                      className="w-44 h-44 rounded-full object-cover"
                    />) : (<img
                      src={userInfo.filepreview}
                      alt=""
                      className="w-44 h-44 rounded-full object-fill"
                    />)
                  ) : (
                    loader === true ? (<img
                      src="gitload.gif"
                      alt=""
                      className="w-44 h-44 rounded-full object-cover"
                    />) : (<img
                      src={`https://backend-shop.benindigital.com/uploads/${JSON.parse(
                        localStorage.getItem("image")
                      )}`}
                      alt=""
                      className="w-44 h-44 rounded-full object-cover"
                    />)
                  )}
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
                </div>
              </>
            )}
          </div>
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
                <div className="pp">
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
                    <div className="pp">
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("store_name"))}
                        </p>
                      </div>
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
                  {clic1 == true ? (
                    <div className="conter1 flex flex-col">
                      <IonInput
                        className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                        placeholder="Nom de votre entreprise"
                        value={JSON.parse(localStorage.getItem("store_name"))}
                        onIonChange={(e) =>
                          dispatch(setstore_name(e.target.value))
                        }
                      />
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("store_name"))}
                        </p>
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

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
                        value={JSON.parse(localStorage.getItem("description"))}
                        onIonChange={(e) =>
                          dispatch(setdescription(e.target.value))
                        }
                      />
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("description"))}
                        </p>
                      </div>
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
                  {clic2 == true ? (
                    <div className="conter1 flex flex-col">
                      <IonTextarea
                        className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                        placeholder="Description de l'entreprise"
                        value={JSON.parse(localStorage.getItem("description"))}
                        onIonChange={(e) =>
                          dispatch(setdescription(e.target.value))
                        }
                      />
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("description"))}
                        </p>
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {JSON.parse(localStorage.getItem("adress")) === "" ? (
            <>
              <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                <div className="tailo">
                  <h1 className="tailo">Adresse</h1>
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
                        onIonChange={(e) => dispatch(setadress(e.target.value))}
                      />
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("adress"))}
                        </p>
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                <div className="">
                  <h1 className="tailo">Adresse</h1>
                </div>
                <div className="container-fluid flex conter famit">
                  <div className="ima1">
                    <img
                      src="adresse.png"
                      alt="Bout"
                      className="rounded-full w-10 h-10"
                    />
                  </div>
                  {clic3 == true ? (
                    <div className="conter1 flex flex-col">
                      <IonInput
                        className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                        placeholder="Votre adresse"
                        value={JSON.parse(localStorage.getItem("adress"))}
                        onIonChange={(e) => dispatch(setadress(e.target.value))}
                      />
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("adress"))}
                        </p>
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("website"))}
                        </p>
                      </div>
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
                  {click4 == true ? (
                    <div className="conter1 flex flex-col">
                      <IonInput
                        className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                        placeholder="Lien vers votre site web"
                        value={JSON.parse(localStorage.getItem("website"))}
                        onIonChange={(e) =>
                          dispatch(setwebsite(e.target.value))
                        }
                      />
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("website"))}
                        </p>
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("facebook"))}
                        </p>
                      </div>
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
                  {click5 == true ? (
                    <div className="conter1 flex flex-col">
                      <IonInput
                        className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                        placeholder="Lien vers votre page facebook"
                        value={JSON.parse(localStorage.getItem("facebook"))}
                        onIonChange={(e) =>
                          dispatch(setfacebook(e.target.value))
                        }
                      />
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
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("facebook"))}
                        </p>
                      </div>
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
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
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
                      <button
                        className="btn btn-success mt-2"
                        type="button"
                        onClick={() => {
                          modif6(1);
                        }}
                      >
                        Enregistrer
                      </button>
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          {JSON.parse(localStorage.getItem("whatsapp"))}
                        </p>
                      </div>
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
                  {click6 == true ? (
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
                      <button
                        className="btn btn-success mt-2"
                        type="button"
                        onClick={() => {
                          modif6(2);
                        }}
                      >
                        Enregistrer
                      </button>
                    </div>
                  ) : (
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">
                          + {JSON.parse(localStorage.getItem("whatsapp"))}
                        </p>
                      </div>
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
};

export default Voir_profile;
