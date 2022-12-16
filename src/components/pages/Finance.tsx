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
import { Conteneur1 } from "../Conteneur1";

interface Ajout_utiliformprops {
    // nom: String;
    // prenom: String;
}

// import { Swiper } from 'swiper/types';

// Import Swiper React components

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/scss'

export const Finance: React.FC<Ajout_utiliformprops> = ({ }) => {
    const data = [
        {
            title: "Bilan Journalier",
            subtitle: "FinancesCompta",
            dec: (e: any) => {
                // setShowmodal(e);
            },
            id: 1,
        },
        {
            title: "Bilan Périodique",
            subtitle: "FinancesComptaPeriode",
            dec: (e: any) => {
                // setShowmodal2(e)
            },
            id: 2,
        },
    ];
    const router = useIonRouter();
    let [dateactu, setDateactu] = useState(useSelector((state: any) => state.Hash.date_actu));
    useEffect(() => {
        console.log(dateactu);
    }, []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonRouterLink
                            routerLink={`/home`}
                            color="dark"
                        >
                            <IonButton
                                // onClick={() => {
                                //     router.goBack();
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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large" className="page-title">
                            <IonLabel>Finances </IonLabel>
                            {/* <IonNote>comptabilité</IonNote> */}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid className="flex items-center justify-center mt-52 ">
                    <IonRow>
                        {data.map((card, index) => {
                            return (
                                <IonCol
                                    key={index}
                                    onClick={() => {
                                        // { window.location.href = ` /home/${card.title} ` };
                                        card.dec(true);
                                    }}
                                >
                                    {/* {card.title} */}
                                    <IonRouterLink
                                        routerLink={`/${card.subtitle}`}
                                        color="dark"
                                    >
                                        <Conteneur1 Titre={card.title} Desc={card.subtitle} />
                                    </IonRouterLink>
                                </IonCol>
                            );
                        })}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}