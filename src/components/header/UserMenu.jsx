import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../../utils/Transition";
import { useDispatch, useSelector } from "react-redux";
import { logOutt, setCredentials } from "../../Feature/auth/AuthSlice";
import { IonRouterLink } from "@ionic/react";
import { setBadge } from "../../Feature/HashSlice";

function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const boutiquecompte = useSelector((state) => state.Hash.boutiquecompte);
  const badge = useSelector((state) => state.Hash.badge);

  let lien = useSelector((state) => state.panier.lien);
  let wal = useSelector((state) => state.auth.whale);
  let far = useSelector((state) => state.auth.user.username);
  const userid = useSelector((state) => state.auth.user);
  let username =
    JSON.parse(localStorage.getItem("store_name") + "") === ""
      ? far
      : JSON.parse(localStorage.getItem("store_name") + "");

  let numberwhat =
    JSON.parse(localStorage.getItem("whatsapp") + "") === ""
      ? "229 xxxxxxxx"
      : JSON.parse(localStorage.getItem("whatsapp") + "");
  const dispatch = useDispatch();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const selectboutique = (boutiqueid) => {
    dispatch(
      setCredentials({
        userId: userid.userId,
        username: userid.username,
        token: userid.token,
        auth: userid.auth,
        BoutiqueId: boutiqueid,
      })
    );
    window.location.href = "/home";
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex -mt-3">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {boutiquecompte.filter((t) => t.id === badge) &&
          boutiquecompte
            .filter((t) => t.id === badge)
            .map((bat) => {
              return bat.image === "" ? (
                <img
                  src="store.png"
                  width="32"
                  height="32"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <img
                  src={
                    boutiquecompte.filter((t) => t.id === badge) &&
                    `https://backendtrader.digitalfirst.space/uploads/${bat.image}`
                  }
                  className="w-8 h-8 rounded-full"
                  width="32"
                  height="32"
                  alt="User"
                />
              );
            })}
        {/* {boutiquecompte[0] &&
        <img
          className="w-8 h-8 rounded-full"
          src={ 
            boutiquecompte.find((t) => t.id === badge).image === undefined
              ? "store.png"
              : `https://backendtrader.digitalfirst.space/uploads/${
                  boutiquecompte.find((t) => t.id === badge).image
                }`
          }
          width="32"
          height="32"
          alt="User"
        />
        } */}
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">
            {username}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className="w-64"
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">{username}</div>
            <div className="text-xs text-slate-500 italic">Administrator</div>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              {boutiquecompte.map((bout, index) => {
                return (
                  <>
                    <div
                      className="flex w-full items-center justify-start mb-1 px-2 cursor-pointer"
                      onClick={() => {
                        dispatch(setBadge(bout.id));
                        // console.log(bout.id);
                        selectboutique(bout.id);
                      }}
                    >
                      <div className="w-7 h-7">
                        {bout.image === "" ? (
                          <img
                            src="store.png"
                            alt=""
                            className="w-7 h-7 object-cover rounded-full"
                          />
                        ) : (
                          <img
                            src={`https://backendtrader.digitalfirst.space/uploads/${bout.image}`}
                            alt=""
                            className="w-7 h-7 object-cover rounded-full"
                          />
                        )}

                        {badge === bout.id ? (
                          <img
                            src="correct.png"
                            alt=""
                            className="w-4 h-4 object-cover badgecor"
                          />
                        ) : null}
                      </div>
                      <h2 className="text-base text-gray-900">
                        {bout.store_name === ""
                          ? bout.boutiqueName
                          : bout.store_name}
                      </h2>
                    </div>
                  </>
                );
              })}
              <IonRouterLink routerLink="/addboutique" className="text-black">
                <div className="justify-start items-center flex mt-2 ml-1">
                  <img src="add.png" alt="" className="w-7 h-7 object-cover" />
                  <h3 className="text-base mt-2">Ajouter une boutique </h3>
                </div>
              </IonRouterLink>
            </div>
          </div>
          <ul
            className="mt-2 cursor-pointer"
            onClick={() => {
              dispatch(logOutt([]));
              console.log("kcz")

            }}
          >
            <li
              className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
              onClick={() => {
                dispatch(logOutt([]));
              console.log("kcz")

              }}
            >
              Se deconnecter
            </li>
          </ul>
          
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
