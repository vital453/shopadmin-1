import { useEffect, useState, useRef } from "react";
import { IonApp, IonButton,IonModal, IonCol, IonContent, IonAvatar, IonSelectOption, IonItemDivider, IonItem, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons, IonSearchbar } from "@ionic/react";
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

interface ajoutid {
    id: number;
  }
export const LiDiag: React.SFC<ajoutid> = ({id}) => {

    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [showmodal, setShowmodal] = useState(false)
    const toogle=()=>{setShowmodal(!showmodal)}
    // const [value, setValue] = React.useState<any>(new Date());
    // const [value, setValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'),);


    return (
        <>
           <div className="mad1">
            <IonList>
                <div className="mad2">
                    {/* <IonToolbar>
                        <IonSearchbar></IonSearchbar>
                    </IonToolbar> */}
                    <h1 className="ion-text-center">Diagnostic du patient</h1>
                </div>
                <div className="mad2">
                    <IonList>
                    <Modaldeta_diag
                        id={id}
                    />
                        {/* {Tableau1.map((val, key) =>
                        <IonItem key={key} onClick={() => { setShowmodal(true) }}>

                            <IonLabel>
                                <h2>NOM</h2>
                                <p>{val.Duree}</p>
                            </IonLabel>
                            <IonLabel>
                                <h2>Prenom</h2>
                                <p> {val.Duree}</p>
                            </IonLabel>
                            <IonLabel>
                                <h2>Date</h2>
                                <p>{val.Duree}</p>
                            </IonLabel>
                            <IonLabel>
                                <h2>Date</h2>
                                <p>{val.Duree}</p>
                            </IonLabel>
                        </IonItem>
                    )} */}
                        {/* <IonItem
                        onClick={() => { setShowmodal(true) }}
                        >
                            <IonLabel>
                                <h2>NOM</h2>
                                <p>{Tableau1[id].Duree}</p>
                            </IonLabel>
                            <IonLabel>
                                <h2>Prenom</h2>
                                <p> {Tableau1[id].Theme}</p>
                            </IonLabel>
                            <IonLabel>
                                <h2>Date</h2>
                                <p>{Tableau1[id].Format}</p>
                            </IonLabel>
                            <IonLabel>
                                <h2>Date</h2>
                                <p>{Tableau1[id].Formation}</p>
                            </IonLabel>
                        </IonItem> */}
                    </IonList>
                </div>
            </IonList>
            {/* <IonModal
                    isOpen={showmodal}
                    onDidDismiss={() => {
                        setShowmodal(false)
                    }}
                >
                    <Modaldeta_diag
                        onclose={() => { setShowmodal(false) }}
                        id={id}
                    />

                </IonModal> */}
        </div >
        </>
    )
};