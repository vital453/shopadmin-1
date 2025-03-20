/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { FiRefreshCw } from "react-icons/fi";

/* eslint-disable jsx-a11y/no-redundant-roles */
const Pricing = () => {
  // const payer = () => {
  //     openKkiapayWidget({amount:"1",position:"right",callback:"",
  //               data:""
  //             //   theme:"green",
  //               key:"<votre-api-key>"})
  // }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="flex justify-between items-center">
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  window.location.href = "/licence";
                }}
              >
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle>

            <IonButtons
              slot="end"
              className="mr-5 text-xl cursor-pointer"
              onClick={() => {
                window.location.href = "/pricing";
              }}
            >
              <FiRefreshCw />
            </IonButtons>
          </div>
          {/* <IonButtons slot="start">
              <IonButton routerLink="/home">
                <IonIcon color="medium" icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonTitle className="nereide">Digital trader</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
            {/* <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Nos prix
              </h2>
             
            </div> */}
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
              <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white justify-center items-center">
                  <div className="flex items-center justify-center">
                    <h3 className="text-2xl font-semibold">Plan Mensuel</h3>
                    {/* <span className="text-xl "></span> */}
                  </div>
                  {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  Description succinct du plan !
                </p> */}
                  <div className="flex items-baseline justify-center my-8 -mt-0">
                    <span className="mr-2 text-3xl font-extrabold">
                      1000 F CFA
                    </span>
                    {/* <span className="text-gray-500 dark:text-gray-400">
                    /mois
                  </span> */}
                  </div>

                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Service après vente</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Prochaine mis â jours</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Prochaine fonctionnalité de l'appli</span>
                    </li>
                  </ul>
                  <a
                    // href="#"
                    className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900 cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("montant_paiement", "1000");
                      localStorage.setItem("validity_paiement", 30);
                      setTimeout(() => {
                        window.location.href = "/paiement";
                      }, 1000);
                    }}
                  >
                    Démarrer
                  </a>
                </div>
              </div>

              <div className="flex flex-col max-w-lg text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                {/* <div className="bg-cyan-500 p-2 flex items-center justify-center">
                  <span className="text-white text-xl   ">Plan populaire</span>
                </div> */}
                <div className="flex flex-col max-w-lg p-6 text-center text-gray-900 bg-white border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white justify-center items-center">
                  <h3 className="text-2xl font-semibold">Plan Trimestriel</h3>
                  {/* <span className="text-xl "></span> */}
                  {/* </div> */}
                  {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    Description succinct du plan !
                  </p> */}
                  <div className="flex items-baseline justify-center my-8 -mt-0">
                    <span className="mr-2 text-3xl font-extrabold">
                      2000 F CFA
                    </span>
                    {/* <span className="text-gray-500 dark:text-gray-400">
                      /3 mois
                    </span> */}
                  </div>

                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Service après vente</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Prochaine mis â jours</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Prochaine fonctionnalité de l'appli</span>
                    </li>
                  </ul>
                  <a
                    // href="#"
                    className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900 cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("montant_paiement", "2000");
                      localStorage.setItem("validity_paiement", 95);
                      setTimeout(() => {
                        window.location.href = "/paiement";
                      }, 1000);
                    }}
                  >
                    Démarrer
                  </a>
                </div>
              </div>

              <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white justify-center items-center">
                  <h3 className="text-2xl font-semibold">Plan Annuel</h3>
                  {/* <span className="text-xl "></span> */}
                  {/* </div> */}
                  {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  Description succinct du plan !
                </p> */}
                  <div className="flex items-baseline justify-center my-8 -mt-0">
                    <span className="mr-2 text-3xl font-extrabold">
                      5000 F CFA
                    </span>
                    <span className="text-gray-500 dark:text-gray-400"></span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Service après vente</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Prochaine mis â jours</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>Prochaine fonctionnalité de l'appli</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span>
                        Bénéficiez de fonctionnalités qui vous sont adaptés
                      </span>
                    </li>
                  </ul>
                  <a
                    // href="#"
                    className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-purple-900 cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("montant_paiement", "5000");
                      localStorage.setItem("validity_paiement", 365);
                      setTimeout(() => {
                        window.location.href = "/paiement";
                      }, 1000);
                    }}
                  >
                    Démarrer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Pricing;
