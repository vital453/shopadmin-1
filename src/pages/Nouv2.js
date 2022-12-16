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
} from "@ionic/react";
import {
  arrowBack,
  arrowForward,
  cameraOutline,
  checkmarkSharp,
  chevronBack,
  closeCircle,
  closeCircleOutline,
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

function Nouv2() {
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
  const [category, setCategory] = useState();
  const [like, setLike] = useState();
  const [promotion, setPromotion] = useState(0);
  const [mdLivraison, setmdLivraison] = useState();
  const [disponibilite, setDisponibilite] = useState();
  const [delailivre, setDelailivre] = useState(1);
  const [description, setDescription] = useState();
  const [stock, setStock] = useState();
  const [reduc, setReduc] = useState(false);
  const [Id, setId] = useState(null);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast5, setShowToast5] = useState(false);
  const [showToast6, setShowToast6] = useState(false);
  const userid = useSelector((state) => state.auth.user);
  const [progress, setprogress] = useState(false);
  const [presentAlert] = useIonAlert();
  const [namecate, setNamecate] = useState("");
  const [message, setmessage] = useState("La taille des images doit être inférieure à 1Mo");

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
      event.target.files[0].type != "image/jpg" &&
      event.target.files[0].type != "image/png" &&
      event.target.files[0].type != "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 1000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 1Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          30
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo({
          ...userInfo,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange2 = async (event) => {
    if (
      event.target.files[0].type != "image/jpg" &&
      event.target.files[0].type != "image/png" &&
      event.target.files[0].type != "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 1000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 1Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          30
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo2({
          ...userInfo2,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange3 = async (event) => {
    if (
      event.target.files[0].type != "image/jpg" &&
      event.target.files[0].type != "image/png" &&
      event.target.files[0].type != "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 1000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 1Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          30
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo3({
          ...userInfo3,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange4 = async (event) => {
    if (
      event.target.files[0].type != "image/jpg" &&
      event.target.files[0].type != "image/png" &&
      event.target.files[0].type != "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 1000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 1Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          30
        );
        const myFile = new File([res], event.target.files[0].name, {
          type: res.type,
        });
        setuserInfo4({
          ...userInfo4,
          file: myFile,
          filepreview: URL.createObjectURL(myFile),
        });
      }
    }
  };
  const handleInputChange5 = async (event) => {
    if (event.target.files[0].type != "video/mp4") {
      setMesserr("Veuillez insérer une vidéo au format mp4");
      setShowToast3(true);
      console.log(event.target.files[0].type);
    } else {
      if (parseInt(event.target.files[0].size) > 3000000) {
        setShowToast4(true);
        setmessage("La taille de la video doit être inférieure à 3Mo");
      } else {
        setuserInfo5({
          ...userInfo5,
          file: event.target.files[0],
          filepreview: URL.createObjectURL(event.target.files[0]),
        });
      }
    }
  };

  const submit = async (e, a, obj) => {
    const formdata = new FormData();
    formdata.append("avatar", obj);
    axios
      .put(`http://backend-shop.benindigital.com/imga/${e}/${a}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          // setSuccess("Image" + a + " upload successfully")
          // if (a == 1) {
          //   setShowToast2(true);
          // }
        }
        axios
          .post("https://backend-shop.benindigital.com/afficheart", {
            id_boutique: userid.BoutiqueId,
          })
          .then((ret) => {
            dispatch(recupProduct(ret.data));
            setShowToast2(true);
            setprogress(false);
            // setShowToast2(true);
          });
      });
  };

  const submit2 = async (e, a) => {
    const formdata2 = new FormData();
    formdata2.append("avatar", userInfo2.file);
    axios
      .put(`http://backend-shop.benindigital.com/imga/${e}/${a}`, formdata2, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          setSuccess("Image upload successfully");
        }
      });
  };

  const envoi = () => {
    setprogress(true);
    if (nom && prix && stock && description && category && prixachat) {
      // if (1 < 2) {
      axios
        .post("https://backend-shop.benindigital.com/newart", {
          nom: nom,
          prix: prix,
          stock: stock,
          descript: description,
          reduc: reduc,
          seller_id: userid.BoutiqueId,
          // like: like,
          category: category,
          prixachat: prixachat,
          // mdlivraison: mdLivraison,
          // promotion: promotion,
          // delailivre: delailivre,
          // disponibilite: disponibilite,
        })
        .then((ret) => {
          if (ret.data) {
            console.log(ret.data[0].tota);
            setId(ret.data[0].tota);
            if (userInfo.file.name) {
              submit(ret.data[0].tota, 1, userInfo.file);
            }
            if (userInfo2.file.name) {
              submit(ret.data[0].tota, 2, userInfo2.file);
            }

            if (userInfo3.file.name) {
              submit(ret.data[0].tota, 3, userInfo3.file);
            }
            if (userInfo4.file.name) {
              submit(ret.data[0].tota, 4, userInfo4.file);
            }
            if (userInfo5.file.name) {
              submit(ret.data[0].tota, 5, userInfo5.file);
            }

            if (!userInfo.file.name && !userInfo2.file.name && !userInfo3.file.name && !userInfo4.file.name) {
              axios.post("https://backend-shop.benindigital.com/afficheart", {
                id_boutique: userid.BoutiqueId,
              })
                .then((ret) => {
                  dispatch(recupProduct(ret.data));
                  setprogress(false);
                  setShowToast2(true);
                });
            }

          } else {
            //  alert('Element non enrégistré');
          }
        });
      // } else {
      //   setMesserr("Veuillez insérer au moin les images 1 et 2");
      //   setShowToast3(true);
      //   setprogress(false);
      // }
    } else {
      setMesserr("Veuillez remplir tous les champs");
      setShowToast3(true);
      setprogress(false);
    }
  };
  const createcate = (nameteca) => {
    if (nameteca !== "") {
      setShowToast5(false);
      axios
        .post("https://backend-shop.benindigital.com/addcategory", {
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
      .post("https://backend-shop.benindigital.com/affichecategory", {
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
      <IonContent>
        <div className="listener">
          <IonList className="hom">
            <div className="div11">
              {/* <IonItem lines='none' className='kaw' >Ajouter un produit</IonItem> */}
              <IonItem className="ser">
                <IonLabel position="floating" className="kaw">
                  Nom
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
                  Prix de vente
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
                  Prix d'achat
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
              <IonItem className="ser">
                <IonLabel position="floating" className="kaw">
                  Stock:
                </IonLabel>
                <IonInput
                  type="number"
                  value={stock}
                  onIonChange={(e) => {
                    setStock(e.target.value);
                  }}
                ></IonInput>
              </IonItem>
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
                          handler: () => { },
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
                  <IonIcon icon={imagesOutline} style={{ fontSize: "90px" }} />
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
                  <IonIcon icon={imagesOutline} style={{ fontSize: "90px" }} />
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
                <IonIcon icon={videocamOutline} style={{ fontSize: "90px" }} />
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
              <div className="mb-3"></div>
              <IonProgressBar type="indeterminate"></IonProgressBar>
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
export default Nouv2;
