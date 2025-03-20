/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
// first model of swipper

// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// import {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Autoplay,
// } from "swiper/modules";

//  second model of swipper

import Axios from "axios";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper";
// import "./swip.css";

// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBadge, setBoutiquecompte } from "../../Feature/HashSlice";
import { setCredentials } from "../../Feature/auth/AuthSlice";

export default function Onboarding() {
  const [width, setWidth] = useState(window.innerWidth);
  //   localStorage.setItem('admin', JSON.stringify(state.user));
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const handlechange = async (e) => {
    if (e.activeIndex === 1) {
      try {
        localStorage.setItem("@onboarding_complete", "true");
        setTimeout(() => {
          // navigate("/home");
          window.location.href = "/home";
        }, 2000);
      } catch (error) {
        console.log("status erreur", error);
      }
    }
  };
  const checkstatusonboading = async () => {
    const value = String(localStorage.getItem("@onboarding_complete"));
    console.log(value);
    if (value !== null && value === "true") {
      // navigate("/home");
      window.location.href = "/home";
    }
  };
  const verifhash1 = (id_compte) => {
    Axios.post("https://backendtrader.digitalfirst.space/exithash", {
      id: JSON.parse(localStorage.getItem("user") + "").userId,
    }).then((ret) => {
      console.log(ret.data.message);
      if (ret.data.message === "il a un hash actif") {
        console.log("1");
        // setDelaiactif(true);
        // recupe_boutique();

        Axios.post(
          "https://backendtrader.digitalfirst.space/afficheboutiqueparcompte",
          {
            idcompte: JSON.parse(localStorage.getItem("user") + "").userId,
          }
        ).then((ret) => {
          dispatch(setBoutiquecompte(ret.data));
          if (JSON.parse(localStorage.getItem("badge") + "")) {
            dispatch(setBadge(JSON.parse(localStorage.getItem("badge") + "")));
          } else {
            console.log(ret.data[0].id);
            dispatch(setBadge(parseInt(ret.data[0].id)));
          }
          console.log(ret.data);
          const y = new Date(ret.data.date_end);
          // const x = new Date(ret.data.date_start);
          console.log(JSON.parse(localStorage.getItem("dateActu") + ""));
          const x = new Date(JSON.parse(localStorage.getItem("dateActu") + ""));
          const date1utc = Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
          const date2utc = Date.UTC(y.getFullYear(), y.getMonth(), y.getDate());
          const dayunit = 1000 * 60 * 60 * 24;
          const numberday = (date2utc - date1utc) / dayunit;
          //const numberday = 8;
          console.log(numberday);
          if (numberday > 0 && numberday <= 10) {
            console.log("entre 1 et 10");
            // setJoursrest(numberday);
            Axios.post(
              "https://backendtrader.digitalfirst.space/majvalidity",
              {
                id: ret.data.id_actif,
                validity: numberday,
              }
            ).then((ret) => {
              console.log(ret.data);
            });
          } else if (numberday <= 0) {
            // setJoursrest(0);
            console.log("en dessous de 0 OU EGAL A 0");
            Axios.post(
              "https://backendtrader.digitalfirst.space/majvalidhash",
              {
                id: ret.data.id_actif,
                status_hash: "NON ACTIF",
              }
            ).then((ret) => {
              console.log(ret.data);
            });
          } else if (numberday > 10) {
            console.log("AU DELA DE 10");
            Axios.post(
              "https://backendtrader.digitalfirst.space/validityday",
              {
                id: ret.data.id_actif,
                validity: numberday,
              }
            ).then((ret) => {
              console.log(ret.data);
            });
          }

          // Axios.post(
          //   "https://backendtrader.digitalfirst.space/verif_create_acces",
          //   {
          //     id_compte: id_compte,
          //   }
          // ).then((ret) => {
          //   if (ret.data === "acces principal creer pour ce compte") {
          //     setprogress(false);
          //     setusername("");
          //     setpassword("");
          //     window.location.href = "/gestion_droit_dacces";
          //   } else if (ret.data === "aucun acces creer pour ce compte") {
          //     setprogress(false);
          //     setusername("");
          //     setpassword("");
          //     dispatch(setchoiceacces("aucun"));
          //   }
          // });
        });
      } else if (ret.data.message === "aucun hash actif") {
        // setprogress(false);
        // setusername("");
        // setpassword("");
        window.location.href = "/licence";
      } else if (ret.data.message === "aucun hash atribuer") {
        // setprogress(false);
        // setusername("");
        // setpassword("");
        window.location.href = "/licence";
      }
    });
  };

  const login = () => {
    Axios.post("https://backendtrader.digitalfirst.space/loginn", {
      username: "ii",
      password: "ii",
      type: "sellers",
    }).then((response) => {
      // console.log(response);
      if (!response.data.auth) {
        console.log("L'utilisateur n'existe pas");

        // setloginStatus(false);
        // console.log(response.data);
        // if (response.data.message === "L'utilisateur n'existe pas") {
        //   // if(response.data.error === "L'utilisateur n'existe pas"){
        //   setUserExist(true);
        //   setprogress(false);
        //   setTimeout(() => {
        //     setUserExist(false);
        //   }, [5000]);
        // } else if (response.data.message === "Mauvaise combinaison") {
        //   // }else if(response.data.error === "Mauvaise combinaison"){
        //   setpassword("");
        //   setprogress(false);
        //   setWrongCombine(true);
        //   setTimeout(() => {
        //     setWrongCombine(false);
        //   }, [5000]);
        // }
      } else {
        // console.log(response.data);
        dispatch(
          setCredentials({
            userId: response.data.result[0].id,
            username: response.data.result[0].username,
            token: response.data.token,
            auth: response.data.auth,
            BoutiqueId: response.data.idbout,
            email: response.data.result[0].email,
          })
        );
        localStorage.setItem("authentificator", String(response.data.auth));

        verifhash1(response.data.result[0].id);
      }
    });
  };
  useEffect(() => {
    checkstatusonboading();
  }, []);
  useEffect(() => {
    login();
  }, []);

  const updateScreen = () => {
    const width = window.innerWidth;
    setWidth(width);
  };
  window.addEventListener("resize", updateScreen);
  if (width < 500) {
    return (
      <div className="h-screen">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="h-full w-full flex "
          onSlideChange={handlechange}
          data-aos="fade-left"
          spaceBetween={20}
          //   loop={true}
          navigation
          grabCursor={true}
        >
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen1 />
          </SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen2 />
          </SwiperSlide>
        </Swiper>
        {/* <Swiper
          pagination={{
            clickable: true,
          }}
          data-aos="fade-left"
          spaceBetween={20}
          //   loop={true}
          navigation
          grabCursor={true}
          //   autoplay={{ delay: 3000 }}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation, Pagination, Autoplay]}
          className="h-full w-full flex "
          onSlideChange={handlechange}
        >
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen1 />
          </SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen2 />
          </SwiperSlide>
         
        </Swiper> */}
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="h-full w-full flex "
          onSlideChange={handlechange}
          data-aos="fade-left"
          spaceBetween={20}
          //   loop={true}
          navigation
          grabCursor={true}
        >
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen1 />
          </SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen2 />
          </SwiperSlide>
        </Swiper>
        {/* <Swiper
          pagination={{
            clickable: true,
          }}
          data-aos="fade-left"
          spaceBetween={20}
          //   loop={true}
          navigation
          grabCursor={true}
          //   autoplay={{ delay: 3000 }}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation, Pagination, Autoplay]}
          className="h-full w-full flex "
          onSlideChange={handlechange}
        >
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen1 />
          </SwiperSlide>
          <SwiperSlide
            className="h-full w-full"
            // onClick={() => {
            //   setfullimagg(content.image);
            //   setfullimag(true);
            // }}
          >
            <Screen2 />
          </SwiperSlide>
          
        </Swiper> */}
      </div>
    );
  }
}

export const Screen1 = () => {
  //   const navigation = useNavigation();
  //   const checkstatusonboading = async () => {
  //     const value = await AsyncStorage.getItem("@onboarding_complete");
  //     console.log(value);
  //     if (value !== null && value === "true") {
  //       navigation.replace("home");
  //     }
  //   };
  //   useEffect(() => {
  //     checkstatusonboading();
  //   }, []);
  const [width, setWidth] = useState(window.innerWidth);

  const updateScreen = () => {
    const width = window.innerWidth;
    setWidth(width);
  };
  window.addEventListener("resize", updateScreen);
  return (
    <div className="h-full flex flex-col justify-start items-center">
      <img
        src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-full h-[60%] object-cover"
      />
      <div className="flex-row justify-center items-center px-6 py-4 space-y-4">
        <div>
          <span className="text-2xl text-[#555] text-center tracking-wider family ">
            Bienvenu sur shop
          </span>
        </div>
        <div>
          <span className="text-sm tracking-wider text-[#777] text-justify family ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
      </div>
    </div>
  );
};
export const Screen2 = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateScreen = () => {
    const width = window.innerWidth;
    setWidth(width);
  };
  window.addEventListener("resize", updateScreen);
  return (
    <div className="h-full flex flex-col justify-start items-center">
      <img
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-full h-[60%] object-cover"
      />
      <div className="flex-row justify-center items-center px-6 py-4 space-y-4">
        <div>
          <span className="text-2xl text-[#555] text-center tracking-wider family ">
            Ravie de satifaire vos besoin
          </span>
        </div>
        <div>
          <span
            className={`${
              width < 250 ? "text-sm" : "text-sm"
            } tracking-wider text-[#777] text-justify family `}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
      </div>
    </div>
  );
};
export const Screen3 = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateScreen = () => {
    const width = window.innerWidth;
    setWidth(width);
  };
  window.addEventListener("resize", updateScreen);
  return (
    <div className="h-full flex flex-col justify-start items-center">
      <img src="fn5.jpg" alt="" className="w-full h-[60%] object-cover" />
      <div className="flex-row justify-center items-center px-6 py-4 space-y-4">
        <div>
          <span className="text-2xl text-[#555] text-center tracking-wider family ">
            Trouver vos appartement en toute scéréniter
          </span>
        </div>
        <div>
          <span className="text-sm tracking-wider text-[#777] text-justify family ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            distinctio quia obcaecati, accusantium voluptate quod quis et?
          </span>
        </div>
      </div>
    </div>
  );
};
