import { useState, useEffect } from 'react';
import { API_OPTIONS, BACKGROUND_VIDEO_BASE_API_URL } from '../utils/constants';

export const useFeaturedMovie = () => {
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedMovie();
    }, []);

    const fetchFeaturedMovie = async () => {
        try {
            // Fetch trending movies
            const response = await fetch(
                `${BACKGROUND_VIDEO_BASE_API_URL}/trending/movie/day?language=en-US`,
                API_OPTIONS
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                // Get random movie
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const movieId = data.results[randomIndex].id;

                // Fetch movie details with videos in a single request using append_to_response
                const detailsResponse = await fetch(
                    `${BACKGROUND_VIDEO_BASE_API_URL}/movie/${movieId}?language=en-US&append_to_response=videos`,
                    API_OPTIONS
                );
                const detailsData = await detailsResponse.json();

                // Find the trailer
                const trailerVideo = detailsData.videos?.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );

                setMovie(detailsData);
                setTrailer(trailerVideo);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching featured movie:', error);
            setLoading(false);
        }
    };

    return { movie, trailer, loading };
};
