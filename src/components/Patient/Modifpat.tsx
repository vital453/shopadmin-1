import { IonApp, IonButton, IonCol, IonContent, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons, IonCheckbox } from "@ionic/react";
import { useEffect, useState } from "react";
import { arrowBack, calculatorOutline, camera, personCircle, personSharp, refreshOutline } from 'ionicons/icons';
import '../Patient/inscrippat.css';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { useCamera } from '@ionic/react-hooks/camera'
import { Tableau1 } from '../Tableau1';
import Axios from 'axios'

const Modifpat: React.FC = () => {
    const [patient, setPatientlist] = useState<any[]>([]);
    const [groupe, setGroupe] = useState('');
    const [idclinique, setClinique] = useState(0);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [sexe, setSexe] = useState('');
    const [age, setAge] = useState(0);
    const [telephone1, setTelephone1] = useState(0);
    const [telephone2, setTelephone2] = useState(0);
    const [quartier, setQuartier] = useState("Quartier");
    const [ville, setVille] = useState("Ville");
    const [maison, setMaison] = useState("Maison");
    const [adresse, setAdresse] = useState("");
    let [antecedants, setAntecedants] = useState(" ");
    let [date, setdate] = useState("");
    const [antecedants1, setAntecedants1] = useState(false);
    const [antecedants2, setAntecedants2] = useState(false);
    const [antecedants3, setAntecedants3] = useState(false);
    const [antecedants4, setAntecedants4] = useState(false);
    const [antecedants5, setAntecedants5] = useState(false);
    const [antecedants6, setAntecedants6] = useState(false);
    const [remarque, setRemarque] = useState(' ');
    const [idant, setIdant] = useState(parseInt(window.location.pathname.split("/")[2]));
    const { photo, getPhoto } = useCamera();
    const [clinik, setCliniklist] = useState<any[]>([]);
    let agee = 0;
    // const getdetpat = () => {
    //     Axios.post('http://localhost:3001/affichedetpatient', {
    //         id: idant,
    //     }).then((ret) => {
    //         setPatientlist(ret.data);
    //         setGroupe(ret.data[0].groupeSanguin)
    //         setAge(ret.data[0].age)
    //         setClinique(ret.data[0].idClinique)
    //         setNom(ret.data[0].nom)
    //         setPrenom(ret.data[0].prenom)
    //         setSexe(ret.data[0].sexe)
    //         setTelephone1(ret.data[0].telephone1)
    //         setTelephone2(ret.data[0].telephone2)
    //         setQuartier(ret.data[0].quartier)
    //         setVille(ret.data[0].ville)
    //         setMaison(ret.data[0].maison)
    //         setRemarque(ret.data[0].remarques)
    //     })
    // };
    const getdetpat = () => {
        Axios.post('https://backend-medical.benindigital.com/affichedetpatient', {
            id: idant,
        }).then((ret) => {
            setPatientlist(ret.data);
            setGroupe(ret.data[0].groupeSanguin)
            setAge(ret.data[0].age)
            setClinique(ret.data[0].idClinique)
            setNom(ret.data[0].nom)
            setPrenom(ret.data[0].prenom)
            setSexe(ret.data[0].sexe)
            setTelephone1(ret.data[0].telephone1)
            setTelephone2(ret.data[0].telephone2)
            setQuartier(ret.data[0].quartier)
            setAdresse(ret.data[0].ville)
            setMaison(ret.data[0].maison)
            setRemarque(ret.data[0].remarques)
            setAntecedants(ret.data[0].antecedant)
            setdate(ret.data[0].datenaissance)
            
            if (ret.data[0].antecedant.search('Diabète') >= 0) {
                setAntecedants1(true)
            } else {
                setAntecedants1(false)
            }
            if (ret.data[0].antecedant.search('Hypertension') >= 0) {
                setAntecedants2(true)
            } else {
                setAntecedants2(false)
            }
            if (ret.data[0].antecedant.search('Drépanositose') >= 0) {
                setAntecedants3(true)
            } else {
                setAntecedants3(false)
            }
            if (ret.data[0].antecedant.search('Cancer') >= 0) {
                setAntecedants4(true)
            } else {
                setAntecedants4(false)
            }
            if (ret.data[0].antecedant.search('Sinusite') >= 0) {
                setAntecedants5(true)
            } else {
                setAntecedants5(false)
            }
            if (ret.data[0].antecedant.search('Tuberculose') >= 0) {
                setAntecedants6(true)
            } else {
                setAntecedants6(false)
            }

        })
    };
    const test = () => {


    }

    useEffect(() => {
        const id = window.location.pathname.split("/")[2]
        const idd = parseInt(id);
        setIdant(idd)
        getcli();
        getdetpat()
        // test();
        console.log(antecedants1, antecedants2, antecedants3, antecedants4, antecedants5, antecedants6);

    }, [])
    const redig = () => {
        { window.location.href = "/" }
    }
    const getcli = () => {
        Axios.get('https://backend-medical.benindigital.com/afficheclinique').then((response) => {
            setCliniklist(response.data);
        })
    }
    const convertion = () => {
        var d = new Date();
        agee = d.getFullYear() - parseInt(date.split("-")[0])
        console.log(d);
    }
    const modif = () => {
        convertion();
        let ant1 = ""
        let ant2 = ""
        let ant3 = ""
        let ant4 = ""
        let ant5 = ""
        let ant6 = ""
        if (antecedants1) {
            ant1 = "Diabète"
        } else {
            ant1 = ""
        }
        if (antecedants2) {
            ant2 = "Hypertension"
        } else {
            ant2 = ""
        }
        if (antecedants3) {
            ant3 = "Drépanositose"
        } else {
            ant3 = ""
        }
        if (antecedants4) {
            ant4 = "Cancer"
        } else {
            ant4 = ""
        }
        if (antecedants5) {
            ant5 = "Sinusite"
        } else {
            ant5 = ""
        }
        if (antecedants6) {
            ant6 = "Tuberculose"
        } else {
            ant6 = ""
        }
        antecedants = ant1 + ' ' + ant2 + ' ' + ant3 + ' ' + ant4 + ' ' + ant5 + ' ' + ant6 + ' ';
        console.log(antecedants);
        console.log(date);

        console.log(nom, prenom, sexe, telephone1, remarque, groupe, adresse, date, antecedants);
        if (nom) {
            if (prenom) {
                if (sexe) {
                    if (agee) {
                        if (telephone1) {
                            if (groupe) {
                                if (adresse) {
                                    Axios.put('https://backend-medical.benindigital.com/updatepatient', {
                                        id: idant,
                                        nom: nom,
                                        prenom: prenom,
                                        sexe: sexe,
                                        age: agee,
                                        telephone1: telephone1,
                                        telephone2: telephone2,
                                        remarque: remarque,
                                        groupe: groupe,
                                        clinique: idclinique,
                                        quartier: quartier,
                                        ville: adresse,
                                        maison: maison,
                                        antecedants: antecedants,
                                        datenaissance: date,
                                    }).then((ret) => {
                                        if (ret.data == 'suc') {
                                            // alert('Elément mis à jour')
                                            const glab = document.getElementById('glagla')
                                            glab!.innerHTML = ''
                                            glab!.innerHTML = `<div class="alert alert-info jiji" role="alert">
                                              Enregistré
                                                </div>`
                                            setTimeout(() => {
                                                // { window.location.href = "/listepat" }
                                                { window.location.href = "/listepat" }
                                            }, 3000);


                                        } else {
                                            //  alert('Element non enrégistré');
                                            const glab = document.getElementById('glagla')
                                            glab!.innerHTML = ''
                                            glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                                              Non Modifié 
                                              </div>`
                                            setTimeout(() => {
                                                // { window.location.href = "/listepat" }
                                                glab!.innerHTML = ''

                                            }, 3000);
                                        }
                                    })
                                } else {
                                    // alert('VEILLEZ SAISIR VOTRE ADRESSE');
                                    const glab = document.getElementById('glagla')
                                    glab!.innerHTML = ''
                                    glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                                          VEILLEZ SAISIR VOTRE ADRESSE
                                          </div>`
                                    setTimeout(() => {
                                        // { window.location.href = "/listepat" }
                                        glab!.innerHTML = ''

                                    }, 3000);
                                }
                            } else {
                                //  alert('VEILLEZ SAISIR LE GROUPE SANGUIN ');
                                const glab = document.getElementById('glagla')
                                glab!.innerHTML = ''
                                glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                                        VEILLEZ SAISIR LE GROUPE SANGUIN 
                                        </div>`
                                setTimeout(() => {
                                    // { window.location.href = "/listepat" }
                                    glab!.innerHTML = ''

                                }, 3000);
                            }
                        } else {
                            // alert('VEILLEZ SAISIR LE NUMEROS DE TELEPHONE ');
                            const glab = document.getElementById('glagla')
                            glab!.innerHTML = ''
                            glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                                        VEILLEZ SAISIR LE NUMEROS DE TELEPHONE 
                                        </div>`
                            setTimeout(() => {
                                // { window.location.href = "/listepat" }
                                glab!.innerHTML = ''

                            }, 3000);
                        }
                    } else {
                        // alert('VEILLEZ CHOISIR UNE DATE DE NAISSANCE ');
                        const glab = document.getElementById('glagla')
                        glab!.innerHTML = ''
                        glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                                    VEILLEZ CHOISIR UNE DATE DE NAISSANCE 
                                    </div>`
                        setTimeout(() => {
                            // { window.location.href = "/listepat" }
                            glab!.innerHTML = ''

                        }, 3000);
                    }
                } else {
                    //  alert('VEILLEZ CHOISIR VOTRE SEXE ');
                    const glab = document.getElementById('glagla')
                    glab!.innerHTML = ''
                    glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                                    VEILLEZ CHOISIR VOTRE SEXE 
                                    </div>`
                    setTimeout(() => {
                        // { window.location.href = "/listepat" }
                        glab!.innerHTML = ''

                    }, 3000);
                }
            } else {
                // alert('VEILLEZ SAISIR LE PRENOM DU PATIENT');
                const glab = document.getElementById('glagla')
                glab!.innerHTML = ''
                glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                                VEILLEZ SAISIR LE PRENOM DU PATIENT
                                </div>`
                setTimeout(() => {
                    // { window.location.href = "/listepat" }
                    glab!.innerHTML = ''

                }, 3000);
            }
        } else {
            const glab = document.getElementById('glagla')
            glab!.innerHTML = ''
            glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                              VEILLEZ SAISIR LE NOM DU PATIENT
                              </div>`
            setTimeout(() => {
                // { window.location.href = "/listepat" }
                glab!.innerHTML = ''

            }, 3000);
            // alert('VEILLEZ SAISIR LE NOM DU PATIENT');
        }
    };
    return (
        <>
            <IonApp>
                <IonHeader translucent>
                    <IonToolbar color='primary'>
                        <IonButtons slot="start">
                            <IonButton routerLink="/listepat">
                                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Modifier patient</IonTitle>

                    </IonToolbar>
                    <div id="glagla" className="jiji">

                    </div>
                </IonHeader>
                <IonContent fullscreen>
                    <IonList lines="full" class="ion-no-margin">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonButton
                                        style={{ '--border-radius': '100%', width: '152px', height: '152px' }}
                                        onClick={() => getPhoto({
                                            resultType: CameraResultType.DataUrl,
                                            source: CameraSource.Camera,
                                            quality: 100
                                        })}
                                        color="medium"
                                    >
                                        {photo ? (
                                            <img style={{ width: '152px', height: '152px' }} src={`${photo.dataUrl}`} />
                                        ) : (
                                            <IonIcon style={{ fontSize: '72px' }} icon={camera} />
                                        )}
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating"><h2 className="labh">Nom</h2></IonLabel>
                                        <IonInput placeholder="" onIonChange={(e) => { setNom(e.detail.value!) }} value={nom} ></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Prenoms</IonLabel>
                                        <IonInput placeholder="" onIonChange={(e) => { setPrenom(e.detail.value!) }} value={prenom}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonRadioGroup value={sexe} onIonChange={(e) => { setSexe(e.detail.value!) }} >
                            <IonListHeader >
                                <IonLabel>SEXE</IonLabel>
                            </IonListHeader>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonItem lines='none'>
                                            <IonLabel>Femme</IonLabel>
                                            <IonRadio slot="start" color="primary" value="F" ></IonRadio>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol>
                                        <IonItem lines='none'>
                                            <IonLabel>Homme</IonLabel>
                                            <IonRadio slot="start" color="primary" value="M"></IonRadio>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonRadioGroup>
                        {/* <IonList lines="full" class="ion-no-margin">
              <IonAccordionGroup>
                <div className="ion-text-start modif2">
                  <IonCard >
                    <IonAccordion value="shapes">
                      <IonItem slot="header">
                        <IonIcon icon={calendarOutline} color="dark" />
                        <IonLabel>&emsp;&emsp;Choisir une date</IonLabel>
                      </IonItem>
                      <IonList slot="content">
                        <IonItem>
                          <IonDatetime ref={date} min="2022-01-01" presentation="date" class="ion-text-center"></IonDatetime>
                        </IonItem>
                      </IonList>
                    </IonAccordion>
                  </IonCard>
                </div>
              </IonAccordionGroup>
            </IonList> */}
                        <IonList lines="full" class="ion-no-margin">
                            <IonRow>
                                <IonCol>
                                    <IonItem lines="none">
                                        <IonLabel position="stacked"><h2 className="labh">Date de naissance</h2></IonLabel>
                                        <IonInput type="date" value={date.split('T')[0]} onIonChange={(e) => { setdate(e.detail.value!) }}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem lines="none">
                                        <IonSelect value={groupe} placeholder="Groupe sanguin" onIonChange={e => setGroupe(e.detail.value)}>
                                            <IonSelectOption value="A+">A+</IonSelectOption>
                                            <IonSelectOption value="A-">A-</IonSelectOption>
                                            <IonSelectOption value="B+">B+</IonSelectOption>
                                            <IonSelectOption value="B-">B-</IonSelectOption>
                                            <IonSelectOption value="AB+">AB+</IonSelectOption>
                                            <IonSelectOption value="AB-">AB-</IonSelectOption>
                                            <IonSelectOption value="O+">O+</IonSelectOption>
                                            <IonSelectOption value="O-">O-</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonList>
                        <IonGrid>
                            <IonRow>
                                {/* <IonItem>
                    <IonInput placeholder="Age" type="number" onIonChange={(e) => { setAge(parseInt(e.detail.value!)) }}></IonInput>
                  </IonItem> */}
                            </IonRow>
                            <IonRow>
                            </IonRow>
                        </IonGrid>

                        {/* <IonSelect value={clinique} placeholder="Clinique" onIonChange={e => setClinique(e.detail.value)}>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
              <IonSelectOption value={clinique}>clinia</IonSelectOption>
            </IonSelect> */}
                        {/* <IonSelect value={idclinique} placeholder="Clinique" onIonChange={e => setClinique(e.detail.value)}>
              {clinik.map((val, key) => {
                return (
                  <IonSelectOption value={val.id_clinique}>{val.nomClinique}</IonSelectOption>
                )
              })}
            </IonSelect> */}
                        {/* {clinik.map((val, key) => {
              return (
                <p>{val.nomClinique}</p>
              )
            })} */}

                    </IonList>
                    <IonListHeader >
                        <IonLabel>Antécédants médicaux</IonLabel>
                    </IonListHeader>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem lines='none'>
                                    <IonLabel>Diabète</IonLabel>

                                    <IonCheckbox slot="start" color="primary" checked={antecedants1} onIonChange={(e) => { setAntecedants1(e.detail.checked) }} ></IonCheckbox>

                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem lines='none'>
                                    <IonLabel>Hypertension</IonLabel>

                                    <IonCheckbox slot="start" color="primary" checked={antecedants2} onIonChange={(e) => { setAntecedants2(e.detail.checked) }} ></IonCheckbox>

                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                        <IonCol>
                                <IonItem lines='none'>
                                    <IonLabel>Cancer</IonLabel>

                                    <IonCheckbox slot="start" color="primary" checked={antecedants4} onIonChange={(e) => { setAntecedants4(e.detail.checked) }} ></IonCheckbox>

                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem lines='none'>
                                    <IonLabel>Drépanositose</IonLabel>

                                    <IonCheckbox slot="start" color="primary" checked={antecedants3} onIonChange={(e) => { setAntecedants3(e.detail.checked) }} ></IonCheckbox>

                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem lines='none'>
                                    <IonLabel>Sinusite</IonLabel>

                                    <IonCheckbox slot="start" color="primary" checked={antecedants5} onIonChange={(e) => { setAntecedants5(e.detail.checked) }} ></IonCheckbox>

                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem lines='none'>
                                    <IonLabel>Tuberculose</IonLabel>

                                    <IonCheckbox slot="start" color="primary" checked={antecedants6} onIonChange={(e) => { setAntecedants6(e.detail.checked) }} ></IonCheckbox>

                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonList lines="full" class="ion-no-margin">
                        <IonItem>
                            <IonLabel position="stacked">Coordonnées</IonLabel>
                            <IonInput placeholder="Téléphone " type="number" onIonChange={(e) => { setTelephone1(parseInt(e.detail.value!)) }} value={telephone1}></IonInput>
                            {/* <IonInput placeholder="Téléphone 2" onIonChange={(e) => { setTelephone2(parseInt(e.detail.value!)) }}></IonInput> */}
                            <IonInput placeholder="Adresse" value={adresse} onIonChange={(e) => { setAdresse(e.detail.value!) }}></IonInput>
                            {/* <IonInput placeholder="Quartier" value={quartier} onIonChange={(e) => { setQuartier(e.detail.value!) }}></IonInput>
              <IonInput placeholder="Maison" value={maison} onIonChange={(e) => { setMaison(e.detail.value!) }}></IonInput> */}
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Notes supplémentaires</IonLabel>
                            <IonTextarea placeholder="Notes supplémentaires" onIonChange={(e) => { setRemarque(e.detail.value!) }} value={remarque}></IonTextarea>
                        </IonItem>

                        <div className="ion-text-center ion-margin-top de">
                            <IonButton color='success' onClick={() => { modif() }}>Enregistrer</IonButton>
                        </div>
                    </IonList>
                </IonContent>
            </IonApp>
        </>
    )
};
export default Modifpat;