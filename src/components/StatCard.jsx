const StatCard = ({ title, value, emoji, bg, border }) => (
    <div className="col-lg-3 col-md-6 mb-3">
        <div
            className="p-4 rounded"
            style={{
                backgroundColor: bg,
                border: `1px solid ${border}`,
            }}
        >
            <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <p className="text-muted small mb-1">{title}</p>
                    <h2 className="text-light fw-bold mb-0">{value}</h2>
                </div>
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: border.replace('0.3', '0.2'),
                        fontSize: '28px',
                    }}
                >
                    {emoji}
                </div>
            </div>
        </div>
    </div>
);

export default StatCard;
