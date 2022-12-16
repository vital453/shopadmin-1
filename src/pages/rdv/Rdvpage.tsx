import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons } from "@ionic/react";
import { useEffect, useState } from "react";
import { SegmentExamples } from "../../components/RDV/SegmentExamples";
import { arrowBack } from 'ionicons/icons';
import { Formrdv } from "../../components/RDV/Formrdv";
import { Tableau1 } from "../../components/Tableau1";

export const Rdvpage: React.SFC<{}> = () => {
    const redig = () => {
        { window.location.href = "/" }
    }
    const [prime, setPrime] = useState<'nouv' | 'list'>('nouv');
    const [idant, setIdant] = useState(parseInt(window.location.pathname.split("/")[2]));

    const selectcalhandle = (selectedvalue: 'nouv' | 'list') => {
        setPrime(selectedvalue)
    }
    
    useEffect(() => {
        const id = window.location.pathname.split("/")[2]
        const idd = parseInt(id);
        console.log(id);
       
        setIdant(idd)
        // const ghy="baba"
        // console.log(ghy);

    }, [])
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'> 
                        <IonButtons slot="start">
                            <IonButton routerLink={`/listepat`}>
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Gestion des rendez-vous</IonTitle> 

                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <IonRow>
                        <SegmentExamples selectedvalue={prime} onSelectedValue={selectcalhandle} id={idant}/>
                    </IonRow>
                    <IonRow> 
                        <Formrdv id={idant}/>
                    </IonRow>
                </IonContent>
            </IonApp>

        </>
    )
};