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
import "../pages/Nouv2.css";
import * as imageConversion from "image-conversion";
import { recupCateg, recupProduct } from "../Feature/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
// import { HTTP } from '@awesome-cordova-plugins/http';
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';

function Testsendimage() {
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
  const [stock, setStock] = useState();
  const [reduc, setReduc] = useState(false);
  const [Id, setId] = useState(null);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);
  const [showToast5, setShowToast5] = useState(false);
  const [showToast6, setShowToast6] = useState(false);
  const [showToast7, setShowToast7] = useState(false);
  const [error, seterror] = useState("");
  const userid = useSelector((state) => state.auth.user);
  const [progress, setprogress] = useState(false);
  const [presentAlert] = useIonAlert();
  const [namecate, setNamecate] = useState("");
  const [message, setmessage] = useState(
    "La taille des images doit être inférieure à 1Mo"
  );

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [obje, setobje] = useState([]);

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
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        // const res = await imageConversion.compressAccurately(
        //   event.target.files[0],
        //   300
        // );
        // const myFile = new File([res], event.target.files[0].name, {
        //   type: res.type,
        // });
        setuserInfo({
          ...userInfo,
          file: event.target.files[0],
          filepreview: URL.createObjectURL(event.target.files[0]),
        });
      }
    }
  };
  const url = "";
  const handleInputChange2 = async (event) => {
    if (
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          300
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
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          300
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
      event.target.files[0].type !== "image/jpg" &&
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setMesserr("Veuillez insérer des images au format png ou jpg");
      setShowToast3(true);
    } else {
      if (parseInt(event.target.files[0].size) > 2000000) {
        setShowToast4(true);
        setmessage("La taille des images doit être inférieure à 2Mo");
      } else {
        const res = await imageConversion.compressAccurately(
          event.target.files[0],
          300
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
    if (event.target.files[0].type !== "video/mp4") {
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

  const submit = (obj) => {
    setprogress(true);
    setobje(obj.name);
    const formdata = new FormData();
    formdata.append("avatar", obj);

    axios
      .put(`${url}/imgbn`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        // console.warn(res);
        // console.log(res.data);
        if (res.data === "imgbn") {
          console.log("image send");
          setprogress(false);
        } else {
          console.log(res);
          seterror(String(res.data));
          setprogress(false);
          setShowToast7(true);
        }
        // if (res.data.success === 1) {
        // //   axios
        // //     .post("https://backendtrader.digitalfirst.space/afficheart", {
        // //       id_boutique: userid.BoutiqueId,
        // //     })
        // //     .then((ret) => {
        // //       dispatch(recupProduct(ret.data));
        // //       setShowToast2(true);
        // //       // setShowToast2(true);
        // //     });
        // }
      })
      .catch((err) => {
        console.log(err, "erreur");
        seterror("Erreur");
        //   seterror(String(res.data));
        setprogress(false);
        setShowToast7(true);
      });
  };

  // const options = {
  //   url: 'http://backend-shop.benindigital.com/imgbn',
  //   headers: { "Content-Type": "multipart/form-data" },
  //   data: formdata,
  // };
  // Http
  //   .put(options)
  //   .then((res) => {
  //     // then print response status
  //     // console.warn(res);
  //     // console.log(res.data);
  //     if (res.data === "imgbn") {
  //         console.log("image send");
  //         setprogress(false);
  //     }else {
  //         console.log(res);
  //         seterror(String(res.data));
  //         setprogress(false);
  //         setShowToast7(true);

  //     }
  //     // if (res.data.success === 1) {
  //     // //   axios
  //     // //     .post("https://backendtrader.digitalfirst.space/afficheart", {
  //     // //       id_boutique: userid.BoutiqueId,
  //     // //     })
  //     // //     .then((ret) => {
  //     // //       dispatch(recupProduct(ret.data));
  //     // //       setShowToast2(true);
  //     // //       // setShowToast2(true);
  //     // //     });
  //     // }
  //   }).catch((err) => {console.log(err, "erreur");
  //   seterror("Erreur");
  // //   seterror(String(res.data));
  //         setprogress(false);
  //         setShowToast7(true);
  // });

  // axios
  //   .put(`http://backend-shop.benindigital.com/imgbn`, formdata, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //   .then((res) => {
  //     // then print response status
  //     // console.warn(res);
  //     // console.log(res.data);
  //     if (res.data === "imgbn") {
  //         console.log("image send");
  //         setprogress(false);
  //     }else {
  //         console.log(res);
  //         seterror(String(res.data));
  //         setprogress(false);
  //         setShowToast7(true);

  //     }
  //     // if (res.data.success === 1) {
  //     // //   axios
  //     // //     .post("https://backendtrader.digitalfirst.space/afficheart", {
  //     // //       id_boutique: userid.BoutiqueId,
  //     // //     })
  //     // //     .then((ret) => {
  //     // //       dispatch(recupProduct(ret.data));
  //     // //       setShowToast2(true);
  //     // //       // setShowToast2(true);
  //     // //     });
  //     // }
  //   }).catch((err) => {console.log(err, "erreur");
  //   seterror("Erreur");
  // //   seterror(String(res.data));
  //         setprogress(false);
  //         setShowToast7(true);
  // });
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
    // setprogress(true);
    if (userInfo.file.name) {
      submit(userInfo.file);
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
      <IonContent>
        <div className="listener">
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
          <span>File:{String(userInfo.file.name)}</span>
          <br />
          <span>Obj:{obje}</span>
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
        message={error}
        icon={informationCircle}
        position="top"
        duration={30000}
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
export default Testsendimage;
