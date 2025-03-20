/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div className="">
            <h3 className="text-xs uppercase text-slate-500 font-semibold">
              {/* <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span> */}
              <span className="block">Pages</span>
            </h3>
            <ul className="mt-3 p-0">
              {/* Accueil */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  (pathname === "/" || pathname === "/home") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate no-underline transition duration-150 ${
                    (pathname === "/" || pathname === "/home") &&
                    "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="dashboard.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Accueil
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Enregistrer une vente */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("homecom") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/homecom"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname.includes("homecom") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="shopping.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Enregistrer une vente
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Gérer les produits */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("Article") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/Article"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname.includes("Article") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="check.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Gérer les produits
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Historique des opérations */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("Historique/0") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/Historique/0"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname.includes("Historique/0") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="historique-des-achats.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Historique des opérations
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Finances et comptabilité */}
              <SidebarLinkGroup
                activecondition={pathname.includes("/Finances")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white no-underline truncate transition duration-150 ${
                          pathname.includes("/Finances") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src="financial-profit.png"
                              alt=""
                              className="w-7 h-7 object-cover"
                            />
                            <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                              Finances-Comptabilité
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/FinancesCompta"
                              className={
                                pathname === "/FinancesCompta"
                                  ? "block text-indigo-500 hover:text-slate-200 no-underline transition duration-150 truncate"
                                  : "block text-slate-400 hover:text-slate-200 no-underline transition duration-150 truncate"
                              }
                            >
                              <span className="text-sm font-medium opacity-100 2xl:opacity-100 duration-200">
                                Bilan journalier
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/FinancesComptaPeriode"
                              className={
                                pathname === "/FinancesComptaPeriode"
                                  ? "block text-indigo-500 hover:text-slate-200 no-underline transition duration-150 truncate"
                                  : "block text-slate-400 hover:text-slate-200 no-underline transition duration-150 truncate"
                              }
                            >
                              <span className="text-sm font-medium opacity-100 2xl:opacity-100 duration-200">
                                Bilan périodique
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Caisse */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/caisse"  && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/caisse"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname === "/caisse" && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="cash-flow.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Caisse
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Dépense */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("depense") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/depense"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname.includes("depense") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="depenses.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Dépense
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Décaissement */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/decaissement" && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/decaissement"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname === "/decaissement" && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="expenses.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Décaissement
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Droit d'accès */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("create_droit_dacces") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/create_droit_dacces"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname.includes("create_droit_dacces") &&
                    "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="authorization.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Droit d'accès
                    </span>
                  </div>
                </NavLink>
              </li> */}
              {/* Ma boutique */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("voir_profile") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/voir_profile"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname.includes("voir_profile") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="resume.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Ma Boutique
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Demande de fonctionnalités */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("demande_fonctionnalite") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/demande_fonctionnalite"
                  className={`block text-slate-200 hover:text-white truncate transition no-underline duration-150 ${
                    pathname.includes("demande_fonctionnalite") &&
                    "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="refresh.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Demander un fonctionnalité
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Nous contactez */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("partager") && "bg-slate-900"
                }`}>
                <NavLink
                  end
                  to={"/partager"}
                  className={
                    "block text-slate-200 hover:text-white truncate transition no-underline duration-150"
                  }
                >
                  <div className="flex items-center">
                    <img
                      src="network.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Partager
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className={"px-3 py-2 rounded-sm mb-0.5 last:mb-0"}>
                <NavLink
                  end
                  to={"#"}
                  onClick={() => {
                    const numUser = "22969889350";
                    const whats = `https://wa.me/${numUser}`;
                    window.location.href = whats;
                  }}
                  className={
                    "block text-slate-200 hover:text-white truncate transition no-underline duration-150"
                  }
                >
                  <div className="flex items-center">
                    <img
                      src="whatsapps.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Nous contactez
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className={"px-3 py-2 rounded-sm mb-0.5 last:mb-0"}>
                <NavLink
                  end
                  to={"#"}
                  onClick={() => {
                    const download = `https://versatileskills.space/download/Digital_Traders.apk`;
                    window.location.href = download;
                  }}
                  className={
                    "block text-slate-200 hover:text-white truncate transition no-underline duration-150"
                  }
                >
                  <div className="flex items-center">
                    <img
                      src="cloud-computing.png"
                      alt=""
                      className="w-7 h-7 object-cover"
                    />
                    <span className="text-sm font-medium ml-3 opacity-100 duration-200">
                      Version client
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('dashboard')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          (pathname === '/' || pathname.includes('dashboard')) && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path
                                className={`fill-current text-slate-400 ${
                                  (pathname === '/' || pathname.includes('dashboard')) && '!text-indigo-500'
                                }`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-indigo-600'}`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-indigo-200'}`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                          {/ Icon /}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Main
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Fintech
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        {/* <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
