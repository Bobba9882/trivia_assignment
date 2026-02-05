/**
 * ErrorAlert - Bootstrap danger alert for displaying error messages.
 */
export function ErrorAlert({ message }: { message: string }) {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    );
}
