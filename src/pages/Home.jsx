import FeaturedMovie from '../components/FeaturedMovies';
import NowShowing from '../components/NowShowing';
import TrailersSection from '../components/TrailorasSection';

const Home = () => {
    return (
        <div style={{ margin: 0, padding: 0 }}>
            <FeaturedMovie />
            <NowShowing />
            <TrailersSection />
        </div>
    );
};

export default Home;
