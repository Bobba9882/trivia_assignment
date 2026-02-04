// src/components/LoadingOverlay.tsx
export function LoadingOverlay({ label }: { label?: string }) {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.35)', zIndex: 2000 }}
        >
            <div className="card shadow">
                <div className="card-body d-flex align-items-center gap-3">
                    <div className="spinner-border" role="status" aria-label="Loading" />
                    <div className="fw-semibold">{label ?? 'Loading...'}</div>
                </div>
            </div>
        </div>
    );
}
