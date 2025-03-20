/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonSelectOption,
  IonToast,
  IonSelect,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonicSlides,
  IonBadge,
  IonCardSubtitle,
  IonFab,
  IonFabButton,
  IonFabList,
  IonRefresher,
  IonRefresherContent,
  IonModal,
  IonLabel,
  IonItem,
  IonInput,
  IonCol,
  IonRow,
  IonThumbnail,
  IonList,
  IonProgressBar,
  useIonAlert,
  IonTextarea,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  arrowBack,
  arrowForward,
  cameraOutline,
  checkmarkSharp,
  chevronBack,
  closeCircle,
  closeCircleOutline,
  fileTrayFull,
  imagesOutline,
  informationCircle,
  trash,
  trashOutline,
  trashSharp,
  videocamOutline,
} from "ionicons/icons";
import { car } from "ionicons/icons";
import "./Nouv2.css";
import * as imageConversion from "image-conversion";
import { recupCateg, recupProduct } from "../Feature/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { BiInfoCircle } from "react-icons/bi";
import {
  setnon,
  setnormal,
  setnumeric,
  setoui,
} from "../Feature/DeclencheursSlice";
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';

function Nouvphy() {
  const dispatch = useDispatch();
  const [isSucces, setSuccess] = useState(null);
  const [isSucces2, setSuccess2] = useState(null);
  const [isSucces3, setSuccess3] = useState(null);
  const [messerr, setMesserr] = useState("debut");
  let article = useSelector((state) => state.product.product);
  const [categ, setCategList] = useState([]);
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState(1);
  const [prixachat, setPrixachat] = useState();
  const [category, setCategory] = useState("");
  const [like, setLike] = useState();
  const [promotion, setPromotion] = useState(0);
  const [mdLivraison, setmdLivraison] = useState();
  const [disponibilite, setDisponibilite] = useState();
  const [delailivre, setDelailivre] = useState(1);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [reduc, setReduc] = useState(false);
  const [Id, setId] = useState(null);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast5, setShowToast5] = useState(false);
  const [showToast6, setShowToast6] = useState(false);
  const [showToast7, setShowToast7] = useState(false);
  const [showToast8, setShowToast8] = useState(false);
  const [showToast9, setShowToast9] = useState(false);
  const [bienpasse, setbienpasse] = useState(false);
  const userid = useSelector((state) => state.auth.user);
  const oui = useSelector((state) => state.triggers.oui);
  const non = useSelector((state) => state.triggers.non);
  const [progress, setprogress] = useState(false);
  const [progress1, setprogress1] = useState(false);
  const [presentAlert] = useIonAlert();
  const [namecate, setNamecate] = useState("");
  const [message, setmessage] = useState(
    "La taille des images doit être inférieure à 1Mo"
  );

  const [segg, setSegg] = useState("Physique");

  const totalSteps = 10;
  const [currentStep, setCurrentStep] = useState(0);
  // Calculer la largeur de la barre de progression en pourcentage
  const [progressWidth, setprogressWidth] = useState(
    (currentStep / totalSteps) * 100
  );

  useEffect(() => {
    setprogressWidth((currentStep / totalSteps) * 100);
  }, [currentStep]);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [userInfo2, setuserInfo2] = useState({
    file: [],
    filepreview: null,
  });

  const [userInfo3, setuserInfo3] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo4, setuserInfo4] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo5, setuserInfo5] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      // if (parseInt(event.target.files[0].size) > 2000000) {
      //   setShowToast4(true);
      //   setmessage("La taille des images doit être inférieure à 2Mo");
      // } else {
      const res = await imageConversion.compressAccurately(
        event.target.files[0],
        500
      );
      const myFile = new File([res], event.target.files[0].name, {
        type: res.type,
      });
      setuserInfo({
        ...userInfo,
        file: myFile,
        filepreview: URL.createObjectURL(myFile),
      });
      // }
    }
  };
  const handleInputChange2 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      // if (parseInt(event.target.files[0].size) > 2000000) {
      //   setShowToast4(true);
      //   setmessage("La taille des images doit être inférieure à 2Mo");
      // } else {
      const res = await imageConversion.compressAccurately(
        event.target.files[0],
        500
      );
      const myFile = new File([res], event.target.files[0].name, {
        type: res.type,
      });
      setuserInfo2({
        ...userInfo2,
        file: myFile,
        filepreview: URL.createObjectURL(myFile),
      });
      // }
    }
  };
  const handleInputChange3 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      // if (parseInt(event.target.files[0].size) > 2000000) {
      //   setShowToast4(true);
      //   setmessage("La taille des images doit être inférieure à 2Mo");
      // } else {
      const res = await imageConversion.compressAccurately(
        event.target.files[0],
        500
      );
      const myFile = new File([res], event.target.files[0].name, {
        type: res.type,
      });
      setuserInfo3({
        ...userInfo3,
        file: myFile,
        filepreview: URL.createObjectURL(myFile),
      });
      // }
    }
  };
  const handleInputChange4 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      // if (parseInt(event.target.files[0].size) > 2000000) {
      //   setShowToast4(true);
      //   setmessage("La taille des images doit être inférieure à 2Mo");
      // } else {
      const res = await imageConversion.compressAccurately(
        event.target.files[0],
        500
      );
      const myFile = new File([res], event.target.files[0].name, {
        type: res.type,
      });
      setuserInfo4({
        ...userInfo4,
        file: myFile,
        filepreview: URL.createObjectURL(myFile),
      });
      // }
    }
  };
  const handleInputChange5 = async (event) => {
    if (event.target.files[0].type !== "video/mp4") {
      setMesserr("Veuillez insérer une vidéo au format mp4");
      setShowToast3(true);
      console.log(event.target.files[0].type);
    } else {
      // if (parseInt(event.target.files[0].size) > 3000000) {
      //   setShowToast4(true);
      //   setmessage("La taille de la video doit être inférieure à 3Mo");
      // } else {
      setuserInfo5({
        ...userInfo5,
        file: event.target.files[0],
        filepreview: URL.createObjectURL(event.target.files[0]),
      });
      // }
    }
  };

  const submit = async (e, a, obj) => {
    // setprogress(true);
    // setprogress1(true);
    // setprogress1(true);
    // toast.loading(
    //   "Opération en cours de traitement....\n\nVeuillez patienter.",
    //   {
    //     duration: 60000,
    //   }
    // );
    const formdata = new FormData();
    formdata.append("avatar", obj);
    await axios
      .put(`https://backendtrader.digitalfirst.space/imga/${e}/${a}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          console.log("image send");
          setbienpasse(true);
          if (a == 1) {
            setTimeout(() => {
              setCurrentStep(5);
            }, 1000);
          } else if (a == 2) {
            setTimeout(() => {
              setCurrentStep(6);
            }, 1000);
          } else if (a == 3) {
            setTimeout(() => {
              setCurrentStep(7);
            }, 1000);
          } else if (a == 4) {
            setTimeout(() => {
              setCurrentStep(8);
            }, 1000);
          } else if (a == 5) {
            setTimeout(() => {
              setCurrentStep(9);
            }, 1000);
          }
        } else {
          setbienpasse(false);
        }
      })
      .catch((error) => {});
  };

  const makeid = (length) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const trut = `Produit[${result}]`;
    return trut;
  };

  const envoi = async () => {
    setprogress(true);
    // setprogress1(true);
    // setprogress1(true);
    // toast.loading(
    //   "Opération en cours de traitement....\n\nVeuillez patienter.",
    //   {
    //     duration: 60000,
    //   }
    // );
    // if (nom && prix) {
    // if (1 < 2) {
    // console.log(stock,"mon stock");
    setTimeout(() => {
      setCurrentStep(1);
    }, 500);
    setTimeout(() => {
      setCurrentStep(2);
    }, 1000);
    setTimeout(() => {
      setCurrentStep(3);
    }, 1000);
    await axios
      .post("https://backendtrader.digitalfirst.space/newart", {
        nom: nom === "" ? makeid(5) : nom,
        prix: prix === 1 ? 1 : prix,
        stock: stock === 0 ? 0 : stock,
        descript:
          description === ""
            ? "Aucune description pour ce article"
            : description,
        reduc: reduc,
        seller_id: userid.BoutiqueId,
        // like: like,
        category: category === "" ? 27 : category,
        prixachat: prixachat === "" ? 0 : prixachat,
        paiment_mode: "whatsapp",
        type_product: "Physique",
        quantifiable_product: oui === 1 ? "oui" : "non",
        // mdlivraison: mdLivraison,
        // promotion: promotion,
        // delailivre: delailivre,
        // disponibilite: disponibilite,
      })
      .then((ret) => {
        if (ret.data) {
          setTimeout(() => {
            setCurrentStep(4);
          }, 1000);
          console.log(ret.data[0].tota);
          setId(ret.data[0].tota);
          if (userInfo.file.name) {
            submit(ret.data[0].tota, 1, userInfo.file);
          } else {
            setTimeout(() => {
              setCurrentStep(5);
            }, 1000);
          }
          if (userInfo2.file.name) {
            submit(ret.data[0].tota, 2, userInfo2.file);
          } else {
            setTimeout(() => {
              setCurrentStep(6);
            }, 1000);
          }

          if (userInfo3.file.name) {
            submit(ret.data[0].tota, 3, userInfo3.file);
          } else {
            setTimeout(() => {
              setCurrentStep(7);
            }, 1000);
          }
          if (userInfo4.file.name) {
            submit(ret.data[0].tota, 4, userInfo4.file);
          } else {
            setTimeout(() => {
              setCurrentStep(8);
            }, 1000);
          }
          if (userInfo5.file.name) {
            submit(ret.data[0].tota, 5, userInfo5.file);
          } else {
            setTimeout(() => {
              setCurrentStep(9);
            }, 1000);
          }
          const id = ret.data[0].tota;
          axios
            .post("https://backendtrader.digitalfirst.space/afficheart", {
              id_boutique: userid.BoutiqueId,
            })
            .then((ret) => {
              dispatch(recupProduct(ret.data));
              // if (bienpasse) {
              setTimeout(() => {
                setCurrentStep(10);
              }, 1000);
              setTimeout(() => {
                setprogress(false);
                setprogress1(false);
                setShowToast2(true);
              }, 2000);

              // } else {
              //   axios
              //     .post("https://backendtrader.digitalfirst.space/recupart", {
              //       id: id,
              //       id_boutique: userid.BoutiqueId,
              //       // id_boutique: JSON.parse(localStorage.getItem("parrain") + "")[0].id
              //     })
              //     .then((ret) => {
              //       supprimer(
              //         id,
              //         ret.data[0].picture1,
              //         ret.data[0].picture2,
              //         ret.data[0].picture3,
              //         ret.data[0].picture4,
              //         ret.data[0].video,
              //         2
              //       );
              //       setprogress(false);
              //       setprogress1(false);
              //     });
              // }
            });
        } else {
          //  alert('Element non enrégistré');
        }
      });
    // } else {
    //   setMesserr("Veuillez insérer au moin les images 1 et 2");
    //   setShowToast3(true);
    //   setprogress(false);
    // }
    // } else {
    //   setMesserr("Veuillez remplir tous les champs");
    //   setShowToast3(true);
    //   setprogress(false);
    //   setprogress1(false);
    //   setCurrentStep(0);
    // }
  };

  const createcate = (nameteca) => {
    if (nameteca !== "") {
      setShowToast5(false);
      axios
        .post("https://backendtrader.digitalfirst.space/addcategory", {
          id_boutique: userid.BoutiqueId,
          name: nameteca,
        })
        .then((ret) => {
          setShowToast6(true);
          getcat();
        });
    } else {
      setShowToast5(true);
    }
  };
  const getcat = () => {
    axios
      .post("https://backendtrader.digitalfirst.space/affichecategory", {
        id_boutique: userid.BoutiqueId,
      })
      .then((ret) => {
        setCategList(ret.data);
        dispatch(recupCateg(ret.data));
        console.log(ret.data);
      });
  };

  useEffect(() => {
    getcat();
  }, []);

  return (
    <>
      {progress1 && (
        <div>
          <Toaster />
        </div>
      )}
      <IonContent>
        <div className="listener1">
          {/* <div className="bg-white h-20 flex justify-center items-center rounded-xl">
            <button
              type="button"
              className={oui === 1 ? "neumorph neumorph1" : "neumorph"}
              onClick={() => {
                dispatch(setoui());
              }}
            >
              Normal
            </button>
            <button
              type="button"
              className={non === 1 ? "neumorph neumorph1" : "neumorph"}
              onClick={() => {
                dispatch(setnon());
              }}
            >
              Numerique
            </button>
          </div> */}
          <div className="mt-4">
            {/* <IonSegment
              className="nereide"
              onIonChange={(e) => {
                setSegg(e.detail.value);
              }}
              value={segg}
              scrollable={true}
              mode="ios"
            >
              <IonSegmentButton value="Physique">
                <IonLabel>Physique</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="Numerique">
                <IonLabel>Numerique</IonLabel>
              </IonSegmentButton>
            </IonSegment> */}
            <>
              <IonList className="hom">
                <div className="div11">
                  {/* <IonItem lines='none' className='kaw' >Ajouter un produit</IonItem> */}
                  <IonItem className="ser">
                    {/* <IonLabel position="floating" className="kaw"> */}
                    <IonLabel position="floating" className="kaw">
                      <div className="flex items-center justify-center text-center">
                        <h3 className="text-xl">Nom</h3>{" "}
                        {/* <h3 className="text-red-700">&nbsp;&nbsp;&nbsp; *</h3> */}
                      </div>
                    </IonLabel>
                    <IonInput
                      value={nom}
                      onIonChange={(e) => {
                        setNom(e.target.value);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem className="ser">
                    <IonLabel position="floating" className="kaw">
                      <div className="flex items-center justify-center text-center">
                        <h3 className="text-xl">Prix de vente</h3>{" "}
                        {/* <h3 className="text-red-700">&nbsp;&nbsp;&nbsp; *</h3> */}
                      </div>
                    </IonLabel>
                    <IonInput
                      type="number"
                      value={prix}
                      onIonChange={(e) => {
                        setPrix(e.target.value);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem className="ser">
                    <IonLabel position="floating" className="kaw">
                      <div className="flex items-center justify-center text-center">
                        <h3 className="text-xl">Prix d'achat</h3>{" "}
                        {/* <h3 className="text-red-700">&nbsp;&nbsp;&nbsp; *</h3> */}
                      </div>
                    </IonLabel>
                    <IonInput
                      type="number"
                      value={prixachat}
                      onIonChange={(e) => {
                        setPrixachat(e.target.value);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem className="ser">
                    <IonLabel position="floating" className="kaw">
                      Description
                    </IonLabel>
                    <IonTextarea
                      className="p-2"
                      value={description}
                      onIonChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></IonTextarea>
                  </IonItem>
                  <div className="flex p-3 text-base text-zinc-500 ">
                    {" "}
                    <span className="">
                      {" "}
                      voulez-vous gérer le stock pour ce produit ?{" "}
                    </span>
                  </div>
                  <div className="bg-white h-10 flex justify-center items-center rounded-xl">
                    <button
                      type="button"
                      className={oui === 1 ? "neumorph neumorph1" : "neumorph"}
                      onClick={() => {
                        dispatch(setoui());
                      }}
                    >
                      Oui
                    </button>
                    <button
                      type="button"
                      className={non === 1 ? "neumorph neumorph1" : "neumorph"}
                      onClick={() => {
                        dispatch(setnon());
                      }}
                    >
                      Non
                    </button>
                  </div>
                  <div className="div2">
                    {oui === 1 ? (
                      <>
                        {/* <BiInfoCircle
                            className="text-zinc-600 text-xl"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          /> */}
                        <IonItem className="ser">
                          <IonLabel position="floating" className="kaw">
                            <div className="flex items-center justify-center text-center">
                              <h3 className="text-xl">Stock initial</h3>{" "}
                              {/* <h3 className="text-red-700">&nbsp;&nbsp;&nbsp; *</h3> */}
                            </div>
                          </IonLabel>
                          <IonInput
                            type="number"
                            value={stock}
                            onIonChange={(e) => {
                              setStock(e.target.value);
                            }}
                          ></IonInput>
                        </IonItem>
                      </>
                    ) : null}

                    {non === 1 ? (
                      <div className="flex justify-end items-center">
                        {/* <BiInfoCircle
                            className="text-zinc-600 text-xl"
                            onClick={() => {
                              setShowToast8(true);
                            }}
                          /> */}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <IonItem className="ser w-72">
                      <IonLabel position="floating" className="kaw">
                        Categorie:
                      </IonLabel>
                      <IonSelect
                        value={category}
                        placeholder="Selectionner"
                        onIonChange={(e) => setCategory(e.detail.value)}
                      >
                        {categ.map((card, index) => {
                          return (
                            <IonSelectOption value={card.id}>
                              {card.nom}
                            </IonSelectOption>
                          );
                        })}
                      </IonSelect>
                    </IonItem>
                    <div
                      className="mt-4"
                      onClick={() => {
                        presentAlert({
                          header: "Catégorie",
                          buttons: [
                            {
                              text: "Ok",
                              cssClass: "secondary",
                              handler: (alertData) => {
                                //takes the data
                                // setQuantite(parseInt(alertData.name1));
                                // transfert(parseInt(alertData.name1));
                                console.log(alertData.name1.lenght + "val");
                                createcate(alertData.name1);
                              },
                            },
                            {
                              text: "RETOUR",
                              role: "cancel",
                              cssClass: "secondary",
                              handler: () => {},
                            },
                          ],
                          inputs: [
                            {
                              name: "name1",
                              type: "text",
                              placeholder: "Nom de lacategorie",
                              attributes: {
                                // maxlength: 4,
                              },
                              min: 1,
                              // max: 100,
                            },
                          ],
                        });
                      }}
                    >
                      <img
                        src="ajouter.png"
                        alt="Bout"
                        className="rounded-full w-9 h-9"
                      />
                    </div>
                  </div>

                  {/* <IonItem className='ser' ><IonLabel position='floating' className='kaw'>Nombre like</IonLabel>
                                <IonInput type='number' value={like} onIonChange={(e) => { setLike(e.target.value) }}></IonInput>
                            </IonItem> */}
                  {/* <IonItem className="ser">
                <IonLabel position="floating" className="kaw">
                  Promotion en %
                </IonLabel>
                <IonInput
                  type="number"
                  value={promotion}
                  onIonChange={(e) => {
                    setPromotion(e.target.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem className="ser">
                <IonLabel position="floating" className="kaw">
                  Mode de livraison:
                </IonLabel>
                <IonSelect
                  value={mdLivraison}
                  placeholder="Selectionner"
                  onIonChange={(e) => setmdLivraison(e.detail.value)}
                >
                  <IonSelectOption value="Livraison à domicile">
                    A domicile
                  </IonSelectOption>
                  <IonSelectOption value="livraison en boutique">
                    En boutique
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem className="ser">
                <IonLabel position="floating" className="kaw">
                  Disponibilité:
                </IonLabel>
                <IonSelect
                  value={disponibilite}
                  placeholder="Selectionner"
                  onIonChange={(e) => setDisponibilite(e.detail.value)}
                >
                  <IonSelectOption value="Disponibilité immédiate">
                    Immédiat
                  </IonSelectOption>
                  <IonSelectOption value="Disponible sur commande">
                    Sur commande
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
              {mdLivraison == "Livraison à domicile" ? (
                <IonItem className="ser">
                  <IonLabel position="floating" className="kaw">
                    Delai de livraison en jour
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={delailivre}
                    onIonChange={(e) => {
                      setDelailivre(e.target.value);
                    }}
                  ></IonInput>
              ) : null}
                </IonItem> */}
                </div>
              </IonList>
              <IonRow className="ion-margin-top rang">
                <IonCol className="divn1">
                  {isSucces !== null ? (
                    <h4 className="textn1"> {isSucces} </h4>
                  ) : null}
                  <label for="file" className="sims">
                    {userInfo.filepreview != null ? (
                      <img
                        src={userInfo.filepreview}
                        alt="UploadImage"
                        className="im11"
                      />
                    ) : (
                      <IonIcon
                        icon={imagesOutline}
                        style={{ fontSize: "90px" }}
                        slot="end"
                      />
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file"
                      name="upload_file"
                      onChange={handleInputChange}
                    />
                  </label>
                </IonCol>
                <IonCol className="divn1">
                  {isSucces2 !== null ? (
                    <h4 className="textn2"> {isSucces2} </h4>
                  ) : null}
                  <label for="file2" className="sims">
                    {userInfo2.filepreview != null ? (
                      <img
                        src={userInfo2.filepreview}
                        alt="UploadImage"
                        className="im11"
                      />
                    ) : (
                      <IonIcon
                        icon={imagesOutline}
                        style={{ fontSize: "90px" }}
                      />
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file2"
                      name="upload_file"
                      onChange={handleInputChange2}
                    />
                  </label>
                </IonCol>
              </IonRow>

              <IonRow className="ion-margin-top rang">
                <IonCol className="divn1">
                  <label for="file3" className="sims">
                    {userInfo3.filepreview != null ? (
                      <img
                        src={userInfo3.filepreview}
                        alt="UploadImage"
                        className="im11"
                      />
                    ) : (
                      <IonIcon
                        icon={imagesOutline}
                        style={{ fontSize: "90px" }}
                        slot="end"
                      />
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file3"
                      name="upload_file"
                      onChange={handleInputChange3}
                    />
                  </label>
                </IonCol>
                <IonCol className="divn1">
                  <label for="file4" className="sims">
                    {userInfo4.filepreview != null ? (
                      <img
                        src={userInfo4.filepreview}
                        alt="UploadImage"
                        className="im11"
                      />
                    ) : (
                      <IonIcon
                        icon={imagesOutline}
                        style={{ fontSize: "90px" }}
                      />
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file4"
                      name="upload_file"
                      onChange={handleInputChange4}
                    />
                  </label>
                </IonCol>
              </IonRow>
              <IonRow className="droid">
                <label for="file5">
                  {userInfo5.filepreview != null ? (
                    <video controls height="200" className="im11">
                      <source src={userInfo5.filepreview} />
                    </video>
                  ) : (
                    <IonIcon
                      icon={videocamOutline}
                      style={{ fontSize: "90px" }}
                    />
                  )}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file5"
                    name="upload_file"
                    onChange={handleInputChange5}
                  />
                </label>
              </IonRow>

              {progress ? (
                <>
                  {/* <div className="mb-3"></div>
                  <IonProgressBar type="indeterminate"></IonProgressBar> */}
                  <div>
                    <div className="progress-container">
                      <div
                        className="progress-barrrs"
                        style={{ width: `${progressWidth}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-center text-xl text-neutral-800 mt-4">
                      <span className="ml-0">Chargement des données</span>
                      <div class="ml-3 dot-spinner">
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                      </div>
                    </div>
                    {/* <div className="step-container">
                      <div
                        className={`step ${currentStep <= 5 ? "active" : ""}`}
                      >
                        Étape 1
                      </div>
                      <div
                        className={`step ${currentStep >= 6 ? "active" : ""}`}
                      >
                        Étape 2
                      </div>
                    </div> */}
                  </div>
                </>
              ) : (
                <>
                  <IonButton
                    expand="block"
                    className="ion-text-center"
                    color="secondary"
                    onClick={() => {
                      envoi();
                      // console.log(disponibilite);
                    }}
                  >
                    {" "}
                    Enrégistrer{" "}
                  </IonButton>
                </>
              )}
            </>
          </div>
        </div>{" "}
      </IonContent>

      <IonToast
        isOpen={showToast3}
        onDidDismiss={() => setShowToast3(false)}
        message={messerr}
        icon={informationCircle}
        position="top"
        duration={3000}
      />

      <IonToast
        isOpen={showToast4}
        onDidDismiss={() => setShowToast4(false)}
        message={message}
        icon={informationCircle}
        position="top"
        duration={3000}
      />

      <IonToast
        isOpen={showToast5}
        onDidDismiss={() => setShowToast5(false)}
        message={"Veillez saisir le nom de la catégorie"}
        icon={informationCircle}
        position="top"
        duration={3000}
      />

      <IonToast
        isOpen={showToast6}
        onDidDismiss={() => setShowToast6(false)}
        message={"Catégorie créé avec succès"}
        icon={informationCircle}
        position="top"
        duration={3000}
      />
      <IonToast
        isOpen={showToast7}
        onDidDismiss={() => setShowToast7(false)}
        message={"initialiser c'est ......"}
        icon={informationCircle}
        position="top"
        duration={5000}
      />
      <IonToast
        isOpen={showToast8}
        onDidDismiss={() => setShowToast8(false)}
        message={"non initialiser c'est ......"}
        icon={informationCircle}
        position="top"
        duration={5000}
      />
      <IonToast
        isOpen={showToast9}
        onDidDismiss={() => setShowToast9(false)}
        message={"Conception en cours pour cette section"}
        icon={informationCircle}
        position="top"
        duration={5000}
      />

      <IonToast
        className="dulcem"
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Produit ajouté"
        icon={informationCircle}
        position="top"
        buttons={[
          {
            text: "fermer",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ]}
      />

      {/* ********************************************************************************* */}

      {/* <div className="danaria"></div> */}

      {/* {userInfo.filepreview !== null ?
                <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                : null} */}
    </>
  );
}
export default Nouvphy;
