import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const PageNotFound = () => {
  return (
    <main className="pageNotFound" role="alert">
      <ContentWrapper>
        <h1 className="bigText">404</h1>
        <p className="smallText">
          Sorry, the page you are looking for doesn’t exist.
        </p>
      </ContentWrapper>
    </main>
  );
};

export default PageNotFound;
