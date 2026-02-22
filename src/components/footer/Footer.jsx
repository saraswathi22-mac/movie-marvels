import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="infoText">
          © {currentYear} MovieMarvels. All rights reserved.
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;