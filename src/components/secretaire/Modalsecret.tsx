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
import Axios from 'axios'
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
interface Ajout_utiliformprops {
    onclose: () => void;

    // nom: String;
    // prenom: String;
    id: String;

}

export const Modalsecret: React.SFC<Ajout_utiliformprops> = ({
    onclose,
    id,
}) => {
    // const [donner1, setDonner1] = useState(ondetail())
    const [clinique, setClinique] = useState("Clinique A");
    const [groupe, setGroupe] = useState("A");
    const [sec, setSecList] = useState<any[]>([]);
    const [newNom, setNewnom] = useState<string>('');
    const [newPrenom, setNewprenom] = useState<any>();
    const [age, setAge] = useState<any>();
    const [sexe, setSexe] = useState<any>();
    const [nomcli, setNomcli] = useState<any>();
    const [adresse, setAdresse] = useState<any>();
    const [specialite, setSpecialite] = useState<any>();
    const [telephone, setTelephone] = useState<any>();
    const redig = () => {
        { window.location.href = `/ajoutsec/${id}` }
    }

    const rec = () => {
        Axios.post('https://backend-medical.benindigital.com/recupsec', {id : id}).then((response)=>{
                
                setSecList(response.data);
                console.log(response.data[0]);
                setNewnom(response.data[0].nom);
                setNewprenom(response.data[0].prenom)
                setAge(response.data[0].age);
                setSexe(response.data[0].sexe);
                setAdresse(response.data[0].adresse);
                setClinique(response.data[0].nomClinique);
                setTelephone(response.data[0].telephone)
                console.log(newNom);
        })
    }

    const suppression=(ide : [] | React.SetStateAction<any>)=>{
       
        Axios.delete(`https://backend-medical.benindigital.com/deletesec/${ide}`);
        alert('Elément supprimé')
        {window.location.href="/listesec"}
    }

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
       rec();
    }, []);
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color="primary">
                        <IonTitle>Details Secretaire</IonTitle>
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
                                    <p>{newNom}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5 >Prenom</h5>
                                </div>
                                <div className="op">
                                    <p>{newPrenom}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5 >Age</h5>
                                </div>
                                <div className="op">
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
                                        <p>{sexe}</p>
                                    </div>
                            </div>


                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Téléphone</h5>
                                </div>
                                <div className="op">
                                    <p>{telephone}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Clinique</h5>
                                </div>
                                <div className="op">
                                    <p>{clinique}</p>
                                </div>
                            </div>

                        </IonItem>
                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Adresse</h5>
                                </div>
                                <div className="op">
                                    <p>{adresse}</p>
                                </div>
                            </div>
                        </IonItem>

                        
                        <IonItem className="ion-margin-top" lines="none">
                            <IonCol>
                                <IonButton color="success" 
                                routerLink={`/ajoutsec/${id}`}
                                onClick={()=>{redig()}}
                                >Editer</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color="danger" onClick={e => { suppression(id) }}>Supprimer</IonButton>
                            </IonCol>
                        </IonItem>
                                  
                                  

                        {/* <h5>
                  <h5>Nom</h5>
                  <p> {nom}</p>
                </h5>
                <h5>
                  <h5>Prenom</h5>
                  <p>{prenom}</p>
                </h5> */}
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    );
};
