import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import {
  addOutline,
  checkmark,
  informationCircle,
  removeOutline,
  trash,
} from "ionicons/icons";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";
import Axios from "axios";
import { recupCommande } from "../../Feature/CommandeSlice";

function EnregistrerModal({ id, searchId, modalOpen, setModalOpen, data }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const commart = useSelector((state) => state.commande.commandeart);
  const [produit, setProduitlist] = useState([]);
  const [libstat, setLibstatlist] = useState([]);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const userid = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [trashed, setTrash] = useState(false);
  const [edited, setEdited] = useState(false);
  const [quantite, setQuantite] = useState(0);

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

  const increm = (Stock) => {
    if (quantite < Stock) {
      setQuantite(quantite + 1);

      // console.log(trigg);
    }
  };
  const decrem = () => {
    if (quantite > 0) {
      setQuantite(quantite - 1);
    }
  };

  // useEffect(() => {
  //   setSelectval(libstat.find((t)=> t.id === Statut).libeller);
  // }, [libstat])

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
              <span>Détails de la vente</span>
            </div>

            <div>
              {data.map((data, index) => {
                return (
                  <div className="flex items-center w-full justify-between px-4 py-2">
                    <div className="text-sm w-1/2 font-semibold flex items-center border-1 border-red-600">
                      <div className="w-full flex items-center gap-3">
                        <img
                          src={`https://backendtrader.digitalfirst.space/${data.picture1}`}
                          alt=""
                          className="rounded-full w-14 h-14 object-cover"
                        />
                        <div className="flex flex-col items-center text-start">
                          <span className="text-start justify-start text-xl">
                            {data.product_name}
                          </span>
                          <div className="flex items-center gap-2 text-start">
                            <span className="text-sm font-semibold">
                              {data.product_quantity}
                            </span>
                            <span className="text-sm text-red-600 font-semibold">
                              {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "XOF",
                              }).format(data.total_price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 border-1 border-red-600">
                      <div className="text-sm w-1/2 font-semibold">
                        <div className="edition1">
                          {edited ? (
                            <div className="flex items-center gap-3">
                              <div
                                onClick={() => {
                                  decrem();
                                }}
                              >
                                <button type="button" class="btn btn-danger w-8 h-8">
                                  -
                                </button>
                              </div>

                              <IonBadge color="light" className="badg">
                                {quantite}
                              </IonBadge>
                              <div
                                onClick={() => {
                                  increm();
                                }}
                              >
                                <button type="button" class="btn btn-success w-8 h-8">
                                  +
                                </button>
                              </div>
                              <img
                                src="accept.png"
                                alt=""
                                className="rounded-full w-8 h-8 object-cover"
                                onClick={() => {
                                  // maj();
                                  setEdited(false);
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              className=""
                              onClick={() => {
                                setEdited(true);
                              }}
                            >
                              <p className="text-xl text-sky-400 mt-4">
                                {" "}
                                Editer{" "}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm w-1/2 text-end">
                        {trashed ? (
                          <IonSpinner name="bubbles" />
                        ) : (
                          <img
                            src="trash.png"
                            alt=""
                            className="rounded-full w-8 h-8 object-cover"
                            onClick={() => {
                              // suppression(Id);
                              //  setTrash(true)
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default EnregistrerModal;
