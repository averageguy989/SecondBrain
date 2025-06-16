import React from 'react';

interface ErrorProps {
    message: string;
    onClose?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message,onClose }: ErrorProps): JSX.Element => {
    // Handle close button click
    const handleClose = (): void => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="error-container">
            <div className="error-content">
                <strong>Error:</strong>
                <p>{message}</p>
                {onClose && <button onClick={handleClose}>Close</button>}
            </div>
        </div>
    )
};

export default Error;