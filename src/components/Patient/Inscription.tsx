import { IonApp, IonButton, IonCol, IonContent, IonCheckbox, IonAvatar, IonSelectOption, IonPage, IonItemDivider, IonSelect, IonRadioGroup, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonIcon, IonAlert, IonList, IonListHeader, IonRadio, IonTextarea, IonButtons, IonCard, IonAccordionGroup, IonAccordion, IonDatetime } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { arrowBack, calculatorOutline, calendarOutline, camera, personCircle, personSharp, refreshOutline } from 'ionicons/icons';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { useCamera } from '@ionic/react-hooks/camera'
import '../Patient/inscrippat.css'
import Axios from 'axios'


const Inscription: React.FC = () => {

  const [groupe, setGroupe] = useState("");
  const [idclinique, setClinique] = useState();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [sexe, setSexe] = useState('');
  const [age, setAge] = useState(0);
  const [telephone1, setTelephone1] = useState(0);
  const [telephone2, setTelephone2] = useState(0);
  const [quartier, setQuartier] = useState("Quartier");
  const [adresse, setAdresse] = useState("");
  const [maison, setMaison] = useState("Maison");
  let [antecedants, setAntecedants] = useState(" ");
  let [date, setdate] = useState("");
  const [antecedants1, setAntecedants1] = useState(false);
  const [antecedants2, setAntecedants2] = useState(false);
  const [antecedants3, setAntecedants3] = useState(false);
  const [antecedants4, setAntecedants4] = useState(false);
  const [antecedants5, setAntecedants5] = useState(false);
  const [antecedants6, setAntecedants6] = useState(false);
  const [remarque, setRemarque] = useState(' ');
  const [clinik, setCliniklist] = useState<any[]>([]);
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let agee = 0;

  //let date = useRef<HTMLIonDatetimeElement>(null);
  const appuie = () => {
    console.log(groupe, idclinique, nom, prenom, sexe, age, telephone1, telephone2, quartier, adresse, maison, remarque);
  }
  // const getcli = () => {
  //   Axios.get('http://localhost:3001/afficheclinique').then((response) => {
  //     setCliniklist(response.data);
  //   })
  // }
  // const redig = () => {
  //   { window.location.href = "/" }
  // }
  const getcli = () => {
    fetch('https://backend-medical.benindigital.com/afficheclinique').then((res) => {
      const data = res.json()
      return data
    }).then((data) => { 
      console.log(data);
      setCliniklist(data);
    })
  }
  const redig = () => {
    { window.location.href = "/" }
  }

  const convertion = () => {
    var d = new Date();
    agee = d.getFullYear() - parseInt(date.split("-")[0])
    console.log(agee);
    console.log(d);

  }





  const ajout = () => {
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
    antecedants = ant1 + ' ' + ant2 + ' ' + ant3 + ' ' + ant4 + ' ' + ant5 + ' ' + ant6 + ' '
    console.log(antecedants);
    console.log(date);
    console.log(agee);
    console.log(nom, prenom, sexe, agee, telephone1, remarque, groupe, adresse);


    if (nom) {
      if (prenom) {
        if (sexe) {
          if (agee) {
            if (telephone1) {
              if (groupe) {
                if (adresse) {
                  Axios.post('https://backend-medical.benindigital.com/create', {
                    nom: nom,
                    prenom: prenom,
                    sexe: sexe,
                    age: agee,
                    telephone1: telephone1,
                    telephone2: 12569877,
                    remarque: remarque,
                    groupe: groupe,
                    clinique: 1,
                    quartier: "ghfgfgf",
                    ville: adresse,
                    maison: "gcgvgdg",
                    antecedants: antecedants,
                    datenaissance: date,
                  }).then((ret) => {
                    if (ret.data == 'suc') {
                      // alert('Element enrégistré');
                      const glab = document.getElementById('glagla')
                      glab!.innerHTML = ''
                      glab!.innerHTML = `<div class="alert alert-info jiji" role="alert">
                        Enregistré
                      </div>`
                      setTimeout(() => {
                        // { window.location.href = "/listepat" }
                        glab!.innerHTML = ''
                        // setNom("")
                        // setPrenom('')
                        // setSexe('')
                        // setdate('')
                        // setGroupe('')
                        // setAntecedants1(false)
                        // setAntecedants2(false)
                        // setAntecedants3(false)
                        // setAntecedants4(false)
                        // setAntecedants5(false)
                        // setAntecedants6(false)
                        // setTelephone1(+'')
                        // setAdresse('')
                        // setRemarque('')
                        { window.location.href = "/listepat" }
                      }, 3000);


                    } else {
                    //  alert('Element non enrégistré');
                      const glab = document.getElementById('glagla')
                      glab!.innerHTML = ''
                      glab!.innerHTML = `<div class="alert alert-danger jiji" role="alert">
                      Non enrégistré
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
  // const ajout = () => {

  //   if (nom && prenom && sexe && age && telephone1 && remarque && groupe && idclinique) {
  //     fetch('https://backend.goesindustries.com/create', {
  //       mode: 'cors',
  //       credentials: 'include',
  //       method: 'POST',
  //       body: JSON.stringify({
  //         nom: nom,
  //         prenom: prenom,
  //         sexe: sexe,
  //         age: age,
  //         telephone1: telephone1,
  //         telephone2: telephone2,
  //         remarque: remarque,
  //         groupe: groupe,
  //         clinique: idclinique,
  //         quartier: quartier,
  //         ville: ville,
  //         maison: maison,
  //       })
  //     }).then((res) => {
  //       const data = res.json()
  //       return data
  //     }).then((data) => {
  //       if (data == 'suc') {
  //         alert('Element enrégistré');
  //         { window.location.href = "/listepat" }
  //       } else {
  //         alert('Element non enrégistré');
  //       }
  //     })
  //   } else {
  //     alert('Les champs doivent contenir au moins 4 lettres');
  //   }
  // };

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur

    console.log(clinik);
    console.log(prenom.search('zer'));


  }, []);
  const { photo, getPhoto } = useCamera();
  return (
    <>
      <IonApp>
        <IonHeader translucent>
          <IonToolbar color='primary'>
            <IonButtons slot="start">
              {/* <IonButton routerLink="/listepat"> */}
              <IonButton routerLink="/listepat">
                <IonIcon style={{ fontSize: '30px' }} icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>Nouveau patient</IonTitle>

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
                    <IonInput placeholder="" value={nom} onIonChange={(e) => { setNom(e.detail.value!) }}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Prenoms</IonLabel>
                    <IonInput placeholder="" value={prenom} onIonChange={(e) => { setPrenom(e.detail.value!) }}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonRadioGroup value={sexe} onIonChange={(e) => { setSexe(e.detail.value!) }}>
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
                    <IonInput type="date"  value={date}onIonChange={(e) => { setdate(e.detail.value!) }}></IonInput>
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
                  <IonCheckbox slot="start" color="primary" checked={antecedants2} onIonChange={(e) => { setAntecedants2(e.detail.checked) }}></IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonItem lines='none'>
                  <IonLabel>Cancer</IonLabel>
                  <IonCheckbox slot="start" color="primary" checked={antecedants4} onIonChange={(e) => { setAntecedants4(e.detail.checked) }}></IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem lines='none'>
                  <IonLabel>Drépanositose</IonLabel>
                  <IonCheckbox slot="start" color="primary" checked={antecedants3} onIonChange={(e) => { setAntecedants3(e.detail.checked) }}></IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem lines='none'>
                  <IonLabel>Sinusite</IonLabel>
                  <IonCheckbox slot="start" color="primary" checked={antecedants5} onIonChange={(e) => { setAntecedants5(e.detail.checked) }}></IonCheckbox>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem lines='none'>
                  <IonLabel>Tuberculose</IonLabel>
                  <IonCheckbox slot="start" color="primary" checked={antecedants6} onIonChange={(e) => { setAntecedants6(e.detail.checked) }}></IonCheckbox>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>



          <IonList lines="full" class="ion-no-margin">
            <IonItem>
              <IonLabel position="stacked">Coordonnées</IonLabel>
              <IonInput placeholder="Téléphone " type="number" onIonChange={(e) => { setTelephone1(parseInt(e.detail.value!)) }}></IonInput>
              {/* <IonInput placeholder="Téléphone 2" onIonChange={(e) => { setTelephone2(parseInt(e.detail.value!)) }}></IonInput> */}
              <IonInput placeholder="Adresse" value={adresse} onIonChange={(e) => { setAdresse(e.detail.value!) }}></IonInput>
              {/* <IonInput placeholder="Quartier" value={quartier} onIonChange={(e) => { setQuartier(e.detail.value!) }}></IonInput>
              <IonInput placeholder="Maison" value={maison} onIonChange={(e) => { setMaison(e.detail.value!) }}></IonInput> */}
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Notes supplémentaires</IonLabel>
              <IonTextarea placeholder="Notes supplémentaires" value={remarque} onIonChange={(e) => { setRemarque(e.detail.value!) }}></IonTextarea>
            </IonItem>

            <div className="ion-text-center ion-margin-top de">
              <IonButton color='success' onClick={() => { ajout() }}>Enregistrer</IonButton>
            </div>
          </IonList>

        </IonContent>
      </IonApp>
    </>
  )
};
export default Inscription;