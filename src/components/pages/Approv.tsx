import { CreateAnimation, IonActionSheet, IonApp, IonBadge, IonProgressBar, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonLabel, IonMenuButton, IonRefresher, IonRefresherContent, IonRippleEffect, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RefresherEventDetail } from '@ionic/core';
import { arrowBack, card, cartOutline, checkmark, checkmarkCircle, chevronBack, chevronDownCircleOutline, chevronForward, close, informationCircle, logoInstagram, search, star, trash, trashOutline } from 'ionicons/icons';
import { IonPage, useIonToast } from '@ionic/react';
// import './RippleEffectExample.css';
import axios from 'axios'




function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');

    setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
    }, 2000);
}


interface Ajout_utiliformprops {
    // onclose: () => void;
    // Invoice: String;
    // Prix: number;
    // Date: String;
    // Statut: boolean;
    // Etat: boolean;
    id: String;
    stock: number;
}




const Approv: React.SFC<Ajout_utiliformprops> = ({ id, stock }) => {
    const [present, dismiss] = useIonToast();
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [change, setChange] = useState(false);
    const [progress, setProgress] = useState(false);
    const [augment, setAugment] = useState<any>(1);
    const [showToast, setShowToast] = useState(false);

    const supprimer = () => {
        console.log(id);
        axios.post('https://backend-shop.benindigital.com/supprart', {
            id: id,
            quantite: augment,
        }).then((ret) => {
            console.log(ret.data);
            if (ret.data == "suc") {
                setProgress(false)
                setChange(false)
                setShowToast(true)
            }
        })
    }


    const increm = () => {
        setAugment(parseInt(augment) + 1)
        console.log(augment);

    };
    const decrem = () => {
        if (augment>0){
            setAugment(parseInt(augment) - 1)
        }
        
    };
    const trans = () => {
        axios.post('https://backend-shop.benindigital.com/approv', {
            id: id,
            quantite: parseInt(augment)+stock,
        }).then((ret) => {
             console.log(ret.data);
            if (ret.data == "suc") {
                setProgress(false)
                setChange(false)
                setShowToast(true)
            }
        })
    };


    useEffect(() => {

        // console.log(userInfo);

    }, []);

    return (
        <>

            {change != false ?
                (
                    <IonCol size='4' slot='end' >
                        {progress == true ?
                            <IonProgressBar type="indeterminate" reversed={true}></IonProgressBar>
                            : <IonButtons  >
                                <IonIcon icon={checkmarkCircle} color='secondary' onClick={() => { trans(); setProgress(true);
                                 }} className="poli" size='small' />
                                <IonIcon icon={chevronBack} color='secondary' onClick={() => { decrem() }} />
                                <IonInput type='number' className='deuxinp' value={augment}
                                    onIonChange={(e) => { setAugment(e.detail.value) }} >
                                </IonInput>
                                <IonIcon icon={chevronForward} color='secondary' onClick={() => { increm() }} />
                            </IonButtons>}
                    </IonCol>
                ) : (
                    <IonRow slot='end'>
                        <IonButton color="secondary" className=' approv' size='small' onClick={() => { setChange(true) }} >
                            Approvisionner
                        </IonButton>
                        <IonButtons color="danger" onClick={() => { setShowActionSheet(true) }}>
                            {/* <div className='esp'></div> */}
                            <IonIcon icon={trashOutline} className="animate__animated" />
                        </IonButtons>
                    </IonRow>
                )}
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                cssClass='my-custom-class'
                buttons={[{
                    text: 'Supprimer',
                    role: 'destructive',
                    icon: trash,
                    id: 'delete-button',
                    data: {
                        type: 'delete'
                    },
                    handler: () => {
                        supprimer();
                    }
                },
                {
                    text: 'Annuler',
                    icon: close,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
                ]}>
            </IonActionSheet>


            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={"Elément ajouté"}
                icon={informationCircle}
                position="top"
                duration={3000}
            />
        </>
    );
};
export default Approv;














{/* <IonRow>
                    <IonCol size='10'>
                        <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)} value="javascript" scrollable={true} className='seg' >
                            <IonSegmentButton value="python">
                                <IonLabel>Python</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="javascript">
                                <IonLabel>Javascript</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="java">
                                <IonLabel>Java</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="ja">
                                <IonLabel>Ja</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="rr">
                                <IonLabel>rr</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonCol>
                    <IonCol className='zer'>
                        <IonIcon icon={search} className='ico' />
                    </IonCol>

                </IonRow>
                <IonImg src="img/1cc.png" className='rrt' /> */}