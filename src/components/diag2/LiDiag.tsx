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
import "./diag.css"
import '../Patient/ModalExample1.css'
import axios from "axios";

interface ajoutid {
    id: number;
}
export const LiDiag: React.SFC<ajoutid> = ({ id }) => {

    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [showmodal, setShowmodal] = useState(false)
    const toogle = () => { setShowmodal(!showmodal) }
    // const [value, setValue] = React.useState<any>(new Date());
    // const [value, setValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'),);
    const [diag, setDiaglist] = useState<any[]>([]);
    const getdetpat = () => {
        axios.post('https://backend-medical.benindigital.com/getlistdiagpat', {
            id: id,
        }).then((ret) => {
            setDiaglist(ret.data);
        })
    };
    const recherche = (a: [] | React.SetStateAction<any>) => {
        axios.post('https://backend-medical.benindigital.com/rechercherpatdiag', { nom: a, id: id,}).then((response) => {
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
            <div className="mad1">
                <IonList>
                    <div className="mad2">
                        <IonToolbar>
                        <IonSearchbar onIonChange={e => { recherche(e.detail.value) }}></IonSearchbar>
                    </IonToolbar>
                        <h1 className="ion-text-center">Diagnostics du patient</h1>
                    </div>
                   
                        {diag.map((val, key) =>
                            <>
                                 {/* <hr className="bebe"/> */}
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
               
                </IonList>
            </div >
        </>
    )
};