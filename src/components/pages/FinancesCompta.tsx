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
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonRouter,
  IonAccordion,
  IonAccordionGroup,
  IonSegmentButton,
  IonSegment,
} from "@ionic/react";
import Axios from "axios";

import {
  triangle,
  ellipse,
  square,
  arrowBack,
  arrowForward,
  personCircleOutline,
  globeOutline,
  trash,
  trashOutline,
  chevronBack,
  arrowDownCircle,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
} from "../../Feature/PanierSlice";

import { IonReactRouter } from "@ionic/react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { ModalCom } from "./ModalCom";
import { format } from "date-fns";
import { recupCommande } from "../../Feature/CommandeSlice";
import LineChart from "../Home/LineChart";
import Stacked from "../Home/Stacked";
import Chart from "../Home/Charts";
import Sidebar from "../Sidebar";
import Header from "../Header";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
}

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

export const FinancesCompta: React.SFC<Ajout_utiliformprops> = ({}) => {
  const router = useIonRouter();
  const [seg, setSeg] = useState<any>("Par_produits");
  let [dateactu, setDateactu] = useState(
    useSelector((state: any) => state.Hash.date_actu)
  );
  const boutiqueid = useSelector((state: any) => state.auth.user);
  const accesparcompte = useSelector((state: any) => state.Hash.accesparcompte);
  // largeur de la page
  const [width, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // MAJ des dimensions
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {}, []);

  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonRouterLink routerLink={`/Finances`} color="dark">
                <IonButton
                // onClick={() => {
                //   // router.goBack();
                //   window.location.href="/Finances"
                // }}
                >
                  <IonIcon color="medium" icon={chevronBack} />
                </IonButton>
              </IonRouterLink>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large" className="page-title">
                  <IonLabel>Finances </IonLabel>
                  <IonNote>comptabilité</IonNote>
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonList>
              <div className="homes">
                <IonSegment
                  className="nereide mb-3"
                  onIonChange={(e) => {
                    setSeg(e.detail.value);
                  }}
                  value={seg}
                  scrollable={true}
                  mode="ios"
                >
                  <IonSegmentButton value="Par_produits">
                    <IonLabel>Par produits</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="Global">
                    <IonLabel>Global</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
                <div className="div2">
                  {seg === "Par_produits" ? (
                    <Financeparprod dateactu={dateactu} />
                  ) : null}
                  {seg === "Global" ? (
                    <Financeglobal dateactu={dateactu} />
                  ) : null}
                </div>
              </div>
            </IonList>
          </>
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
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="w-full">
                <IonSegment
                  className="nereide mb-3"
                  onIonChange={(e) => {
                    setSeg(e.detail.value);
                  }}
                  value={seg}
                  scrollable={true}
                  mode="ios"
                >
                  <IonSegmentButton value="Par_produits">
                    <IonLabel>Par produits</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="Global">
                    <IonLabel>Global</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
                <div className="div2">
                  {seg === "Par_produits" ? (
                    <Financeparprod dateactu={dateactu} />
                  ) : null}
                  {seg === "Global" ? (
                    <Financeglobal dateactu={dateactu} />
                  ) : null}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
};

interface Ajout_utiliformpropsone {
  dateactu: String;
}

export const Financeparprod: React.FC<Ajout_utiliformpropsone> = ({
  dateactu,
}) => {
  const [showmodal, setShowmodal] = useState(false);
  let panier = useSelector((state: any) => state.panier.panier);
  let comm = [].concat(useSelector((state: any) => state.commande.commande));
  let commart = [].concat(
    useSelector((state: any) => state.commande.commandeart)
  );
  let approv = [].concat(
    useSelector((state: any) => state.approvisionnement.approvisionnement)
  );
  const userid = useSelector((state: any) => state.auth.user);
  const [datedebut, setDatedebut] = useState<any>();
  const [datefin, setDatefin] = useState<any>();
  const [produit, setProduit] = useState<any>();
  const [totalvendu, setTotalvendu] = useState<any>();
  const [benefice, setBenefice] = useState<any>();
  let benefs = [];
  const [totalapprov, setTotalapprov] = useState<any>();
  const [montotalvendu, setMontotalvendu] = useState<any>();
  let article = useSelector((state: any) => state.product.product);
  const dispatch = useDispatch();
  const router = useIonRouter();

  const vtotalsold = (
    a: any | React.SetStateAction<any>
    // b: any | React.SetStateAction<any>,
    // c: any | React.SetStateAction<any>
  ) => {
    // console.log(comm.every((t:any)=>t.id === 8));
    // article.filter((t:any)=>t.id == a)).map((e: any) => e.total_sold).reduce((prev: any, curr: any) => prev + curr, 0
    setTotalvendu(
      commart
        .filter(
          (t: any) =>
            t.product_id == a &&
            t.status_id_command == 3 &&
            format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.product_quantity)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };

  const vbenef = (
    a: any | React.SetStateAction<any>
    // b: any | React.SetStateAction<any>,
    // c: any | React.SetStateAction<any>
  ) => {
    let prixun = article.filter((t: any) => t.id == a)[0].cost;

    let mtotalv = commart
      .filter(
        (t: any) =>
          t.product_id == a &&
          t.status_id_command == 3 &&
          format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
        // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
        // format(new Date(t.command_date), "yyyy-MM-dd") <= c
      )
      .map((e: any) => e.total_price)
      .reduce((prev: any, curr: any) => prev + curr, 0);

    let totalv = commart
      .filter(
        (t: any) =>
          t.product_id == a &&
          t.status_id_command == 3 &&
          format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
        // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
        // format(new Date(t.command_date), "yyyy-MM-dd") <= c
      )
      .map((e: any) => e.product_quantity)
      .reduce((prev: any, curr: any) => prev + curr, 0);

    setBenefice(mtotalv - prixun * totalv);
  };

  const vmontotalv = (
    a: any | React.SetStateAction<any>
    // b: any | React.SetStateAction<any>,
    // c: any | React.SetStateAction<any>
  ) => {
    setMontotalvendu(
      commart
        .filter(
          (t: any) =>
            t.product_id == a &&
            t.status_id_command == 3 &&
            format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.total_price)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
    // commart.indexOf
  };

  const vtotalapprov = (
    a: any | React.SetStateAction<any>
    // b: any | React.SetStateAction<any>,
    // c: any | React.SetStateAction<any>
  ) => {
    setTotalapprov(
      approv
        .filter(
          (t: any) =>
            t.product_id == a &&
            format(new Date(t.date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.stock_appro)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };

  const recupbenef = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    benefs = commart.filter(
      (t: any) =>
        t.product_id == a &&
        t.status_id_command == 3 &&
        format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
        format(new Date(t.command_date), "yyyy-MM-dd") <= c
    );
    let gih = benefs.reduce((n, { Amount }) => n + Amount, 0);
    console.log(benefs);
  };

  const regroupjour = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    // console.log(format(new Date(datedebut), "yyyy-MM-dd"));
    // const arr = [{ 'name': 'P1', 'value': 150 }, { 'name': 'P1', 'value': 150 }, { 'name': 'P2', 'value': 200 }, { 'name': 'P3', 'value': 450 }];
    // const res = Array.from(arr.reduce((acc, { value, ...r }) => {
    //   const key = JSON.stringify(r);
    //   const current = acc.get(key) || { ...r, value: 0 };
    //   return acc.set(key, { ...current, value: current.value + value });
    // }, new Map).values());
    // console.log(res);
    let artjrsglob = commart.filter(
      (t: any) =>
        t.product_id == a &&
        t.status_id_command == 3 &&
        format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
        format(new Date(t.command_date), "yyyy-MM-dd") <= c
    );

    // const arr = [{ 'name': 'P1', 'value': 150 }, { 'name': 'P1', 'value': 150 }, { 'name': 'P2', 'value': 200 }, { 'name': 'P3', 'value': 450 }];
    // const res = Array.from(artjrsglob.reduce((acc, { value, ...r }) => {
    //   const key = JSON.stringify(r);
    //   const current = acc.get(key) || { ...r, value: 0 };
    //   return acc.set(key, { ...current, value: current.value + value });
    // }, new Map).values());
    // console.log(res);

    console.log(artjrsglob);
  };

  const ecomPieChartData = [
    { x: "2018", y: 18, text: "35%" },
    { x: "2019", y: 18, text: "15%" },
    { x: "2020", y: 18, text: "25%" },
    { x: "2021", y: 18, text: "25%" },
  ];

  const vag = () => {
    console.log(datedebut);
    console.log(datefin);
    console.log(datedebut < datefin);
  };

  useEffect(() => {}, []);
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);

  return (
    <>
      <IonList>
        <div className="">
          <IonItem className="ion-margin-top" lines="none">
            <IonLabel position="floating">Produits</IonLabel>
            <IonSelect
              value={produit}
              placeholder="Selectionnez un produit"
              onIonChange={(e) => {
                setProduit(e.detail.value);
                vtotalsold(
                  e.detail.value
                  // , datedebut, datefin
                );
                vbenef(
                  e.detail.value
                  // , datedebut, datefin
                );
                vmontotalv(
                  e.detail.value
                  // , datedebut, datefin
                );
                vtotalapprov(
                  e.detail.value
                  // , datedebut, datefin
                );
              }}
            >
              {article.map((card: any, index: any) => {
                return (
                  <IonSelectOption value={card.id}>{card.name}</IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>

          <div className="grid1">
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">Total vendu :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{totalvendu}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">Bénéfices :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{benefice}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">Montant vendu :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{montotalvendu}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">total approvisionné :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{totalapprov}</h2>
              </IonLabel>
            </IonItem>
          </div>
        </div>
      </IonList>{" "}
    </>
  );
  // return choiceacces === "aucun" || choiceacces === "principal" ? (
  //   <>
  //     <IonList>
  //       <div className="">

  //         <IonItem className="ion-margin-top" lines="none">
  //           <IonLabel position="floating">Produits</IonLabel>
  //           <IonSelect
  //             value={produit}
  //             placeholder="Selectionnez un produit"
  //             onIonChange={(e) => {
  //               setProduit(e.detail.value);
  //               vtotalsold(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //               vbenef(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //               vmontotalv(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //               vtotalapprov(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //             }}
  //           >
  //             {article.map((card: any, index: any) => {
  //               return (
  //                 <IonSelectOption value={card.id}>{card.name}</IonSelectOption>
  //               );
  //             })}
  //           </IonSelect>
  //         </IonItem>

  //         <div className="grid1">
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Total vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Bénéfices :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{benefice}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Montant vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{montotalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">total approvisionné :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalapprov}</h2>
  //             </IonLabel>
  //           </IonItem>

  //         </div>

  //       </div>
  //     </IonList>{" "}
  //   </>
  // ) : (
  //   <>
  //     <IonList>
  //       <div className="">

  //         <IonItem className="ion-margin-top" lines="none">
  //           <IonLabel position="floating">Produits</IonLabel>
  //           <IonSelect
  //             value={produit}
  //             placeholder="Selectionnez un produit"
  //             onIonChange={(e) => {
  //               setProduit(e.detail.value);
  //               vtotalsold(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //               vbenef(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //               vmontotalv(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //               vtotalapprov(
  //                 e.detail.value
  //                 // , datedebut, datefin
  //               );
  //             }}
  //           >
  //             {article.map((card: any, index: any) => {
  //               return (
  //                 <IonSelectOption value={card.id}>{card.name}</IonSelectOption>
  //               );
  //             })}
  //           </IonSelect>
  //         </IonItem>

  //         <div className="grid1">
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Total vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Bénéfices :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{benefice}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Montant vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{montotalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">total approvisionné :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalapprov}</h2>
  //             </IonLabel>
  //           </IonItem>

  //         </div>

  //       </div>
  //     </IonList>{" "}
  //   </>
  // );
};
interface Ajout_utiliformpropstout {
  dateactu: String;
}
export const Financeglobal: React.FC<Ajout_utiliformpropstout> = ({
  dateactu,
}) => {
  const [showmodal, setShowmodal] = useState(false);
  let panier = useSelector((state: any) => state.panier.panier);
  let comm = [].concat(useSelector((state: any) => state.commande.commande));
  let commart = [].concat(
    useSelector((state: any) => state.commande.commandeart)
  );
  let approv = [].concat(
    useSelector((state: any) => state.approvisionnement.approvisionnement)
  );
  const userid = useSelector((state: any) => state.auth.user);
  const [datedebut, setDatedebut] = useState<any>();
  const [datefin, setDatefin] = useState<any>();
  const [produit, setProduit] = useState<any>();
  const [totalvendu, setTotalvendu] = useState<any>();
  const [benefice, setBenefice] = useState<any>(0);
  let benefs = [];
  const [totalapprov, setTotalapprov] = useState<any>();
  const [montotalvendu, setMontotalvendu] = useState<any>();
  let article: any = useSelector((state: any) => state.product.product);
  const dispatch = useDispatch();
  const router = useIonRouter();
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);
  const vtotalsold = () => {
    // console.log(comm.every((t:any)=>t.id === 8));
    // article.filter((t:any)=>t.id == a)).map((e: any) => e.total_sold).reduce((prev: any, curr: any) => prev + curr, 0
    setTotalvendu(
      commart
        .filter(
          (t: any) =>
            // t.product_id == a &&
            t.status_id_command == 3 &&
            format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.product_quantity)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };

  const vbenef = () => {
    let prixun = 0;
    let mtotalv = 0;
    let totalv = 0;
    let ben = 0;

    for (let i = 0; i < article.length; i++) {
      // prixun = article.filter((t: any) => t.id == item.product_id)[0].cost;
      // console.log((article.find((t: any) => t.id == article[i].id)).cost);
      prixun = article.find((t: any) => t.id == article[i].id).cost;

      mtotalv = commart
        .filter(
          (t: any) =>
            t.product_id == article[i].id &&
            t.status_id_command == 3 &&
            format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.total_price)
        .reduce((prev: any, curr: any) => prev + curr, 0);

      totalv = commart
        .filter(
          (t: any) =>
            t.product_id == article[i].id &&
            t.status_id_command == 3 &&
            format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.product_quantity)
        .reduce((prev: any, curr: any) => prev + curr, 0);

      // setBenefice(mtotalv - prixun*totalv + benefice);
      ben = mtotalv - prixun * totalv + ben;
      // console.log(ben);
    }
    setBenefice(ben);
  };

  const vmontotalv = () => {
    setMontotalvendu(
      commart
        .filter(
          (t: any) =>
            // t.product_id == a &&
            t.status_id_command == 3 &&
            format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.total_price)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
    // commart.indexOf
  };

  const vtotalapprov = () => {
    setTotalapprov(
      approv
        .filter(
          (t: any) =>
            // t.product_id == a &&
            format(new Date(t.date), "yyyy-MM-dd") == dateactu
          // format(new Date(t.date), "yyyy-MM-dd") >= b &&
          // format(new Date(t.date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.stock_appro)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };

  const recupbenef = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    benefs = commart.filter(
      (t: any) =>
        t.product_id == a &&
        t.status_id_command == 3 &&
        format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
        format(new Date(t.command_date), "yyyy-MM-dd") <= c
    );
    let gih = benefs.reduce((n, { Amount }) => n + Amount, 0);
    console.log(benefs);
  };

  const regroupjour = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    // console.log(format(new Date(datedebut), "yyyy-MM-dd"));
    // const arr = [{ 'name': 'P1', 'value': 150 }, { 'name': 'P1', 'value': 150 }, { 'name': 'P2', 'value': 200 }, { 'name': 'P3', 'value': 450 }];
    // const res = Array.from(arr.reduce((acc, { value, ...r }) => {
    //   const key = JSON.stringify(r);
    //   const current = acc.get(key) || { ...r, value: 0 };
    //   return acc.set(key, { ...current, value: current.value + value });
    // }, new Map).values());
    // console.log(res);
    let artjrsglob = commart.filter(
      (t: any) =>
        t.product_id == a &&
        t.status_id_command == 3 &&
        format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
        format(new Date(t.command_date), "yyyy-MM-dd") <= c
    );

    // const arr = [{ 'name': 'P1', 'value': 150 }, { 'name': 'P1', 'value': 150 }, { 'name': 'P2', 'value': 200 }, { 'name': 'P3', 'value': 450 }];
    // const res = Array.from(artjrsglob.reduce((acc, { value, ...r }) => {
    //   const key = JSON.stringify(r);
    //   const current = acc.get(key) || { ...r, value: 0 };
    //   return acc.set(key, { ...current, value: current.value + value });
    // }, new Map).values());
    // console.log(res);

    console.log(artjrsglob);
  };

  const ecomPieChartData = [
    { x: "2018", y: 18, text: "35%" },
    { x: "2019", y: 18, text: "15%" },
    { x: "2020", y: 18, text: "25%" },
    { x: "2021", y: 18, text: "25%" },
  ];

  const vag = () => {
    console.log(datedebut);
    console.log(datefin);
    console.log(datedebut < datefin);
  };

  useEffect(() => {
    vbenef();
    vmontotalv();
    vtotalapprov();
    vtotalsold();
  }, []);

  return (
    <>
      {" "}
      <IonList>
        <div className="">
          <div className="grid1">
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">Total vendu :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{totalvendu}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">Bénéfices :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{benefice}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">Montant vendu :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{montotalvendu}</h2>
              </IonLabel>
            </IonItem>
            <IonItem lines="none" className="ion-margin-top">
              <IonLabel>
                <h2 className="labh">total approvisionné :</h2>
              </IonLabel>
              <IonLabel>
                <h2 className="labh">{totalapprov}</h2>
              </IonLabel>
            </IonItem>
          </div>
        </div>
      </IonList>
    </>
  );
  // return choiceacces === "aucun" || choiceacces === "principal" ? (
  //   <>
  //     {" "}
  //     <IonList>
  //       <div className="">

  //         <div className="grid1">
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Total vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Bénéfices :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{benefice}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Montant vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{montotalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">total approvisionné :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalapprov}</h2>
  //             </IonLabel>
  //           </IonItem>

  //         </div>

  //       </div>
  //     </IonList>
  //   </>
  // ) : (
  //   <>
  //     {" "}
  //     <IonList>
  //       <div className="">

  //         <div className="grid1">
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Total vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Bénéfices :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{benefice}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">Montant vendu :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{montotalvendu}</h2>
  //             </IonLabel>
  //           </IonItem>
  //           <IonItem lines="none" className="ion-margin-top">
  //             <IonLabel>
  //               <h2 className="labh">total approvisionné :</h2>
  //             </IonLabel>
  //             <IonLabel>
  //               <h2 className="labh">{totalapprov}</h2>
  //             </IonLabel>
  //           </IonItem>

  //         </div>
  //       </div>
  //     </IonList>{" "}
  //   </>
  // );
};
