
import { IonButtons, IonCol, IonHeader, IonContent } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { arrowBackCircle, addCircle, personCircle } from 'ionicons/icons';
import { IonApp } from '@ionic/react';
import { IonList } from '@ionic/react';
import { IonItem } from '@ionic/react';
import { IonLabel } from '@ionic/react';
import { IonToolbar } from '@ionic/react';
import { IonTitle } from '@ionic/react';
import { IonSearchbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Tableau1 } from '../Tableau1';
import Axios from 'axios'

interface Ajout_utiliformprops {
    //   onclose: () => void;
    id: number;
}

export const Modaldeta_diag: React.SFC<Ajout_utiliformprops> = ({ id }) => {
    // const [donner1, setDonner1] = useState(ondetail())
    let ugcu = 10;
    const [detdiag, setDetdiag] = useState<any[]>([]);
    const [detmed, setDetmed] = useState<any[]>([]);
    //   const affi = () => {
    //     console.log(tab);
    //   }
    const getdetdiag = () => {
      //  Axios.post('http://localhost:3001/affichedetdiag', {
        Axios.post('https://backend-medical.benindigital.com/affichedetdiag', {
            id: id,
        }).then((ret) => {
            setDetdiag(ret.data);
            console.log(detdiag)

        })
    };
    const getdetmede = () => {
        Axios.post('https://backend-medical.benindigital.com/affichedetmedd', {
            id: id,
        }).then((ret) => {
            setDetmed(ret.data);
            console.log(detmed)

        })
    };
    const redig = () => {
        console.log(detdiag)
    }



    useEffect(() => {
        getdetdiag()
        getdetmede()
        console.log(id);
        

    }, [])
    return (
        <>

         {detdiag.map((val, key) => {
                return (
                    <>
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
                                    <p>{val.PrenomPatient}</p>
                                </div>
                            </div>

                        </IonItem>
                        {detmed.map((val, key) => {
                            return (
                                <IonItem>
                                    <div className="kod">
                                        <div className="lab">
                                            <h5>Nom medecin</h5>
                                        </div>
                                        <div className="op">
                                            <p>{val.nomMedecin}</p>
                                        </div>
                                    </div>

                                </IonItem>
                            )
                        })}

                        <IonItem>
                            <div className="kod">
                                <div className="lab">
                                    <h5>Diagnostic</h5>
                                </div>
                                <div className="op">
                                    <p>{val.Remarques}</p>
                                </div>
                            </div>
                        </IonItem>
                    </>
                )
            })}   
        </>
    )
};