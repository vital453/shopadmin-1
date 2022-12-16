import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import Login from "../components/Home/Login";
import { useIonRouter } from "@ionic/react";



function ProtectedRoute({ isAuth: isAuth, component: Component, delaiactif: delaiactif, jours: jours, version: version, ...rest }) {
  const router = useIonRouter();
  return (
    <Route
      {...rest}
      render={(props) => {
        if(version){
          if(delaiactif){
            if (isAuth) {
              return <Component />;
            } else {
              return (
                // <Redirect to={{pathname: "/logt", state: {from: props.location} }} />
                window.location.href = "/"
                // router.push("/add")
              );
            }
          }else{
           
            window.location.href = "/licence"
            // <Link  to="/licence"/>
          }
        }else{
          window.location.href = "/version"
          // <Link  to="/version"/>
        }
      }}
    />
  );
}

export default ProtectedRoute;
