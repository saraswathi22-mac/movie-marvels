import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import AIMovieAssistant from "../../components/AIMovieAssistant";

const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <AIMovieAssistant />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default Home;
