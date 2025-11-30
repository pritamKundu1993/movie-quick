const LoadingComponents = () => {
    return (
        <section className="py-5" style={{ backgroundColor: '#0a0a0a' }} id="trailers">
            <div className="container text-center">
                <div className="spinner-border text-danger" role="status"></div>
                <span className="visually-hidden">Loading...</span>
            </div>
        </section>
    );
};

export default LoadingComponents;
