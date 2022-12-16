import { useEffect, useState, useRef } from "react";
import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonItemDivider, IonItem, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons, IonDatetime, IonAccordion, IonAccordionGroup, IonMenuButton, } from "@ionic/react";
import { DatePicker } from 'rsuite';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';
import { arrowBack, calendar, calendarOutline, timeOutline, timerOutline, timerSharp } from 'ionicons/icons';
import { format, parseISO } from 'date-fns';
import '../Medecin/inscripmed.css';
import Axios from 'axios'
interface nouv_rdv {
    id: number;
}


export const Formrdv_nouv: React.FC<{}> = () => {

    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [typerdv, setTyperdv] = useState('');
    const [nommed, setMedecin] = useState();
    const [medecin, setMedecinlist] = useState<any[]>([]);
    const [nom, setNom] = useState<any>();
    const [prenom, setPrenom] = useState<any>();
    let date = useRef<HTMLIonDatetimeElement>(null);
    let heur = useRef<HTMLIonDatetimeElement>(null);

    const recup = () => {
        console.log(date.current!.value);
        console.log(heur.current!.value);
        let datee = date.current!.value?.split('T')[0];
        let heure = date.current!.value?.split('T')[1];
        let heure1 = heure?.split('+')[0]
        console.log(datee);
        console.log(heure1);
    };
    const getmed = () => {
        Axios.get('https://backend-medical.benindigital.com/affichemed').then((response) => {
            setMedecinlist(response.data);
        })
    }
    const ajoutrdv = () => {
        let datee = date.current!.value?.split('T')[0];
        let heure = date.current!.value?.split('T')[1];
        let heure1 = heure?.split('+')[0]
        console.log(nom, prenom, datee, heure1, typerdv, nommed);

        if (nom && prenom && datee && heure1 && typerdv && nommed) {
            Axios.post('https://backend-medical.benindigital.com/createrdvglo', {
                nom: nom,
                prenom: prenom,
                date: datee,
                heur: heure1,
                typerdv: typerdv,
                nommed: nommed,
            }).then((ret) => {
                if (ret.data == 'suc') {
                    alert('Rendez-vous pris avec succes');
                    { window.location.href = `/rdv` }
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
        getmed();
    }, []);
    return (
        <>
            <div>

                <IonApp>
                    <IonHeader translucent>
                        <IonToolbar color='primary'>
                            <IonButtons slot="start">
                                <IonButton routerLink='/rdv'>
                                    <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                                </IonButton>
                            </IonButtons>
                            <IonTitle>Nouveau Rendez-vous</IonTitle>
                            <IonButtons slot="end">
                                <IonMenuButton />
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <div className="mad1">
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                            {/* <h1 className="ion-text-center">Nouveau Rendez-vous</h1> */}
                            <IonList>
                                {/* <h3>Utilisateur indice {id}</h3> */}

                                <div className="modf">
                                    <IonAccordionGroup>
                                        <div className="ion-text-start modif2">
                                            <IonCard >
                                                <IonAccordion value="shapes">
                                                    <IonItem slot="header">
                                                        <IonIcon icon={calendarOutline} color="dark" />
                                                        <IonLabel>&emsp;&emsp;Choisir une date</IonLabel>
                                                    </IonItem>
                                                    <IonList slot="content">
                                                        <IonItem>
                                                            <IonDatetime ref={date} min="2022-01-01" presentation="date" class="ion-text-center"></IonDatetime>
                                                        </IonItem>
                                                    </IonList>
                                                </IonAccordion>
                                            </IonCard>
                                        </div>
                                        <div className="ion-text-start modif2">
                                            <IonCard >
                                                <IonAccordion value="shape">
                                                    <IonItem slot="header" >
                                                        <IonIcon icon={timerSharp} color="dark" />
                                                        <IonLabel>&emsp;&emsp;Heur du rendez-vous</IonLabel>
                                                    </IonItem>

                                                    <IonList slot="content" class="ion-text-center">
                                                        <IonItem>
                                                            <IonDatetime ref={heur} presentation="time" class="ion-text-center"></IonDatetime>
                                                        </IonItem>
                                                    </IonList>
                                                </IonAccordion>
                                            </IonCard>
                                        </div>
                                    </IonAccordionGroup>
                                    <div className="modif2">
                                        <IonRadioGroup value={typerdv} onIonChange={(e) => { setTyperdv(e.detail.value!) }} >
                                            <IonListHeader >
                                                <h1>Type de visite</h1>
                                            </IonListHeader>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonItem lines='none'>
                                                            <IonLabel>Consultation</IonLabel>
                                                            <IonRadio slot="start" color="primary" value="Consultation"></IonRadio>
                                                        </IonItem>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonItem lines='none'>
                                                            <IonLabel>Autres</IonLabel>
                                                            <IonRadio slot="start" color="danger" value="Autres"></IonRadio>
                                                        </IonItem>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </IonRadioGroup>
                                    </div>

                                </div>
                                {/* <IonItem>
                        <DatePicker />
                    </IonItem> */}
                                <div className="mad2 modif2">
                                    <IonCard >
                                        <IonItem>
                                            <IonLabel>Selectionner un médécin</IonLabel>
                                            <IonSelect value={nommed} placeholder="" onIonChange={e => setMedecin(e.detail.value)}>
                                                {medecin.map((val, key) => {
                                                    return (
                                                        <IonSelectOption value={val.nom}>{val.nom}</IonSelectOption>
                                                    )
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                    </IonCard>
                                </div>
                                <div className="mad2">
                                    <IonCard >
                                        <IonItem>
                                            <IonLabel position="floating">Nom</IonLabel>
                                            <IonInput onIonChange={(e) => { setNom(e.detail.value!) }}></IonInput>
                                        </IonItem>
                                    </IonCard>
                                </div>
                                <div className="mad2">
                                    <IonCard >
                                        <IonItem>
                                            <IonLabel position="floating">Prenom</IonLabel>
                                            <IonInput onIonChange={(e) => { setPrenom(e.detail.value!) }}></IonInput>
                                        </IonItem>
                                    </IonCard>
                                </div>
                                <div className="ion-text-center">
                                    <IonButton
                                        onClick={ajoutrdv}
                                        // routerLink="/"
                                        color="success"
                                    >Valider
                                    </IonButton>
                                </div>
                            </IonList>
                            {/* </LocalizationProvider> */}
                        </div>
                    </IonContent>
                </IonApp>
            </div>
        </>
    )
};