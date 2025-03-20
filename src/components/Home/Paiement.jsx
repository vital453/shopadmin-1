/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import { useEffect, useRef, useState } from "react";
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
  IonLoading,
  IonSegment,
  IonSegmentButton,
  IonListHeader,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  IonToast,
} from "@ionic/react";

import "./homes.css";
import {
  triangle,
  ellipse,
  square,
  arrowBack,
  arrowForward,
  personCircleOutline,
  globeOutline,
  calendar,
  informationCircle,
  map,
  personCircle,
  chevronBack,
  search,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";

// import { zer } from '../../pages/Nouv2';
// import { SearchModal } from './searchModal';
import { IonReactRouter } from "@ionic/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { App } from "@capacitor/app";
import { useIonRouter } from "@ionic/react";
import { FiRefreshCw } from "react-icons/fi";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import { setHash_code } from "../../Feature/HashSlice";
import emailjs from "@emailjs/browser";

// console.log(Date.parse('2001-10-10'));            // Convertir un string en date (renvoie le nombre de seconde avant 1970)

const Paiement = () => {
  const [response, setresponse] = useState("");
  // const [email, setemail] = useState(JSON.parse(localStorage.getItem("email") + ""));

  const [showToast, setShowToast] = useState(false);
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");

  const [showToasttot, setShowToasttot] = useState(false);

  let [hash, setHash] = useState(useSelector((state) => state.Hash.hash_user));
  const dispatch = useDispatch();
  const form = useRef();

  const open = async (totalprix) => {
    await openKkiapayWidget({
      // amount: 1,
      amount: totalprix,
      api_key: "f360c365307f9afa1c1cded51173173beef6f22b",
      // sandbox: true,
      // email: String(),
      email: JSON.parse(String(localStorage.getItem("user"))).email,
      // phone: "61940010",
      // name: "viyt",
      // theme: "#1586FD",
    });
  };

  function successHandler(response) {
    console.log(response);
    setresponse(response);
  }

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

  const subject = "Votre licence Digital Trader";
  // const body = `Le code de votre licence est : ${aleatoire_hash()}`;
  const body = `${aleatoire_hash()}`;

  // const body = `Votre Licence est :`;
  const sendEmail = () => {
    // e.preventDefault();
    emailjs
      .sendForm(
        "service_wtnes55",
        "template_phvcvj2",
        form.current,
        // {
        //   name: "fati",
        //   email: "africaversatile@gmail.com",
        //   message: "je suis ton pire cauchemar",
        // },
        "ty_0z2Ag-oFKX2rYP"
      )
      .then(
        (result) => {
          setTimeout(() => {
            window.location.href = "/licence";
          }, 5000);
        },
        (error) => {
          console.log(error.text);
          // setprogress(false);
          // toast.error("ça c'est mal passer");
          alert(
            "L'email n'a pas pu vous etre envoyer veillez contactez le service client"
          );
        }
      );
  };

  const envoiemail = () => {
    Axios.get(
      "https://backendtrader.digitalfirst.space/sendmail/sendMail.php?email=" +
        JSON.parse(String(localStorage.getItem("user"))).email +
        "&body=" +
        body +
        "&subject=" +
        subject
    );
    setTimeout(() => {
      window.location.href = "/licence";
    }, 5000);
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

  useEffect(() => {
    addKkiapayListener("success", successHandler);
    return () => {
      removeKkiapayListener("success");
    };
  }, []);
  useEffect(() => {
    if (response !== "") {
      sendEmail();
      // envoiemail();
    }
  }, [response]);
  useEffect(() => {
    if(body == 'undefined'){
      setShowToasttot(true)
    }
  }, [body]);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <div className="flex justify-between items-center">
            {/* <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  window.location.href = "/home";
                }}
              >
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons> */}
            <IonTitle className="nereide">Digital trader</IonTitle>

            {/* <IonButtons
              slot="end"
              className="mr-5 text-xl cursor-pointer"
              onClick={() => {
                window.location.href = "/prodbout";
              }}
            >
              <FiRefreshCw />
            </IonButtons> */}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Module en cours d'intégration "
        duration={3000}
        position="top"
      />
       <IonToast
        isOpen={showToasttot}
        onDidDismiss={() => setShowToasttot(false)}
        message="Veuillez actualiser la page avant d'éffectué le paiment"
        duration={4000}
        position="top"
      />
      <IonContent fullscreen className="">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="flex flex-col text-xl text-neutral-700 mb-3">
            <span>Veuillez choisir un mode de paiement</span>
          </div>
          <div className="w-full hidden">
            <form ref={form} className="w-[100%]">
              <label className="mt-4 text-sm w-[100%]">
                {/* <span class="text-gray-700 dark:text-gray-400">Email</span> */}
                <IonInput
                  className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                  placeholder="Votre adresse email"
                  type="email"
                  name="email"
                  value={JSON.parse(String(localStorage.getItem("user"))).email}
                  // onIonChange={(e) => setemail(e.target.value)}
                />
              </label>

              <label className="mt-4 text-sm w-[100%]">
                {/* <span class="text-gray-700 dark:text-gray-400">Email</span> */}
                <IonInput
                  className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                  placeholder=""
                  name="message"
                  type="text"
                  value={body}
                />
              </label>
              <label className="mt-4 text-sm w-[100%]">
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
          <div className="flex flex-wrap gap-4 mt-4 justify-center items-center w-full ">
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                open(
                  JSON.parse(String(localStorage.getItem("montant_paiement")))
                );
              }}
            >
              <img
                src="kkiapay.jpg"
                alt=""
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h2 className="text-2xl text-neutral-800">kkia pay</h2>
              </div>
            </div>
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                setShowToast(true);
                console.log(
                  JSON.parse(String(localStorage.getItem("user"))).email
                );
              }}
            >
              <img
                src="fedapay.png"
                alt=""
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h2 className="text-2xl text-neutral-800">Feda pay</h2>
              </div>
            </div>
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                setShowToast(true);
                console.log(
                  JSON.parse(String(localStorage.getItem("user"))).email
                );
              }}
            >
              <img
                src="cinetpay.png"
                alt=""
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h2 className="text-2xl text-neutral-800">Cinet pay</h2>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Paiement;
