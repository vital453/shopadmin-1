import {
  IonApp,
  IonButton,
  IonCol,
  IonList,
  IonModal,
  IonThumbnail,
  IonSearchbar,
  IonContent,
  IonAvatar,
  IonSelectOption,
  IonPage,
  IonItemDivider,
  IonSelect,
  IonRadioGroup,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonAlert,
  IonButtons,
  IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonNote,
  IonBadge,
  IonRouterLink,
  IonMenu,
  IonTextarea,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import {
    setadress,
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

const Nouvc = () => {
  const [cc, setCc] = useState(false);
 const clic1 = useSelector((state) => state.Hash.click1);
  const clic2 = useSelector((state) => state.Hash.click2);
  const clic3 = useSelector((state) => state.Hash.click3);
  const click4 = useSelector((state) => state.Hash.click4);
  const click5 = useSelector((state) => state.Hash.click5);
  const click6 = useSelector((state) => state.Hash.click6);
  const dispatch = useDispatch();

  const modif1 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile1", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        boutique: JSON.parse(localStorage.getItem("store_name")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif2 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile2", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        adress: JSON.parse(localStorage.getItem("adress")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif3 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile3", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        description: JSON.parse(localStorage.getItem("description")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif4 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile4", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        website: JSON.parse(localStorage.getItem("website")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif5 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile5", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        facebook: JSON.parse(localStorage.getItem("facebook")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  const modif6 = () => {
    try {
      Axios.post("https://backend-shop.benindigital.com/majprofile6", {
        id: JSON.parse(localStorage.getItem("user") + "").userId,
        whatsapp: JSON.parse(localStorage.getItem("whatsapp")),
      }).then((ret) => {
        console.log(ret.data);
      });
    } catch (e) {}
  };
  return (
    <IonPage>
      {/* {cc == true ? (
        <>
          <IonItem>
            <IonLabel position="floating">ffffff</IonLabel>
            <IonInput></IonInput>
          </IonItem>
        </>
      ) : (
        <>
          <IonItem
            onClick={() => {
              setCc(true);
            }}
          >
            <IonLabel>hhghg</IonLabel>
          </IonItem>
        </>
      )} */}
      <IonList className="">
            {JSON.parse(localStorage.getItem("store_name")) === "" ? (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="tailo">
                    <h1 className="tailo">Boutique</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/boutique.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div
                        className="ima2"
                        // onClick={() => {
                        //   dispatch(setclik1(true));
                        // }}
                        routerLink="/home"
                      >
                        <img
                          src="images/ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1>Boutique</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/boutique.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    {clic1 == true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entreprise"
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
                          Modifier
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
                            src="images/editer.png"
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
                  <div className="">
                    <h1>Description</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/description-de-lemploi.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div
                        className="ima2"
                        // onClick={() => {
                        //   dispatch(setclik1(true));
                        // }}
                        routerLink="/home"
                      >
                        <img
                          src="images/ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1>Description</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/description-de-lemploi.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    {clic2 == true ? (
                      <div className="conter1 flex flex-col">
                        <IonTextarea
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entreprise"
                          value={JSON.parse(
                            localStorage.getItem("description")
                          )}
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
                          Modifier
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
                            src="images/editer.png"
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
                  <div className="">
                    <h1>Adresse</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/adresse.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div className="ima2" routerLink="/home">
                        <img
                          src="images/ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1>Adresse</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/adresse.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    {clic3 == true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entreprise"
                          value={JSON.parse(localStorage.getItem("adress"))}
                          onIonChange={(e) =>
                            dispatch(setadress(e.target.value))
                          }
                        />
                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            dispatch(setclik3(false));
                            modif2();
                          }}
                        >
                          Modifier
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
                            src="images/editer.png"
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
                  <div className="">
                    <h1>Site Web</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/medias.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div className="ima2" routerLink="/home">
                        <img
                          src="images/ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1>Site Web</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/medias.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    {click4 == true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entreprise"
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
                          Modifier
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
                            src="images/editer.png"
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
                  <div className="">
                    <h1>Facebook</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/facebook.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div className="ima2" routerLink="/home">
                        <img
                          src="images/ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1>Facebook</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/facebook.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    {click5 == true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entreprise"
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
                          Modifier
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
                            src="images/editer.png"
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
                  <div className="">
                    <h1>Whatsapp</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/whatsapp.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    <div className="conter1 flex">
                      <div className="pp">
                        <p className="">Veillez Completer le profile</p>
                      </div>
                      <div className="ima2" routerLink="/home">
                        <img
                          src="images/ajouter.png"
                          alt="Bout"
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="container-fluid flex flex-col  mb-3 mt-2 conter famit">
                  <div className="">
                    <h1>Whatsapp</h1>
                  </div>
                  <div className="container-fluid flex conter famit">
                    <div className="ima1">
                      <img
                        src="images/whatsapp.png"
                        alt="Bout"
                        className="rounded-full w-12 h-12"
                      />
                    </div>
                    {click6 == true ? (
                      <div className="conter1 flex flex-col">
                        <IonInput
                          className="w-full mt-1 h-20 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                          placeholder="Entreprise"
                          value={JSON.parse(localStorage.getItem("whatsapp"))}
                          onIonChange={(e) =>
                            dispatch(setwhatsapp(e.target.value))
                          }
                        />
                        <button
                          className="btn btn-success mt-2"
                          type="button"
                          onClick={() => {
                            dispatch(setclik6(false));
                            modif6();
                          }}
                        >
                          Modifier
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
                            dispatch(setclik6(true));
                          }}
                        >
                          <img
                            src="images/editer.png"
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
          </IonList>
    </IonPage>
  );
};
export default Nouvc;
