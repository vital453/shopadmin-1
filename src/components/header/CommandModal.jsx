/* eslint-disable no-unused-vars */
import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";
import Axios from "axios";
import { recupCommande } from "../../Feature/CommandeSlice";

function CommandModal({
  id,
  searchId,
  modalOpen,
  setModalOpen,
  data,
  Invoice,
  Statut,
}) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const commart = useSelector((state) => state.commande.commandeart);
  const [produit, setProduitlist] = useState([]);
  const [statut1, setStatut1] = useState(Statut);
  const [statut, setStatut] = useState(Statut);
  const [selectval, setSelectval] = useState(Statut);
  const [libstat, setLibstatlist] = useState([]);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const userid = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getartcom = () => {
    setProduitlist(commart.filter((t) => t.invoice === Invoice));
  };
  const getlibstat = () => {
    fetch("https://backendtrader.digitalfirst.space/affichelibstat")
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        setLibstatlist(data);
      });
  };
  const majstatut = (n) => {
    if (statut === 1 && statut1 === 1) {
      setShowToast2(true);
    } else {
      Axios.post("https://backendtrader.digitalfirst.space/majstatut", {
        invoice: Invoice,
        stat: n,
        id_boutique: userid.BoutiqueId,
      }).then((ret) => {
        if (ret.data == "success") {
          if (statut1 == 2 && statut == 1) {
            Axios.post("https://backendtrader.digitalfirst.space/reducquant", {
              reduc: produit,
              tail: produit.length,
              id_boutique: userid.BoutiqueId,
            }).then((ret) => {
              console.log(ret.data);
            });
          }

          Axios.post("https://backendtrader.digitalfirst.space/affichecommande", {
            id_boutique: userid.BoutiqueId,
          }).then((ret) => {
            dispatch(recupCommande(ret.data));
            setShowToast(true);
            onclose();
            console.log(ret.data);
          });
        }
      });
    }
  };
  // useEffect(() => {
  //   setSelectval(libstat.find((t)=> t.id === Statut).libeller);
  // }, [libstat])

  useEffect(() => {
    getartcom();
    getlibstat();
    console.log(produit);
  }, [Invoice]);
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
    <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Status mis à jour"
            icon={informationCircle}
            position="top"
            duration={800}
          />
          <IonToast
            isOpen={showToast2}
            onDidDismiss={() => setShowToast2(false)}
            message="Le nouveau status est incorrect"
            icon={informationCircle}
            position="top"
            duration={800}
          />
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          {/* <input
                id={searchId}
                className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search Anything…"
                ref={searchInput}
              /> */}
          <div className="px-3 py-3 flex flex-col">
            <div className="text-center text-xl mb-3">
              <span>Détails de la commande</span>
            </div>

            <div className="flex items-center">
              <h2 className="text-sm w-2/5">Numeros de la commande : </h2>
              <h2 className="text-sm w-3/5 font-semibold">{data.invoice}</h2>
            </div>
            <div className="flex items-center">
              <h2 className="text-sm w-2/5">Prix total de la commande : </h2>
              <h2 className="text-sm w-3/5 font-semibold">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XOF",
                }).format(data.total_price)}
              </h2>
            </div>
            <div className="flex items-center">
              <h2 className="text-sm w-2/5">Numeros du client : </h2>
              <h2 className="text-sm w-3/5 font-semibold">{data.whatsapp}</h2>
            </div>
            <div className="flex items-center">
              <h2 className="text-sm w-2/5">Date de la commande : </h2>
              <h2 className="text-sm w-3/5 font-semibold">
                {/* {data.date} */}
                {data.date && data.date.split("T")[0]}
              </h2>
            </div>
            <div className="flex items-center">
              <div className="text-sm w-2/5">
                <h2 className="text-sm">Modifier le status :</h2>
              </div>
              <div className="text-sm w-3/5 font-semibold flex items-center">
                <div className="text-sm w-2/3 font-semibold">
                  <IonSelect
                    id="checkbox234"
                    // style={{ display: "none" }}
                    value={selectval}
                    placeholder="Selectionner"
                    onIonChange={(e) => {
                      setStatut1(e.detail.value);
                      setSelectval(e.detail.value);
                      console.log(e.detail.value);
                    }}
                  >
                    {libstat.map((card, index) => {
                      return (
                        <IonSelectOption
                          disabled={
                            statut > card.id ||
                            (card.id - statut > 1 && card.id !== 4) ||
                            statut === 3
                              ? true
                              : false
                          }
                          value={card.id}
                          // onClick={()=>{majstatut(statut1)}}
                        >
                          {card.libeller}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </div>
                {/* <div className=" flex items-center justify-center w-2/3 p-3 bg-slate-700 rounded-xl">
                    {libstat[0] && libstat.find((t)=> t.id === Statut).libeller}
                </div> */}
              </div>
            </div>
            <div className="w-full">
              <IonAccordionGroup>
                <IonAccordion value="first">
                  <IonItem slot="header">
                    <IonLabel>
                      <span>Liste des produits de la commande</span>
                    </IonLabel>
                  </IonItem>
                  <div slot="content">
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm w-1/3 font-semibold">
                        Nom du produit
                      </span>
                      <span className="text-sm w-1/3 font-semibold">
                        Quantité commander
                      </span>
                      <span className="text-sm w-1/3 text-end font-semibold">
                        Prix Total
                      </span>
                    </div>
                    {produit.map((card, index) => {
                      return (
                        <div className="flex items-center justify-between px-4 py-2">
                          <span className="text-sm w-1/3">
                            {card.product_name}
                          </span>
                          <span className="text-sm w-1/3">
                            {card.product_quantity}
                          </span>
                          <span className="text-sm w-1/3 text-end">
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "XOF",
                            }).format(card.total_price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            </div>
            
          </div>
        </div>
      </Transition>
    </>
  );
}

export default CommandModal;
