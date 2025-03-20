/* eslint-disable no-unused-vars */
import { IonButtons, IonIcon, IonItem, IonModal } from "@ionic/react";
import axios from "axios";
import { chevronBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recupCommande } from "../../Feature/CommandeSlice";
import CommandModal from "../header/CommandModal";
import { ModalCom } from "../pages/ModalCom";

function DashboardCard07() {
  let command1 = useSelector((state) => state.commande.commande);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [invoice, setinvoice] = useState("");
  const [status, setstatus] = useState("");
  const [libstat, setLibstatlist] = useState([]);
  const [showmodal, setShowmodal] = useState(false);
  const userid = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [prixt, setPrixt] = useState("rr");
  const [date, setDate] = useState();
  const [statut, setStatut] = useState();
  const [etatstat, setEtatstat] = useState(false);
  const [whatsapp, setWhatsapp] = useState();

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
  const getcom = () => {
    axios
      .post("https://backendtrader.digitalfirst.space/affichecommande", {
        id_boutique: userid.BoutiqueId,
      })
      .then((ret) => {
        dispatch(recupCommande(ret.data));
      });
  };

  const permu = (n, p, a, s, z) => {
    setinvoice(p);
    setDate(n);
    setStatut(a);
    setPrixt(s);
    setWhatsapp(z);
    setShowmodal(true);
  };
  useEffect(() => {
    getlibstat();
  }, []);
  return (
    <>
      <IonModal
        isOpen={showmodal}
        onDidDismiss={() => {
          setShowmodal(false);
        }}
      >
        <IonItem className="Item1" lines="none">
          <IonButtons
            slot="start"
            onClick={() => {
              setShowmodal(false);
            }}
          >
            <IonIcon icon={chevronBack} />
          </IonButtons>
          Détails de la vente
        </IonItem>
        <ModalCom
          onclose={() => {
            setShowmodal(false);
            getcom();
          }}
          Invoice={invoice}
          Prix={prixt}
          Datec={date}
          Statut={statut}
          Etat={etatstat}
          Whatsapp={whatsapp}
          // tab={patient}
        />
      </IonModal>

      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 text-center border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">
            Vos commandes en attente
          </h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left text-base">
                      Numero du client
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center text-base">
                      Date de la commande
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center text-base">
                    Montant
                    </div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center text-base">
                      Status de la commande
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm font-medium divide-y divide-slate-100">
                {/* Row */}
                {command1.filter((e) => e.status_id_command < 3).length ===
                0 ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <img className="" src="delai-de-traitement.png" alt="d" />
                    <h2 className="items-center justify-center text-center">
                      aucune commande en attente
                    </h2>
                  </div>
                ) : (
                  <>
                    {command1
                      .filter((e) => e.status_id_command < 3)
                      .map((card, index) => {
                        
                          return index >= 10 ? null : (
                            <tr
                              onClick={(e) => {
                                // e.stopPropagation();
                                // setSearchModalOpen(true);
                                // setdata(card);
                                // setinvoice(card.invoice);
                                // setstatus(card.status_id_command);
                                permu(
                                  card.date,
                                  card.invoice,
                                  card.status_id_command,
                                  card.total_price,
                                  card.whatsapp
                                );
                              }}
                              className="cursor-pointer"
                            >
                              <td className="p-2">
                                <div className="text-sky-500 text-sm">
                                  {card.whatsapp}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center text-sm">
                                  {card.date.split("T")[0]} &nbsp; à &nbsp; {(card.date.split("T")[1]).split(".")[0]}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center text-green-500 text-sm">
                                  {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "XOF",
                                  }).format(card.total_price)}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-sm">
                                {libstat
                                    .filter(
                                      (e) => e.id === card.status_id_command
                                    )
                                    .map((e) => {
                                      return (
                                        <>
                                          {e.libeller === "Waiting" ? (
                                            <div className="bg-yellow-300 px-3 py-2 rounded-xl flex items-end justify-center">
                                              {"En attente"}
                                            </div>
                                          ) : null}
                                          {e.libeller === "Pending" ? (
                                            <div className="bg-pink-300 px-3 py-2 rounded-xl flex items-end justify-center">
                                              {"En cours"}
                                            </div>
                                          ) : null}
                                          {e.libeller === "Proceed" ? (
                                            <div className="bg-green-500 px-3 py-2 rounded-xl flex items-end justify-center">
                                              {"Terminer"}
                                            </div>
                                          ) : null}
                                          {e.libeller === "Cancel" ? (
                                            <div className="bg-red-500 px-3 py-2 rounded-xl flex items-end justify-center">
                                              {"Annuler"}
                                            </div>
                                          ) : null}
                                        </>
                                      );
                                    })}
                                </div>
                              </td>
                            </tr>
                          ) 
                      })}
                  </>
                )}
              </tbody>
            </table>
          </div>
          {/* <CommandModal
            id="search-modal"
            searchId="search"
            modalOpen={searchModalOpen}
            setModalOpen={setSearchModalOpen}
            data={data}
            Invoice={invoice}
            Statut={status}
          /> */}
        </div>
        {/* 
      <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardCard07;
