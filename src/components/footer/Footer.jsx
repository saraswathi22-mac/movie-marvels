import React from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="infoText">&copy; 2025. All rights reserved.</div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
