// src/components/AppLayout.tsx
import type { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center p-4">
            <div style={{ width: '100%', maxWidth: 900 }}>
                {children}
            </div>
        </div>
    );
}
