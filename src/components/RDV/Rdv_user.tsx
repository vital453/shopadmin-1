import { calculatorOutline, calendarOutline, camera, personCircle, personSharp, refreshOutline, } from "ionicons/icons";
import { useEffect, useState, useRef } from "react";
import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonItemDivider, IonItem, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons, IonDatetime, IonAccordion, IonAccordionGroup, IonModal, } from "@ionic/react";
import "../Patient/ModalExample1.css";
import { arrowBack, addCircle } from "ionicons/icons";
import { IonSearchbar } from "@ionic/react";
import { Tableau1 } from "../Tableau1";
import { ModalExample } from './ModalExample';
import { Modaldeta_rdv } from "./Modaldeta_rdv";
import Axios from 'axios'

interface list_rdv_user {
    id: number;
}
export const ggtt = () =>{

    return(
        10
    )
}
export const Rdv_user: React.SFC<list_rdv_user> = ({ id }) => {
    const [groupe, setGroupe] = useState();

    const redig = () => {
        { window.location.href = "/" }
    }

    const [showmodal, setShowmodal] = useState(false)
    const toogle = () => { setShowmodal(!showmodal) }
    const [donner, setDonner] = useState(Tableau1)
    const [rdvlist, setRdvlist] = useState<any[]>([]);
    const [ids, setId] = useState<number>(0);
    const ggt = ['bvhb', 'hnvbn']
    let date = useRef<HTMLIonDatetimeElement>(null);
    let heur = useRef<HTMLIonDatetimeElement>(null);

    const getlistrdv = () => {
        Axios.post('https://backend-medical.benindigital.com/affichelistrdvpatient', {
            id: id,
        }).then((ret) => {
            setRdvlist(ret.data);
            console.log(ret.data);
            //  console.log(rdvlist);
        })
    };
    const recherche = (a: [] | React.SetStateAction<any>) => {
        Axios.post('https://backend-medical.benindigital.com/rechercherlistrdv', { nom: a }).then((response) => {

            setRdvlist(response.data);

        })
    };
    useEffect(() => {
        getlistrdv()
        console.log(id);
        
    }, [])
    return (
        <div className="mad1">
            <IonList>
                <div className="mad2">
                    <IonToolbar>
                        <IonSearchbar
                        // onIonChange={e => { recherche(e.detail.value) }}
                         ></IonSearchbar>
                    </IonToolbar>
                    {/* <h3>{id}</h3> */}
                </div>
                <div className="mad2">
                    <IonList>

                        {rdvlist.map((val, key, gh) => {
                            return (
                                <IonItem
                                    onClick={() => { setShowmodal(true); setId(val.idRdv); }}
                                    
                                >
                                    <IonLabel>
                                        <h2>NOM</h2>
                                        <p>{val.nomPatient}</p>
                                    </IonLabel>
                                    <IonLabel>
                                        <h2>Prenom</h2>
                                        <p> {val.prenomPatient}</p>
                                    </IonLabel>
                                    <IonLabel>
                                        <h2>Date</h2>
                                        <p>{val.dateRdv}</p>
                                    </IonLabel>
                                    <IonLabel>
                                        <h2>Date</h2>
                                        <p>{val.heureRdv}</p>
                                    </IonLabel>
                                </IonItem>
                            )
                        })}
                    </IonList>
                </div>
            </IonList>
            <IonModal
                isOpen={showmodal}
                onDidDismiss={() => {
                    setShowmodal(false)
                }}
            >
                <Modaldeta_rdv
                    onclose={() => { setShowmodal(false) }}
                    id={ids}
                />

            </IonModal>
        </div >
    )
};