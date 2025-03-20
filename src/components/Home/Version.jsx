/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setCredentials } from "../../Feature/auth/AuthSlice";
import { IonInput, IonLoading, IonToast } from "@ionic/react";
import { setdate, setHash_code } from "../../Feature/HashSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Version = () => {
  const [showToast3, setShowToast3] = useState(false);

  return (
    <>
      <IonToast
        isOpen={showToast3}
        onDidDismiss={() => setShowToast3(false)}
        message="Lien copier dans le papier presse avec succès"
        duration={3000}
        position="top"
      />
      <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div class="flex flex-col overflow-y-auto md:flex-row">
            <div class="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                class="object-cover w-full h-full dark:hidden"
                src="login-office.jpeg"
                alt="Office"
              />
              <img
                aria-hidden="true"
                class="hidden object-cover w-full h-full dark:block"
                src="login-office-dark.jpeg"
                alt="Office"
              />
            </div>
            <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div class="w-full flex flex-col">
                <div className="w-full items-center justify-center text-center">
                  <h1 class="mb-4 text-xl font-semibold text-red-800 dark:text-gray-200">
                    Version Dépassée !
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                    <span>
                      Accéder à la dernière version de l'application sur ce
                      lien.
                    </span>
                    <CopyToClipboard
                      text={"https://versatileskills.space/"}
                      onCopy={() => {
                        setShowToast3(true);
                      }}
                    >
                      <span className="text-blue-800 cursor-pointer ">
                        https://versatileskills.space/
                      </span>
                      {/* <span className="text-blue-800 cursor-pointer ">http://www.benindigital.com</span> */}
                    </CopyToClipboard>
                  </div>
                </div>
                <hr class="my-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Version;
