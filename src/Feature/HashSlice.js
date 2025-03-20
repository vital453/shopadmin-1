import { createSlice } from "@reduxjs/toolkit";

export const HashSlice = createSlice({
  name: "product",
  initialState: {
    hash_user: [],
    date_actu: "",
    website: "",
    email: "",
    adress: "",
    pays: "",
    description: "",
    facebook: "",
    store_name: "",
    code_boutique: "",
    whatsapp: "",
    type_product: "",
    image: "",
    pass_acces: "",
    click1: false,
    click2: false,
    click3: false,
    click4: false,
    click5: false,
    click6: false,
    click7: false,
    boutiquecompte: [],
    accesparcompte: [],
    accescompteprincipal: [],
    accescomptesecondaire: [],
    choiceacces: "",
    code_identifaction: "",
    badge: 0,
  },
  reducers: {
    setHash_code: (state, { payload }) => {
      state.hash_user = payload;
      localStorage.setItem("hash", JSON.stringify(payload));
    },
    setBoutiquecompte: (state, { payload }) => {
      state.boutiquecompte = payload;
    },
    setBadge: (state, { payload }) => {
      if (payload) {
        state.badge = payload;
        localStorage.setItem("badge", payload);
      } else {
        state.badge = 0;
        localStorage.setItem("badge", 0);
      }
    },
    setPassacces: (state, { payload }) => {
      state.pass_acces = payload;
    },
    setaccesparcompte: (state, { payload }) => {
      state.accesparcompte = payload;
    },
    setaccescompteprincipal: (state, { payload }) => {
      state.accescompteprincipal = payload;
    },
    setaccescomptesecondaire: (state, { payload }) => {
      state.accescomptesecondaire = payload;
    },
    setdate: (state, { payload }) => {
      state.date_actu = payload;
      localStorage.setItem("dateActu", JSON.stringify(payload));
    },
    setwebsite: (state, { payload }) => {
      state.website = payload;
      localStorage.setItem("website", JSON.stringify(payload));
    },
    setadress: (state, { payload }) => {
      state.adress = payload;
      localStorage.setItem("adress", JSON.stringify(payload));
    },
    setpays: (state, { payload }) => {
      state.pays = payload;
      localStorage.setItem("pays", JSON.stringify(payload));
    },
    setdescription: (state, { payload }) => {
      state.description = payload;
      localStorage.setItem("description", JSON.stringify(payload));
    },
    setfacebook: (state, { payload }) => {
      state.facebook = payload;
      localStorage.setItem("facebook", JSON.stringify(payload));
    },
    setemail: (state, { payload }) => {
      state.email = payload;
      localStorage.setItem("email", JSON.stringify(payload));
    },
    setstore_name: (state, { payload }) => {
      state.store_name = payload;
      localStorage.setItem("store_name", JSON.stringify(payload));
    },
    setcode_boutique: (state, { payload }) => {
      state.code_boutique = payload;
      localStorage.setItem("code_boutique", JSON.stringify(payload));
    },
    setwhatsapp: (state, { payload }) => {
      state.whatsapp = payload;
      localStorage.setItem("whatsapp", JSON.stringify(payload));
    },
    setimageprofil: (state, { payload }) => {
      state.image = payload;
      localStorage.setItem("image", JSON.stringify(payload));
    },
    settype_product: (state, { payload }) => {
      state.type_product = payload;
      localStorage.setItem("type_product", JSON.stringify(payload));
    },
    setclik1: (state, { payload }) => {
      state.click1 = payload;
    },
    setclik2: (state, { payload }) => {
      state.click2 = payload;
    },
    setclik3: (state, { payload }) => {
      state.click3 = payload;
    },
    setclik4: (state, { payload }) => {
      state.click4 = payload;
    },
    setclik5: (state, { payload }) => {
      state.click5 = payload;
    },
    setclik6: (state, { payload }) => {
      state.click6 = payload;
    },
    setclik7: (state, { payload }) => {
      state.click7 = payload;
    },
    setchoiceacces: (state, { payload }) => {
      state.choiceacces = payload;
      localStorage.setItem("choiceacces", payload);
    },
    setcode_identifaction: (state, { payload }) => {
      state.code_identifaction = payload;
    },
  },
});

export const {
  setHash_code,
  setdate,
  setadress,
  setdescription,
  setfacebook,
  setpays,
  setstore_name,
  setwebsite,
  setwhatsapp,
  settype_product,
  setclik1,
  setclik2,
  setclik3,
  setclik4,
  setclik5,
  setclik6,
  setclik7,
  setBoutiquecompte,
  setBadge,
  setPassacces,
  setaccesparcompte,
  setaccescompteprincipal,
  setaccescomptesecondaire,
  setchoiceacces,
  setcode_identifaction,
  setemail,
} = HashSlice.actions;
export default HashSlice.reducer;
