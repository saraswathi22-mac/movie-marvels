import { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "/assets/movie-logo.png";
import movieMarvelsLogo from "/assets/movie-marvels.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current && !mobileMenu) {
          setShow("hide");
        } else {
          setShow("show");
        }
      } else {
        setShow("top");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenu]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.trim().length > 0) {
      navigate(`/search/${query.trim()}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          {mobileMenu ? (
            <img src={logo} alt="Logo" />
          ) : (
            <>
              <img src={logo} alt="Logo" className="logoIcon" />
              <img
                src={movieMarvelsLogo}
                alt="MovieMarvels Logo"
                className="logoText"
              />
            </>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => navigationHandler("movie")}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => navigationHandler("tv")}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        {/* Mobile Icons */}
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {/* Search Bar */}
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or TV show..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
