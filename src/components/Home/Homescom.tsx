import { ModalExample1 } from "./ModalExample1";
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
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import About from "./About";
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
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
import { Conteneur1 } from "../Conteneur1";
import { Conteneur } from "../conteneur";
// import { zer } from '../../pages/Nouv2';
import { SearchModal } from "./searchModal";
import { IonReactRouter } from "@ionic/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../articles/categorie";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
  vider,
  declien,
  deccont,
} from "../../Feature/PanierSlice";
import { recupCommande } from "../../Feature/CommandeSlice";

interface Ajout_utiliformprops {
  Panier: [][];
}

export const Homescom: React.SFC<Ajout_utiliformprops> = ({ Panier }) => {
  const [showmodal, setShowmodal] = useState(false);
  const [showmodal2, setShowmodal2] = useState(false);
  const [showmodal3, setShowmodal3] = useState(false);
  const [showmodal4, setShowmodal4] = useState(false);
  // const [article, setArticlelist] = useState<any[]>(useSelector((state: any) => state.product.product));
  const [objet1, setObjet1] = useState<any[] | unknown>(
    useSelector((state) => state)
  );
  // const [category, setCategoryList] = useState<any[]>([]);
  let panier = useSelector((state: any) => state.panier.panier);
  let lien = useSelector((state: any) => state.panier.lien);
  let article = useSelector((state: any) => state.product.product);
  const [velk, setVelk] = useState<any[]>(
    useSelector((state: any) => state.product.product)
  );
  const [alas, setAlas] = useState<any[]>(
    useSelector((state: any) => state.product.product)
  );
  const [disl, setDisl] = useState<any>(false);
  let category = useSelector((state: any) => state.product.categories);
  const [nom, setNom] = useState<String>("ee");
  const [prenom, setPrenom] = useState<String>("rr");
  const [age, setAge] = useState<any>(0);
  const [sexe, setSexe] = useState<String>("rr");
  const [groupee, setGroupee] = useState<String>("rr");
  const [nomCli, setNomCli] = useState<String>("rr");
  const [telephone, setTelephone] = useState<String>("rr");
  const [commandeRech, setCommandeRech] = useState<any>("rr");
  const [adresse, setAdresse] = useState<String>("rr");
  const [antecedant, setantecedant] = useState<String>("rr");
  const [datenaissance, setdatenaissance] = useState<String>("zaratras");
  const [id, setId] = useState<number>(0);
  const [nub, setNub] = useState<any>(8);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const loadData = (ev: any) => {
    setTimeout(() => {
      setNub(nub + 8)
      ev.target.complete();
    }, 500);
  }
  


  const getpatient = () => {};

  const getart = () => {
    fetch("https://backend-shop.benindigital.com/afficheart")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setVelk(data);
        setAlas(data);
      });
  };

  const change = (ide: any | React.SetStateAction<any>) => {
    setSearchText(ide);
    const query = ide.toLowerCase();

    setVelk(
      article.filter((t: any) =>
        t.name.toLowerCase().includes(ide.toLowerCase())
      )
    );
    // console.log(alas.filter((t:any) => t.name.toLowerCase().includes(ide.toLowerCase()))[0].name);
    // console.log(article.find((e:any)=>e.name == "zior")); Vérifie si le nom d'un élément == zior et renvoie sa ligne
    // console.log(article.every((e:any)=>e.id < 26));   Vérifie si tous les id sont < à 26 et renvoie un true si oui
  };

  const change2 = (ide: any | React.SetStateAction<any>) => {
    setSearchText(ide);
    const query = ide.toLowerCase();
    setVelk(
      article.filter((t: any) =>
        t.name.toLowerCase().includes(ide.toLowerCase())
      )
    );
    // console.log(alas.filter((t:any) => t.name.toLowerCase().includes(ide.toLowerCase()))[0].name);
    // console.log(article.find((e:any)=>e.name == "zior")); Vérifie si le nom d'un élément == zior et renvoie sa ligne
    // console.log(article.every((e:any)=>e.id < 26));   Vérifie si tous les id sont < à 26 et renvoie un true si oui
  };

  const getcat = () => {};

  const act = () => {};
  const redige = () => {
    {
      window.location.href = "/listepat";
    }
  };
  const rediger = () => {
    {
      window.location.href = "/diagnostic";
    }
  };

  useEffect(() => {
    getcat();

    // console.log(article);
  }, []);
  return (
    <div className="alice">
      <div className="div1">
        <IonHeader collapse="condense" mode="ios">
          <IonToolbar>
            <IonTitle size="large" className="page-title">
              <IonLabel>Votre </IonLabel>
              <IonNote>Boutique</IonNote>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList lines="full" class="ion-no-margin homes" className="alice">
          <div className="divcom">
            <IonSearchbar
              value={searchText}
              animated={true}
              placeholder="Rechercher un Produit"
              onIonChange={(e) => {
                setSearchText(e.detail.value!);
                change(e.detail.value!);
              }}
            ></IonSearchbar>
            <IonGrid className="grid1">
              <IonRow>
                {article[0] ? (
                  <>
                    {(article
                      .filter((t: any) =>
                        t.name.toLowerCase().includes(searchText.toLowerCase())
                      ).slice(0, nub))
                      .map((card: any, index: any) => {
                        return (
                          <IonCol key={index} className="dril">
                            <Conteneur
                              Nom={card.name}
                              Prix={card.price}
                              Id={card.id} 
                              Stock={card.stock}
                              Ig={card.picture1}
                              Panier={Panier}
                            />
                          </IonCol>
                        );
                      })}
                  </>
                ) : (
                  <>
                    <div className="items-center justify-center text-center">
                      <img
                        className=""
                        src="delai-de-traitement.png"
                        alt="d"
                      />
                      <h2 className="items-center justify-center text-center">
                        aucun article enrégistré
                      </h2>
                    </div>
                  </>
                )}
              </IonRow>
              <IonInfiniteScroll
                onIonInfinite={loadData}
                threshold="100px"
                disabled={isInfiniteDisabled}
              ><IonInfiniteScrollContent
                loadingSpinner="lines-sharp-small"
                loadingText="Chargement de données..."
              >
                </IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </IonGrid>
          </div>
        </IonList>
      </div>
      {/* <div className='aaa'></div> */}
    </div>
  );
};
