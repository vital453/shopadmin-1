/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  IonFabButton,
  IonLoading,
  IonToast,
  useIonRouter,
  IonProgressBar,
  useIonAlert,
} from "@ionic/react";
import Axios from "axios";

import "./conteneur.css";
import {
  triangle,
  ellipse,
  square,
  arrowBack,
  arrowForward,
  personCircleOutline,
  globeOutline,
  removeCircleSharp,
  removeOutline,
  addOutline,
  informationCircle,
  star,
  chevronBack,
  personCircle,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
// import { tab4 } from "./articles/Paniermodal";
// import { tab5 } from "./articles/PanierItem";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
} from "../Feature/PanierSlice";
import { decc } from "../Feature/ProductSlice";
import {
  deleteApprovision,
  updateApprovisionQuant,
  viderApprovision,
} from "../Feature/ApprovisionSlice";

import { IonReactRouter } from "@ionic/react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import AddToCartButton from "./AddToCartButton";
import { log } from "console";
import { useSelector, useDispatch } from "react-redux";
import Description from "../components/articles/description";
import { recupProduct } from "../Feature/ProductSlice";
import { setApprovision } from "../Feature/ApprovisionSlice";
import Nouv1 from "../pages/Modifphy";
import { recupApprovisionnement } from "../Feature/ApprovisionnementSlice";
import toast, { Toaster } from "react-hot-toast";
import Menuxx from "./Home/Menuxx";
import "intro.js/introjs.css";
import introJs from "intro.js";


interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
  Nom: String;
  Prix: number;
  Id: number;
  Stock: number;
  Ig: String;
  Prixa: number;
  Desc: String;
  IdCateg: number;
  Like: number;
  Img1: String;
  Img2: String;
  Img3: String;
  Img4: String;
  Video: String;
  quantifiable_product: String;
  type_product: String;

  // transit: (a: number | React.SetStateAction<any>,
  //     b: number | React.SetStateAction<any>,
  //     c: number | React.SetStateAction<any>) => void;
  Panier: [][];
}

export let boolcont = false;

const aff1 = () => {
  setTimeout(() => {
    boolcont = false;
  }, 500);
  boolcont = true;
};

export const Conteneur0: React.SFC<Ajout_utiliformprops> = ({
  Nom,
  Prix,
  Prixa,
  Id,
  Stock,
  Ig,
  Desc,
  IdCateg,
  Like,
  Img1,
  Img2,
  Img3,
  Img4,
  Video,
  quantifiable_product,
  type_product,
}) => {
  const [clic, setClic] = useState(false);
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal2, setShowmodal2] = useState(false);
  const [showmodal3, setShowmodal3] = useState(false);
  const [showmodal4, setShowmodal4] = useState(false);
  const [nomprod, setNomprod] = useState(Nom);
  const [priv, setPriv] = useState(Prix);
  const [prixa, setprixa] = useState(Prixa);
  const [desc, setDesc] = useState(Desc);
  const [stockrest, setStockrest] = useState(Stock);
  const [idcateg, setIdcateg] = useState(IdCateg);
  const [nbrelike, setNbrelike] = useState(Like);
  const [img1, setImg1] = useState(Img1);
  const [img2, setImg2] = useState(Img2);
  const [img3, setImg3] = useState(Img3);
  const [img4, setImg4] = useState(Img4);
  const [video, setvideo] = useState(Video);
  const [idprod, setIdprod] = useState(Id);
  // const [panier, setPanier] = useState<any[]>(useSelector((state: any) => state.panier.panier));
  let panier = useSelector((state: any) => state.panier.panier);
  let approv = useSelector((state: any) => state.approvision.approvision);
  let article = useSelector((state: any) => state.product.product);
  const [nom, setNom] = useState<String>(Nom);
  const [achatv, setAchatv] = useState<any>(false);
  const [achatp, setAchatp] = useState<any>(false);
  const [quantite, setQuantite] = useState<any>(1);
  const [prix, setPrix] = useState<any>(Prix);
  const [command, setCommand] = useState<any>();
  const [ajoute, setAjoute] = useState<any>();
  const [telephone, setTelephone] = useState<String>("rr");
  const [remarque, setRemarque] = useState<String>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("rr");
  const [progress, setProgress] = useState(false);
  const [id, setId] = useState<number>(0);
  const [presentAlert] = useIonAlert();
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);

  const [progress1, setprogress1] = useState(false);

  // const [trigger, setTrigger] = useState<any>(useSelector((state: any) => state.product.trigg))
  const [triggpro, setTriggpro] = useState<any>(
    useSelector((state: any) => state.product.trigg1)
  );
  const [stock, setStockk] = useState<any>(Stock);
  let sto = useSelector((state: any) => state.product.product).find(
    (e: any) => e.id == Id
  );
  const [trigger, setTrigger] = useState<any>(
    useSelector((state: any) => state.panier.trigg)
  );
  const [strig, setStrig] = useState<any>(
    useSelector((state: any) => state.product.product).find(
      (e: any) => e.id == Id
    )
  );
  const dispatch = useDispatch();
  const ionRouter = useIonRouter();
  const [loaded, setLoaded] = useState(false);

  const [dec, setDec] = useState(false);

  // const trigger= useSelector((state: any) => state.panier.trigg);

  // const [showLoading, setShowLoading] = useState(true);

  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const userid = useSelector((state: any) => state.auth.user);

  // setTimeout(() => {
  //     setShowLoading(false);
  // }, 10000);
  const refr = () => {};

  const transfert = (quant: any | React.SetStateAction<any>) => {
    setAjoute(quant);
    setCommand(true);
    if (!approv.find((e: any) => e.product_id == Id) && quant > 0) {
      setProgress(true);
      setprogress1(true);
      setprogress1(true);
      toast.loading(
        "Opération en cours de traitement....\n\nVeuillez patienter.",
        {
          duration: 6000,
        }
      );
      dispatch(
        setApprovision({
          product_id: Id,
          stock_appro: parseInt(quant),
          product_name: Nom,
          unite_price: Prix,
          total_price: Prix * parseInt(quant),
          picture: Ig,
          stock_preview: Stock,
        })
      );
      Axios.post("https://backendtrader.digitalfirst.space/ajoutapprovList1", {
        stock_appro: parseInt(quant),
        total_price: Prix * parseInt(quant),
        unite_price: Prix,
        product_name: Nom,
        product_id: Id,
        stock_preview: Stock,
        picture: Ig,
        id_boutique: userid.BoutiqueId,
      }).then((ret) => {
        console.log(ret.data);
        if (ret.data == "suc") {
          Axios.post("https://backendtrader.digitalfirst.space/approv3", {
            stock: parseInt(quant) + parseInt(String(Stock)),
            product_id: Id,
            id_boutique: userid.BoutiqueId,
          }).then((ret) => {
            if (ret.data == "suc") {
              console.log("Approvisionnement effectué");
              Axios.post("https://backendtrader.digitalfirst.space/afficheart", {
                id_boutique: userid.BoutiqueId,
              }).then((ret) => {
                dispatch(recupProduct(ret.data));
                setShowToast2(true);
                setProgress(false);
                setprogress1(false);
                setAchatv(false);
                // dispatch(dec(!trigger));
                setQuantite(1);
                dispatch(viderApprovision(""));
                gethistoappro();
                console.log(ret.data);
              });
            }
            console.log(ret.data);
          });
        }
      });
    }
  };

  const sortiehorsvente = (quant: any | React.SetStateAction<any>) => {
    setAjoute(quant);
    setCommand(true);
    setProgress(true);
    setprogress1(true);
    setprogress1(true);
    toast.loading(
      "Opération en cours de traitement....\n\nVeuillez patienter.",
      {
        duration: 60000,
      }
    );
    dispatch(
      setApprovision({
        product_id: Id,
        stock_appro: parseInt(quant),
        product_name: Nom,
        unite_price: Prix,
        total_price: Prix * parseInt(quant),
        picture: Ig,
        stock_preview: Stock,
      })
    );
    Axios.post("https://backendtrader.digitalfirst.space/ajoutapprovList12", {
      stock_appro: -1 * parseInt(quant),
      total_price: -1 * (Prix * parseInt(quant)),
      unite_price: Prix,
      product_name: Nom,
      product_id: Id,
      stock_preview: Stock,
      picture: Ig,
      id_boutique: userid.BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      if (ret.data == "suc") {
        Axios.post("https://backendtrader.digitalfirst.space/approv4", {
          stock: parseInt(String(Stock)) - parseInt(quant),
          product_id: Id,
          id_boutique: userid.BoutiqueId,
        }).then((ret) => {
          if (ret.data == "suc") {
            console.log("Approvisionnement effectué");
            Axios.post("https://backendtrader.digitalfirst.space/afficheart", {
              id_boutique: userid.BoutiqueId,
            }).then((ret) => {
              dispatch(recupProduct(ret.data));
              setShowToast1(true);
              setProgress(false);
              setprogress1(false);
              setAchatv(false);
              // dispatch(dec(!trigger));
              setQuantite(1);
              dispatch(viderApprovision(""));
              gethistoappro();
              console.log(ret.data);
            });
          }
          console.log(ret.data);
        });
      }
    });
  };

  const permut = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>,
    d: any | React.SetStateAction<any>,
    e: any | React.SetStateAction<any>,
    f: any | React.SetStateAction<any>,
    g: any | React.SetStateAction<any>,
    h: any | React.SetStateAction<any>,
    i: any | React.SetStateAction<any>,
    j: any | React.SetStateAction<any>,
    k: any | React.SetStateAction<any>,
    l: any | React.SetStateAction<any>,
    m: any | React.SetStateAction<any>
  ) => {
    setNomprod(a);
    setPriv(b);
    setprixa(c);
    setDesc(d);
    setStockrest(e);
    setIdcateg(f);
    setNbrelike(g);
    setImg1(h);
    setImg2(i);
    setImg3(j);
    setImg4(k);
    setvideo(l);
    setIdprod(m);
    // setShowmodal(true)
  };

  const increm = () => {
    if (quantite >= 0) {
      setQuantite(quantite + 1);
    }
  };
  const decrem = () => {
    if (quantite > 0) {
      setQuantite(quantite - 1);
    }
  };
  const recherche = (ide: any | React.SetStateAction<any>) => {
    if (ide) {
      setCommand(true);
    } else {
      setCommand(false);
    }
  };
  const gethistoappro = () => {
    Axios.post("https://backendtrader.digitalfirst.space/afficheartapprov", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      dispatch(recupApprovisionnement(ret.data));
    });
  };

  // const getpan = () => {
  //   if (approv.filter((t: any) => t.product_id == Id)[0]) {
  //     setAjoute(approv.filter((t: any) => t.product_id == Id)[0].stock_appro);
  //     setCommand(true);
  //   } else {
  //     setAjoute(0);
  //     setCommand(false);
  //   }
  // };

  const change = () => {
    if (command) {
      setQuantite(ajoute);
    }
    setAchatv(true);
  };

  const changes = () => {
    if (command) {
      setQuantite(ajoute);
    }
    setAchatp(true);
  };

  const data = [
    {
      title: "Commander",
      subtitle: "Ajouter un produit",
      dec: (e: any) => {
        setShowmodal(e);
      },
      id: 1,
    },
    {
      title: "Produits",
      subtitle: "Ajouter ou modifier",
      dec: (e: any) => {
        setShowmodal2(e);
      },
      id: 2,
    },
    {
      title: "Produits",
      subtitle: "Ajouter ou modifier",
      dec: (e: any) => {
        setShowmodal3(e);
      },
      id: 3,
    },
    {
      title: "Produits",
      subtitle: "Ajouter ou modifier",
      dec: (e: any) => {
        setShowmodal4(e);
      },
      id: 4,
    },
  ];

  useEffect(() => {
    // getpan();
  }, [(trigger: any) => {}]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const step1Element = document.querySelector("#step14");
  //     const step2Element = document.querySelector("#step15");
  //     const step3Element = document.querySelector("#step16");
  //     const step4Element = document.querySelector("#step17");
  //     const step5Element = document.querySelector("#step18");
  //     const step6Element = document.querySelector("#step19");
  //     const step7Element = document.querySelector("#step20");
  //     const step8Element = document.querySelector("#step21");

  //     if (
  //       step1Element &&
  //       step2Element &&
  //       step3Element &&
  //       step4Element &&
  //       step5Element &&
  //       step6Element &&
  //       step7Element &&
  //       step8Element 
  //     ) {
  //       const intro = introJs()
  //         .setOptions({
  //           steps: [
  //             {
  //               element: step1Element,
  //               intro: "Ceci est la carte du produit",
  //             },
  //             {
  //               element: step2Element,
  //               intro: "Ceci est la zone de l'image",
  //             },
  //             {
  //               element: step3Element,
  //               intro: "Ceci est un menu pour la gestion du produit",
  //             },
  //             {
  //               element: step4Element,
  //               intro: "Ceci est le nom du produit",
  //             },
  //             {
  //               element: step5Element,
  //               intro: "Ceci est le prix du produit",
  //             },
  //             {
  //               element: step6Element,
  //               intro: "Ceci est le stock du produit",
  //             },
  //             {
  //               element: step7Element,
  //               intro:
  //                 "Ceci est la zone dédié à l'approvisionnement du produit",
  //             },
  //             {
  //               element: step8Element,
  //               intro:
  //                 "Ceci est la zone dédié sortie hors vente du produit",
  //             },
  //           ],
  //           nextLabel: "Suivant",
  //           prevLabel: "Retour",
  //           doneLabel: "Terminer",
  //         })
  //         .start();
  //     }
  //     return () => {
  //       introJs().exit();
  //     };
  //   }, 200);
  // }, []);

  
  return (
    <>
      {/* {command ? (
        <IonFabButton color="secondary" className="notifbadge">
          {ajoute}
        </IonFabButton>
      ) : null} */}
      {progress1 && (
        <div>
          <Toaster />
        </div>
      )}
      <IonCard className="card mb-3 relative" id="step14">
        <div className="dol" id="step16">
          <Menuxx
            nomprod={Nom}
            prixv={Prix}
            prixa={Prixa}
            desc={Desc}
            stockrest={Stock}
            idcateg={IdCateg}
            nbrelike={Like}
            img1={Img1}
            img2={Img2}
            img3={Img3}
            img4={Img4}
            video={Video}
            idprod={Id}
            type_product={type_product}
            quantifiable_product={quantifiable_product}
          />
        </div>
        {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
        <div
        // onClick={() => {
        //   setShowmodal(true);
        //   // { window.location.href = ` /home/articledesc/${Id} ` };
        // }}
        >
          {loaded ? null : <img src={`loading.gif`} className="imga" id="step15"/>}
          <img
            src={`https://backendtrader.digitalfirst.space/${Ig}`}
            style={loaded ? {} : { display: "none" }}
            onLoad={() => setLoaded(true)}
            alt="card"
            className="imga"
            id={loaded ? "step15" : ""}
            //  <img src="images/yelan.png" alt="card" className="imga"
            // onClick={() => {
            //   setShowmodal(true);
            // }}
          />
        </div>
        {/* ) : (
          <div>
            {loaded ? null : <img src={`loading.gif`} className="imga" />}
            <img
              src={`https://backendtrader.digitalfirst.space/${Ig}`}
              style={loaded ? {} : { display: "none" }}
              onLoad={() => setLoaded(true)}
              alt="card"
              className="imga"
              //  <img src="images/yelan.png" alt="card" className="imga"
            />
          </div>
        )} */}

        {/* <img src={`https://backendtrader.digitalfirst.space/${Ig}`} alt="card" className="imga" /> */}
        <IonCardContent className="cardcontents">
          <IonRow className="r1" id="step17">
            <h5 className="nom">{Nom}</h5>
          </IonRow>
          <IonRow className="r2">
            {/* <IonNote className="note1">{prix}$  </IonNote> */}
            <IonNote className="note1" id="step18">
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "XOF",
              }).format(Prix)}{" "}
            </IonNote>
            <IonNote
              className="note1"
              onClick={() => {
                console.log(quantite);
              }}
              id="step19"
            >
              Stock:{quantifiable_product === "oui" ? Stock : " null"}
            </IonNote>
          </IonRow>

          {/* <div className="flex w-full justify-between items-center text-xs text-neutral-800 mt-2 pr-3 pl-3">
            <span>Produit: </span>
            <span className="text-red-700">{type_product}</span>
          </div> */}

          {progress ? (
            <IonProgressBar
              className="prog mt-5"
              type="indeterminate"
            ></IonProgressBar>
          ) : achatv === false && achatp === false ? (
            <>
              {/* {choiceacces === "aucun" || choiceacces === "principal" ? ( */}
              <div className="flex flex-col items-center justify-center">
                <div>
                  <IonButton
                    className="comb1"
                    color="secondary"
                    onClick={() => {
                      change();
                    }}
                    id="step20"
                  >
                    Approvisionner
                  </IonButton>
                </div>
                <div>
                  <IonButton
                    className="comb1"
                    color="secondary"
                    onClick={() => {
                      changes();
                    }}
                    id="step21"
                  >
                    Sortie hors vente
                  </IonButton>
                </div>
              </div>
              {/* <IonRow className="round">
                  <IonCol size="5.5">
                    
                  </IonCol>
                  <IonCol size="5.5">
                    
                  </IonCol>
                </IonRow> */}
              {/* ) : (
                <IonRow className="round">
                  <IonCol size="5.5">
                    <IonButton className="comb1" color="secondary">
                      +
                    </IonButton>
                  </IonCol>
                  <IonCol size="5.5">
                    <IonButton className="comb1" color="secondary">
                      -
                    </IonButton>
                  </IonCol>
                </IonRow>
              )} */}
            </>
          ) : (
            <>
              {achatv ? (
                <>
                  <div className="flex items-center justify-center mt-1 r3">
                    <div className="flex items-center c1">
                      <IonIcon
                        icon={removeOutline}
                        className="ico1"
                        onClick={() => {
                          decrem();
                        }}
                      />
                      <IonBadge
                        color="light"
                        className="badg"
                        onClick={() => {
                          presentAlert({
                            header: "Entrez la quantité",
                            buttons: [
                              {
                                text: "Ok",
                                cssClass: "secondary",
                                handler: (alertData) => {
                                  //takes the data
                                  // setQuantite(parseInt(alertData.name1));
                                  transfert(parseInt(alertData.name1));
                                },
                              },
                              {
                                text: "RETOUR",
                                role: "cancel",
                                cssClass: "secondary",
                                handler: () => {},
                              },
                            ],
                            inputs: [
                              {
                                name: "name1",
                                type: "number",
                                placeholder: "Quantité",
                                attributes: {
                                  maxlength: 4,
                                },
                                min: 1,
                                max: 100,
                              },
                            ],
                          });
                        }}
                      >
                        {quantite}
                      </IonBadge>
                      <IonIcon
                        icon={addOutline}
                        className="ico2"
                        onClick={() => {
                          increm();
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <div
                        onClick={() => {
                          // transfert(); setAchatv(false);
                          console.log(ajoute);
                          transfert(quantite);
                          setAchatv(false);
                        }}
                      >
                        <AddToCartButton icon={true} color={false} />
                      </div>

                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setAchatv(false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="9"
                          y="9"
                          width="24"
                          height="24"
                          viewBox="0 0 64 64"
                        >
                          <ellipse
                            cx="32"
                            cy="61"
                            opacity=".3"
                            rx="20"
                            ry="3"
                          ></ellipse>
                          <path
                            fill="#fd3c4f"
                            d="M42.963,30l8.136-8.135c1.562-1.562,1.562-4.095,0-5.657l-5.306-5.306	c-1.562-1.562-4.095-1.562-5.657,0L32,19.038l-8.136-8.136c-1.562-1.562-4.095-1.562-5.657,0l-5.306,5.306	c-1.562,1.562-1.562,4.095,0,5.657L21.037,30l-8.135,8.135c-1.562,1.562-1.562,4.095,0,5.657l5.305,5.306	c1.562,1.562,4.095,1.562,5.657,0L32,40.963l8.136,8.135c1.562,1.562,4.095,1.562,5.657,0l5.305-5.306	c1.562-1.562,1.562-4.095,0-5.657L42.963,30z"
                          ></path>
                          <path
                            d="M40.135,49.098c1.562,1.562,4.095,1.562,5.657,0l5.306-5.306	c1.562-1.562,1.562-4.095,0-5.657l-8.136-8.135l3.535-3.535l0,0C45.521,25.488,44.242,25,42.962,25c-1.224,0-2.448,0.447-3.406,1.34	c-2.084,1.943-1.973,5.352,0.042,7.366l7.257,7.256l-3.892,3.892l-7.275-7.274c-1.847-1.847-4.846-2.146-6.86-0.484	c-2.31,1.907-2.432,5.334-0.365,7.402l3.536-3.536L40.135,49.098z"
                            opacity=".15"
                          ></path>
                          <path
                            fill="#fff"
                            d="M23.864,10.902c-1.562-1.562-4.095-1.562-5.657,0	l-5.306,5.306c-1.562,1.562-1.562,4.095,0,5.657L21.037,30l-3.535,3.535l0,0C18.478,34.512,19.757,35,21.037,35	c1.224,0,2.448-0.447,3.406-1.34c2.084-1.943,1.973-5.352-0.042-7.366l-7.257-7.256l3.892-3.892l7.275,7.274	c1.847,1.846,4.846,2.146,6.86,0.484c2.31-1.907,2.432-5.334,0.365-7.402L32,19.038L23.864,10.902z"
                            opacity=".3"
                          ></path>
                          <polyline
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="3"
                            points="18.5,15.5 21,13 23.5,15.5"
                          ></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {achatp ? (
                <>
                  <div className="flex items-center justify-center mt-1 r3">
                    <div className="flex items-center c1">
                      <IonIcon
                        icon={removeOutline}
                        className="ico1"
                        onClick={() => {
                          decrem();
                        }}
                      />
                      <IonBadge
                        color="light"
                        className="badg"
                        onClick={() => {
                          presentAlert({
                            header: "Entrez la quantité",
                            buttons: [
                              {
                                text: "Ok",
                                cssClass: "secondary",
                                handler: (alertData) => {
                                  //takes the data
                                  // setQuantite(parseInt(alertData.name1));
                                  transfert(parseInt(alertData.name1));
                                },
                              },
                              {
                                text: "RETOUR",
                                role: "cancel",
                                cssClass: "secondary",
                                handler: () => {},
                              },
                            ],
                            inputs: [
                              {
                                name: "name1",
                                type: "number",
                                placeholder: "Quantité",
                                attributes: {
                                  maxlength: 4,
                                },
                                min: 1,
                                max: 100,
                              },
                            ],
                          });
                        }}
                      >
                        {quantite}
                      </IonBadge>
                      <IonIcon
                        icon={addOutline}
                        className="ico2"
                        onClick={() => {
                          increm();
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <div
                        onClick={() => {
                          // transfert(); setAchatv(false);
                          console.log(ajoute);
                          sortiehorsvente(quantite);
                          setAchatp(false);
                        }}
                      >
                        <AddToCartButton icon={true} color={true} />
                      </div>

                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setAchatp(false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="9"
                          y="9"
                          width="24"
                          height="24"
                          viewBox="0 0 64 64"
                        >
                          <ellipse
                            cx="32"
                            cy="61"
                            opacity=".3"
                            rx="20"
                            ry="3"
                          ></ellipse>
                          <path
                            fill="#fd3c4f"
                            d="M42.963,30l8.136-8.135c1.562-1.562,1.562-4.095,0-5.657l-5.306-5.306	c-1.562-1.562-4.095-1.562-5.657,0L32,19.038l-8.136-8.136c-1.562-1.562-4.095-1.562-5.657,0l-5.306,5.306	c-1.562,1.562-1.562,4.095,0,5.657L21.037,30l-8.135,8.135c-1.562,1.562-1.562,4.095,0,5.657l5.305,5.306	c1.562,1.562,4.095,1.562,5.657,0L32,40.963l8.136,8.135c1.562,1.562,4.095,1.562,5.657,0l5.305-5.306	c1.562-1.562,1.562-4.095,0-5.657L42.963,30z"
                          ></path>
                          <path
                            d="M40.135,49.098c1.562,1.562,4.095,1.562,5.657,0l5.306-5.306	c1.562-1.562,1.562-4.095,0-5.657l-8.136-8.135l3.535-3.535l0,0C45.521,25.488,44.242,25,42.962,25c-1.224,0-2.448,0.447-3.406,1.34	c-2.084,1.943-1.973,5.352,0.042,7.366l7.257,7.256l-3.892,3.892l-7.275-7.274c-1.847-1.847-4.846-2.146-6.86-0.484	c-2.31,1.907-2.432,5.334-0.365,7.402l3.536-3.536L40.135,49.098z"
                            opacity=".15"
                          ></path>
                          <path
                            fill="#fff"
                            d="M23.864,10.902c-1.562-1.562-4.095-1.562-5.657,0	l-5.306,5.306c-1.562,1.562-1.562,4.095,0,5.657L21.037,30l-3.535,3.535l0,0C18.478,34.512,19.757,35,21.037,35	c1.224,0,2.448-0.447,3.406-1.34c2.084-1.943,1.973-5.352-0.042-7.366l-7.257-7.256l3.892-3.892l7.275,7.274	c1.847,1.846,4.846,2.146,6.86,0.484c2.31-1.907,2.432-5.334,0.365-7.402L32,19.038L23.864,10.902z"
                            opacity=".3"
                          ></path>
                          <polyline
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width="3"
                            points="18.5,15.5 21,13 23.5,15.5"
                          ></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </>
          )}
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message="Sortie hors ventes éffectués avec success"
            icon={informationCircle}
            position="top"
            duration={800}
          />
          <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="Approvisionnement éffectués avec success"
            icon={informationCircle}
            position="top"
            duration={800}
          />
          <IonToast
            isOpen={showToast3}
            onDidDismiss={() => setShowToast3(false)}
            message="Elément supprimé de la vente"
            icon={informationCircle}
            position="top"
            duration={800}
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
            <Nouv1
              nomprod={Nom}
              prixv={Prix}
              prixa={Prixa}
              desc={Desc}
              stockrest={Stock}
              idcateg={IdCateg}
              nbrelike={Like}
              img1={Img1}
              img2={Img2}
              img3={Img3}
              img4={Img4}
              video={Video}
              idprod={Id}
              type_product={type_product}
              quantifiable_product={quantifiable_product}
            />
          </IonModal>

          <IonModal
            id="example-modal1"
            mode="ios"
            isOpen={showmodal2}
            trigger="open-custom-dialog"
            onDidDismiss={() => {
              setShowmodal2(false);
            }}
          >
            <div className="wrapper">
              {/* <h2>Quantité</h2> */}

              <IonList>
                <IonItem detail={false}>
                  {/* <IonLabel position="floating">Item 2</IonLabel> */}
                  <IonInput type="number"></IonInput>
                </IonItem>
                <IonButton
                  color="secondary"
                  className="ion-margin-center"
                  size="small"
                >
                  Ajouter
                </IonButton>
              </IonList>
            </div>
          </IonModal>

          {/* <IonModal isOpen={showmodal} onDidDismiss={() => { setShowmodal(false) }}>
                        <IonItem className='Item1' lines='none'>
                            <IonButtons slot='start' onClick={() => { setShowmodal(false) }}>
                                <IonIcon icon={chevronBack} />
                            </IonButtons>
                            {Nom}
                        </IonItem>
                        <Description Id={Id} />
                    </IonModal> */}

          {/* <IonCardTitle className="title">{nom}</IonCardTitle>
                    <IonNote className="subtitle">{prix}</IonNote> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};
