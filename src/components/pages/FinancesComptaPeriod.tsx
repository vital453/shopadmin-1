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
  IonNote,
  IonPage,
  IonRouterLink,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from "axios";

interface Ajout_utiliformprops {
  // nom: String;
  // prenom: String;
}

export const FinancesComptaPeriod: React.FC<Ajout_utiliformprops> = ({}) => {
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
                  {seg == "Par_produits" ? (
                    <FinancesComptaPeriodArt dateactu={dateactu} />
                  ) : null}
                  {seg == "Global" ? (
                    <FinancesComptaPeriodGlob dateactu={dateactu} />
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
                  {seg == "Par_produits" ? (
                    <FinancesComptaPeriodArt dateactu={dateactu} />
                  ) : null}
                  {seg == "Global" ? (
                    <FinancesComptaPeriodGlob dateactu={dateactu} />
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

export const FinancesComptaPeriodArt: React.FC<Ajout_utiliformpropsone> = ({
  dateactu,
}) => {
  const router = useIonRouter();

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

  const recup_date_server = () => {
    axios
      .get("https://backendtrader.digitalfirst.space/date_time")
      .then((res) => {
        // setdateserveur(res.data[0].time_actu);
        setDatedebut(format(Date.parse(res.data[0].time_actu), "yyyy-MM-dd"));
        setDatefin(format(Date.parse(res.data[0].time_actu), "yyyy-MM-dd"));
      });
  };

  const vtotalsold = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    // console.log(comm.every((t:any)=>t.id === 8));
    // article.filter((t:any)=>t.id == a)).map((e: any) => e.total_sold).reduce((prev: any, curr: any) => prev + curr, 0
    setTotalvendu(
      commart
        .filter(
          (t: any) =>
            t.product_id == a &&
            t.status_id_command == 3 &&
            // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
            format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
            format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.product_quantity)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };

  const vbenef = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    let prixun = article.filter((t: any) => t.id == a)[0].cost;

    let mtotalv = commart
      .filter(
        (t: any) =>
          t.product_id == a &&
          t.status_id_command == 3 &&
          // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          format(new Date(t.command_date), "yyyy-MM-dd") <= c
      )
      .map((e: any) => e.total_price)
      .reduce((prev: any, curr: any) => prev + curr, 0);

    let totalv = commart
      .filter(
        (t: any) =>
          t.product_id == a &&
          t.status_id_command == 3 &&
          // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
          format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
          format(new Date(t.command_date), "yyyy-MM-dd") <= c
      )
      .map((e: any) => e.product_quantity)
      .reduce((prev: any, curr: any) => prev + curr, 0);

    setBenefice(mtotalv - prixun * totalv);
  };

  const vmontotalv = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    setMontotalvendu(
      commart
        .filter(
          (t: any) =>
            t.product_id == a &&
            t.status_id_command == 3 &&
            // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
            format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
            format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.total_price)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
    // commart.indexOf
  };

  const vtotalapprov = (
    a: any | React.SetStateAction<any>,
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    setTotalapprov(
      approv
        .filter(
          (t: any) =>
            t.product_id == a &&
            // format(new Date(t.date), "yyyy-MM-dd") == dateactu
            format(new Date(t.date), "yyyy-MM-dd") >= b &&
            format(new Date(t.date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.stock_appro)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);

  useEffect(() => {
    recup_date_server();
  }, []);

  return (
    <>
      {" "}
      <IonList>
        <div className="">
          <IonItem lines="none">
            <IonLabel position="stacked">
              <h2 className="labh">Date de début</h2>
            </IonLabel>
            <IonInput
              color="success"
              className="border-1 rounded-sm shadow-md border-x-stone-400"
              type="date"
              value={datedebut}
              onIonChange={(e) => {
                setDatedebut(format(new Date(e.detail.value!), "yyyy-MM-dd"));
                vtotalsold(produit, e.detail.value, datefin);
                vmontotalv(produit, e.detail.value, datefin);
                vbenef(produit, e.detail.value, datefin);
                vtotalapprov(produit, e.detail.value, datefin);
              }}
            ></IonInput>
          </IonItem>
          <IonItem lines="none" className="ion-margin-top">
            <IonLabel position="stacked">
              <h2 className="labh">Date de fin</h2>
            </IonLabel>
            <IonInput
              color="danger"
              className="border-1 rounded-sm shadow-md border-x-stone-400"
              type="date"
              value={datefin}
              onIonChange={(e) => {
                setDatefin(format(new Date(e.detail.value!), "yyyy-MM-dd"));
                vtotalsold(produit, datedebut, e.detail.value);
                vmontotalv(produit, datedebut, e.detail.value);
                vbenef(produit, datedebut, e.detail.value);
                vtotalapprov(produit, datedebut, e.detail.value);
              }}
            ></IonInput>
          </IonItem>
          <IonItem className="ion-margin-top" lines="none">
            <IonLabel position="floating">Produits</IonLabel>
            <IonSelect
              value={produit}
              placeholder="Selectionnez un produit"
              onIonChange={(e) => {
                setProduit(e.detail.value);
                vtotalsold(e.detail.value, datedebut, datefin);
                vbenef(e.detail.value, datedebut, datefin);
                vmontotalv(e.detail.value, datedebut, datefin);
                vtotalapprov(e.detail.value, datedebut, datefin);
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
            {/* <div className="mt-2"></div>
        <div className="md:w-full">
          <LineChart />
        </div> */}
            {/* <div className="mt-2"></div>
            <div className="md:w-full">
              <Stacked />
            </div> */}
            {/* <div className="mt-2"></div>
            <div className="md:w-full">
              <Chart
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
              />
            </div> */}
          </div>
          {/* <IonItem>
        <IonButton
          onClick={(e) => {
            regroupjour(produit, datedebut, datefin)
          }}
        >
          ddf
        </IonButton>
      </IonItem> */}
        </div>
      </IonList>
    </>
  );
  // return choiceacces === "aucun" || choiceacces === "principal" ? (
  //   <>
  //     {" "}
  //     <IonList>
  //       <div className="">
  //         <IonItem lines="none">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de début</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="success"
  //             type="date"
  //             value={datedebut}
  //             onIonChange={(e) => {
  //               setDatedebut(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(produit, e.detail.value, datefin);
  //               vmontotalv(produit, e.detail.value, datefin);
  //               vbenef(produit, e.detail.value, datefin);
  //               vtotalapprov(produit, e.detail.value, datefin);
  //             }}
  //           ></IonInput>
  //         </IonItem>
  //         <IonItem lines="none" className="ion-margin-top">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de fin</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="danger"
  //             type="date"
  //             value={datefin}
  //             onIonChange={(e) => {
  //               setDatefin(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(produit, datedebut, e.detail.value);
  //               vmontotalv(produit, datedebut, e.detail.value);
  //               vbenef(produit, datedebut, e.detail.value);
  //               vtotalapprov(produit, datedebut, e.detail.value);
  //             }}
  //           ></IonInput>
  //         </IonItem>
  //         <IonItem className="ion-margin-top" lines="none">
  //           <IonLabel position="floating">Produits</IonLabel>
  //           <IonSelect
  //             value={produit}
  //             placeholder="Selectionnez un produit"
  //             onIonChange={(e) => {
  //               setProduit(e.detail.value);
  //               vtotalsold(e.detail.value, datedebut, datefin);
  //               vbenef(e.detail.value, datedebut, datefin);
  //               vmontotalv(e.detail.value, datedebut, datefin);
  //               vtotalapprov(e.detail.value, datedebut, datefin);
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
  //     </IonList>
  //   </>
  // ) : (
  //   <>
  //     {" "}
  //     <IonList>
  //       <div className="">
  //         <IonItem lines="none">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de début</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="success"
  //             type="date"
  //             value={datedebut}
  //             onIonChange={(e) => {
  //               setDatedebut(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(produit, e.detail.value, datefin);
  //               vmontotalv(produit, e.detail.value, datefin);
  //               vbenef(produit, e.detail.value, datefin);
  //               vtotalapprov(produit, e.detail.value, datefin);
  //             }}
  //           ></IonInput>
  //         </IonItem>
  //         <IonItem lines="none" className="ion-margin-top">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de fin</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="danger"
  //             type="date"
  //             value={datefin}
  //             onIonChange={(e) => {
  //               setDatefin(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(produit, datedebut, e.detail.value);
  //               vmontotalv(produit, datedebut, e.detail.value);
  //               vbenef(produit, datedebut, e.detail.value);
  //               vtotalapprov(produit, datedebut, e.detail.value);
  //             }}
  //           ></IonInput>
  //         </IonItem>
  //         <IonItem className="ion-margin-top" lines="none">
  //           <IonLabel position="floating">Produits</IonLabel>
  //           <IonSelect
  //             value={produit}
  //             placeholder="Selectionnez un produit"
  //             onIonChange={(e) => {
  //               setProduit(e.detail.value);
  //               vtotalsold(e.detail.value, datedebut, datefin);
  //               vbenef(e.detail.value, datedebut, datefin);
  //               vmontotalv(e.detail.value, datedebut, datefin);
  //               vtotalapprov(e.detail.value, datedebut, datefin);
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
  //     </IonList>
  //   </>
  // );
};

interface Ajout_utiliformpropsglob {
  dateactu: String;
}

export const FinancesComptaPeriodGlob: React.FC<Ajout_utiliformpropsglob> = ({
  dateactu,
}) => {
  const router = useIonRouter();
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
  const choiceacces = useSelector((state: any) => state.Hash.choiceacces);

  const recup_date_server = () => {
    axios
      .get("https://backendtrader.digitalfirst.space/date_time")
      .then((res) => {
        // setdateserveur(res.data[0].time_actu);
        setDatedebut(format(Date.parse(res.data[0].time_actu), "yyyy-MM-dd"));
        setDatefin(format(Date.parse(res.data[0].time_actu), "yyyy-MM-dd"));
      });
  };
  const vtotalsold = (
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    // console.log(comm.every((t:any)=>t.id === 8));
    // article.filter((t:any)=>t.id == a)).map((e: any) => e.total_sold).reduce((prev: any, curr: any) => prev + curr, 0
    setTotalvendu(
      commart
        .filter(
          (t: any) =>
            // t.product_id == a &&
            t.status_id_command == 3 &&
            // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
            format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
            format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.product_quantity)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };

  const vbenef = (
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
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
            // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
            format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
            format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.total_price)
        .reduce((prev: any, curr: any) => prev + curr, 0);

      totalv = commart
        .filter(
          (t: any) =>
            t.product_id == article[i].id &&
            t.status_id_command == 3 &&
            // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
            format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
            format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.product_quantity)
        .reduce((prev: any, curr: any) => prev + curr, 0);

      // setBenefice(mtotalv - prixun*totalv + benefice);
      ben = mtotalv - prixun * totalv + ben;
      // console.log(ben);
    }
    setBenefice(ben);
  };

  const vmontotalv = (
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    setMontotalvendu(
      commart
        .filter(
          (t: any) =>
            // t.product_id == a &&
            t.status_id_command == 3 &&
            // format(new Date(t.command_date), "yyyy-MM-dd") == dateactu
            format(new Date(t.command_date), "yyyy-MM-dd") >= b &&
            format(new Date(t.command_date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.total_price)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
    // commart.indexOf
  };

  const vtotalapprov = (
    b: any | React.SetStateAction<any>,
    c: any | React.SetStateAction<any>
  ) => {
    setTotalapprov(
      approv
        .filter(
          (t: any) =>
            // t.product_id == a &&
            // format(new Date(t.date), "yyyy-MM-dd") == dateactu
            format(new Date(t.date), "yyyy-MM-dd") >= b &&
            format(new Date(t.date), "yyyy-MM-dd") <= c
        )
        .map((e: any) => e.stock_appro)
        .reduce((prev: any, curr: any) => prev + curr, 0)
    );
  };

  useEffect(() => {recup_date_server()}, []);

  return (
    <>
      {" "}
      <IonList>
        <div className="">
          <IonItem lines="none">
            <IonLabel position="stacked">
              <h2 className="labh">Date de début</h2>
            </IonLabel>
            <IonInput
              color="success"
              type="date"
              className="border-1 rounded-sm shadow-md border-x-stone-400"
              value={datedebut}
              onIonChange={(e) => {
                setDatedebut(format(new Date(e.detail.value!), "yyyy-MM-dd"));
                vtotalsold(e.detail.value, datefin);
                vmontotalv(e.detail.value, datefin);
                vbenef(e.detail.value, datefin);
                vtotalapprov(e.detail.value, datefin);
              }}
            ></IonInput>
          </IonItem>
          <IonItem lines="none" className="ion-margin-top">
            <IonLabel position="stacked">
              <h2 className="labh">Date de fin</h2>
            </IonLabel>
            <IonInput
              color="danger"
              type="date"
              className="border-1 rounded-sm shadow-md border-x-stone-400"
              value={datefin}
              onIonChange={(e) => {
                setDatefin(format(new Date(e.detail.value!), "yyyy-MM-dd"));
                vtotalsold(datedebut, e.detail.value);
                vmontotalv(datedebut, e.detail.value);
                vbenef(datedebut, e.detail.value);
                vtotalapprov(datedebut, e.detail.value);
              }}
            ></IonInput>
          </IonItem>
          {/* <IonItem className="ion-margin-top" lines="none">
    <IonLabel position="floating">Produits</IonLabel>
    <IonSelect
      value={produit}
      placeholder="Selectionnez un produit"
      onIonChange={(e) => {
        setProduit(e.detail.value);
        vtotalsold(e.detail.value
          , datedebut, datefin
          );
        vbenef(e.detail.value
          , datedebut, datefin
          );
        vmontotalv(e.detail.value
          , datedebut, datefin
          );
        vtotalapprov(e.detail.value
          , datedebut, datefin
          );
      }}
    >
      {article.map((card: any, index: any) => {
        return (
          <IonSelectOption value={card.id}>
            {card.name}
          </IonSelectOption>
        );
      })}
    </IonSelect>
  </IonItem> */}

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
            {/* <div className="mt-2"></div>
    <div className="md:w-full">
      <LineChart />
    </div> */}
            {/* <div className="mt-2"></div>
        <div className="md:w-full">
          <Stacked />
        </div> */}
            {/* <div className="mt-2"></div>
        <div className="md:w-full">
          <Chart
            id="pie-chart"
            data={ecomPieChartData}
            legendVisiblity={false}
          />
        </div> */}
          </div>
          {/* <IonItem>
      <IonButton
        onClick={(e) => {
          // regroupjour(produit, datedebut, datefin)
          window.location.href = "/FinancesCompta"
        }}
      >
        Rafraichir
      </IonButton>
    </IonItem> */}
        </div>
      </IonList>
    </>
  );
  // return choiceacces === "aucun" || choiceacces === "principal" ? (
  //   <>
  //     {" "}
  //     <IonList>
  //       <div className="">
  //         <IonItem lines="none">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de début</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="success"
  //             type="date"
  //             value={datedebut}
  //             onIonChange={(e) => {
  //               setDatedebut(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(e.detail.value, datefin);
  //               vmontotalv(e.detail.value, datefin);
  //               vbenef(e.detail.value, datefin);
  //               vtotalapprov(e.detail.value, datefin);
  //             }}
  //           ></IonInput>
  //         </IonItem>
  //         <IonItem lines="none" className="ion-margin-top">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de fin</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="danger"
  //             type="date"
  //             value={datefin}
  //             onIonChange={(e) => {
  //               setDatefin(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(datedebut, e.detail.value);
  //               vmontotalv(datedebut, e.detail.value);
  //               vbenef(datedebut, e.detail.value);
  //               vtotalapprov(datedebut, e.detail.value);
  //             }}
  //           ></IonInput>
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
  //     </IonList>
  //   </>
  // ) : (
  //   <>
  //     {" "}
  //     <IonList>
  //       <div className="">
  //         <IonItem lines="none">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de début</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="success"
  //             type="date"
  //             value={datedebut}
  //             onIonChange={(e) => {
  //               setDatedebut(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(e.detail.value, datefin);
  //               vmontotalv(e.detail.value, datefin);
  //               vbenef(e.detail.value, datefin);
  //               vtotalapprov(e.detail.value, datefin);
  //             }}
  //           ></IonInput>
  //         </IonItem>
  //         <IonItem lines="none" className="ion-margin-top">
  //           <IonLabel position="stacked">
  //             <h2 className="labh">Date de fin</h2>
  //           </IonLabel>
  //           <IonInput
  //             color="danger"
  //             type="date"
  //             value={datefin}
  //             onIonChange={(e) => {
  //               setDatefin(format(new Date(e.detail.value!), "yyyy-MM-dd"));
  //               vtotalsold(datedebut, e.detail.value);
  //               vmontotalv(datedebut, e.detail.value);
  //               vbenef(datedebut, e.detail.value);
  //               vtotalapprov(datedebut, e.detail.value);
  //             }}
  //           ></IonInput>
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
  //     </IonList>
  //   </>
  // );
};
