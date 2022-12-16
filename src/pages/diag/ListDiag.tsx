import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonPage, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonCard, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons, IonMenuButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { arrowBack } from 'ionicons/icons';
import { SegmentExamples } from "./SegmentExamples";
import { LiDiag } from "../../components/Diagnostique/LiDiag";




export const ListDiag: React.SFC<{}> = () => {
    const redig = () => {
        { window.location.href = "/" }
    }
    const [prime, setPrime] = useState<'nouv' | 'list'>('list');

    const selectcalhandle = (selectedvalue:'nouv' | 'list')=>{
        setPrime(selectedvalue)
    }
    const [idant, setIdant] = useState(parseInt(window.location.pathname.split("/")[2]));


    useEffect(() => {
        const id = window.location.pathname.split("/")[2]
        const idd = parseInt(id);
       // console.log(id);
        setIdant(idd)
        // const ghy="baba"
        // console.log(ghy);

    }, [])

      



    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        {/* <IonButtons slot="start">
                            <IonButton routerLink="/listepat">
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons> */}
                        <IonTitle>Gestion des Diagnostics</IonTitle>
                        <IonButtons slot="end">
                            <IonMenuButton />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                <IonRow>
                        <SegmentExamples selectedvalue={prime} onSelectedValue={selectcalhandle} id={idant} />
                    </IonRow>
                    <IonRow>
                      <LiDiag id={idant} />
                    </IonRow>
                </IonContent>
            </IonApp>

        </>
    )
};