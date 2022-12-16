import React from 'react';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonApp, IonContent, IonList, IonItem, IonRow, IonCol, IonInput, IonGrid, IonLabel, IonMenuButton, IonThumbnail, IonAvatar, IonBadge, IonImg, IonItemOption, IonItemOptions, IonItemSliding, IonCardSubtitle, IonFooter, IonLoading, IonSpinner, IonModal, IonToast, IonProgressBar } from '@ionic/react';
import { arrowBack, arrowForward, checkmarkSharp, closeCircle, closeCircleOutline, informationCircle, trash, trashOutline, trashSharp } from 'ionicons/icons';
import 'swiper/scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper';
import './paniermodal.css'
import { PanierItem2 } from './PanierItem2'
import "./swip.css";
import { tab5 } from './PanierItem';
// import { RDVV } from '../../pages/Home';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, setProductPan, updateQuantity, dec, vider } from '../../Feature/PanierSlice';
import { viderApprovision, deleteApprovision, updateApprovisionQuant, recupApprovision } from '../../Feature/ApprovisionSlice';
import { recupProduct } from '../../Feature/ProductSlice';
import { recupApprovisionnement } from '../../Feature/ApprovisionnementSlice';


export const Tableau13 = (namet: boolean, prenomt: number) => [
    {
        Formation: namet,
        Cible: prenomt,
    }
];

export let tab4 = 12;

const aff = () => {
    setTimeout(() => { tab4 = 12 }, 500);
    tab4 = 14
}
export const atr = () => {
    console.log('er');
}

interface Ajout_utiliformprops {


    // nom: String;
    // prenom: String;

    Panier: [][];
    trigg: () => void;

}


const Panierapprov: React.SFC<Ajout_utiliformprops> = ({ Panier, trigg }) => {
    const [idant, setIdant] = useState(parseInt(window.location.pathname.split("/")[2]));
    // const [panier, setPanier] = useState<any[]>(useSelector((state:any) => state.panier.panier));
    const [showmodal, setShowmodal] = useState(false);

    const [totalquant, setTotalquant] = useState<number>(0);
    const [totalprix, setTotalprix] = useState<number>(0);
    const [invoice, setInvoice] = useState<any>();
    const [whatsapp, setWhatsapp] = useState<any>();
    const [sexe, setSexe] = useState('');
    const [trashed, setTrash] = useState(false);
    const [edited, setEdited] = useState(false);
    const [telephone2, setTelephone2] = useState(0);
    const [quartier, setQuartier] = useState("Quartier");
    const [ville, setVille] = useState("Ville");
    const [maison, setMaison] = useState("Maison");
    const [adresse, setAdresse] = useState("");
    let [antecedants, setAntecedants] = useState(" ");
    let [date, setdate] = useState("");
    const [remarque, setRemarque] = useState(' ');
    // const [commande, setCommande] = useState<any>();
    const [showLoading, setShowLoading] = useState(true);
    const [zer, setZer] = useState<any>(useSelector((state: any) => state.panier.panier));
    const [trigger, setTrigger] = useState<any>(useSelector((state: any) => state.panier.trigg))
    let panier = useSelector((state: any) => state.panier.panier);
    let approv = useSelector((state: any) => state.approvision.approvision);
    const [reclusia, setRec] = useState<any[]>([]);
    const [progress, setProgress] = useState(false);
    const Regex = /^\+229\d{8}$/;
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);
    const userid = useSelector((state:any) => state.auth.user);
    let commande: any = "";
    const dispatch = useDispatch();



    const getpan = () => {
        // fetch('https://backend-shop.benindigital.com/affichepanier').then((res) => {
        //     const data = res.json()    
        //     return data
        // }).then((data) => {                    
        //     setPanier(data);      
        //     setInvoice(data[0].invoice);
        // })
        setTotalquant(approv.map((e: any) => e.stock_appro).reduce((prev: any, curr: any) => prev + curr, 0));
        setTotalprix(approv.map((e: any) => e.total_price).reduce((prev: any, curr: any) => prev + curr, 0));

        for (var i = 0; i < approv.length; i++) {
            commande = [...commande, approv[i].product_name + 'x' + approv[i].product_quantity]
        }

    }



    const calc = () => {
        console.log(whatsapp);

        if (whatsapp.match(Regex)) {
            envoi1();
        } else {
            setShowToast1(true);

        }
    }

    const envoi1 = () => {

        if (approv.length > 0) {
            // Axios.post('https://backend-shop.benindigital.com/ajoutapprovList'
            setProgress(true)
            Axios.post('https://backend-shop.benindigital.com/ajoutapprovList', {
                approv: approv,
                tail: parseInt(approv.length),
                id_boutique: userid.BoutiqueId
            }).then((ret) => {
                console.log(ret.data);
                envoi(ret.data);
            })
        } else {
            setShowToast3(true);
        }
    }
    const suppr = () => {
        fetch('https://backend-shop.benindigital.com/supprpan', {
        }).then((data) => {
            if (data) {
            } else {
            }
        })
        getpan();
        aff()
    }


    const envoi = (ide: any | React.SetStateAction<any>) => {
        Axios.post('https://backend-shop.benindigital.com/ajoutapprov', {
            totalquant: totalquant,
            totalprix: totalprix,
            invoice: ide,
            id_boutique: userid.BoutiqueId
        }).then((ret) => {
            if (ret.data == 'suc') {
                console.log('Etape2 reussie');
                envoi3();

            } else {


            }
        })
    }

    const envoi3 = () => {
        Axios.post('https://backend-shop.benindigital.com/approv2', {
            approv: approv,
            tail: parseInt(approv.length),
            id_boutique: userid.BoutiqueId
        }).then((ret) => {
            if (ret.data == 'suc') {
                console.log('Approvisionnement effectué');
                setShowToast2(true);
                setProgress(false)
                dispatch(viderApprovision(''))
                refr();
            }
            console.log(ret.data);

        })
    }


    const refr = () => {
        Axios.post('https://backend-shop.benindigital.com/afficheart',{
            id_boutique: userid.BoutiqueId,
        }).then((ret)=>{
            dispatch(recupProduct(ret.data));
            console.log(ret.data);
            Axios.post('https://backend-shop.benindigital.com/afficheapprov',{
                id_boutique: userid.BoutiqueId,
            }).then((ret)=>{
                dispatch(recupApprovisionnement(ret.data));
            })
        })
       
    }



    useEffect(() => {
        getpan();


    }, []);

    useEffect(() => {
        getpan();
    }, [(trigger: any) => { }]);

    return (
        <>
            <IonContent fullscreen>
                <IonList lines="full" class="ion-no-margin">
                    <IonList>
                        {approv.map((val: any, key: any) => {
                            return (
                                <PanierItem2 Id={val.product_id}
                                    Stock={val.stock_preview}
                                    Add={val.stock_appro}
                                    Name={val.product_name}
                                    Unit={val.unite_price}
                                    Total={val.total_price}
                                    Ig={val.picture}
                                />
                            )
                        })}
                    </IonList>

                </IonList>
            </IonContent>
            <IonFooter className='cartFooter'>
                {progress ? (
                    <div>
                        <IonProgressBar className="prog" type="indeterminate"></IonProgressBar>
                    </div>
                ) : (
                    <div className='cartCheckout'>
                        <IonCardSubtitle>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "XOF" }).format(totalprix)}</IonCardSubtitle>
                        <IonButton color="dark" onClick={() => {
                            envoi1();
                            // console.log(approv);

                            // console.log(approv);

                            // setShowmodal(true)
                        }}>
                            <IonIcon icon={checkmarkSharp} />&nbsp;Approvisionner
                        </IonButton>
                    </div>
                )}

            </IonFooter>
            <IonModal
                isOpen={showmodal}
                onDidDismiss={() => { setShowmodal(false) }} initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
                <IonItem>
                    <IonLabel>Veuillez entrer votre whatsapp</IonLabel>
                </IonItem>
                <IonItem>
                    <IonCol>
                        <IonInput onIonChange={(e) => { setWhatsapp("+229" + e.detail.value) }}></IonInput>
                    </IonCol>
                    <IonCol size='3'>
                        <IonButton onClick={() => {
                            // setShowmodal(false)
                            calc();
                        }} size='small' color='secondary'>Valider</IonButton>
                    </IonCol>
                </IonItem>
            </IonModal>
            <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message="Veuillez entrer un numéro valide"
                icon={informationCircle}
                position="top"
                duration={3000}
            />

            <IonToast
                isOpen={showToast2}
                onDidDismiss={() => setShowToast2(false)}
                message="Approvisionnement effectué"
                icon={informationCircle}
                position="top"
                buttons={[
                    {
                        text: 'fermer',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }
                ]}
            />
            <IonToast
                isOpen={showToast3}
                onDidDismiss={() => setShowToast3(false)}
                message="Veuillez ajouter un produit"
                icon={informationCircle}
                position="top"
                duration={3000}
            />
        </>
    );
};

export default Panierapprov;








{/* <IonProgressBar className="prog" type="indeterminate"></IonProgressBar> */ }