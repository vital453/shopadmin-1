import { IonApp, IonButton, IonItem, IonCol, IonContent, IonAvatar, IonSelectOption, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import { calculatorOutline, personCircle, personSharp, refreshOutline, arrowBack, camera } from 'ionicons/icons';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { useCamera } from '@ionic/react-hooks/camera'
import '../Medecin/inscripmed.css'
import Axios from 'axios'

const Inscrimed: React.FC<{}> = () => {
    const [groupe, setGroupe] = useState();
    const [clinique, setClinique] = useState();
    const [idspe, setIdspe] = useState('Gynecologue');
    const [specialite, setSpecialite] = useState<any[]>([]);
    const [clinik, setCliniklist] = useState<any[]>([]);
    const [cline, setCline] = useState<any[]>([]);
    let clin: any[] = [];
    const [nom, setNom] = useState<any>('ddd');
    const [prenom, setPrenom] = useState<any>();
    const [age, setAge] = useState<any>();
    const [sexe, setSexe] = useState<any>();
    const [telephone, setTelephone] = useState<number>();
    const [idcli, setIdcli] = useState<any>();
    const [nomcli, setNomcli] = useState<any>();
    const [spe, setSpe] = useState<any>();
    const [adresse, setAdresse] = useState<any>();
    const [gt, setGt] = useState('');
    const redig = () => {
        { window.location.href = "/" }
    }

    const ajout = () => {
        console.log(nom , prenom , sexe ,age , telephone , adresse , nomcli, idcli , spe);
        
        if (nom && prenom && sexe && age && telephone && adresse && nomcli && idcli && spe) {
            Axios.post('https://backend-medical.benindigital.com/createmed', {
                nom: nom,
                prenom: prenom,
                sexe: sexe,
                age: age,
                idcli: idcli,
                nomcli: nomcli,
                specialite: spe,
                telephone: telephone,
                adresse: adresse,

            }).then((ret) => {
                if (ret.data == 'suc') {
                    alert('Element enrégistré');
                    console.log(ret.data)
                } else {
                    alert('Element non enrégistré');
                }
            })
        } else {
            alert('Vous devez indiquer tous les champs');
        }
    };

    



    const spec = () => {
        Axios.get('https://backend-medical.benindigital.com/affichespecialite').then((response) => {
            setSpecialite(response.data);
        })
    }

    const getcli = () => {
        Axios.get('https://backend-medical.benindigital.com/afficheclinique').then((response) => {
            setCliniklist(response.data);
        })
    }

    const redspec = (b: [] | React.SetStateAction<any>) => {
        if (b.hasOwnProperty("nom")) {

            setSpe(b.nom)
            
        } else {
            console.log('eee')
        }
    }

    const spi = () => {

        console.log(telephone)
    }

    const redcli = (a: [] | React.SetStateAction<any>) => {
        console.log(a)

        if (a.hasOwnProperty("nomClinique")) {
            console.log(a.nom);
            setNomcli(a.nomClinique)
        } else {
            // console.log('eee')
        }

    }
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        spec();

        getcli();


    }, []);



    const { photo, getPhoto } = useCamera();
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
                        <IonTitle>Nouveau Medecin</IonTitle>

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
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Spécialité</h1>
                                </div>
                                <IonCard>

                                    <IonSelect value={idspe} placeholder="Specialité" className="inscripmed"
                                        onIonChange={event => {
                                             setIdspe(event.detail.value); redspec(specialite.find(e => e.id == event.detail.value)) }}>
                                        {specialite.map((val, key) => {
                                            return (
                                                <IonSelectOption value={val.id}>{val.nom}</IonSelectOption>
                                            )
                                        })}
                                    </IonSelect>

                                </IonCard>
                            </div>
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
                                    <h1 className="shadh1h">Age</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="number" className="inscripmed" onIonChange={e => { setAge(e.detail.value) }} ></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Telephone</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="number" className="inscripmed" onIonChange={e => { setTelephone(parseInt(''+e.detail.value)) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="shad1">
                                <div className="shad1h">
                                    <h1 className="shadh1h">Adresse</h1>
                                </div>
                                <IonCard>
                                    <IonInput placeholder="" type="text" className="inscripmed" onIonChange={e => { setAdresse(e.detail.value) }}></IonInput>
                                </IonCard>
                            </div>
                            <div className="ion-text-center de">
                                <IonButton color='success'
                                     routerLink="/listemed"
                                    onClick={event => {  ajout() }} >Enregistrer</IonButton>
                            </div>
                        </div>
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    )
};
export default Inscrimed