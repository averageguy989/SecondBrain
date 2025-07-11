import React, { useEffect } from 'react';
import '../styles/error.css';

interface ErrorProps {
    message: string;
    onClose?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onClose }: ErrorProps): JSX.Element => {
    // Auto-close after 5 seconds
    useEffect(() => {
        if (onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [onClose]);

    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-header">
                    <div className="error-title">
                        <svg
                            className="error-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Error
                    </div>
                    {onClose && (
                        <button className="error-close" onClick={onClose}>
                            <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                <p className="error-message">{message}</p>
            </div>
        </div>
    );
};

export default Error;