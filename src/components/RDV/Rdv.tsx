import React from 'react';
import { useEffect, useState } from "react";
import { IonApp, IonButton, IonCol, IonList, IonThumbnail, IonSearchbar, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonButtons, IonModal, IonMenuButton } from "@ionic/react";
import { Tableau1 } from '../Tableau1';
import { arrowBack, addCircle, add } from 'ionicons/icons';
import { ModalExample } from './ModalExample';
import { Modaldeta_diag } from '../Diagnostique/Modaldeta_diag';
import { Modaldeta_rdv } from './Modaldeta_rdv';
import Axios from 'axios'

const Rdv = () => {

    const [groupe, setGroupe] = useState();

    const redig = () => {
        { window.location.href = "/" }
    }

    const [showmodal, setShowmodal] = useState(false)
    const toogle = () => { setShowmodal(!showmodal) }
    const [donner, setDonner] = useState(Tableau1)
    let [id, setId] = useState<number>(0);
    const [rdvlist, setRdvlist] = useState<any[]>([]);
    const ggt = ['bvhb', 'hnvbn']
    const getlistrdvglobal = () => {
        Axios.get('https://backend-medical.benindigital.com/affichelistrdvglobale').then((ret) => {
            setRdvlist(ret.data);
            console.log(ret.data);
            //  console.log(rdvlist);
        })
    };
    const recherche = (a: [] | React.SetStateAction<any>) => {
        Axios.post('https://backend-medical.benindigital.com/rechercherlistrdv', { nom: a }).then((response) => {

            setRdvlist(response.data);

        })
    };
    useEffect(() => {
        getlistrdvglobal()
    }, [])
    return (
        <div>

            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        <IonButtons slot="start">
                            <IonButton routerLink='/'>
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle slot="">
                            Liste global des rendez-vous
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonMenuButton />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonList lines="full" class="ion-no-margin">
                        <div className='game'>
                            <div>
                                <IonButtons slot="start" className='ion-text-end'>
                                    <IonButton onClick={() => { }} className='ion-text-end'>
                                        {/* <IonIcon slot="icon-only" icon={personAdd} /> */}
                                    </IonButton>
                                </IonButtons>
                            </div>
                            <div className='game1'>
                                <IonButtons slot="end" className='ion-text-end' >
                                    <IonButton onClick={() => { }} className='ion-text-end' routerLink='/ajoutrend' >
                                        <IonIcon icon={add} style={{ fontSize: '30px' }} />
                                    </IonButton>
                                </IonButtons>
                            </div>
                        </div>
                        <IonToolbar>
                            <IonSearchbar></IonSearchbar>
                        </IonToolbar>

                        <IonList>
                        {rdvlist.map((val, key, gh) => {
                            return (
                                <IonItem
                                    onClick={() => { setShowmodal(true); setId(val.idRdv); }}
                                >
                                    <IonLabel>
                                        <h2>NOM</h2>
                                        <p>{val.nomPatient}</p>
                                    </IonLabel>
                                    <IonLabel>
                                        <h2>Prenom</h2>
                                        <p> {val.prenomPatient}</p>
                                    </IonLabel>
                                    <IonLabel>
                                        <h2>Date</h2>
                                        <p>{val.dateRdv}</p>
                                    </IonLabel>
                                    <IonLabel>
                                        <h2>Date</h2>
                                        <p>{val.heureRdv}</p>
                                    </IonLabel>
                                </IonItem>
                            )
                        })}
                        </IonList>
                    </IonList>
                </IonContent>
                <IonModal
                    isOpen={showmodal}
                    onDidDismiss={() => {
                        setShowmodal(false)
                    }}
                >
                    <Modaldeta_rdv
                        onclose={() => { setShowmodal(false) }}
                        id={id}
                    />

                </IonModal>
            </IonApp>
        </div>
    );
};

export default Rdv;



{/* <h4>Discover</h4>
<h2>Music we think you'll love.</h2>
<IonList>
  {albums.map(album =>
    <IonItem key={album.id}>
      <IonThumbnail slot="start">
        <img src={album.artwork} />
      </IonThumbnail>
      <IonLabel>
        <h2>{album.title}</h2>
        <p>{album.artist}, {album.year}</p>
      </IonLabel>
    </IonItem>
  )}
</IonList> */}


