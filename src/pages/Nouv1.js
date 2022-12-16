import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
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
import { useSelector, useDispatch } from "react-redux";
import { recupCateg, recupProduct } from "../Feature/ProductSlice";

const Nouv1 = ({
  nomprod,
  prixv,
  prixa,
  desc,
  stockrest,
  idcateg,
  nbrelike,
  img1,
  img2,
  img3,
  img4,
  video,
  idprod,
}) => {
  // ({nomprod, prixv,prixa,desc,stockrest,idcateg,nbrelike,img1,img2,img3,img4,video, idprod })

  const [isSucces, setSuccess] = useState(null);
  const [isSucces2, setSuccess2] = useState(null);
  const [isSucces3, setSuccess3] = useState(null);
  const [messerr, setMesserr] = useState("debut");
  const [article, setArticle] = useState();
  const [categ, setCategList] = useState([]);
  const [produit, setProdList] = useState([]);
  const [nom, setNom] = useState(nomprod);
  const [prix, setPrix] = useState(prixv);
  const [prixachat, setPrixachat] = useState(prixa);
  const [category, setCategory] = useState(idcateg);
  const [like, setLike] = useState(nbrelike);
  const [progress, setprogress] = useState(false);

  const [promotion, setPromotion] = useState(
    useSelector((state) => state.product.product).filter(
      (t) => t.id == idprod
    )[0].discount_value
  );
  const [mdLivraison, setmdLivraison] = useState(
    useSelector((state) => state.product.product).filter(
      (t) => t.id == idprod
    )[0].mode_livraison
  );
  const [disponibilite, setDisponibilite] = useState(
    useSelector((state) => state.product.product).filter(
      (t) => t.id == idprod
    )[0].disponibilite
  );
  const [delailivre, setDelailivre] = useState(
    useSelector((state) => state.product.product).filter(
      (t) => t.id == idprod
    )[0].delai_livraison
  );
  const [description, setDescription] = useState(desc);
  const [stock, setStock] = useState(stockrest);
  const [reduc, setReduc] = useState(false);
  const [Id, setId] = useState(null);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast5, setShowToast5] = useState(false);
  const [showToast6, setShowToast6] = useState(false);
  const userid = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [presentAlert] = useIonAlert();
  const [namecate, setNamecate] = useState("");

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
      } else {
        setuserInfo5({
          ...userInfo5,
          file: event.target.files[0],
          filepreview: URL.createObjectURL(event.target.files[0]),
        });
      }
    }
  };

  const lot = () => {
    // let blob = fetch("https://matob.web.id/random/wp-content/uploads/sites/2/2021/12/CPANEL-e1638782508126.jpg").then(r => r.blob());
    // axios({
    //     url: "https://matob.web.id/random/wp-content/uploads/sites/2/2021/12/CPANEL-e1638782508126.jpg",
    //     method: "GET",
    //     responseType: 'image/jpeg',
    // }).then((response) => {
    //     setuserInfo({
    //         ...userInfo,
    //         file: '',
    //         filepreview: URL.createObjectURL(new Blob([response.data])),
    //     });
    //     console.log(response.data);
    // })
    //  `https://backend-shop.benindigital.com/${img1}`
  };
  const lot1 = () => {
    console.log(document.getElementById("rerun"));
  };
  function auxiliaire(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  // let base64= "auxiliaire(imgf)";
  // document.getElementById("rerun")

  var imgf = document.createElement("img");
  imgf.src = `https://backend-shop.benindigital.com/uploads/1657271084.jpg`;

  // let lij = (`https://backend-shop.benindigital.com/${img1}`);

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
          setSuccess("Image" + a + " upload successfully");

          // setShowToast2(true);
          axios
            .post("https://backend-shop.benindigital.com/afficheart", {
              id_boutique: userid.BoutiqueId,
            })
            .then((ret) => {
              dispatch(recupProduct(ret.data));
              setprogress(false);
              setShowToast2(true);
            });
        }
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

  const suppr = async () => {
    axios
      .post("https://backend-shop.benindigital.com/supprart", {
        id: 27,
      })
      .then((ret) => {
        console.log(ret.data);
      });
  };

  const envoi = () => {
    setprogress(true);
    if (
      nom &&
      prix &&
      stock &&
      description &&
      mdLivraison &&
      category &&
      prixachat &&
      disponibilite
    ) {
      axios.post("https://backend-shop.benindigital.com/editerart", {
        nom: nom,
        prix: prix,
        stock: stock,
        descript: description,
        reduc: reduc,
        seller_id: userid.BoutiqueId,
        // like: like,
        category: category,
        prixachat: prixachat,
        id: idprod,
        mdlivraison: mdLivraison,
        promotion: promotion,
        delailivre: delailivre,
        disponibilite: disponibilite,
      }).then((ret) => {
        if (ret.data == "suc") {
          console.log(ret);
          // setShowToast2(true);
          if (userInfo.file.name) {
            submit(idprod, 1, userInfo.file);
          }
          if (userInfo2.file.name) {
            submit(idprod, 2, userInfo2.file);
          }
          if (userInfo3.file.name) {
            submit(idprod, 3, userInfo3.file);
          }
          if (userInfo4.file.name) {
            submit(idprod, 4, userInfo4.file);
          }
          if (userInfo5.file.name) {
            submit(idprod, 5, userInfo5.file);
          }

          if (!userInfo.file.name && !userInfo2.file.name && !userInfo3.file.name && !userInfo4.file.name && !userInfo5.file.name) {
            axios.post("https://backend-shop.benindigital.com/afficheart", {
              id_boutique: userid.BoutiqueId,
            }).then((ret) => {
              dispatch(recupProduct(ret.data));
              setprogress(false);
              setShowToast2(true);
            });
          }

        } else {
          alert("Element non enrégistré");
        }
      });
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
    // console.log(userInfo);
    lot();
  }, []);

  return (
    <>
      <IonContent>
        {/* <IonItem className='ser' ><IonLabel position='floating' className='kaw'>Categorie:</IonLabel>
                    <IonSelect value={article} placeholder="Selectionner" onIonChange={e => setArticle(e.detail.value)}>
                        {produit.map((card, index) => {
                            return (
                                <IonSelectOption value={card.id}>{card.nom}</IonSelectOption>
                            )
                        })}
                    </IonSelect>
                </IonItem> */}
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
              <IonItem className="ser">
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
                  <IonSelectOption value="A domicile">
                    A domicile
                  </IonSelectOption>
                  <IonSelectOption value="En boutique">
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
                  <IonSelectOption value="Immédiat">Immédiat</IonSelectOption>
                  <IonSelectOption value="Sur commande">
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
                </IonItem>
              ) : null}
            </div>
          </IonList>
          <IonRow className="ion-margin-top rang">
            <IonCol className="divn1">
              <label for="file" className="sims">
                {userInfo.filepreview != null ? (
                  <img
                    src={userInfo.filepreview}
                    alt="UploadImage"
                    className="im11"
                  />
                ) : img1 != null ? (
                  <img
                    src={`https://backend-shop.benindigital.com/${img1}`}
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
              <label for="file2" className="sims">
                {userInfo2.filepreview != null ? (
                  <img
                    src={userInfo2.filepreview}
                    alt="UploadImage"
                    className="im11"
                  />
                ) : img2 != null ? (
                  <img
                    src={`https://backend-shop.benindigital.com/${img2}`}
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
                ) : img3 != null ? (
                  <img
                    src={`https://backend-shop.benindigital.com/${img3}`}
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
                ) : img4 != null ? (
                  <img
                    src={`https://backend-shop.benindigital.com/${img4}`}
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
              ) : video != null ? (
                <video controls height="200" className="im11">
                  <source
                    src={`https://backend-shop.benindigital.com/${video}`}
                  />
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
          {/* <IonRow>
                        <img src={`https://backend-shop.benindigital.com/${img1}`} id="rerun" />
                    </IonRow> */}
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
                  // console.log(delailivre);
                }}
              >
                {" "}
                Enrégistrer{" "}
              </IonButton>
            </>
          )}
        </div>
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
        message={"La taille des images doit être inférieure à 1Mo"}
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
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message="Modification effectuée"
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

      {/* <div className='danaria'></div> */}

      {/* {userInfo.filepreview !== null ?
                <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                : null} */}
    </>
  );
};
export default Nouv1;
