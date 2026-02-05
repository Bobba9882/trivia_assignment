type Variant = 'primary' | 'success' | 'warning' | 'danger';

type Props = {
    label: string;
    variant: Variant;
    selected: boolean;
    onClick: () => void;
};

export function AnswerButton({ label, variant, selected, onClick }: Props) {
    const base = `btn btn-${variant} w-100 text-start d-flex align-items-center justify-content-between`;
    const style: React.CSSProperties = {
        minHeight: 72,
        fontSize: '1.05rem',
        fontWeight: 700,
        borderWidth: selected ? 3 : 1,
        outline: selected ? '3px solid rgba(0,0,0,0.15)' : undefined,
    };

    return (
        <button type="button" className={base} style={style} onClick={onClick}>
            <span className="me-3">{label}</span>

            {selected && (
                <span className="badge text-bg-light text-uppercase">
          Selected
        </span>
            )}
        </button>
    );
}
