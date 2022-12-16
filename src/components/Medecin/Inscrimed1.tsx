import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import { calculatorOutline, personCircle, personSharp, refreshOutline, arrowBack, camera } from 'ionicons/icons';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { useCamera } from '@ionic/react-hooks/camera'
import '../Medecin/inscripmed.css';
import { Tableau1 } from "../Tableau1";
import Axios from 'axios'

const Inscrimed1: React.FC<{}> = () => {
    const [groupe, setGroupe] = useState();
    const [clinique, setClinique] = useState();
    const [idantt, setIdantt] = useState (parseInt( window.location.pathname.split("/")[2]));
    const [newNom, setNewnom] = useState<any>();
    const [newPrenom, setNewprenom] = useState<any>();
    const [age, setAge] = useState<any>();
    const [sexe, setSexe] = useState<any>();
    const [nomcli, setNomcli] = useState<any>();
    const [idcli, setIdcli] = useState<any>();
    const [adresse, setAdresse] = useState<any>();
    const [specialite, setSpecialite] = useState<any>();
    const [telephone, setTelephone] = useState<any>();
    const redig= () =>{
      {window.location.href="/listemed"}
    }
    const { photo, getPhoto } = useCamera();

    const rec = () => {
        Axios.post('https://backend-medical.benindigital.com/recupmed', {id : idantt}).then((response)=>{
                
                console.log(response.data[0]);
                setNewnom(response.data[0].nom);
                setNewprenom(response.data[0].prenom)
                setAge(response.data[0].age);
                setSexe(response.data[0].sexe);
                setAdresse(response.data[0].adresse);
                setNomcli(response.data[0].nomClinique);
                setSpecialite(response.data[0].specialite);
                setTelephone(response.data[0].telephone);
                setIdcli(response.data[0].idClinique)
                console.log(newNom);
        })
    }

    const maj= () =>{
            Axios.put('https://backend-medical.benindigital.com/majmed', {nom: newNom, prenom: newPrenom, age: age, sexe: sexe, adresse: adresse, idcli: idcli, nomcli: nomcli, specialite: specialite, telephone: telephone, id: idantt}).then((response)=>{
            alert('Elément mis à jour')
            {window.location.href="/listemed"}
            })
        
    };
    useEffect(()=>{
        const  id = window.location.pathname.split("/")[2]
        const idd = parseInt(id);
        console.log(id);
        console.log(Tableau1[idd]);
        setIdantt(idd)
        rec();
      },[])
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        <IonButtons slot="start">
                            <IonButton routerLink="/listemed">
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Modifier Medecin</IonTitle>

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
                                        <IonInput placeholder="" type="text" className="inscripmed"value={newNom} onIonChange={e => { setNewnom(e.detail.value) }}></IonInput>
                                    </IonCard>
                                </div>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Prenom</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" value={newPrenom} onIonChange={e => { setNewprenom(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Spécialité</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" value={specialite} onIonChange={e => { setSpecialite(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Age</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="number" className="inscripmed" value={age} onIonChange={e => { setAge(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Telephone</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="number" className="inscripmed" value={telephone} onIonChange={e => { setTelephone(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Quartier,Ville</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" value={adresse} onIonChange={e => { setAdresse(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="ion-text-center de">
                                <IonButton color='success' onClick={e => { maj() }}
                                >Modifier</IonButton>
                            </div>
                        </div>
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    )
};
export default Inscrimed1