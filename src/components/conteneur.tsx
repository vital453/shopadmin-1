/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
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

import { IonReactRouter } from "@ionic/react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import AddToCartButton from "./AddToCartButton";
import { log } from "console";
import { useSelector, useDispatch } from "react-redux";
import Description from "../components/articles/description";

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

export const Conteneur: React.SFC<Ajout_utiliformprops> = ({
  Nom,
  Prix,
  Id,
  Stock,
  Ig,
  quantifiable_product,
  type_product,
}) => {
  const [clic, setClic] = useState(false);
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal2, setShowmodal2] = useState(false);
  const [showmodal3, setShowmodal3] = useState(false);
  const [showmodal4, setShowmodal4] = useState(false);
  // const [panier, setPanier] = useState<any[]>(useSelector((state: any) => state.panier.panier));
  let panier = useSelector((state: any) => state.panier.panier);
  const [nom, setNom] = useState<String>(Nom);
  const [achatv, setAchatv] = useState<any>(false);
  const [quantite, setQuantite] = useState<any>(1);
  const [prix, setPrix] = useState<any>(Prix);
  const [command, setCommand] = useState<any>();
  const [ajoute, setAjoute] = useState<any>();
  const [telephone, setTelephone] = useState<String>("rr");
  const [remarque, setRemarque] = useState<String>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("rr");
  const [chargeimg, setChargeImg] = useState<any>(false);
  let article = useSelector((state: any) => state.product.product);
  const [id, setId] = useState<number>(0);
  const [trigger, setTrigger] = useState<any>(
    useSelector((state: any) => state.panier.trigg)
  );
  const dispatch = useDispatch();
  const ionRouter = useIonRouter();
  const [loaded, setLoaded] = useState(false);
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);

  // const trigger= useSelector((state: any) => state.panier.trigg);

  // const [showLoading, setShowLoading] = useState(true);

  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast7, setShowToast7] = useState(false);
  const [showToast8, setShowToast8] = useState(false);
  const [showToast9, setShowToast9] = useState(false);

  // setTimeout(() => {
  //     setShowLoading(false);
  // }, 10000);
  const refr = () => {};

  const increm = () => {
    if (quantite < Stock) {
      if (Stock > 0) {
        setQuantite(quantite + 1);
      }
    }
  };
  const decrem = () => {
    if (quantite > 0) {
      if (Stock > 0) {
        setQuantite(quantite - 1);
      }
    }
  };
  const recherche = (ide: any | React.SetStateAction<any>) => {
    if (ide) {
      setCommand(true);
    } else {
      setCommand(false);
    }
  };

  const getpan = () => {
    if (panier.filter((t: any) => t.product_id == Id)[0]) {
      setAjoute(
        panier.filter((t: any) => t.product_id == Id)[0].product_quantity
      );
      setCommand(true);
    } else {
      setAjoute(0);
      setCommand(false);
    }

    // if(ajoute){
    //     setCommand(true);
    // }else{
    //     setCommand(false);
    // }

    // else {
    //     fetch('https://backendtrader.digitalfirst.space/affichepanier').then((res) => {
    //         const data = res.json()
    //         return data
    //     }).then((data) => {
    //         setPanier(data);
    //         setClic(false);
    //         for (var i = 0, len = data.length, a = 0; i < len; i++) {
    //             if (data[i].product_id == Id) {
    //                 setCommand(true);
    //                 a = a + 1;
    //                 console.log(data[i].product_quantity);
    //                 setAjoute(data[i].product_quantity);
    //             }
    //             if (a == 0 && i == (len - 1)) {
    //                 setCommand(false)
    //             }
    //         }
    //     })
    // }
  };

  const suppression = (ide: number | React.SetStateAction<any>) => {
    // Axios.delete(`https://backendtrader.digitalfirst.space/deletepan/${ide}`);
    // setCommand(false);
    // setAjoute(quantite);
    // setClic(true);
    dispatch(deleteProduct(ide));
    dispatch(dec(!trigger));
    setCommand(false);
    setShowToast3(true);
  };

  const change = () => {
    if (command) {
      setQuantite(ajoute);
    }
    setAchatv(true);
  };

  const ajout = () => {
    if (quantifiable_product === "oui") {
      if (Stock > 0) {
        setClic(true);
        if (ajoute) {
          if (quantite == 0) {
            // suppression(Id);
            dispatch(deleteProduct(Id));
            dispatch(dec(!trigger));
            // setCommand(false);
            setShowToast3(true);
            // setAjoute(0);
          } else {
            setAjoute(quantite);
            setCommand(true);

            dispatch(
              updateQuantity([
                parseInt(quantite),
                Id,
                Prix * parseInt(quantite),
              ])
            );
            dispatch(dec(!trigger));
            setShowToast2(true);
            setQuantite(1);
          }
        } else {
          setAjoute(quantite);
          setCommand(true);
          if (!panier.find((e: any) => e.product_id == Id) && quantite > 0) {
            dispatch(
              setProductPan({
                product_id: Id,
                product_quantity: parseInt(quantite),
                product_name: Nom,
                unite_price: Prix,
                total_price: Prix * parseInt(quantite),
                picture1: Ig,
                stock: Stock,
                total_sold: article.filter((t: any) => t.id == Id)[0]
                  .total_sold,
                quantifiable_product: quantifiable_product,
                type_product: type_product,
              })
            );
            dispatch(dec(!trigger));
            setShowToast1(true);
            setQuantite(1);
          }
        }
      } else {
        setShowToast9(true);
      }
    } else if (quantifiable_product === "non") {
      if (ajoute) {
        setShowToast8(true);
      } else {
        if (parseInt(panier.length) < 1) {
          setCommand(true);
          setAjoute(quantite);
          dispatch(
            setProductPan({
              product_id: Id,
              product_quantity: 1,
              product_name: Nom,
              unite_price: Prix,
              total_price: Prix,
              picture1: Ig,
              stock: Stock,
              total_sold: article.filter((t: any) => t.id == Id)[0].total_sold,
              quantifiable_product: quantifiable_product,
              type_product: type_product,
            })
          );
          dispatch(dec(!trigger));
          setShowToast1(true);
          setQuantite(1);
        } else if (parseInt(panier.length) >= 1) {
          if (panier[0].type_product === type_product) {
            setCommand(true);
            setAjoute(quantite);
            dispatch(
              setProductPan({
                product_id: Id,
                product_quantity: 1,
                product_name: Nom,
                unite_price: Prix,
                total_price: Prix,
                picture1: Ig,
                stock: Stock,
                total_sold: article.filter((t: any) => t.id == Id)[0]
                  .total_sold,
                quantifiable_product: quantifiable_product,
                type_product: type_product,
              })
            );
            dispatch(dec(!trigger));
            setShowToast1(true);
            setQuantite(1);
          } else {
            setShowToast7(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    getpan();
    // if((panier.find((e:any)=>e.product_id==Id))){
    //     setAjoute((panier.find((e:any)=>e.product_id==Id)).product_quantity);
    //     console.log('dia'); }

    // console.log('dia');
  }, [(trigger: any) => {}]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const step1Element = document.querySelector("#step5");
  //     const step2Element = document.querySelector("#step6");
  //     const step3Element = document.querySelector("#step7");
  //     const step4Element = document.querySelector("#step8");
  //     const step5Element = document.querySelector("#step9");
  //     const step6Element = document.querySelector("#step10");

  //     if (
  //       step1Element &&
  //       step2Element &&
  //       step3Element &&
  //       step4Element &&
  //       step5Element &&
  //       step6Element
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
  //               intro: "Ceci est la zone de l'image du produit",
  //             },
  //             {
  //               element: step3Element,
  //               intro: "Ceci est le nom du produit",
  //             },
  //             {
  //               element: step4Element,
  //               intro: "Ceci est le prix du produit",
  //             },
  //             {
  //               element: step5Element,
  //               intro: "Ceci est le stock du produit",
  //             },
  //             {
  //               element: step6Element,
  //               intro:
  //                 "Ceci est la zone dédié à l'ajout du produit au panier de vente ",
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
      {command ? (
        <IonFabButton color="secondary" className="notifbadge">
          {ajoute}
        </IonFabButton>
      ) : null}

      <IonCard className="cards" id="step5">
        {loaded ? null : <img src={`loading.gif`} className="imga" />}
        <img
          src={`https://backendtrader.digitalfirst.space/${Ig}`}
          style={loaded ? {} : { display: "none" }}
          onLoad={() => setLoaded(true)}
          alt="card"
          className="imga"
          id="step6"
          //  <img src="images/yelan.png" alt="card" className="imga"
          onClick={() => {
            setShowmodal(true);
          }}
        />

        {/* <img src={`https://backendtrader.digitalfirst.space/${Ig}`} alt="card" className="imga"
                    onClick={() => {setShowmodal(true)}} /> */}

        <IonCardContent className="cardcontent">
          <IonRow className="r1" id="step7">
            <h5 className="nom">{Nom}</h5>
          </IonRow>
          <IonRow className="r2">
            {/* <IonNote className="note1">{prix}$  </IonNote> */}
            <IonNote className="note1" id="step8">
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "XOF",
              }).format(Prix)}{" "}
            </IonNote>
            <IonNote className="note1" id="step9">
              {" "}
              Stock:{quantifiable_product === "oui" ? Stock : "null"}{" "}
            </IonNote>
          </IonRow>
          {/* <div className="flex w-full justify-between items-center text-xs text-neutral-800 mt-2 pr-3 pl-3">
            <span>Produit: </span>
            <span className="text-red-700">{type_product}</span>
          </div> */}
          {
            achatv ? (
              <div className="flex items-center justify-center -mt-1 pl-3 pr-3 r3">
                <div className="flex items-center c1">
                  <IonIcon
                    icon={removeOutline}
                    className="ico1"
                    onClick={() => {
                      decrem();
                    }}
                  />
                  <IonBadge color="light" className="badg">
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
                <div className="flex items-center justify-between p-1 gap-2 cursor-pointer mt-2">
                  <div
                    onClick={() => {
                      ajout();
                      setAchatv(false);
                      //  setShowLoading(true);
                    }}
                    className="addn"
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
            ) : // choiceacces === "aucun" || choiceacces === "principal" ? (
            quantifiable_product === "oui" ? (
              <IonButton
                className="comb"
                color="secondary"
                onClick={() => {
                  change();
                }}
                id="step10"
              >
                Ajouter
              </IonButton>
            ) : (
              <IonButton
                className="comb"
                color="secondary"
                onClick={() => {
                  ajout();
                }}
                id="step10"
              >
                Ajouter
              </IonButton>
            )
            // ) : (
            //   <IonButton
            //     className="comb"
            //     color="secondary"

            //   >
            //     Ajouter
            //   </IonButton>
            // )
          }

          {/* <IonLoading
                        cssClass='my-custom-class'
                        isOpen={showLoading}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}
                        duration={1000}
                    /> */}
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message="Elément ajouté à la vente"
            icon={informationCircle}
            position="top"
            duration={800}
          />
          <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="Quantité mise à jour"
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
          <IonToast
            isOpen={showToast7}
            onDidDismiss={() => setShowToast7(false)}
            message="Ce produit n'est pas du même type que ceux déjâ présent dans la commande"
            icon={informationCircle}
            position="top"
            duration={3000}
          />

          <IonToast
            isOpen={showToast8}
            onDidDismiss={() => setShowToast8(false)}
            message="Ce produit a déjâ été ajouter â la commande"
            icon={informationCircle}
            position="top"
            duration={3000}
          />
          <IonToast
            isOpen={showToast9}
            onDidDismiss={() => setShowToast9(false)}
            message="Article en rupture de stock"
            icon={informationCircle}
            position="top"
            duration={3000}
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
              retour
            </IonItem>
            <Description Id={Id} />
          </IonModal>

          {/* <IonCardTitle className="title">{nom}</IonCardTitle>
                    <IonNote className="subtitle">{prix}</IonNote> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};
