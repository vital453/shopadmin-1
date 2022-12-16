import { useEffect, useState, useRef } from "react";
import { IonAlert, IonButtons, IonCheckbox, IonCol, IonHeader } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, addCircle, personCircle } from 'ionicons/icons';
import { IonContent } from '@ionic/react';
import { IonApp } from '@ionic/react';
import { IonList } from '@ionic/react';
import { IonItem } from '@ionic/react';
import { IonLabel } from '@ionic/react';
import { IonToolbar } from '@ionic/react';
import { IonTitle } from '@ionic/react';
import { IonSearchbar } from '@ionic/react';
import { Tableau1 } from '../Tableau1';
import { useSearch } from 'rsuite/esm/Picker';
import Axios from 'axios'
interface Ajout_utiliformprops {
    onclose: () => void;
    id: number;
}

export const Modaldeta_rdv: React.SFC<Ajout_utiliformprops> = ({ onclose, id }) => {
    // const [donner1, setDonner1] = useState(ondetail())
    let ugcu = 10;
    const affi = () => {
    }
    const [gret, setGreat] = useState(true);
    const [gretd, setGreatd] = useState(false);
    const [status, setStatus] = useState(false);
    const [detrdv, setDetrdv] = useState<any[]>([]);
    const [showAlert1, setShowAlert1] = useState(false);

    const getdetrdv = () => {
        Axios.post('https://backend-medical.benindigital.com/affichedetrdv', {
            id: id,
        }).then((ret) => {
            setDetrdv(ret.data);
            console.log(ret.data[0].idPatient);

        })

    };
    const modifrdv = () => {
        Axios.put('https://backend-medical.benindigital.com/updatestatrdv', {
            id: id,
            status: status,
        }).then((ret) => {
            if (ret.data == 'suc') {
                alert('Rendez-vous mis à jour');
                onclose();
            } else {
                alert('Rendez-vous non modifié ');
            }
        })
    };
    const redig = (a: number | React.SetStateAction<String>) => {
        console.log(a);

        if (a == 0) {
            alert('Veillez valider le rendez-vous')
    //         const baba = document.getElementById("nap")
    //         baba!.innerHTML = ''
    //         baba!.innerHTML = `  <IonAlert
    //        isOpen={showAlert1}
    //        onDidDismiss={() => setShowAlert1(false)}
    //        cssClass='my-custom-class'
    //        header={'Alert'}
    //        subHeader={'Subtitle'}
    //        message={'Veillez valider le rendez-vous'}
    //        buttons={['OK']}
    //    />`
        } else {
            { window.location.href = `/NouvDiag/${id}` }
        }
    }
    const redige = () => {
            { window.location.href = `/ajoutpatt/${id}` }
    }
    useEffect(() => {
        getdetrdv()
        console.log(id);

    }, [])
    return (
        <>

            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        <IonTitle>Details rendez-vous</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => { onclose() }}>
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBackCircle} color="" />
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    {detrdv.map((val, key) => {
                        return (
                            <IonList lines="full" class="ion-no-margin">

                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5>Matricule</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.matriculePatient}</p>
                                        </div>
                                    </div>

                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5>Nom</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.nomPatient}</p>
                                        </div>
                                    </div>

                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5 >Prenom</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.prenomPatient}</p>
                                        </div>
                                    </div>

                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5 >Type de rendez-vous</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.typeRdv}</p>
                                        </div>
                                    </div>

                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5 >Nom medecin</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.nomMedecin}</p>
                                        </div>
                                    </div>


                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5>Date de prise de rendez-vous</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.dateRdv}</p>
                                        </div>
                                    </div>

                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5>Heur de prise de rendez-vous</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.heureRdv}</p>
                                        </div>
                                    </div>

                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5>Secretaire</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.nomSecretaire}</p>
                                        </div>
                                    </div>
                                </IonItem>
                                <IonItem>
                                    <div className="kod">
                                        {val.status === 1 ? (
                                            <>
                                                <div className="lab">
                                                    <IonCheckbox slot="end" color="primary" checked disabled />
                                                </div>
                                                <div className="op">
                                                    <h5>Status</h5>
                                                </div>
                                            </>


                                        ) : (
                                            <>
                                                <div className="lab">
                                                    <IonCheckbox slot="end" color="primary" onIonChange={e => setStatus(e.detail.checked)} />
                                                </div>
                                                <div className="op">
                                                    <h5>Status</h5>
                                                </div>
                                                <div className="op">
                                                    <IonCol class="ion-text-center">
                                                        <IonButton color="success" onClick={() => { modifrdv() }}>Valider Rdv</IonButton>
                                                    </IonCol>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </IonItem>
                                <IonItem className="ion-margin-top" lines="none">
                                    {/* <IonCol>
                                    <IonButton color="success" >Voir diag</IonButton>
                            </IonCol> */}
                                    {((val.idPatient == null)) ? (
                                        <IonCol class="ion-text-center">
                                            <IonButton color="primary" 
                                            //routerLink={`/ajoutpatt/${id}`}
                                            onClick={()=>{redige()}}
                                            >Joindre un patient</IonButton>
                                        </IonCol>
                                    ) : (
                                        <IonCol class="ion-text-center">
                                            <IonButton color="primary" onClick={() => { redig(val.status); setShowAlert1(true) }}>Diagnostic</IonButton>
                                        </IonCol>
                                    )}
                                </IonItem>
                            </IonList>
                        )
                    })}
                </IonContent>
            </IonApp>
        </>
    )
};