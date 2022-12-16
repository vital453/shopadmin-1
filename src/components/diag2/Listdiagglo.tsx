import { useEffect, useState, useRef } from "react";
import { IonApp, IonButton, IonModal, IonCol, IonContent, IonAvatar, IonSelectOption, IonItemDivider, IonItem, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons, IonSearchbar } from "@ionic/react";
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
import { Tableau1 } from '../Tableau1';
import { Modaldeta_diag } from "./Modaldeta_diag";
import axios from "axios";
import { arrowBack } from "ionicons/icons";

// interface ajoutid {
//     id: number;
// }
export const Listdiagglo: React.SFC = () => {

    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [showmodal, setShowmodal] = useState(false)
    const toogle = () => { setShowmodal(!showmodal) }
    // const [value, setValue] = React.useState<any>(new Date());
    // const [value, setValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'),);
    const [diag, setDiaglist] = useState<any[]>([]);
    const getdetpat = () => {
        axios.get('https://backend-medical.benindigital.com/getlistdiagglo', {
        }).then((ret) => {
            setDiaglist(ret.data);
        })
    };

    const recherche = (a: [] | React.SetStateAction<any>) => {
        axios.post('https://backend-medical.benindigital.com/rechercherdiag', { nom: a }).then((response) => {
            setDiaglist(response.data);
          console.log(response.data);
          
        })
      };
    useEffect(() => {
        getdetpat()
        console.log(diag);

    }, [])

    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color="primary">
                        <IonTitle>Diagnostics</IonTitle>
                        <IonButtons slot="start">
                            <IonButton
                                onClick={() => {
                                    window.location.href = `/`
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
                    <div className="mad1">
                        <IonList>
                            <div className="mad2">
                                <IonToolbar>
                                    <IonSearchbar  onIonChange={e => { recherche(e.detail.value) }}></IonSearchbar>
                                </IonToolbar>
                                {/* <h1 className="ion-text-center"> </h1> */}
                            </div>
                            <div className="mad2">
                                {diag.map((val, key) =>
                                    <>
                                        <IonList lines="full" class="ion-no-margin">
                                            <IonRow>
                                                <IonCol>
                                                    <IonItem lines="none">
                                                        <h5>Nom: &nbsp;&nbsp;{val.nompatient}</h5>
                                                    </IonItem>
                                                </IonCol>
                                                <IonCol>
                                                    <IonItem lines="none">
                                                        <h5>Prénom: &nbsp;&nbsp;{val.prenompatient}</h5>
                                                    </IonItem>
                                                </IonCol>
                                            </IonRow>
                                        </IonList>
                                        <IonItem lines="none">
                                            <div className="kod">
                                                <div className="lab">
                                                    <h5>Diagnostic</h5>
                                                </div>
                                                <div className="op">
                                                    <p>{val.diagnostic}</p>
                                                </div>
                                            </div>

                                        </IonItem>
                                        <IonItem lines="none">
                                            <div className="kod">
                                                <div className="lab">
                                                    <h5>date du diadnostic</h5>
                                                </div>
                                                <div className="op">
                                                    <p>{(val.date).split("T")[0]}</p>
                                                </div>
                                            </div>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <div className="kod">
                                                <div className="lab">
                                                    <h5>Observation</h5>
                                                </div>
                                                <div className="op">
                                                    <p>{val.commentaire}</p>
                                                </div>
                                            </div>
                                        </IonItem>
                                       
                                        <br />
                                        <br />
                                        <br />
                                        <hr className="bebe"/>
                                    </>
                                )}
                            </div>
                        </IonList>
                    </div >
                </IonContent>
            </IonApp>

        </>
    )
};