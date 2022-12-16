import { CreateAnimation, IonApp, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonMenuButton, IonNote, IonRefresher, IonRefresherContent, IonRippleEffect, IonRouterLink, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RefresherEventDetail } from '@ionic/core';
import { arrowBack, cartOutline, chevronDownCircleOutline, informationCircle, logoInstagram, search, star } from 'ionicons/icons';
import { IonPage, useIonToast } from '@ionic/react';
import { createAnimation } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { dectriggmod } from '../Feature/DeclencheursSlice';

// import './RippleEffectExample.css';
import './Nouvpage.css'
import './Nouvpage.scss'
import axios from 'axios'

const animationBuilder = (baseEl: any, opts: any) => {
    
    const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl)
        .fromTo('opacity', 0, 1)
        .duration(250);

    const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl)
        .fromTo('opacity', 1, 0)
        .duration(250);

    const animation = createAnimation()
        .addAnimation(enteringAnimation)
        .addAnimation(leavingAnimation);

    return animation;
};


function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');

    setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
    }, 2000);
}

const Nouv: React.FC = () => {
    const dispatch = useDispatch();
    const [present, dismiss] = useIonToast();
    const [produit, setProduitlist] = useState<any[]>([]);
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const tri= useSelector((state: any) => state.triggers.triggermod);
    const data = [
        {
            title: "Ventes",
            subtitle: "Long road",
            image: "/assets/1e.jpg",
            id: 1
        },
        {
            title: "Caisse",
            subtitle: "Big mountains",
            image: "/assets/1e.jpg",
            id: 2
        },
        {
            title: "Stock",
            subtitle: "This is unknown",
            image: "/assets/1e.jpg",
            id: 3
        },
        {
            title: "Bilan",
            subtitle: "This is unknown",
            image: "/assets/1e.jpg",
            id: 4
        },
        {
            title: "Caisse",
            subtitle: "This is unknown",
            image: "/assets/1e.jpg",
            id: 5
        },
        {
            title: "Cosmétique",
            subtitle: "This is unknown",
            image: "/assets/1e.jpg",
            id: 6
        }

    ];

    const [userInfo, setuserInfo] = useState<any>({
        file: [],
        filepreview: null,
    });

    const wha = () => {
        
    }
    const lot = () => {
        fetch(`https://backend-shop.benindigital.com/uploads/1657271084.jpg`)
            .then(function (response) {
                return response.blob();
            })
            .then(function (blob) {
                setuserInfo({
                    ...userInfo,
                    file: '',
                    filepreview: URL.createObjectURL(blob),
                });
            });
    }

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
          // Any calls to load data go here
          event.detail.complete();
        }, 2000);
    }    

    // useEffect(() => {

    //     // console.log(userInfo);
    //     lot();

    // }, []);

    useEffect(() => {

        // console.log(userInfo);
        // lot();
        console.log(tri);
        

    }, []);
    useEffect(() => {
        console.log('rrr');
        
    }, [tri]);

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar color='secondary'>
                    <IonButtons slot="start">
                        <IonButton routerLink="/">
                            <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle className='ion-text-center tet'>Panier</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> 
                <IonButton onClick={() => setShowToast1(true)} expand="block">Show Toast 1</IonButton>
                <IonButton onClick={() => setShowToast2(true)} expand="block">Show Toast 2</IonButton>
                <IonButton onClick={() => wha()} >whats</IonButton>
                <IonToast
                    isOpen={showToast2}
                    onDidDismiss={() => setShowToast2(false)}
                    message="Click to Close"
                    icon={informationCircle}
                    position="top"
                    duration={200}
                />
                <IonItemGroup>
                    <IonItemDivider >
                        <IonNote className='nereide' >A</IonNote>
                    </IonItemDivider>
                    <IonItemDivider>
                        <IonLabel>A</IonLabel>
                    </IonItemDivider>
                    <IonButton onClick={() => { dispatch(dectriggmod(!tri))}}>
                        tttg
                    </IonButton>
                    <IonButton onClick={() => { console.log(tri);
                    }}>
                        obs
                    </IonButton>


                    
                </IonItemGroup>

            </IonContent>


        </IonPage>
    );
};
export default Nouv;














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