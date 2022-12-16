import { useEffect, useState, useRef } from "react";
import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonItemDivider, IonItem, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons } from "@ionic/react";
// import { DatePicker } from 'rsuite';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
// import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
// import Stack from '@mui/material/Stack';
// import { calendar } from 'ionicons/icons';
// import { format, parseISO } from 'date-fns';
import '../Medecin/inscripmed.css';
import './diag.css'
import { Tableau1 } from "../Tableau1";
import Axios from 'axios'

interface ajoutid {
    id: number;
}

export const NewDiag: React.SFC<ajoutid> = ({ id }) => {

    const [nom, setNom] = useState<string>();
    const [prenom, setPrenom] = useState<string>();
    const [diagnostic, setDiagnostic] = useState<string>();
    const [commentaire, setCommentaire] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [idrdvdiag, setRdvdiag] = useState<any>(null);
    const [diag, setDiag] = useState<any[]>([]);
    const [Remarques, setRemarques] = useState<any>();
    // const [value, setValue] = React.useState<any>(new Date());
    // const [value, setValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'),);

    const redig = () => {
        console.log(diag)
    }
    const red = (a: [] | React.SetStateAction<any>) => {
        setRdvdiag((a.find((e: { idRdv: number; }) => e.idRdv == id)).idRdv);
    }
    const getdetpat = () => {
        Axios.post('https://backend-medical.benindigital.com/affichedetpatient', {
            id: id,
        }).then((ret) => {
            setNom(ret.data[0].nom);
            setPrenom(ret.data[0].prenom)
        })
    };

    const ajoutdiag = () => {

        if (commentaire && diagnostic) {
            Axios.post('https://backend-medical.benindigital.com/creatediag2', {
                nom: nom,
                prenom: prenom,
                commentaire: commentaire,
                diagnostic: diagnostic,
                idpat: id,
            }).then((ret) => {
                if (ret.data == 'suc') {
                    //alert('Diagnostic pris avec succes');
                    const glab = document.getElementById('glagla')
                    glab!.innerHTML = ''
                    glab!.innerHTML = `<div class="alert alert-info " role="alert">
                    Diagnostic enregistré
                                                </div>`
                    setTimeout(() => {
                        // { window.location.href = "/listepat" }
                        glab!.innerHTML = ''
                        { window.location.href = `/ListtDiag/${id}` }
                    }, 3000);

                } else {
                    //alert('Element non enrégistré');
                    const glab = document.getElementById('glagla')
                    glab!.innerHTML = ''
                    glab!.innerHTML = `<div class="alert alert-danger " role="alert">
                    Diagnostic non enrégistré
                                                </div>`
                    setTimeout(() => {
                        // { window.location.href = "/listepat" }
                        glab!.innerHTML = ''
                    }, 3000);
                }
            })
        } else {
            //  alert('Les champs doivent contenir au moins 4 lettres');
            const glab = document.getElementById('glagla')
            glab!.innerHTML = ''
            glab!.innerHTML = `<div class="alert alert-danger " role="alert">
           VEILLEZ SAISIR TOUS LES CHAMPS
                                        </div>`
            setTimeout(() => {
                // { window.location.href = "/listepat" }
                glab!.innerHTML = ''
            }, 3000);
        }
    };
    const getexist = () => {
        Axios.get('https://backend-medical.benindigital.com/getexist', {

        }).then((ret) => {
            // setDiag(ret.data);
            console.log(ret.data);
            //  setRdvdiag(diag.find(e => e.idRdv == id));
            red(ret.data)


        })
    };
    useEffect(() => {
        getexist();
        console.log(idrdvdiag);
        getdetpat()
        //  console.log(id);
        // console.log(idrdvdiag);

    }, [])
    return (
        <>
            {/* {idrdvdiag != null ? (
                <div className="huiy">
                    <p>Diagnostic existant pour ce rendez-vous</p>
                </div>

            ) : ( */}
            <div className="mad1">
                <div id="glagla" className="">

                </div>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                <IonList>
                    <IonList lines="full" class="ion-no-margin">
                        <IonRow>
                            <IonCol>
                                <IonItem lines="none">
                                    <IonLabel ><h1>{nom}&nbsp;&nbsp;{prenom}</h1></IonLabel>
                                </IonItem>
                            </IonCol>
                            <IonCol>

                            </IonCol>
                        </IonRow>
                    </IonList>
                    <div className="sod">

                        <IonCard>
                            <IonItem>
                                <IonLabel position="floating">Diagnostic</IonLabel>
                                <IonTextarea placeholder="" onIonChange={(e) => { setDiagnostic(e.detail.value!) }}></IonTextarea>
                            </IonItem>
                        </IonCard>

                    </div>

                    <div className="sod">
                        <IonCard>
                            <IonItem>
                                <IonLabel position="floating">Observation</IonLabel>
                                <IonTextarea placeholder="" onIonChange={(e) => { setCommentaire(e.detail.value!) }}></IonTextarea>
                            </IonItem>
                        </IonCard>

                    </div>
                    <div className="ion-text-center de">
                        <IonButton color='success'
                            onClick={(e) => { ajoutdiag() }}
                        //  onClick={(e) => { redig() }} 
                        >Enregistrer</IonButton>
                    </div>

                </IonList>

                {/* </LocalizationProvider> */}
            </div>



            {/* )} */}

        </>
    )
};