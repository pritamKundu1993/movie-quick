import { useEffect, useState } from 'react';
import { API_OPTIONS, BACKGROUND_VIDEO_BASE_API_URL, IMAGE_CDN } from '../utils/constants';
import LoadingComponents from './LoadingComponents';

const TrailersSection = () => {
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrailer, setSelectedTrailer] = useState(null);

    useEffect(() => {
        fetchTrailers();
    }, []);

    const fetchTrailers = async () => {
        try {
            const response = await fetch(
                `${BACKGROUND_VIDEO_BASE_API_URL}/movie/popular?language=en-US&page=1`,
                API_OPTIONS,
            );
            const data = await response.json();

            if (data.results) {
                const trailersPromises = data.results.slice(0, 10).map(async (movie) => {
                    try {
                        const videoResponse = await fetch(
                            `${BACKGROUND_VIDEO_BASE_API_URL}/movie/${movie.id}/videos?language=en-US`,
                            API_OPTIONS,
                        );
                        const videoData = await videoResponse.json();

                        const trailer = videoData.results.find(
                            (video) => video.type === 'Trailer' && video.site === 'YouTube',
                        );

                        if (trailer) {
                            return {
                                movie,
                                videoKey: trailer.key,
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error(`Error fetching trailer for ${movie.title}:`, error);
                        return null;
                    }
                });

                const trailersData = await Promise.all(trailersPromises);
                const validTrailers = trailersData.filter((item) => item !== null);
                setTrailers(validTrailers);
                if (validTrailers.length > 0) {
                    setSelectedTrailer(validTrailers[0]);
                }
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching trailers:', error);
            setLoading(false);
        }
    };

    const handleTrailerSelect = (trailer) => {
        setSelectedTrailer(trailer);
    };

    if (loading) {
        return <LoadingComponents />;
    }

    if (trailers.length === 0) {
        return null;
    }

    return (
        <section className="py-5" style={{ backgroundColor: '#0a0a0a' }} id="trailers">
            <div className="container">
                <h2 className="text-light fw-bold mb-4">Trailers</h2>

                {/* Featured Trailer Player */}
                <div className="position-relative rounded overflow-hidden mb-4">
                    {selectedTrailer && (
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe
                                key={selectedTrailer.videoKey}
                                className="embed-responsive-item"
                                src={`https://www.youtube.com/embed/${selectedTrailer.videoKey}?rel=0`}
                                title={selectedTrailer.movie.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                                style={{ border: 'none' }}
                            ></iframe>
                        </div>
                    )}
                </div>

                {/* Thumbnail Row */}
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    {trailers.slice(0, 5).map((item, index) => (
                        <div
                            key={`thumb-${index}`}
                            className="position-relative rounded overflow-hidden"
                            style={{
                                width: '120px',
                                height: '120px',
                                cursor: 'pointer',
                                border:
                                    selectedTrailer?.movie.id === item.movie.id
                                        ? '3px solid #dc3545'
                                        : '3px solid transparent',
                                transition: 'all 0.3s ease',
                                flexShrink: 0,
                            }}
                            onClick={() => handleTrailerSelect(item)}
                        >
                            <img
                                src={`${IMAGE_CDN}${item.movie.poster_path}`}
                                alt={item.movie.title}
                                className="w-100 h-100"
                                style={{
                                    objectFit: 'cover',
                                    filter:
                                        selectedTrailer?.movie.id === item.movie.id
                                            ? 'brightness(1)'
                                            : 'brightness(0.7)',
                                    transition: 'filter 0.3s ease',
                                }}
                            />

                            <div
                                className="position-absolute top-50 start-50 translate-middle"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: 'rgba(220, 53, 69, 0.9)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <i className="bi bi-play-fill text-white fs-5"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrailersSection;
