import { moodMap } from "./moodMap";
import { fetchDataFromApi } from "./api";

export const getMoviesByMood = async (moodText) => {

    const words = moodText.toLowerCase().split(" ");

    let genre = null;

    words.forEach((word) => {
        if (moodMap[word]) {
            genre = moodMap[word];
        }
    });

    if (!genre) return [];

    const data = await fetchDataFromApi(`/discover/movie?with_genres=${genre}`);

    return data.results;
};