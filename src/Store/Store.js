import { configureStore } from "@reduxjs/toolkit";
import panierReducer from "../Feature/PanierSlice";
import productReducer from "../Feature/ProductSlice";
import commandeReducer from "../Feature/CommandeSlice"
import approvisionReducer from "../Feature/ApprovisionSlice"
import ApprovisionnementReducer from "../Feature/ApprovisionnementSlice";
import DeclencheursReducer from "../Feature/DeclencheursSlice";
import AuthReducer from "../Feature/auth/AuthSlice";
import HashSlice from "../Feature/HashSlice";
import CaisseSlice from "../Feature/CaisseSlice";

export default configureStore({
    reducer: {
        panier: panierReducer,
        product: productReducer,
        commande: commandeReducer,
        approvision: approvisionReducer,
        approvisionnement: ApprovisionnementReducer,
        triggers: DeclencheursReducer,
        auth: AuthReducer,
        Hash: HashSlice,
        Caisse: CaisseSlice, 
    }
})