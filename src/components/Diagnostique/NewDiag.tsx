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
import { Tableau1 } from "../Tableau1";
import Axios from 'axios'

interface ajoutid {
    id: number;
}

export const NewDiag: React.SFC<ajoutid> = ({ id }) => {

    const [text, setText] = useState<string>();
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


    const ajoutdiag = () => {

        if (Remarques) {
            Axios.post('https://backend-medical.benindigital.com/creatediag', {
                Remarques: Remarques,
                idrdv: id,
            }).then((ret) => {
                if (ret.data == 'suc') {
                    alert('Diagnostic pris avec succes');
                    { window.location.href = `/Rdv` }
                } else {
                    alert('Element non enrégistré');
                }
            })
        } else {
            alert('Les champs doivent contenir au moins 4 lettres');
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
        //  console.log(id);
        // console.log(idrdvdiag);

    }, [])
    return (
        <>
            {idrdvdiag != null ? (
                <div className="huiy">
                    <p>Diagnostic existant pour ce rendez-vous</p>
                </div>

            ) : (
                <div className="mad1">
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                    <IonList>

                        <IonCard >
                            <IonItem>
                                <IonLabel position="floating">Remarques</IonLabel>
                                <IonTextarea placeholder="" onIonChange={(e) => { setRemarques(e.detail.value!) }}></IonTextarea>
                            </IonItem>
                        </IonCard>
                        <div className="ion-text-center de">
                            <IonButton color='success'
                                onClick={(e) => { ajoutdiag() }}
                            //  onClick={(e) => { redig() }} 
                            >Enregistrer</IonButton>
                        </div>

                    </IonList>

                    {/* </LocalizationProvider> */}
                </div>



            )}

        </>
    )
};