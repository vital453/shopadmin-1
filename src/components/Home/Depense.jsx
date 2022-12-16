/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Axios from "axios";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setcaisse,
  sethisto_decaisse,
  sethisto_depense,
} from "../../Feature/CaisseSlice";

const Depense = () => {
  const [montant, setmontant] = useState("");
  const [observation, setobservation] = useState("");
  const [ifmontant, setIfmontant] = useState(false);
  const [ifobservation, setIfobservation] = useState(false);
  const [ifmontdepa, setIfmontdepa] = useState(false);
  const [type, settype] = useState("sellers");
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const caisse_value = useSelector((state) => state.Caisse.caisse);
  const userid = useSelector((state) => state.auth.user);
  const [progress, setprogress] = useState(false);
  const dispatch = useDispatch();
  const boutiqueid = useSelector((state) => state.auth.user);
  const accesparcompte = useSelector((state) => state.Hash.accesparcompte);

  const dep = () => {
    if (!montant) {
      setIfmontant(true);
      setTimeout(() => {
        setIfmontant(false);
      }, [4000]);
    } else {
      setIfmontant(false);
    }
    if (!observation) {
      setIfobservation(true);
      setTimeout(() => {
        setIfobservation(false);
      }, [4000]);
    } else {
      setIfobservation(false);
    }

    if (montant && observation) {
      const last_caisse = caisse_value[0].caisse;
      console.log(last_caisse);
      const end_caisse = parseInt(last_caisse) - parseInt(montant);
      console.log(end_caisse);
      if (montant > parseInt(last_caisse)) {
        setIfmontdepa(true);
        setTimeout(() => {
          setIfmontdepa(false);
        }, [4000]);
      } else {
        setprogress(true);
        setShowLoading(true);
        setIfmontdepa(false);
        Axios.post("https://backend-shop.benindigital.com/create_depense", {
          id_boutique: userid.BoutiqueId,
          montant: montant,
          last_caisse: last_caisse,
          end_caisse: end_caisse,
          observation: observation,
        }).then((res) => {
          getCaisse();
          gethisto_decaissement();
          gethisto_depense();
          setShowLoading(false);
          setShowToast(true);
          setmontant("");
          setobservation("");
          setprogress(false);
          console.log(res.data);
        });
      }
    }
  };
  const getCaisse = () => {
    Axios.post("https://backend-shop.benindigital.com/caisse_val", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(setcaisse(ret.data));
    });
  };
  const gethisto_depense = () => {
    Axios.post("https://backend-shop.benindigital.com/histo_depense", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_depense(ret.data));
    });
  };
  const gethisto_decaissement = () => {
    Axios.post("https://backend-shop.benindigital.com/histo_decaissement", {
      id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
    }).then((ret) => {
      console.log(ret.data);
      dispatch(sethisto_decaisse(ret.data));
    });
  };
  useEffect(() => {
    console.log(caisse_value[0].caisse);
    console.log(userid.userId);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/home">
              <IonIcon color="medium" icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className="nereide">Digital trader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={5000}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Dépense éffectué avec succèss"
        duration={1500}
        position="top"
      />
      <IonContent>
        {accesparcompte
          .filter((t) => t.id_boutique === boutiqueid.BoutiqueId)
          .map((bat) => {
            return bat.gestion_depense === 1 ? (
              <>
                <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                  <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div class="flex flex-col overflow-y-auto md:flex-row">
                      {/* <div class="h-32 md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  class="object-cover w-full h-full dark:hidden"
                  src="create-account-office.jpeg"
                  alt="Office"
                />
                <img
                  aria-hidden="true"
                  class="hidden object-cover w-full h-full dark:block"
                  src="create-account-office-dark.jpeg"
                  alt="Office"
                />
              </div> */}
                      <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div class="w-full flex flex-col">
                          <div className="w-full items-center justify-center text-center">
                            <h1 class="mb-4 text-xl  text-gray-700 dark:text-gray-200">
                              Le solde de votre caisse est de :{" "}
                              {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "XOF",
                              }).format(caisse_value[0].caisse)}
                            </h1>
                            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                              Ajouter une dépense
                            </h1>
                          </div>

                          <label class=" text-sm">
                            <span class="text-gray-700 dark:text-gray-400">
                              Montant
                            </span>
                            <IonInput
                              className="w-full mt-1 h-10 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                              placeholder="Entrez un montant"
                              type="number"
                              value={montant}
                              onIonChange={(e) => setmontant(e.target.value)}
                            />
                          </label>
                          {ifmontant && (
                            <div className="empty_full">
                              Veuillez entrez un montant!
                            </div>
                          )}
                          <label class=" mt-4 text-sm">
                            <span class="text-gray-700 dark:text-gray-400">
                              Observation
                            </span>
                            <IonTextarea
                              className="w-full mt-1 h-50 text-sm border-2 border-color bg-white rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                              placeholder="observation"
                              // type="password"
                              value={observation}
                              onIonChange={(e) =>
                                setobservation(e.target.value)
                              }
                            />
                          </label>
                          {ifobservation && (
                            <div className="empty_full">
                              Veuillez entrez l'observation!
                            </div>
                          )}
                          {ifmontdepa && (
                            <div className="empty_full">
                              Le montant entrez est superieur a la caisse
                            </div>
                          )}
                          {progress ? (
                            <>
                              <IonProgressBar type="indeterminate"></IonProgressBar>
                            </>
                          ) : (
                            <>
                              <a
                                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={dep}
                              >
                                Valider la dépense
                              </a>
                            </>
                          )}
                          <hr class="my-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center text-2xl mt-14">
                vous n'avez pas accès à cette page
              </div>
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default Depense;
