import { IonApp, IonButton, IonCol,IonItem , IonContent, IonAvatar, IonSelectOption, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import { calculatorOutline, personCircle, personSharp, refreshOutline, arrowBack, camera } from 'ionicons/icons';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { useCamera } from '@ionic/react-hooks/camera'
import '../Medecin/inscripmed.css';
import { Tableau1 } from "../Tableau1";
import Axios from 'axios'



const Inscrisecret1: React.FC<{}> = () => {
    const [groupe, setGroupe] = useState();
    const [clinique, setClinique] = useState();
    const [idantt, setIdantt] = useState (parseInt(window.location.pathname.split("/")[2]));
    const [sec, setSecList] = useState<any[]>([]);
    const [newNom, setNewnom] = useState<any>('');
    const [newPrenom, setNewprenom] = useState<any>();
    const [age, setAge] = useState<any>();
    const [sexe, setSexe] = useState<any>();
    const [nomcli, setNomcli] = useState<any>();
    const [idcli, setIdcli] = useState<any>();
    const [adresse, setAdresse] = useState<any>();
    const [specialite, setSpecialite] = useState<any>();
    const [telephone, setTelephone] = useState<any>();
    const redig= () =>{
      {window.location.href="/"}
    }
    const { photo, getPhoto } = useCamera();

    const rec = () => {
        Axios.post('https://backend-medical.benindigital.com/recupsec', {id : idantt}).then((response)=>{
                
                setSecList(response.data);
                console.log(response.data[0]);
                setNewnom(response.data[0].nom);
                setNewprenom(response.data[0].prenom)
                setAge(response.data[0].age);
                setSexe(response.data[0].sexe);
                setAdresse(response.data[0].adresse);
                setNomcli(response.data[0].nomClinique);
                setTelephone(response.data[0].telephone);
                setIdcli(response.data[0].idClinique)
                console.log(newNom);
        })
    }

    const maj= () =>{
        if (newNom && newPrenom && sexe && age && telephone && adresse && nomcli && idcli ) {
            Axios.put('https://backend-medical.benindigital.com/majsec', {nom: newNom, prenom: newPrenom, age: age, sexe: sexe, adresse: adresse, idcli: idcli, nomcli: nomcli, telephone: telephone, id: idantt}).then((ret)=>{
                if (ret.data == 'suc') {
                    alert('Element modifier');
                    {window.location.href="/listesec"}
                    
                } else {
                    alert('Element non modifier');
                }
            })
        }
        else{
            alert('Vous devez indiquer tous les champs');
        }
    };

 
    useEffect(()=>{
        const  id = window.location.pathname.split("/")[2]
        const idd = parseInt(id);
       rec();   
      },[])
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
                        <IonTitle>Modifier secretaire</IonTitle>

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
                                        <IonInput placeholder="" type="text" className="inscripmed" value={newNom} onIonChange={e => { setNewnom(e.detail.value) }}></IonInput>
                                    </IonCard>
                                </div>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Prenom</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" value={newPrenom} onIonChange={e => { setNewnom(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                           
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Age</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="number" className="inscripmed"   value={age} onIonChange={e => { setAge(e.detail.value) }}></IonInput>
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
                                <IonButton color='success' onClick={e => { maj() }}>Modifier</IonButton>
                            </div>
                        </div>
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    )
};
export default Inscrisecret1