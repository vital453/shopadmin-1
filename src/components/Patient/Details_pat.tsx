import {IonCol,IonModal,IonListHeader,IonRadio,IonTextarea,IonThumbnail,IonAvatar,IonSelectOption,IonPage,IonItemDivider,IonSelect,IonRadioGroup,IonGrid,IonInput,IonRow,IonAlert,} from "@ionic/react";
import {calculatorOutline,camera,personCircle,personSharp,refreshOutline,} from "ionicons/icons";
import "../Patient/ModalExample1.css";
import { IonButtons, IonHeader } from "@ionic/react";
import { IonButton } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { arrowBack, addCircle } from "ionicons/icons";
import { IonContent } from "@ionic/react";
import { IonApp } from "@ionic/react";
import { IonList } from "@ionic/react";
import { IonItem } from "@ionic/react";
import { IonLabel } from "@ionic/react";
import { IonToolbar } from "@ionic/react";
import { IonTitle } from "@ionic/react";
import { IonSearchbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { Tableau1 } from "../Tableau1";
export const Details_pat: React.SFC<{}> = () => {
  // const [donner1, setDonner1] = useState(ondetail())
  const [clinique, setClinique] = useState("Clinique A");
  const [groupe, setGroupe] = useState("A");
  // const [newNom, setNewnom] = useState<String | undefined>(nom);
  // const [newPrenom, setNewprenom] = useState(prenom);
  // const redig = () => {
  //     { window.location.href = `/ajoutpat/${id}` }
  //   }
    const [idant, setIdant] = useState(0);
    useEffect(() => {
      const id = window.location.pathname.split("/")[2]
      const idd = parseInt(id);
      console.log(id);
      console.log(Tableau1[idd]);
      setIdant(idd)
       const ghy="baba"
       console.log(ghy);

  }, [])
  return (
      <>
          <IonApp>
              <IonHeader translucent>
                  <IonToolbar color="primary">
                      <IonTitle>Details Patient</IonTitle>
                      <IonButtons slot="start">
                          <IonButton
                             routerLink="/listepat"
                          >
                              <IonIcon
                                  style={{ fontSize: "30px" }}
                                  icon={arrowBack}
                                  color=""
                              />
                          </IonButton>
                      </IonButtons>
                  </IonToolbar>
              </IonHeader>

              <IonContent fullscreen>
                  <IonList lines="full" class="ion-no-margin">
                      <IonItem>
                          <h5>
                              <IonIcon style={{ fontSize: "62px" }} icon={personCircle} />
                          </h5>
                      </IonItem>
                      <IonItem>
                          <div className="kod">
                              <div className="lab">
                                  <h5>Nom</h5>
                              </div>
                              <div className="op">
                                  <p>{Tableau1[idant].Duree}</p>
                              </div>
                          </div>

                      </IonItem>
                      <IonItem>
                          <div className="kod">
                              <div className="lab">
                                  <h5 >Prenom</h5>
                              </div>
                              <div className="op">
                                  <p>{Tableau1[idant].Theme}</p>
                              </div>
                          </div>

                      </IonItem>
                      <IonItem>
                          <div className="kod">
                              <div className="lab">
                                  <h5 >Age</h5>
                              </div>
                              <div className="op">
                                  <p>{Tableau1[idant].Theme}</p>
                              </div>
                          </div>

                      </IonItem>
                      <IonItem>
                          <div className="kod">
                                  <div className="lab">
                                      <h5 >Sexe</h5>
                                  </div>
                                  <div className="op">
                                      <p>{Tableau1[idant].Theme}</p>
                                  </div>
                          </div>


                      </IonItem>
                      <IonItem>
                          <div className="kod">
                              <div className="lab">
                                  <h5>Groupe Sanguin</h5>
                              </div>
                              <div className="op">
                                  <p>{Tableau1[idant].Theme}</p>
                              </div>
                          </div>

                      </IonItem>
                      <IonItem>
                          <div className="kod">
                              <div className="lab">
                                  <h5>Clinique</h5>
                              </div>
                              <div className="op">
                                  <p>{Tableau1[idant].Theme}</p>
                              </div>
                          </div>

                      </IonItem>
                      <IonItem>
                          <div className="kod">
                              <div className="lab">
                                  <h5>Adresse</h5>
                              </div>
                              <div className="op">
                                  <p>{Tableau1[idant].Theme}</p>
                              </div>
                          </div>
                      </IonItem>

                      <IonItem>
                          <div className="kod">
                              <div className="lab">
                                  <h5>Remarques</h5>
                              </div>
                              <div className="op">
                                  <p>{Tableau1[idant].Theme}</p>
                              </div>
                          </div>
                      </IonItem>
                      <IonItem className="ion-margin-top" lines="none">
                          <IonCol>
                              <IonButton color="success" routerLink={`/ajoutpat/${idant}`}>Editer</IonButton>
                          </IonCol>
                          <IonCol>
                              <IonButton color="danger">Supprimer</IonButton>
                          </IonCol>
                          <IonCol>
                              <IonButton routerLink={`/new_rdv/${idant}`}>Voir rdv</IonButton>
                          </IonCol>
                          
                      </IonItem>
                                
                                

                      {/* <h5>
                <h5>Nom</h5>
                <p> {nom}</p>
              </h5>
              <h5>
                <h5>Prenom</h5>
                <p>{prenom}</p>
              </h5> */}
                  </IonList>
              </IonContent>
          </IonApp>
      </>
  );
};