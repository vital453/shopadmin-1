import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import { arrowBack, calculatorOutline, camera, personCircle, personSharp, refreshOutline } from 'ionicons/icons';
import '../Patient/inscrippat.css';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { useCamera } from '@ionic/react-hooks/camera'
import { Tableau1 } from '../Tableau1';
import Axios from 'axios'

const Addpatrdv: React.FC = () => {


    const [idant, setIdant] = useState(parseInt(window.location.pathname.split("/")[2]));
    const { photo, getPhoto } = useCamera();
    const [groupe, setGroupe] = useState();
    const [idclinique, setClinique] = useState();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [sexe, setSexe] = useState('');
    const [age, setAge] = useState(0);
    const [telephone1, setTelephone1] = useState(0);
    const [telephone2, setTelephone2] = useState(0);
    const [quartier, setQuartier] = useState("Quartier");
    const [ville, setVille] = useState("Ville");
    const [maison, setMaison] = useState("Maison");
    const [remarque, setRemarque] = useState('');
    const [clinik, setCliniklist] = useState<any[]>([]);
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const appuie = () => {
        console.log(groupe, idclinique, nom, prenom, sexe, age, telephone1, telephone2, quartier, ville, maison, remarque);
    }
    const getcli = () => {
        Axios.get('https://backend-medical.benindigital.com/afficheclinique').then((response) => {
            setCliniklist(response.data);
        })
    }
    const redig = () => {
        { window.location.href = "/" }
    }

    const ajout = () => {
        if (nom && prenom && sexe && age && telephone1 && remarque && groupe && idclinique) {
            Axios.post('https://backend-medical.benindigital.com/createpatrdvglobe', {
                nom: nom,
                prenom: prenom,
                sexe: sexe,
                age: age,
                telephone1: telephone1,
                telephone2: telephone2,
                remarque: remarque,
                groupe: groupe,
                clinique: idclinique,
                quartier: quartier,
                ville: ville,
                maison: maison,
                idRdv:idant,
            }).then((ret) => {
                if (ret.data == 'suc') {
                    alert('Element enrégistré');
                    { window.location.href = "/listepat" }
                } else {
                    alert('Element non enrégistré');
                }
            })
        } else {
            alert('Les champs doivent contenir au moins 4 lettres');
        }
    };

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        getcli();
        console.log(clinik);
        console.log(idclinique);


    }, []);
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        <IonButtons slot="start">
                            <IonButton routerLink="/listepat">
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Nouveau patient</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonList lines="full" class="ion-no-margin">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonButton
                                        style={{ '--border-radius': '100%', width: '152px', height: '152px' }}
                                        onClick={() => getPhoto({
                                            resultType: CameraResultType.DataUrl,
                                            source: CameraSource.Camera,
                                            quality: 100
                                        })}
                                        color="medium"
                                    >
                                        {photo ? (
                                            <img style={{ width: '152px', height: '152px' }} src={`${photo.dataUrl}`} />
                                        ) : (
                                            <IonIcon style={{ fontSize: '72px' }} icon={camera} />
                                        )}
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating"><h2 className="labh">Nom</h2></IonLabel>
                                        <IonInput placeholder="" onIonChange={(e) => { setNom(e.detail.value!) }}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Prenom</IonLabel>
                                        <IonInput placeholder="" onIonChange={(e) => { setPrenom(e.detail.value!) }}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonRadioGroup value={sexe} onIonChange={(e) => { setSexe(e.detail.value!) }}>
                            <IonListHeader >
                                <IonLabel>SEXE</IonLabel>
                            </IonListHeader>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonItem lines='none'>
                                            <IonLabel>Femme</IonLabel>
                                            <IonRadio slot="start" color="warning" value="F" ></IonRadio>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol>
                                        <IonItem lines='none'>
                                            <IonLabel>Homme</IonLabel>
                                            <IonRadio slot="start" color="primary" value="M"></IonRadio>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonRadioGroup>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput placeholder="Age" type="number" onIonChange={(e) => { setAge(parseInt(e.detail.value!)) }}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonSelect value={groupe} placeholder="Votre groupe sanguin" onIonChange={e => setGroupe(e.detail.value)}>
                                            <IonSelectOption value="A+">A+</IonSelectOption>
                                            <IonSelectOption value="A-">A-</IonSelectOption>
                                            <IonSelectOption value="B+">B+</IonSelectOption>
                                            <IonSelectOption value="B-">B-</IonSelectOption>
                                            <IonSelectOption value="AB+">AB+</IonSelectOption>
                                            <IonSelectOption value="AB-">AB-</IonSelectOption>
                                            <IonSelectOption value="O+">O+</IonSelectOption>
                                            <IonSelectOption value="O-">O-</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                        {/* <IonSelect value={clinique} placeholder="Clinique" onIonChange={e => setClinique(e.detail.value)}>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
            </IonSelect> */}
                        <IonSelect value={idclinique} placeholder="Clinique" onIonChange={e => setClinique(e.detail.value)}>
                            {clinik.map((val, key) => {
                                return (
                                    <IonSelectOption value={val.id_clinique}>{val.nomClinique}</IonSelectOption>
                                )
                            })}
                        </IonSelect>
                        {/* {clinik.map((val, key) => {
              return (
                <p>{val.nomClinique}</p>
              )
            })} */}

                    </IonList>
                    <IonList lines="full" class="ion-no-margin">
                        <IonItem>
                            <IonLabel position="stacked">Coordonnées</IonLabel>
                            <IonInput placeholder="Téléphone 1" onIonChange={(e) => { setTelephone1(parseInt(e.detail.value!)) }}></IonInput>
                            <IonInput placeholder="Téléphone 2" onIonChange={(e) => { setTelephone2(parseInt(e.detail.value!)) }}></IonInput>
                            <IonInput placeholder="Ville" value={ville} onIonChange={(e) => { setVille(e.detail.value!) }}></IonInput>
                            <IonInput placeholder="Quartier" value={quartier} onIonChange={(e) => { setQuartier(e.detail.value!) }}></IonInput>
                            <IonInput placeholder="Maison" value={maison} onIonChange={(e) => { setMaison(e.detail.value!) }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Remarques</IonLabel>
                            <IonTextarea placeholder="placeholder" onIonChange={(e) => { setRemarque(e.detail.value!) }}></IonTextarea>
                        </IonItem>

                        <div className="ion-text-center de">
                            <IonButton color='success' onClick={() => { ajout() }}>Enregistrer</IonButton>
                        </div>
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    )
};
export default Addpatrdv;