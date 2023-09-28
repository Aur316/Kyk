import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./logo";
// @ts-ignore
import en_locale from "/locales/en-US.json";
// @ts-ignore
import es_locale from "/locales/es-ES.json";

type TProps = {
  selected?:
    | "about"
    | "home"
    | "services"
    | "news"
    | "contact"
    | "warnings"
    | "drug-policy";
  sticky: boolean;
};
const LangSwitch = () => {
  const { locale } = useRouter();

  return (
    <Link href="#" locale={locale === "en-US" ? "es-ES" : "en-US"}>
      <a className="mx-4">{locale === "en-US" ? "Español" : "English"}</a>
    </Link>
  );
};
export const Header = ({ selected, sticky }: TProps) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const menuClass = isMobileMenuOpen
    ? "navbar6-mobile-menu active"
    : "navbar6-desktop-menu";

  const toggleMenu = (
    menuSetter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    if (isOpen) {
      closeAllMenus();
    } else {
      closeAllMenus();
      menuSetter(true);
    }
  };

  const closeAllMenus = () => {
    setServicesOpen(false);
    setAboutOpen(false);
    setContactOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".navbar6-container")) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const locales: any = {
    "en-US": en_locale,
    "es-ES": es_locale,
  };

  const { locale } = useRouter();
  const t = locales[locale || "en-US"];

  const toggleRef = useRef(null);

  return (
    <div className="navbar6-container">
      <div className="logo-container">
        <Link href="/" passHref>
          <a className="navbar6-link">
            <Logo />
          </a>
        </Link>
      </div>
      <div
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="navbar6hamburger-menu"
      >
        ☰
      </div>{" "}
      <div className="menu-container">
        <div className={menuClass}>
          <div style={{ position: "relative" }}>
            <Link href="#">
              <a
                className="navbar6-link nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu(setServicesOpen, servicesOpen);
                }}
              >
                {t["nav_services"]}
              </a>
            </Link>
            {servicesOpen && (
              <div className="navbar6dropdown-menu">
                <Link href="/services/users" passHref>
                  <a onClick={closeMobileMenu}>Users</a>
                </Link>
                <Link href="/services/organizations" passHref>
                  <a onClick={closeMobileMenu}>Organizations</a>
                </Link>
                <Link href="/services/market-monitoring" passHref>
                  <a onClick={closeMobileMenu}>Market Monitoring</a>
                </Link>
              </div>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <Link href="/#news" passHref>
              <a className="navbar6-link nav-item" onClick={closeMobileMenu}>
                {t["nav_news"]}
              </a>
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link href="/#warnings" passHref>
              <a className="navbar6-link warnings" onClick={closeMobileMenu}>
                {t["nav_warnings"]}
              </a>
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link href="/results" passHref>
              <a className="navbar6-link results" onClick={closeMobileMenu}>
                {t["nav_results"]}
              </a>
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link href="/drug-policy" passHref>
              <a className="navbar6-link nav-item" onClick={closeMobileMenu}>
                {t["nav_drug_policy"]}
              </a>
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link href="#">
              <a
                className="navbar6-link nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu(setAboutOpen, aboutOpen);
                }}
              >
                {t["nav_about"]}
              </a>
            </Link>
            {aboutOpen && (
              <div className="navbar6dropdown-menu">
                <Link href="/about/about" passHref>
                  <a onClick={closeMobileMenu}>Kykeon</a>
                </Link>
                <Link href="/about/partners" passHref>
                  <a onClick={closeMobileMenu}>Partners</a>
                </Link>
              </div>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <Link href="#">
              <a
                className="navbar6-link nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu(setContactOpen, contactOpen);
                }}
              >
                {t["nav_contact"]}
              </a>
            </Link>
            {contactOpen && (
              <div className="navbar6dropdown-menu">
                <Link href="/contact/jobs" passHref>
                  <a onClick={closeMobileMenu}>Job Openings</a>
                </Link>
                <Link href="/contact/suggest" passHref>
                  <a onClick={closeMobileMenu}>Suggest a Vendor/Substance</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lang-switch-container">
        <div className=" flex flex-row items-center font-bold">
          <LangSwitch />
        </div>
      </div>
    </div>
  );
};
