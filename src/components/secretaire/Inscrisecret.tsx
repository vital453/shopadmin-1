import { IonApp, IonButton,IonItem, IonCol, IonContent, IonAvatar, IonSelectOption, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import { calculatorOutline, personCircle, personSharp, refreshOutline, arrowBack, camera } from 'ionicons/icons';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { useCamera } from '@ionic/react-hooks/camera'
import '../Medecin/inscripmed.css'
import Axios from 'axios'

const Inscrisecret: React.FC<{}> = () => {
    const [groupe, setGroupe] = useState();
    const [clinique, setClinique] = useState();
    const [clinik, setCliniklist] = useState<any[]>([]);
    const [nom, setNom] = useState<any>('ddd');
    const [prenom, setPrenom] = useState<any>();
    const [age, setAge] = useState<any>();
    const [sexe, setSexe] = useState<any>();
    const [telephone, setTelephone] = useState<any>();
    const [idcli, setIdcli] = useState<any>();
    const [nomcli, setNomcli] = useState<any>();
    const [adresse, setAdresse] = useState<any>();
    const redig = () => {
        { window.location.href = "/" }
    }
    const getcli = () => {
        Axios.get('https://backend-medical.benindigital.com/afficheclinique').then((response) => {
            setCliniklist(response.data);
        })
    }

    const ajout = () => {
        console.log(nom , prenom ,sexe , age , telephone , adresse , nomcli , idcli );
        
        if (nom && prenom && sexe && age && telephone && adresse && nomcli && idcli ) {
            Axios.post('https://backend-medical.benindigital.com/createsec', {
                nom: nom,
                prenom: prenom,
                sexe: sexe,
                age: age,
                idcli: idcli,
                nomcli: nomcli,
                telephone: telephone,
                adresse: adresse,

            }).then((ret) => {
                if (ret.data == 'suc') {
                    alert('Element enrégistré');
                    {window.location.href="/listesec"}
                    
                } else {
                    alert('Element non enrégistré');
                }
            })
        } else {
            alert('Vous devez indiquer tous les champs');
        }
    };


    const redcli = (a: [] | React.SetStateAction<any>) => {

        if (a.hasOwnProperty("nomClinique")) {
            console.log(a.nomClinique);
            setNomcli(a.nomClinique)
        } else {
            console.log('eee')
        }
        

    }

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        getcli();
    }, []);


    const { photo, getPhoto } = useCamera();
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        <IonButtons slot="start">
                            <IonButton routerLink="/listesec">
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Nouveau Secretaire</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonList lines="full" class="">
                        <div className="ion-padding-top ion-text-center">
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
                        </div>
                        <div className="shad">
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Nom</h1>
                                </div>
                                <div className="">
                                    <IonCard className="inscripmed">
                                        <IonInput placeholder="" type="text" className="inscripmed" onIonChange={e => { setNom(e.detail.value) }}></IonInput>
                                    </IonCard>
                                </div>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Prenom</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" onIonChange={e => { setPrenom(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Téléphone</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" onIonChange={e => { setTelephone(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Age</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="number" className="inscripmed" onIonChange={e => { setAge(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <IonRadioGroup value={sexe} onIonChange={(e) => { setSexe(e.detail.value) }}>
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
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Clinique</h1>
                                </div>
                                <IonCard>

                                    <IonSelect value={idcli} placeholder="Clinique" className="inscripmed"
                                        onIonChange={event => {
                                            setIdcli(event.detail.value); redcli(clinik.find(e => e.id_clinique == event.detail.value))}} >
                                        {clinik.map((val, key) => {
                                            return (
                                                <IonSelectOption value={val.id_clinique}>{val.nomClinique}</IonSelectOption>

                                            )
                                        })}


                                    </IonSelect>

                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Quartier,Ville</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" onIonChange={e => { setAdresse(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="ion-text-center de">
                                <IonButton color='success' onClick={e => { ajout() }}>Enregistrer</IonButton>
                                    
                            </div>
                        </div>
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    )
};
export default Inscrisecret