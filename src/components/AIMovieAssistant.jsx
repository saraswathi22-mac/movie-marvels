import { useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import MovieCard from "./movieCard/MovieCard";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import "./styles.scss";

const moods = [
    { label: "Happy", genre: 35 },
    { label: "Romantic", genre: 10749 },
    { label: "Scary", genre: 27 },
    { label: "Sci-Fi", genre: 878 },
    { label: "Action", genre: 28 },
    { label: "Adventure", genre: 12 }
];

const AIMovieAssistant = () => {
    const [movies, setMovies] = useState([]);
    const [activeMood, setActiveMood] = useState(null);

    const getMovies = async (genre, label) => {
        const data = await fetchDataFromApi(`/discover/movie?with_genres=${genre}`);

        setMovies(data.results);
        setActiveMood(label);
    };

    return (
        <div className="aiAssistant">
            <ContentWrapper>

                <h2 className="assistantTitle">
                    {activeMood
                        ? `🤖 ${activeMood} Movies for Tonight`
                        : "🤖 What should I watch tonight?"}
                </h2>

                <div className="moodButtons">
                    {moods.map((mood) => (
                        <button
                            key={mood.genre}
                            className={activeMood === mood.label ? "active" : ""}
                            onClick={() => getMovies(mood.genre, mood.label)}
                        >
                            {mood.label}
                        </button>
                    ))}
                </div>

                {movies.length > 0 && (
                    <div className="content">
                        {movies.slice(0, 12).map((movie) => (
                            <MovieCard key={movie.id} data={movie} />
                        ))}
                    </div>
                )}

            </ContentWrapper>
        </div>
    );
};

export default AIMovieAssistant;