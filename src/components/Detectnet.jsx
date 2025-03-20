import { IonToast } from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import React, { Component, useState } from "react";
import { Detector } from "react-detect-offline";

const Detectnet = (props) => {
  const [showToast8, setShowToast8] = useState(false);

  return (
    <>
      <Detector
        render={({ online }) =>
          online
            ? props.children
            : setShowToast8(true)
              //   <div className="flex justify-center items-center w-full h-[100vh]">
              //     <img
              //       src="no-internet2.jpg"
              //       alt="Pas de connection internet"
              //       className="w-full object-cover"
              //       //  style={{ height: "100%", width: "100%", objectFit: "fill" }}
              //     />
              //   </div>
        }
      />
      <IonToast
        isOpen={showToast8}
        onDidDismiss={() => setShowToast8(false)}
        message={"Votre connection internet n'est pas stable  "}
        icon={informationCircle}
        position="top"
        duration={5000}
      />
    </>
  );
};

export default Detectnet;
