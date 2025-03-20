/* eslint-disable no-unused-vars */
import React from "react";
import "./Menuxx.scss";
import { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonToast,
} from "@ionic/react";
import { chevronBack, informationCircle, shareSharp } from "ionicons/icons";
import Nouv1 from "../../pages/Modifphy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  recupProduct,
  recuppromotion,
  setactive,
} from "../../Feature/ProductSlice";
import { setdeclenche2 } from "../../Feature/DeclencheursSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format } from "date-fns";
import Modifphy from "../../pages/Modifphy";
import Modifnume from "../../pages/Modifnume";
import { FiLink } from "react-icons/fi";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  LinkedinIcon,
} from "react-share";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
const Menuxx = ({
  nomprod,
  prixv,
  prixa,
  desc,
  stockrest,
  idcateg,
  nbrelike,
  img1,
  img2,
  img3,
  img4,
  video,
  idprod,
  type_product,
  quantifiable_product,
}) => {
  const [dec, setDec] = useState(false);
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal1, setShowmodal1] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast5, setShowToast5] = useState(false);
  const [progress1, setprogress1] = useState(false);
  // const [active, setactive] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [mobile, setmobile] = React.useState(false);
  const dispatch = useDispatch();

  const [whatsapp, setWhatsapp] = useState("");
  // const Regex = /^\+229\d{8}$/;
  // const Regex = /^\d{12}$/g;
  const Regex = /^\+\d{1,3}\d{8,9}$/;

  const [datedebut, setDatedebut] = useState();
  const [datefin, setDatefin] = useState();
  const [datedebutt, setDatedebutt] = useState();
  const [datefinn, setDatefinn] = useState();
  const [dateserveur, setdateserveur] = useState("");
  const promotion = useSelector((state) => state.product.promotion);
  // const active = useSelector((state) => state.product.active);

  const recup_date_server = () => {
    Axios.get("https://backendtrader.digitalfirst.space/date_time").then(
      (res) => {
        // setdateserveur(res.data[0].time_actu);
        setDatedebut(format(Date.parse(res.data[0].time_actu), "yyyy-MM-dd"));
        setDatefin(format(Date.parse(res.data[0].time_actu), "yyyy-MM-dd"));
        setdateserveur(res.data[0].time_actu);
      }
    );
  };
  const recup_promotion = () => {
    Axios.get(
      "https://backendtrader.digitalfirst.space/get_all_promotion"
    ).then((res) => {
      // setdateserveur(res.data[0].time_actu);
      dispatch(recuppromotion(res.data));
    });
  };
  const supprimer = () => {
    dispatch(setdeclenche2(true));

    Axios.post(
      "https://backendtrader.digitalfirst.space/supprimer_article",
      {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        id: idprod,
        pic1: img1,
        pic2: img2,
        pic3: img3,
        pic4: img4,
        vid: video,
      }
    ).then((ret) => {
      console.log(ret.data);

      if (ret.data.message) {
        Axios.post("https://backendtrader.digitalfirst.space/afficheart", {
          id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        }).then((ret) => {
          dispatch(recupProduct(ret.data));
          dispatch(setdeclenche2(false));
          setShowToast2(true);
          setModalShow(false);
        });
      } else {
        for (let i = 0; i < ret.data.length; i++) {
          console.log(ret.data[i].invoice);
          Axios.post(
            "https://backendtrader.digitalfirst.space/update_art_after_sup",
            {
              invoice: ret.data[i].invoice,
              id_boutique: JSON.parse(localStorage.getItem("user") + "")
                .BoutiqueId,
            }
          ).then((ret) => {
            if (ret.data === "succes") {
              console.log("mis a jour");
            } else {
            }
          });
        }
        Axios.post(
          "https://backendtrader.digitalfirst.space/suppr_art_after_upda",
          {
            id_boutique: JSON.parse(localStorage.getItem("user") + "")
              .BoutiqueId,
            id: idprod,
            pic1: img1,
            pic2: img2,
            pic3: img3,
            pic4: img4,
            vid: video,
          }
        ).then((ret) => {
          if (ret.data === "succes") {
            Axios.post(
              "https://backendtrader.digitalfirst.space/afficheart",
              {
                id_boutique: JSON.parse(localStorage.getItem("user") + "")
                  .BoutiqueId,
              }
            ).then((ret) => {
              dispatch(recupProduct(ret.data));
              dispatch(setdeclenche2(false));
              setShowToast2(true);
              setModalShow(false);
            });
          } else {
          }
        });
      }
    });
  };

  const share = (message) => {
    var options = {
      // message: 'share this', // not supported on some apps (Facebook, Instagram)
      // subject: 'the subject', // fi. for email
      // files: ['', ''], // an array of filenames either locally or remotely
      url: message,
      // chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
      // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };
    SocialSharing.shareWithOptions(options);
  };
  const promouvoir = (idprod) => {
    // const tempsEnMillisecondes = Date.parse(dateserveur);
    // const dateActuelle = Math.floor(tempsEnMillisecondes / 1000);
    console.log(datedebutt);
    console.log(datefinn);
    // console.log(dateActuelle);
    setprogress1(true);

    if (whatsapp.match(Regex)) {
      let iio = 2;
      for (let index = 0; index < promotion.length; index++) {
        const element = promotion[index];
        if (idprod === element.id_product) {
          const y = new Date(element.date_fin);
          // const x = new Date(ret.data.date_start);
          console.log(JSON.parse(localStorage.getItem("dateActu") + ""));
          const x = new Date(JSON.parse(localStorage.getItem("dateActu") + ""));
          const date1utc = Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
          const date2utc = Date.UTC(y.getFullYear(), y.getMonth(), y.getDate());
          const dayunit = 1000 * 60 * 60 * 24;
          const numberday = (date2utc - date1utc) / dayunit;
          //const numberday = 8;
          console.log(numberday);
          if (numberday > 0) {
            console.log(
              "produit trouver dans la table promotion avec valider de temps toujours active "
            );
            iio = 4;
            setShowToast5(true);
            setprogress1(false);
            recup_promotion();
            setTimeout(() => {
              setModalShow1(false);
              // setDec(!dec);
            }, 1000);
            break;
          } else {
            console.log(" peut ajouter une nouvelle promotion de ce produit ");
            iio = 4;
            Axios.post(
              "https://backendtrader.digitalfirst.space/addpromotionprod",
              {
                id_boutique: JSON.parse(localStorage.getItem("user") + "")
                  .BoutiqueId,
                id_product: idprod,
                date_debut: datedebutt,
                date_fin: datefinn,
                whatsapp: whatsapp,
              }
            ).then((ret) => {
              console.log(ret.data);
              if (ret.data === "succes") {
                recup_promotion();
                setShowToast3(true);
                setprogress1(false);
                setTimeout(() => {
                  setModalShow1(false);
                  // setDec(!dec);
                }, 1000);
              }
            });
            break;
          }
        }
      }
      if (iio === 2) {
        console.log("produit non trouver dans la table promotion");
        Axios.post(
          "https://backendtrader.digitalfirst.space/addpromotionprod",
          {
            id_boutique: JSON.parse(localStorage.getItem("user") + "")
              .BoutiqueId,
            id_product: idprod,
            date_debut: datedebutt,
            date_fin: datefinn,
            whatsapp: whatsapp,
          }
        ).then((ret) => {
          console.log(ret.data);
          if (ret.data === "succes") {
            recup_promotion();
            setShowToast3(true);
            setprogress1(false);
            setTimeout(() => {
              setModalShow1(false);
              // setDec(!dec);
            }, 1000);
          }
        });
      }
    } else {
      setprogress1(false);
      setShowToast4(true);
    }
  };

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setmobile(true);
    }
  }, []);

  useEffect(() => {
    recup_date_server();
    recup_promotion();
  }, []);

  return (
    <div>
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Lien de partage copié avec success"
        icon={informationCircle}
        position="top"
        duration={2000}
      />
      <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Produit supprimé avec succès"
        icon={informationCircle}
        position="top"
        duration={3000}
      />
      <IonToast
        isOpen={showToast3}
        onDidDismiss={() => setShowToast3(false)}
        message="Produit ajouter à la promotion"
        // message="Votre numeros whatsapp est correct"
        icon={informationCircle}
        position="top"
        duration={3000}
      />
      <IonToast
        isOpen={showToast4}
        onDidDismiss={() => setShowToast4(false)}
        message="Votre numeros whatsapp n'est pas correct"
        icon={informationCircle}
        position="top"
        duration={3000}
      />
      <IonToast
        isOpen={showToast5}
        onDidDismiss={() => setShowToast5(false)}
        message="Ce produit est deja été soumis pour la promotion avec une delais de temps toujours valide. Veuillez entendre le feedback des administrateurs"
        icon={informationCircle}
        position="top"
        duration={6000}
      />
      <IonModal
        isOpen={showmodal}
        onDidDismiss={() => {
          setShowmodal(false);
        }}
      >
        <IonItem className="Item1" lines="none">
          <IonButtons
            slot="start"
            onClick={() => {
              setShowmodal(false);
            }}
          >
            <IonIcon icon={chevronBack} />
          </IonButtons>
          Editer
        </IonItem>
        <Modifphy
          nomprod={nomprod}
          prixv={prixv}
          prixa={prixa}
          desc={desc}
          stockrest={stockrest}
          idcateg={idcateg}
          nbrelike={nbrelike}
          img1={img1}
          img2={img2}
          img3={img3}
          img4={img4}
          video={video}
          idprod={idprod}
          type_product={type_product}
          quantifiable_product={quantifiable_product}
        />
      </IonModal>

      <IonModal
        isOpen={showmodal1}
        onDidDismiss={() => {
          setShowmodal1(false);
        }}
      >
        <IonItem className="Item1" lines="none">
          <IonButtons
            slot="start"
            onClick={() => {
              setShowmodal1(false);
            }}
          >
            <IonIcon icon={chevronBack} />
          </IonButtons>
          Editer
        </IonItem>
        <Modifnume
          nomprod={nomprod}
          prixv={prixv}
          prixa={prixa}
          desc={desc}
          stockrest={stockrest}
          idcateg={idcateg}
          nbrelike={nbrelike}
          img1={img1}
          img2={img2}
          img3={img3}
          img4={img4}
          video={video}
          idprod={idprod}
          type_product={type_product}
          quantifiable_product={quantifiable_product}
        />
      </IonModal>

      <IonModal
        isOpen={modalShow}
        onDidDismiss={() => {
          setModalShow(false);
          setDec(!dec);
        }}
        initialBreakpoint={0.15}
        breakpoints={[0, 0.25, 0.5, 0.75]}
      >
        <IonContent className="ion-padding">
          <IonItem>
            <span className="">
              Voulez-vous réellement supprimer ce produit ?
            </span>
          </IonItem>
          <div class="flex flex-shrink-0 flex-wrap items-center mt-3 gap-3 justify-end">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
              onClick={() => {
                supprimer();
              }}
            >
              Oui
            </button>
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
              id="serviceDeleteClose"
              onClick={() => {
                // setserviceDeleteId(0);
                setModalShow(false);
                // setDec(!dec);
              }}
            >
              Non
            </button>
          </div>
        </IonContent>
      </IonModal>

      <IonModal
        isOpen={modalShow1}
        onDidDismiss={() => {
          setModalShow1(false);
          setDec(!dec);
        }}
        initialBreakpoint={0.45}
        breakpoints={[0, 0.25, 0.5, 0.75]}
      >
        <IonContent className="ion-padding">
          <IonItem>
            <span className="">Promouvoir ce produit</span>
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked" className="mb-2">
              <h2 className="labh">Date de début de promotion</h2>
            </IonLabel>
            <IonInput
              color="success"
              className="border-1 rounded-sm shadow-md border-x-stone-400"
              type="date"
              value={datedebut}
              onIonChange={(e) => {
                setDatedebutt(
                  Math.floor(new Date(e.detail.value).getTime() / 1000)
                );
                // setDatedebutt(new Date(e.detail.value).getTime());
                setDatedebut(format(new Date(e.detail.value), "yyyy-MM-dd"));
              }}
              // onIonChange={(e) => {
              //   console.log((new Date(e.detail.value)).getTime());
              // }}
            ></IonInput>
          </IonItem>
          <IonItem lines="none" className="ion-margin-top">
            <IonLabel position="stacked" className="mb-2">
              <h2 className="labh">Date de fin de promotion</h2>
            </IonLabel>
            <IonInput
              color="danger"
              className="border-1 rounded-sm shadow-md border-x-stone-400"
              type="date"
              value={datefin}
              onIonChange={(e) => {
                setDatefinn(
                  Math.floor(new Date(e.detail.value).getTime() / 1000)
                );
                setDatefin(format(new Date(e.detail.value), "yyyy-MM-dd"));
              }}
              // onIonChange={(e) => {
              //   setDatefin(format(new Date(e.detail.value), "yyyy-MM-dd"));
              // }}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Veuillez entrer votre numero whatsapp</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <div className="flex justify-between items-center flex-col w-full ">
              <div className="w-full mt-3">
                <input
                  type="text"
                  className="form-control w-full"
                  id="exampleFormControlInput1"
                  placeholder="Ex: 22969889350"
                  onChange={(e) => {
                    setWhatsapp("+" + e.target.value);
                    console.log("+" + e.target.value);
                  }}
                />
              </div>
              <div className="mt-3">
                {progress1 ? (
                  <div class="three-body">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                  </div>
                ) : (
                  <IonButton
                    onClick={() => {
                      // setShowmodal(false)
                      promouvoir(idprod);
                    }}
                    // size="small"
                    color="secondary"
                  >
                    Promouvoir
                  </IonButton>
                )}
              </div>
            </div>
          </IonItem>
        </IonContent>
      </IonModal>

      <IonModal
        isOpen={modalShow2}
        onDidDismiss={() => {
          setModalShow2(false);
          setDec(!dec);
        }}
        initialBreakpoint={0.2}
        breakpoints={[0, 0.25, 0.5, 0.75]}
      >
        <IonContent className="ion-padding">
          <IonItem>
            <span className="">Partagé le produit</span>
          </IonItem>
          <div className="flex mt-4 items-center justify-center gap-3">
            <div className="flex flex-col justify-center items-center w-8 h-8 rounded-full shadow bg-purple-700 text-white text-xl cursor-pointer">
              <CopyToClipboard
                text={`http://www.digitaltrader.benindigital.com/details/${idprod}/${
                  JSON.parse(localStorage.getItem("user") + "").BoutiqueId
                }/`}
                onCopy={() => {
                  setShowToast1(true);
                  setModalShow2(false);
                  // setDec(!dec);
                }}
              >
                <FiLink className="" />
              </CopyToClipboard>
            </div>
            <FacebookShareButton
              url={`http://www.digitaltrader.benindigital.com/details/${idprod}/${
                JSON.parse(localStorage.getItem("user") + "").BoutiqueId
              }/`}
              onClick={() => {
                // setShowToast1(true);
                setModalShow2(false);
                // setDec(!dec);
              }}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <EmailShareButton
              url={`http://www.digitaltrader.benindigital.com/details/${idprod}/${
                JSON.parse(localStorage.getItem("user") + "").BoutiqueId
              }/`}
              onClick={() => {
                // setShowToast1(true);
                setModalShow2(false);
                // setDec(!dec);
              }}
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
            <TwitterShareButton
              url={`http://www.digitaltrader.benindigital.com/details/${idprod}/${
                JSON.parse(localStorage.getItem("user") + "").BoutiqueId
              }/`}
              onClick={() => {
                // setShowToast1(true);
                setModalShow2(false);
                // setDec(!dec);
              }}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`http://www.digitaltrader.benindigital.com/details/${idprod}/${
                JSON.parse(localStorage.getItem("user") + "").BoutiqueId
              }/`}
              onClick={() => {
                // setShowToast1(true);
                setModalShow2(false);
                // setDec(!dec);
              }}
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <TelegramShareButton
              url={`http://www.digitaltrader.benindigital.com/details/${idprod}/${
                JSON.parse(localStorage.getItem("user") + "").BoutiqueId
              }/`}
              onClick={() => {
                // setShowToast1(true);
                setModalShow2(false);
                // setDec(!dec);
              }}
            >
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <LinkedinShareButton
              url={`http://www.digitaltrader.benindigital.com/details/${idprod}/${
                JSON.parse(localStorage.getItem("user") + "").BoutiqueId
              }/`}
              onClick={() => {
                // setShowToast1(true);
                setModalShow2(false);
                // setDec(!dec);
              }}
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
          </div>
        </IonContent>
      </IonModal>

      <div class={dec === true ? "list-container active" : "list-container"}>
        <button
          class="more-button"
          aria-label="Menu Button"
          onClick={() => {
            setDec(!dec);
          }}
        >
          <div class="menu-icon-wrapper">
            <div class="menu-icon-line half first"></div>
            <div class="menu-icon-line"></div>
            <div class="menu-icon-line half last"></div>
          </div>
        </button>
        <ul class="more-button-list absolute">
          {/* <li
            class="more-button-list-item"
            onClick={() => {
              setModalShow2(true);
              // setDec(!dec);
              // { window.location.href = ` /home/articledesc/${Id} ` };
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-copy"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            <span>Copié le lien</span>
          </li> */}
          <li
            class="more-button-list-item"
            onClick={() => {
              if (mobile) {
                share(
                  `http://www.digitaltrader.benindigital.com/details/${idprod}/${
                    JSON.parse(localStorage.getItem("user") + "").BoutiqueId
                  }/`
                );
                setDec(!dec);
              } else {
                setModalShow2(true);
              }

              // setDec(!dec);
              // { window.location.href = ` /home/articledesc/${Id} ` };
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-copy"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            <span>Copié le lien</span>
          </li>
          <li
            class="more-button-list-item"
            onClick={() => {
              setModalShow1(true);
              // setDec(!dec);
              // { window.location.href = ` /home/articledesc/${Id} ` };
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="9"
              y="9"
              width="13"
              height="13"
              viewBox="0 0 512 512"
            >
              <path
                fill="#3AB37C"
                d="M188.3,458.4c-7.2-6-13.2-13.2-19.6-20.1c-7-7.6-14.7-14.7-21.6-22.5c-3.8-4.3-7.3-9.7-5.9-15.7c1.3-5.9,7.4-9.3,12.5-11.3c8.4-3.2,17.2-5.3,25.8-7.9c7.8-2.3,15.7-4.2,23.4-7c-22-3.9-43.2-13.4-57.7-30.9c-13.3-16.1-20.1-37-21.6-57.7c-0.8-10.7-0.5-21.6,1.1-32.2c1.6-11,5.2-21.3,7.7-32.1c-0.9-0.8-1.5-1.9-1.8-3c-1.5-2.8-0.5-6.6,2.2-7.9c0.3-9.1,0.8-18.3-0.1-27.4c-0.9-8.5-3.1-16.8-4.3-25.3c-5.5,2.8-11.2,5.1-17,7.1c-7.3,2.6-14.8,5.4-22.3,7.2c-7.5,1.8-15.2,3.2-22.7,5.2c-6.4,1.7-13.1,3.5-18.2,7.9c0,0-0.1,0.1-0.1,0.1c-0.6,2.3-1.1,4.5-1.7,6.8c-0.1,0.3-0.2,0.6-0.4,0.9c-0.1,0.3-0.1,0.6-0.1,0.9c-0.3,1.1-0.5,2.2-0.8,3.3c-2.7,10.5-5.2,21-7.4,31.7c-10.8,54.6-13,116.7,19.5,164.8c31.3,46.3,86.6,67.1,139.7,76.1c1.6,0.3,3.2,0.5,4.9,0.8C197.8,466,193,462.3,188.3,458.4z"
              ></path>
              <path
                fill="#74CCCF"
                d="M360.7,70.6c-0.3-0.3-0.5-0.6-0.7-0.9c-7.8-3.7-15.8-6.9-24.1-9.5C281.6,43,220.6,47.3,168.4,69.8c-25.2,10.9-47.5,26.5-66.4,46.4c-14.6,15.4-27.2,32.5-38.9,50.1c7.2-1.8,14.7-2.9,21.4-4.5c7.5-1.8,14.8-4.4,22.1-7c8.2-2.9,16.5-6.1,23.8-11c3.3-2.2,8.5-0.1,8.6,4.1c0.2,11.6,4.1,22.5,5,34c0.5,6.6,0.5,13.3,0.3,19.9c27.1-26.1,58.1-50,94.9-59.3c32.6-8.3,68-5.1,98.3,9.4c1.1-0.2,2.2-0.1,3.5,0.5c4.2,2,11.9-2,15.7-3.6c4.7-1.9,9.1-4.2,14-5.4c5.9-1.4,11.8-2.9,17.5-4.9c2.7-1,7.2-2.2,9.8-4.5C385.9,112.7,377.1,89.1,360.7,70.6z"
              ></path>
              <path
                fill="#14B6B9"
                d="M487.9,239.4c-4.2-27.6-15.1-54.4-29.7-78.1c-19.1-31.2-44.8-59.2-75.7-79.1c4.9,7.9,9.1,16.1,13.3,24.4c3.9,7.8,7.8,15.7,12.2,23.3c3.5,6-0.4,11-5.9,14.2c-5.5,3.2-11.5,5.3-17.6,7c-4.8,1.4-10.2,2-14.8,3.9c-4.6,1.8-9.9,4.7-15.5,6.7c18.7,12.6,34.7,29.5,43.1,50.8c8.4,21.5,9.7,45.7,3.4,68c-2.1,7.5-4.9,14.9-8.4,21.9c0.8,0.8,1.4,2,1.4,3.6c0,20.8-1.6,41.6-0.4,62.4c11.7-1.9,22.5-8.6,33.4-13.1c12.7-5.2,25.5-10.4,38.6-14.5c0.6-1.7,2.1-3,4.6-2.9c1.2,0,2.2,0.2,3.1,0.4c2-4.5,3.9-9,5.6-13.7C488.6,297.6,492.3,268.1,487.9,239.4z"
              ></path>
              <path
                fill="#71C598"
                d="M427.7,366.9c-12.4,5.5-25,12.6-38.9,13c-3,0.1-5.6-2-5.9-5.1c-1.6-18.6-0.6-37.2-0.2-55.8c-5,7.3-10.9,14-17.4,20c-19.2,17.6-42.1,27.3-67.6,31.8c-20,3.5-41,5.9-61.8,5.8c-0.6,0.2-1.3,0.3-2.1,0.3c-8.7-0.4-16.5,3.2-24.4,6.4c-7.9,3.2-16.1,5-24.3,7.5c-2.9,0.9-34.5,8.5-33.2,12.3c2.3,6.8,10.1,12.2,14.9,17.2c6.2,6.5,12.2,13.1,18.3,19.7c9.7,10.6,23.1,18.1,30.8,30.4c0.4,0.6,0.6,1.3,0.8,1.9c52.7,5.6,107.9-1.8,154.4-27.7c38.7-21.5,73.4-53.4,95-92.5C453.1,356.3,440.1,361.4,427.7,366.9z"
              ></path>
              <path d="M500.6,257.7c-1.6-55.5-31.1-108.8-68.6-148.3c-18.4-19.3-39.4-35.6-63.3-47.6c-24-12.1-50.3-19-77-21.7c-56.1-5.7-116.8,7.2-163.6,39.2c-31,21.2-54.3,51-74.9,82.1c-0.5-0.7-1.2-1.2-2.1-1.5c-4.5,6.6-8.9,13.4-13.1,20.2c-2.5,9.2-4.6,18.6-6.8,27.9c-3.7,15.5-6.7,31.2-8.8,47c-3.8,28.9-4.1,59.1,2,87.7c5.3,24.8,16,48.3,31.9,68.1c16.9,21,39.4,36.3,63.6,47.5c25.2,11.6,52.5,18.5,79.8,23c29.7,4.8,60.4,5,90.2,1c56.2-7.6,107.1-33.9,147-74C477,368.1,502.2,314.7,500.6,257.7z M102,116.3c18.9-20,41.2-35.5,66.4-46.4C220.6,47.3,281.6,43,336,60.2c8.3,2.6,16.3,5.8,24.1,9.5c0.2,0.3,0.4,0.6,0.7,0.9c16.4,18.5,25.1,42.1,37.1,63.5c-2.6,2.3-7,3.5-9.8,4.5c-5.7,2.1-11.6,3.5-17.5,4.9c-4.9,1.2-9.4,3.4-14,5.4c-3.8,1.6-11.5,5.6-15.7,3.6c-1.2-0.6-2.4-0.7-3.5-0.5c-30.3-14.5-65.7-17.6-98.3-9.4c-36.8,9.3-67.8,33.2-94.9,59.3c0.2-6.6,0.2-13.3-0.3-19.9c-0.9-11.5-4.8-22.4-5-34c-0.1-4.2-5.3-6.4-8.6-4.1c-7.3,4.9-15.5,8.1-23.8,11c-7.3,2.6-14.6,5.1-22.1,7c-6.7,1.6-14.2,2.7-21.4,4.5C74.8,148.7,87.4,131.7,102,116.3z M143.5,218.1c0,0,0-0.1,0-0.1c35.6-35.9,77.9-68.1,130.6-69.1c44.1-0.8,93.4,23.2,111.9,64.8c19.3,43.4,0.7,94.9-35.3,123.4c-21.7,17.2-48.5,22.8-75.4,25.8c-28.6,3.1-59.9,5.7-87.5-4c-13.1-4.6-25.2-12.1-34.1-22.8c-8.1-9.9-13.2-21.7-16.3-34c-3.2-12.6-3.7-26.1-2.7-39c0.5-6.4,1.5-12.7,2.9-18.9c1.6-7.6,4.5-14.9,6.1-22.5C144.1,220.2,143.9,219.1,143.5,218.1z M197.1,469.6c-53.1-9-108.4-29.7-139.7-76.1C24.9,345.4,27.1,283.2,38,228.7c2.1-10.6,4.6-21.2,7.4-31.7c0.3-1.1,0.6-2.2,0.8-3.3c0-0.3,0-0.6,0.1-0.9c0.1-0.3,0.2-0.6,0.4-0.9c0.6-2.3,1.1-4.5,1.7-6.8c0,0,0.1-0.1,0.1-0.1c5.1-4.4,11.8-6.2,18.2-7.9c7.5-2,15.1-3.4,22.7-5.2c7.6-1.9,15-4.6,22.3-7.2c5.7-2,11.5-4.3,17-7.1c1.2,8.4,3.4,16.8,4.3,25.3c0.9,9.1,0.4,18.3,0.1,27.4c-2.7,1.3-3.7,5.1-2.2,7.9c0.2,1.1,0.9,2.2,1.8,3c-2.5,10.8-6.2,21-7.7,32.1c-1.5,10.6-1.9,21.5-1.1,32.2c1.6,20.7,8.3,41.5,21.6,57.7c14.5,17.5,35.7,27,57.7,30.9c-7.7,2.8-15.6,4.7-23.4,7c-8.6,2.5-17.5,4.7-25.8,7.9c-5.2,2-11.2,5.4-12.5,11.3c-1.3,6,2.1,11.4,5.9,15.7c6.8,7.8,14.5,14.9,21.6,22.5c6.4,6.9,12.4,14.1,19.6,20.1c4.6,3.9,9.5,7.5,13.6,11.9C200.3,470.1,198.7,469.8,197.1,469.6z M371.1,444.6c-46.5,25.9-101.8,33.3-154.4,27.7c-0.1-0.6-0.4-1.3-0.8-1.9c-7.8-12.3-21.2-19.7-30.8-30.4c-6-6.6-12.1-13.2-18.3-19.7c-4.8-5-12.6-10.4-14.9-17.2c-1.3-3.9,30.3-11.5,33.2-12.3c8.1-2.4,16.4-4.3,24.3-7.5c7.9-3.2,15.7-6.9,24.4-6.4c0.8,0,1.5-0.1,2.1-0.3c20.7,0.1,41.8-2.2,61.8-5.8c25.5-4.5,48.4-14.3,67.6-31.8c6.5-6,12.4-12.7,17.4-20c-0.4,18.6-1.4,37.2,0.2,55.8c0.3,3.1,2.9,5.1,5.9,5.1c13.9-0.3,26.5-7.4,38.9-13c12.4-5.6,25.4-10.6,38.5-14.8C444.5,391.1,409.8,423.1,371.1,444.6z M478.7,324.7c-1.7,4.6-3.6,9.2-5.6,13.7c-0.9-0.3-2-0.4-3.1-0.4c-2.5-0.1-3.9,1.2-4.6,2.9c-13.1,4.1-25.9,9.3-38.6,14.5c-10.9,4.5-21.6,11.1-33.4,13.1c-1.2-20.8,0.3-41.6,0.4-62.4c0-1.6-0.5-2.8-1.4-3.6c3.4-7,6.3-14.4,8.4-21.9c6.3-22.3,5.1-46.5-3.4-68c-8.3-21.3-24.4-38.2-43.1-50.8c5.5-2,10.9-4.8,15.5-6.7c4.7-1.9,10-2.6,14.8-3.9c6.1-1.7,12.1-3.8,17.6-7c5.4-3.1,9.4-8.2,5.9-14.2c-4.4-7.6-8.3-15.4-12.2-23.3c-4.2-8.3-8.5-16.6-13.3-24.4c30.8,19.9,56.6,47.9,75.7,79.1c14.5,23.7,25.5,50.5,29.7,78.1C492.3,268.1,488.6,297.6,478.7,324.7z"></path>
            </svg>
            <span>Promouvoir</span>
          </li>
          <li
            class="more-button-list-item"
            onClick={() => {
              if (
                JSON.parse(localStorage.getItem("type_product") + "") ===
                "Physique"
              ) {
                setShowmodal(true);
                setDec(!dec);
              } else if (
                JSON.parse(localStorage.getItem("type_product") + "") ===
                "Numerique"
              ) {
                setShowmodal1(true);
                setDec(!dec);
              }

              // { window.location.href = ` /home/articledesc/${Id} ` };
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            <span>Modifier</span>
          </li>

          {/* <li class="more-button-list-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share">
                            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                        </svg>
                        <span>Share</span>
                    </li> */}
          <li
            class="more-button-list-item"
            onClick={() => {
              // supprimer();
              // setDec(!dec);
              setModalShow(true);
            }}
            // data-bs-toggle="modal"
            // data-bs-target="#deleteService"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-trash-2"
            >
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
            <span>Supprimer</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menuxx;
