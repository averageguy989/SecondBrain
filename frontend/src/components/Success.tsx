import React, { useEffect } from 'react';
import '../styles/success.css';

interface SuccessProps {
    message: string;
    onClose?: () => void;
}

const Success: React.FC<SuccessProps> = ({ message, onClose }: SuccessProps): JSX.Element => {
    // Auto-close after 3 seconds
    useEffect(() => {
        if (onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [onClose]);

    return (
        <div className="success-container">
            <div className="success-content">
                <div className="success-header">
                    <div className="success-title">
                        <svg
                            className="success-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Success
                    </div>
                    {onClose && (
                        <button className="success-close" onClick={onClose}>
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
                <p className="success-message">{message}</p>
            </div>
        </div>
    );
};

export default Success; 