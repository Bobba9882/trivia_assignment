// src/components/ErrorAlert.tsx
export function ErrorAlert({ message }: { message: string }) {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    );
}
