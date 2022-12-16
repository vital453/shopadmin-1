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
import { tab4 } from "./articles/Paniermodal";
import { tab5 } from "./articles/PanierItem";
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
import Nouv1 from "../pages/Nouv1";
import { recupApprovisionnement } from "../Feature/ApprovisionnementSlice";

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

  // const trigger= useSelector((state: any) => state.panier.trigg);

  // const [showLoading, setShowLoading] = useState(true);

  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const userid = useSelector((state: any) => state.auth.user);

  // setTimeout(() => {
  //     setShowLoading(false);
  // }, 10000);
  const refr = () => { };

  const transfert = (quant: any | React.SetStateAction<any>,) => {
      setAjoute(quant);
      setCommand(true);
      if (!approv.find((e: any) => e.product_id == Id) && quant > 0) {
        setProgress(true)
        dispatch(
          setApprovision({
            product_id: Id,
            stock_appro: parseInt(quant),
            product_name: nom,
            unite_price: Prix,
            total_price: Prix * parseInt(quant),
            picture: Ig,
            stock_preview: Stock,
          })
        );
        Axios.post("https://backend-shop.benindigital.com/ajoutapprovList1", {
          stock_appro: parseInt(quant),
          total_price: Prix * parseInt(quant),
          unite_price: Prix,
          product_name: nom,
          product_id: Id,
          stock_preview: Stock,
          picture: Ig,
          id_boutique: userid.BoutiqueId,
        }).then((ret) => {
          console.log(ret.data);
          if (ret.data == "suc") {
            Axios.post("https://backend-shop.benindigital.com/approv3", {
              stock: parseInt(quant) + parseInt(String(Stock)),
              product_id: Id,
              id_boutique: userid.BoutiqueId,
            }).then((ret) => {
              if (ret.data == "suc") {
                console.log("Approvisionnement effectué");
                Axios.post("https://backend-shop.benindigital.com/afficheart", {
                  id_boutique: userid.BoutiqueId,
                }).then((ret) => {
                  dispatch(recupProduct(ret.data));
                  setShowToast2(true);
                  setProgress(false);
                  setAchatv(false);
                  // dispatch(dec(!trigger));
                  setQuantite(1);
                  dispatch(viderApprovision(""));
                  gethistoappro()
                  console.log(ret.data);
                });
              }
              console.log(ret.data);
            });
          }
        });
      }
  };

  const sortiehorsvente = (quant: any | React.SetStateAction<any>,) => {
    setAjoute(quant);
    setCommand(true);
      setProgress(true)
      dispatch(
        setApprovision({
          product_id: Id,
          stock_appro: parseInt(quant),
          product_name: nom,
          unite_price: Prix,
          total_price: Prix * parseInt(quant),
          picture: Ig,
          stock_preview: Stock,
        })
      );
      Axios.post("https://backend-shop.benindigital.com/ajoutapprovList12", {
        stock_appro: -1 * parseInt(quant),
        total_price: -1 * (Prix * parseInt(quant)),
        unite_price: Prix,
        product_name: nom,
        product_id: Id,
        stock_preview: Stock,
        picture: Ig,
        id_boutique: userid.BoutiqueId,
      }).then((ret) => {
        console.log(ret.data);
        if (ret.data == "suc") {
          Axios.post("https://backend-shop.benindigital.com/approv4", {
            stock: parseInt(String(Stock)) - parseInt(quant),
            product_id: Id,
            id_boutique: userid.BoutiqueId,
          }).then((ret) => {
            if (ret.data == "suc") {
              console.log("Approvisionnement effectué");
              Axios.post("https://backend-shop.benindigital.com/afficheart", {
                id_boutique: userid.BoutiqueId,
              }).then((ret) => {
                dispatch(recupProduct(ret.data));
                setShowToast1(true);
                setProgress(false);
                setAchatv(false);
                // dispatch(dec(!trigger));
                setQuantite(1);
                dispatch(viderApprovision(""));
                gethistoappro()
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
    Axios.post("https://backend-shop.benindigital.com/afficheartapprov", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      dispatch(recupApprovisionnement(ret.data));
    });
  }

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
  }, [(trigger: any) => { }]);

  useEffect(() => {
    // getpan();
  }, []);
  return (
    <>
      {/* {command ? (
        <IonFabButton color="secondary" className="notifbadge">
          {ajoute}
        </IonFabButton>
      ) : null} */}
      <IonCard className="card">
        <div
          onClick={() => {
            setShowmodal(true);
            // { window.location.href = ` /home/articledesc/${Id} ` };
          }}
        >
          {loaded ? null : <img src={`loading.gif`} className="imga" />}
          <img
            src={`https://backend-shop.benindigital.com/${Ig}`}
            style={loaded ? {} : { display: "none" }}
            onLoad={() => setLoaded(true)}
            alt="card"
            className="imga"
            //  <img src="images/yelan.png" alt="card" className="imga"
            onClick={() => {
              setShowmodal(true);
            }}
          />

          {/* <img src={`https://backend-shop.benindigital.com/${Ig}`} alt="card" className="imga" /> */}
        </div>
        <IonCardContent className="cardcontent">
          <IonRow className="r1">
            <h5 className="nom">{Nom}</h5>
          </IonRow>
          <IonRow className="r2">
            {/* <IonNote className="note1">{prix}$  </IonNote> */}
            <IonNote className="note1">
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
            >
              {" "}
              Stock:{Stock}{" "}
            </IonNote>
          </IonRow>

          {progress ? (
            <IonProgressBar
              className="prog"
              type="indeterminate"
            ></IonProgressBar>
          ) : ((achatv==false)&&(achatp==false)) ?
           <>
              <IonRow className="round">
                <IonCol size="5.5"  >
                  <IonButton
                    className="comb1"
                    color="secondary"
                    onClick={() => {
                      change();
                    }}
                  >
                    +
                  </IonButton>
                </IonCol>
                <IonCol size="5.5">
                  <IonButton
                    className="comb1"
                    color="secondary"
                    onClick={() => {
                      changes();
                    }}
                  >
                    -
                  </IonButton>
                </IonCol>
              </IonRow>
           </> : <>
           {achatv ? <> 
            <IonRow className="r3">
              <IonCol className="c1" size="6">
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
                          handler: () => { },
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
              </IonCol>
              <IonCol>
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
              </IonCol>
            </IonRow>
           </> : null}
           {achatp ? <> 
            <IonRow className="r3">
              <IonCol className="c1" size="6">
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
                          handler: () => { },
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
              </IonCol>
              <IonCol>
                <div
                  onClick={() => {
                    // transfert(); setAchatv(false);
                    console.log(ajoute);
                    sortiehorsvente(quantite);
                    setAchatp(false);
                  }}
                >
                  <AddToCartButton icon={true} color={true}/>
                </div>
              </IonCol>
            </IonRow>
           </> : null}
           </>}
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
            message="Elément supprimé du panier"
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
