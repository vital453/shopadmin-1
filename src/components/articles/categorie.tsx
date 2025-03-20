import Axios from "axios";
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
  IonCardSubtitle,
} from "@ionic/react";
import "./categorie.css";
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
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
import { Conteneur1 } from "../Conteneur1";
import { Conteneur } from "../conteneur";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
  vider,
  declien,
  deccont,
} from "../../Feature/PanierSlice";

import { IonReactRouter } from "@ionic/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface Ajout_utiliformprops {
  Id: number;
  Panier: [][];
}

const Categories: React.SFC<Ajout_utiliformprops> = ({ Id, Panier }) => {
  const [idant, setIdant] = useState<any>(
    parseInt(window.location.pathname.split("/")[2])
  );
  const [patient, setPatientlist] = useState<any[]>([]);
  const [article, setArticle] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [nomcat, setCat] = useState<any>("");
  const [idclinique, setClinique] = useState<any>(Id);
  const [nom, setNom] = useState<any>("");
  const [prenom, setPrenom] = useState<any>("");
  const [sexe, setSexe] = useState<any>("");
  const [age, setAge] = useState<any>(0);
  const [telephone1, setTelephone1] = useState<any>(0);
  const [telephone2, setTelephone2] = useState<any>(0);
  const [quartier, setQuartier] = useState<any>("Quartier");
  const [ville, setVille] = useState<any>("Ville");
  const [maison, setMaison] = useState<any>("Maison");
  const [adresse, setAdresse] = useState<any>("");
  let [antecedants, setAntecedants] = useState<any>(" ");
  let [date, setdate] = useState<any>("");
  const [remarque, setRemarque] = useState<any>(" ");
  const [idart, setIdart] = useState<any>(0);
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState<any>(
    useSelector((state: any) => state.panier.trigg)
  );

  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(-1, () => {
      dispatch(declien(0));
    });
  });

  const getartcat = () => {
    Axios.post("https://backendtrader.digitalfirst.space/articlecateg", {
      idcat: Id,
    }).then((ret) => {
      setArticle(ret.data);
    });
  };

  const getcat = () => {
    Axios.post("https://backendtrader.digitalfirst.space/recupcat", {
      id: Id,
    }).then((ret) => {
      setCategory(ret.data);
      setCat(ret.data[0].nom);
      console.log(ret.data[0].nom);
    });
  };

  const getArrivage = () => {
    fetch("https://backendtrader.digitalfirst.space/arrivage")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setArticle(data);
        setCat("Arrivage");
      });
  };
  const getPop = () => {
    fetch("https://backendtrader.digitalfirst.space/populaire")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setArticle(data);
        setCat("Populaire");
      });
  };

  const data = [
    {
      title: "Road",
      subtitle: "Long road",
      image: "/assets/1e.jpg",
    },
    {
      title: "Moun",
      subtitle: "Big mountains",
      image: "/assets/1e.jpg",
    },
    {
      title: "Unk",
      subtitle: "This is unknown",
      image: "/assets/1e.jpg",
    },
    {
      title: "Unk",
      subtitle: "This is unknown",
      image: "/assets/1e.jpg",
    },
  ];

  useEffect(() => {
    if (Id == 1000) {
      getPop();
    }

    if (Id == 2000) {
      getArrivage();
    }
    if (Id < 1000) {
      getartcat();
      getcat();
    }
  }, []);

  return (
    <>
      <IonContent fullscreen className="alice">
        <IonList lines="full" class="ion-no-margin hom" className="alice">
          <div className="homes">
            <IonToolbar className="ion-text-center div1 ">
              <div className="Titre">{nomcat}</div>
            </IonToolbar>
            <IonGrid className="div1">
              <IonRow>
                {article.map((card, index) => {
                  return (
                    <IonCol size="5.5" className="col">
                      <Conteneur
                        Nom={card.name}
                        Prix={card.price}
                        Id={card.id}
                        Stock={card.stock}
                        Ig={card.picture1}
                        quantifiable_product={card.quantifiable_product}
                        type_product={card.type_product}
                        Panier={Panier}
                      />
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          </div>
        </IonList>
      </IonContent>
    </>
  );
};

export default Categories;
