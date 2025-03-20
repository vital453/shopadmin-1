import {
  CreateAnimation,
  IonApp,
  IonAvatar,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonRippleEffect,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RefresherEventDetail } from "@ionic/core";
import {
  addOutline,
  arrowBack,
  cartOutline,
  checkmark,
  chevronDownCircleOutline,
  key,
  logoInstagram,
  removeOutline,
  search,
  trash,
  trashOutline,
} from "ionicons/icons";
import { IonPage, useIonToast } from "@ionic/react";
// import './RippleEffectExample.css';

import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  setProductPan,
  updateQuantity,
  dec,
} from "../../Feature/PanierSlice";

export let tab5 = 12;

const aff = () => {
  setTimeout(() => {
    tab5 = 12;
  }, 1000);
  tab5 = 14;
};

interface Ajout_utiliformprops {
  Id: number;
  Stock: number;
  Add: number;
  Name: String;
  Unit: number;
  Total: number;
  Ig: any;
}

export const PanierItem: React.SFC<Ajout_utiliformprops> = ({
  Id,
  Stock,
  Add,
  Name,
  Total,
  Unit,
  Ig,
}) => {
  const [present, dismiss] = useIonToast();
  const [trashed, setTrash] = useState(false);
  const [edited, setEdited] = useState(false);
  const [quantite, setQuantite] = useState<any>(0);
  const [addition, setAddition] = useState<any>();
  let panier = useSelector((state: any) => state.panier.panier);
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState<any>(
    useSelector((state: any) => state.panier.trigg)
  );
  const trigg = useSelector((state: any) => state.panier.trigg);
  const suppression = (ide: number | React.SetStateAction<any>) => {
    // Axios.delete(`https://backendtrader.digitalfirst.space/deletepan/${ide}`).then((ret)=>{
    //     setTrash(false)
    // });
    dispatch(deleteProduct(ide));
    // setTrash(false);
    dispatch(dec(!trigger));
  };
  const maj = () => {
    if (quantite > 0) {
      // Axios.put('https://backendtrader.digitalfirst.space/majpan', {
      //     product_quantity: parseInt(quantite),
      //     product_id: Id,
      //     price: Unit,
      // }).then((ret) => {
      //     if (ret.data) {
      //     } else {
      //     }
      // })
      dispatch(updateQuantity([parseInt(quantite), Id, quantite * Unit]));
      // dispatch(dec(!trigger));
    } else {
      suppression(Id);
    }
  };
  const increm = () => {
    if (quantite < Stock) {
      setQuantite(quantite + 1);

      console.log(trigg);
    }
  };
  const decrem = () => {
    if (quantite > 0) {
      setQuantite(quantite - 1);
    }
  };

  const maj2 = () => {
    if (panier.filter((t: any) => t.product_id == Id)[0]) {
      setQuantite(
        panier.filter((t: any) => t.product_id == Id)[0].product_quantity
      );
    }
  };

  useEffect(() => {}, [(trigg: any) => {}]);

  useEffect(() => {}, []);

  return (
    <IonItemSliding className="cartSlider">
      <IonItem key={key} lines="none" detail={false} className="cartItem">
        {/* <IonImg src="img/1cc.png" /> */}
        {/* <IonAvatar className='avatar1'>
                    <img src={`https://backendtrader.digitalfirst.space/${Ig}`} alt="card" />
                </IonAvatar> */}
        <img
          className="rounded-full w-14 h-14 object-cover"
          src={`https://backendtrader.digitalfirst.space/${Ig}`}
          alt="card"
        />
        {/* <IonThumbnail slot="start">
                    <img src={`https://backendtrader.digitalfirst.space/${Ig}`} alt="card" className='imp1'/>
                </IonThumbnail> */}
        <IonLabel className="ion-padding-start ion-text-wrap ">
          <p className="labpr">{Name}</p>
          <div className="cartActions">
            <h4 className="labpr">{Add}</h4>
            <IonBadge color="dark">
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "XOF",
              }).format(Total)}
            </IonBadge>
          </div>
        </IonLabel>

        <div className="edition1">
          {edited ? (
            <IonCol className="newcol" size="10">
              <IonIcon
                icon={removeOutline}
                className="ico1"
                onClick={() => {
                  decrem();
                }}
              />
              <IonBadge color="light" className="badg">
                {quantite}
              </IonBadge>
              <IonIcon
                icon={addOutline}
                className="ico2"
                onClick={() => {
                  increm();
                }}
              />
              <IonIcon
                icon={checkmark}
                className="valid"
                color="success"
                onClick={() => {
                  maj();
                  setEdited(false);
                }}
              />
            </IonCol>
          ) : (
            <div
              className="divedit"
              onClick={() => {
                setEdited(true);
              }}
            >
              <p className="edit"> Editer </p>
            </div>
          )}

          <div className="trash">
            {trashed ? (
              <IonSpinner name="bubbles" />
            ) : (
              <div>
                <IonIcon
                  icon={trash}
                  className="trash1"
                  color="danger"
                  onClick={() => {
                    suppression(Id);
                    //  setTrash(true)
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption
          color="danger"
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          onClick={() => {
            suppression(Id);
          }}
        >
          <IonIcon icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
export default PanierItem;
