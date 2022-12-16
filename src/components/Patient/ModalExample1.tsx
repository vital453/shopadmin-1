import {
    IonCol,
    IonModal,
    IonListHeader,
    IonRadio,
    IonTextarea,
    IonThumbnail,
    IonAvatar,
    IonSelectOption,
    IonPage,
    IonItemDivider,
    IonSelect,
    IonRadioGroup,
    IonGrid,
    IonInput,
    IonRow,
    IonAlert,
} from "@ionic/react";
import {
    calculatorOutline,
    camera,
    personCircle,
    personSharp,
    refreshOutline,
} from "ionicons/icons";
import "../Patient/ModalExample1.css";

import { IonButtons, IonHeader } from "@ionic/react";
import { IonButton } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { arrowBack, addCircle } from "ionicons/icons";
import { IonContent } from "@ionic/react";
import { IonApp } from "@ionic/react";
import { IonList } from "@ionic/react";
import { IonItem } from "@ionic/react";
import { IonLabel } from "@ionic/react";
import { IonToolbar } from "@ionic/react";
import { IonTitle } from "@ionic/react";
import { IonSearchbar } from "@ionic/react";
import { useEffect, useState } from "react";
import '../Patient/inscrippat.css'
import Axios from 'axios'
interface Ajout_utiliformprops {
    onclose: () => void;
    // tab: {

    //     idPatient: string,
    //     nom: string,
    //     prenom: string,
    //     sexe: string,
    //     groupeSanguin: string,
    //     nomClinique: string,
    //     telephone1: string,
    //     telephone2: string,
    //     poids: string,
    //     ville: string,
    //     quartier: string,
    //     maison: string,
    //     remarques: string,
    //     taille: string,
    //     Matricule: string,
    //   }[];
    nom: String;
    prenom: String;
    age: String;
    sexe: String;
    groupeS: String;
    telephone: String;
    remarque: String;
    nomCli: String,
    adresse: String,
    antecedant: String,
    datenaissance: String, 
    id: number;

}

export const ModalExample1: React.SFC<Ajout_utiliformprops> = ({
    onclose,
    nom,
    prenom,
    age,
    sexe,
    groupeS,
    telephone,
    remarque,
    nomCli,
    adresse,
    antecedant,
    datenaissance,
    id,
}) => {
    // const [donner1, setDonner1] = useState(ondetail())
    const [clinique, setClinique] = useState("Clinique A");
    const [groupe, setGroupe] = useState("A");
    // const [newNom, setNewnom] = useState<String | undefined>(nom);
    // const [newPrenom, setNewprenom] = useState(prenom);
    const [patient, setPatientlist] = useState<any[]>([]);
    const getdetpat = () => {
        Axios.post('https://backend-medical.benindigital.com/affichedetpatient', {
            id: id,
        }).then((ret) => {
            setPatientlist(ret.data);
        })

    };
    const suppression = (ide: [] | React.SetStateAction<any>) => {

        Axios.delete(`https://backend-medical.benindigital.com/deletepat/${ide}`);
        alert('Elément supprimé')
        { window.location.href = "/listepat" }
    }
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur    
        getdetpat()
        console.log(id);
        console.log(patient);

    }, []);
    const redig = () => {
        { window.location.href = `/ajoutpat/${id}` }
    }
    const redige = () => {
        { window.location.href = `/new_rdv/${id}` }
    }
    const rediger = () => {
        { window.location.href = `/NouvvDiag/${id}` }
    }
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color="primary">
                        <IonTitle>Details Patient</IonTitle>
                        <IonButtons slot="start">
                            <IonButton
                                onClick={() => {
                                    onclose();
                                }}
                            >
                                <IonIcon
                                    style={{ fontSize: "30px" }}
                                    icon={arrowBack}
                                    color=""
                                />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList lines="full" class="ion-no-margin">
                        <IonItem>
                            <h5>
                                <IonIcon style={{ fontSize: "62px" }} icon={personCircle} />
                            </h5>
                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Nom</h5>
                                </div>
                                <div className="op">
                                    {/* <p>{tab[id].nom}</p> */}
                                    <p>{nom}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5 >Prenom</h5>
                                </div>
                                <div className="op">
                                    <p>{prenom}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5 >Date de naissance</h5>
                                </div>
                                <div className="op">
                                    <p>{datenaissance.split("T")[0]}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5 >Age</h5>
                                </div>
                                <div className="op">
                                    {/* <p>{tab[id].age}</p> */}
                                    <p>{age}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5 >Sexe</h5>
                                </div>
                                <div className="op">
                                    {/* <p>{tab[id].sexe}</p> */}
                                    <p>{sexe}</p>
                                </div>
                            </div>


                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Groupe Sanguin</h5>
                                </div>
                                <div className="op">
                                    {/* <p>{tab[id].groupeSanguin}</p> */}
                                    <p>{groupeS}</p>
                                </div>
                            </div>

                        </IonItem>

                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Telephone</h5>
                                </div>
                                <div className="op">
                                    {/* <p>{tab[id].telephone1}</p> */}
                                    <p>{telephone}</p>
                                </div>
                            </div>
                        </IonItem>

                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Adresse</h5>
                                </div>
                                <div className="op">
                                    {/* <p>{tab[id].telephone1}</p> */}
                                    <p>{adresse}</p>
                                </div>
                            </div>
                        </IonItem>

                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Antécédant médicaux</h5>
                                </div>
                                <div className="op">
                                    {/* <p>{tab[id].remarques}</p> */}
                                    <p>{antecedant}</p>
                                </div>
                            </div>
                        </IonItem>
                        <div className="lop14">
                            <IonItem lines="full" class="ion-margin-top">
                                <IonCol>
                                    <IonButton
                                        // routerLink={`/new_rdv/${id}`}

                                        onClick={() => { rediger() }}
                                    >Nouveau Diagnostic</IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color="success"
                                        //   routerLink={`/ajoutpat/${id}`} 
                                        onClick={() => { redig() }}
                                    // onClick={()=>{console.log(id)}}
                                    >Editer</IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color="danger" onClick={e => { suppression(id) }}>Supprimer</IonButton>
                                </IonCol>
                            </IonItem>
                        </div>

                    </IonList>
                </IonContent>
            </IonApp>
        </>
    );
};
