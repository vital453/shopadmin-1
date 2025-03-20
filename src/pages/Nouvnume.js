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

function Nouvnume() {
  const dispatch = useDispatch();
  const [isSucces, setSuccess] = useState(null);
  const [isSucces2, setSuccess2] = useState(null);
  const [isSucces3, setSuccess3] = useState(null);
  const [messerr, setMesserr] = useState("debut");
  let article = useSelector((state) => state.product.product);
  const [categ, setCategList] = useState([]);
  const [nom, setNom] = useState();
  const [prix, setPrix] = useState();
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

  const [userInfo6, setuserInfo6] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo7, setuserInfo7] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo8, setuserInfo8] = useState({
    file: [],
    filepreview: null,
  });
  const [userInfo9, setuserInfo9] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange6 = async (event) => {
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
      setuserInfo6({
        ...userInfo6,
        file: myFile,
        filepreview: URL.createObjectURL(myFile),
      });
      // }
    }
  };
  const handleInputChange7 = async (event) => {
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
      setuserInfo7({
        ...userInfo7,
        file: myFile,
        filepreview: URL.createObjectURL(myFile),
      });
      // }
    }
  };
  const handleInputChange8 = async (event) => {
    if (event.target.files[0].type !== "video/mp4") {
      setMesserr("Veuillez insérer une vidéo au format mp4");
      setShowToast3(true);
      console.log(event.target.files[0].type);
    } else {
      // if (parseInt(event.target.files[0].size) > 3000000) {
      //   setShowToast4(true);
      //   setmessage("La taille de la video doit être inférieure à 3Mo");
      // } else {
      setuserInfo8({
        ...userInfo8,
        file: event.target.files[0],
        filepreview: URL.createObjectURL(event.target.files[0]),
      });
      // }
    }
  };
  const handleInputChange9 = async (event) => {
    // if (event.target.files[0].type !== "application/x-zip-compressed" &&
    // event.target.files[0].type !== "application/x-msdownload" && String(event.target.files[0].type) !== "<empty string>") {
    //   setMesserr("Veuillez choisir un element au format apk ou exe ou zip");
    //   setShowToast3(true);
    //   console.log(event.target.files[0].type);
    // } else {
    // if (parseInt(event.target.files[0].size) > 3000000) {
    //   setShowToast4(true);
    //   setmessage("La taille de la video doit être inférieure à 3Mo");
    // } else {
    setuserInfo9({
      ...userInfo9,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
    setMesserr("Fichier pris en charge");
    setShowToast3(true);
    // }
    // }
  };
  const submitt = async (e, a, obj) => {
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
    axios
      .put(`https://backendtrader.digitalfirst.space/imga/${e}/${a}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          console.log("image send");
          if (a == 1) {
            setTimeout(() => {
              setCurrentStep(6);
            }, 1000);
          } else if (a == 2) {
            setTimeout(() => {
              setCurrentStep(7);
            }, 1000);
          } else if (a == 5) {
            setTimeout(() => {
              setCurrentStep(8);
            }, 1000);
          }
          setbienpasse(false);
        }
      });
  };

  const submit2 = async (id_product, seller_id, obj) => {
    // setprogress(true);
    // setprogress1(true);
    // setprogress1(true);
    // toast.loading(
    //   "Opération en cours de traitement....\n\nVeuillez patienter.",
    //   {
    //     duration: 60000,
    //   }
    // );
    const formData = new FormData();
    formData.append("fileToUpload", obj);
    formData.append("id_product", id_product);
    formData.append("seller_id", seller_id);

    setTimeout(() => {
      setCurrentStep(9);
    }, 1000);
    axios
      .post(
        "https://backendtrader.digitalfirst.space/upload_numerique.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (
          res.data ===
          "Seuls les fichiers APK, EXE ou ZIP sont autorisés.Désolé, votre fichier n'a pas été téléversé."
        ) {
          setbienpasse(false);
          axios
            .post("https://backendtrader.digitalfirst.space/recupart", {
              id: id_product,
              id_boutique: seller_id,
              // id_boutique: JSON.parse(localStorage.getItem("parrain") + "")[0].id
            })
            .then((ret) => {
              supprimer(
                id_product,
                ret.data[0].picture1,
                ret.data[0].picture2,
                ret.data[0].picture3,
                ret.data[0].picture4,
                ret.data[0].video,
                1
              );
            });
        } else if (res.data === "Le fichier a été téléversé avec succès.") {
          // setprogress(false);
          // setprogress1(false);
          // setMesserr("Produit crée avec succèss");
          // setShowToast3(true);

          setTimeout(() => {
            setCurrentStep(10);
          }, 1000);
          setTimeout(() => {
            setbienpasse(true);
            setprogress(false);
            setprogress1(false);
            setShowToast2(true);
          }, 2000);
        } else if (
          res.data ===
          "Une erreur s'est produite lors de l'insertion dans la table."
        ) {
          setbienpasse(false);
          axios
            .post("https://backendtrader.digitalfirst.space/recupart", {
              id: id_product,
              id_boutique: seller_id,
              // id_boutique: JSON.parse(localStorage.getItem("parrain") + "")[0].id
            })
            .then((ret) => {
              supprimer(
                id_product,
                ret.data[0].picture1,
                ret.data[0].picture2,
                ret.data[0].picture3,
                ret.data[0].picture4,
                ret.data[0].video,
                2
              );
            });
        } else if (
          res.data ===
          "Une erreur s'est produite lors du téléversement de votre fichier."
        ) {
          setbienpasse(false);
          axios
            .post("https://backendtrader.digitalfirst.space/recupart", {
              id: id_product,
              id_boutique: seller_id,
              // id_boutique: JSON.parse(localStorage.getItem("parrain") + "")[0].id
            })
            .then((ret) => {
              supprimer(
                id_product,
                ret.data[0].picture1,
                ret.data[0].picture2,
                ret.data[0].picture3,
                ret.data[0].picture4,
                ret.data[0].video,
                3
              );
            });
        }
      })
      .catch((error) => {
        console.error("Erreur lors du téléversement du fichier.", error);
        setbienpasse(false);
        axios
          .post("https://backendtrader.digitalfirst.space/recupart", {
            id: id_product,
            id_boutique: seller_id,
            // id_boutique: JSON.parse(localStorage.getItem("parrain") + "")[0].id
          })
          .then((ret) => {
            supprimer(
              id_product,
              ret.data[0].picture1,
              ret.data[0].picture2,
              ret.data[0].picture3,
              ret.data[0].picture4,
              ret.data[0].video,
              3
            );
          });
      });
  };

  const supprimer = (idprod, img1, img2, img3, img4, video, sat) => {
    axios
      .post("https://backendtrader.digitalfirst.space/supprimer_article", {
        id_boutique: JSON.parse(localStorage.getItem("user") + "").BoutiqueId,
        id: idprod,
        pic1: img1,
        pic2: img2,
        pic3: img3,
        pic4: img4,
        vid: video,
      })
      .then((ret) => {
        console.log(ret.data);

        if (ret.data.message) {
          axios
            .post("https://backendtrader.digitalfirst.space/afficheart", {
              id_boutique: JSON.parse(localStorage.getItem("user") + "")
                .BoutiqueId,
            })
            .then((ret) => {
              dispatch(recupProduct(ret.data));
              if (sat === 1) {
                setMesserr(
                  "Seuls les fichiers APK, EXE ou ZIP sont autorisés.Désolé, votre fichier n'a pas été téléversé."
                );
                setShowToast3(true);
                setprogress(false);
                setprogress1(false);
                setCurrentStep(0);
              } else if (sat === 2) {
                setMesserr(
                  "Une erreur s'est produite lors de la creation du produit, veillez recommencer"
                );
                setShowToast3(true);
                setprogress(false);
                setCurrentStep(0);

                setprogress1(false);
              } else if (sat === 3) {
                setMesserr(
                  "Une erreur s'est produite lors de la creation du produit, veillez recommencer"
                );
                setShowToast3(true);
                setprogress(false);
                setprogress1(false);
                setCurrentStep(0);
              }
            });
          axios
            .post("https://backendtrader.digitalfirst.space/supprimer_numeric", {
              id_boutique: JSON.parse(localStorage.getItem("user") + "")
                .BoutiqueId,
              id_product: idprod,
            })
            .then((ret) => {
              console.log(ret);
            });
        } else {
          for (let i = 0; i < ret.data.length; i++) {
            console.log(ret.data[i].invoice);
            axios
              .post(
                "https://backendtrader.digitalfirst.space/update_art_after_sup",
                {
                  invoice: ret.data[i].invoice,
                  id_boutique: JSON.parse(localStorage.getItem("user") + "")
                    .BoutiqueId,
                }
              )
              .then((ret) => {
                if (ret.data === "succes") {
                  console.log("mis a jour");
                } else {
                }
              });
          }
          axios
            .post(
              "https://backendtrader.digitalfirst.space/suppr_art_after_upda",
              {
                id_boutique: JSON.parse(localStorage.getItem("user") + "")
                  .BoutiqueId,
                id: idprod,
                pic1: img1,
                pic2: img2,
                pic3: img3,
                pic4: img4,
                vid: video,
              }
            )
            .then((ret) => {
              if (ret.data === "succes") {
                axios
                  .post("https://backendtrader.digitalfirst.space/afficheart", {
                    id_boutique: JSON.parse(localStorage.getItem("user") + "")
                      .BoutiqueId,
                  })
                  .then((ret) => {
                    dispatch(recupProduct(ret.data));
                    if (sat === 1) {
                      setMesserr(
                        "Seuls les fichiers APK, EXE ou ZIP sont autorisés.Désolé, votre fichier n'a pas été téléversé."
                      );
                      setShowToast3(true);
                      setprogress(false);
                      setprogress1(false);
                      setCurrentStep(0);
                    } else if (sat === 2) {
                      setMesserr(
                        "Une erreur s'est produite lors de la creation du produit, veillez recommencer"
                      );
                      setShowToast3(true);
                      setprogress(false);
                      setprogress1(false);
                      setCurrentStep(0);
                    } else if (sat === 3) {
                      setMesserr(
                        "Une erreur s'est produite lors de la creation du produit, veillez recommencer"
                      );
                      setShowToast3(true);
                      setprogress(false);
                      setprogress1(false);
                      setCurrentStep(0);
                    }
                  });
              } else {
              }
            });
          axios
            .post("https://backendtrader.digitalfirst.space/supprimer_numeric", {
              id_boutique: JSON.parse(localStorage.getItem("user") + "")
                .BoutiqueId,
              id_product: idprod,
            })
            .then((ret) => {
              console.log(ret);
            });
        }
      });
  };

  const envoInume = () => {
    setprogress(true);
    // setprogress1(true);
    // setprogress1(true);
    // toast.loading(
    //   "Opération en cours de traitement....\n\nVeuillez patienter.",
    //   {
    //     duration: 60000,
    //   }
    // );
    if (nom && prix) {
      // if (1 < 2) {
      // console.log(stock,"mon stock");
      if (userInfo9.file.name) {
        setTimeout(() => {
          setCurrentStep(1);
        }, 500);
        setTimeout(() => {
          setCurrentStep(2);
        }, 1000);
        setTimeout(() => {
          setCurrentStep(3);
        }, 1000);
        setTimeout(() => {
          setCurrentStep(4);
        }, 1000);
        axios
          .post("https://backendtrader.digitalfirst.space/newart", {
            nom: nom,
            prix: prix,
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
            paiment_mode: "paiement",
            type_product: "Numerique",
            quantifiable_product: "non",
            // mdlivraison: mdLivraison,
            // promotion: promotion,
            // delailivre: delailivre,
            // disponibilite: disponibilite,
          })
          .then((ret) => {
            if (ret.data) {
              setTimeout(() => {
                setCurrentStep(5);
              }, 1000);
              console.log(ret.data[0].tota);
              setId(ret.data[0].tota);
              if (userInfo6.file.name) {
                submitt(ret.data[0].tota, 1, userInfo6.file);
              } else {
                setTimeout(() => {
                  setCurrentStep(6);
                }, 1000);
              }
              if (userInfo7.file.name) {
                submitt(ret.data[0].tota, 2, userInfo7.file);
              } else {
                setTimeout(() => {
                  setCurrentStep(7);
                }, 1000);
              }

              if (userInfo8.file.name) {
                submitt(ret.data[0].tota, 5, userInfo8.file);
              } else {
                setTimeout(() => {
                  setCurrentStep(8);
                }, 1000);
              }
              if (userInfo9.file.name) {
                submit2(ret.data[0].tota, userid.BoutiqueId, userInfo9.file);
              } else {
                setTimeout(() => {
                  setCurrentStep(9);
                }, 2000);
              }
              const id = ret.data[0].tota;

              axios
                .post("https://backendtrader.digitalfirst.space/afficheart", {
                  id_boutique: userid.BoutiqueId,
                })
                .then((ret) => {
                  dispatch(recupProduct(ret.data));
                });
            }
          });
        // } else {
        //   setMesserr("Veuillez insérer au moin les images 1 et 2");
        //   setShowToast3(true);
        //   setprogress(false);
        // }
      } else {
        setMesserr(
          "Veuillez selectionnée le fichier zip ou exe ou apk à téléversé"
        );
        setShowToast3(true);
        setprogress(false);
        setprogress1(false);
        setCurrentStep(0);
      }
    } else {
      setMesserr("Veuillez remplir les champs");
      setShowToast3(true);
      setprogress(false);
      setprogress1(false);
      setCurrentStep(0);
    }
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
                        <h3 className="text-red-700">&nbsp;&nbsp;&nbsp; *</h3>
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
                        <h3 className="text-red-700">&nbsp;&nbsp;&nbsp; *</h3>
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

                  {/* <div className="mt-4">
                    <IonSegment
                      className="nereide"
                      onIonChange={(e) => {
                        setSegg(e.detail.value);
                      }}
                      value={segg}
                      scrollable={true}
                      mode="ios"
                    >
                      <IonSegmentButton value="Initialiser">
                        <IonLabel>Initialiser</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton value="Non Initialiser">
                        <IonLabel>Non Initialiser</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>
                    <div className="div2">
                      {segg === "Initialiser" ? (
                        <>
                          <BiInfoCircle
                            className="text-zinc-600 text-xl"
                            onClick={() => {
                              setShowToast7(true);
                            }}
                          />
                          <IonItem className="ser">
                            <IonLabel position="floating" className="kaw">
                              <div className="flex items-center justify-center text-center">
                                <h3 className="text-xl">Stock initial</h3>{" "}
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

                      {segg === "Non Initialiser" ? (
                        <div className="flex justify-end items-center">
                          <BiInfoCircle
                            className="text-zinc-600 text-xl"
                            onClick={() => {
                              setShowToast8(true);
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div> */}

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
                </div>
              </IonList>
              <IonRow className="ion-margin-top rang">
                <IonCol className="divn1">
                  {isSucces !== null ? (
                    <h4 className="textn1"> {isSucces} </h4>
                  ) : null}
                  <label for="file6" className="sims">
                    {userInfo6.filepreview != null ? (
                      <img
                        src={userInfo6.filepreview}
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
                      id="file6"
                      name="upload_file"
                      onChange={handleInputChange6}
                    />
                  </label>
                </IonCol>
                <IonCol className="divn1">
                  {isSucces2 !== null ? (
                    <h4 className="textn2"> {isSucces2} </h4>
                  ) : null}
                  <label for="file7" className="sims">
                    {userInfo7.filepreview != null ? (
                      <img
                        src={userInfo7.filepreview}
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
                      id="file7"
                      name="upload_file"
                      // onChange={(e)=>{console.log(e.target.files[0].type);}}
                      onChange={handleInputChange7}
                    />
                  </label>
                </IonCol>
              </IonRow>
              <IonRow className="ion-margin-top rang">
                <IonCol className="divn1">
                  {isSucces !== null ? (
                    <h4 className="textn1"> {isSucces} </h4>
                  ) : null}
                  <label for="file8" className="sims">
                    {userInfo8.filepreview != null ? (
                      <img
                        src={userInfo8.filepreview}
                        alt="UploadImage"
                        className="im11"
                      />
                    ) : (
                      <IonIcon
                        icon={videocamOutline}
                        style={{ fontSize: "90px" }}
                        slot="end"
                      />
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file8"
                      name="upload_file"
                      onChange={handleInputChange8}
                    />
                  </label>
                </IonCol>
                <IonCol className="divn1">
                  {isSucces2 !== null ? (
                    <h4 className="textn2"> {isSucces2} </h4>
                  ) : null}
                  <label for="file9" className="sims">
                    {/* {userInfo9.filepreview != null ? (
                        <img
                          src="approuver.png"
                          alt="UploadImage"
                          className="flex h-24 w-24 object-cover"
                        />
                      ) : (
                        <IonIcon
                          icon={fileTrayFull}
                          style={{ fontSize: "90px" }}
                        />
                      )} */}
                    <IonIcon icon={fileTrayFull} style={{ fontSize: "90px" }} />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file9"
                      name="upload_file"
                      // onChange={(e)=>{console.log(e.target.files[0].type);}}
                      onChange={handleInputChange9}
                    />
                  </label>
                </IonCol>
              </IonRow>
              {/* <IonRow className="droid">
                  
                  <label for="file5">
                    {userInfo8.filepreview != null ? (
                      <video controls height="200" className="im11">
                        <source src={userInfo8.filepreview} />
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
                      onChange={handleInputChange8}
                    />
                  </label>
                </IonRow> */}
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
                    className="ion-text-center mb-5"
                    color="secondary"
                    onClick={() => {
                      envoInume();
                      // setShowToast9(true);
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
export default Nouvnume;
