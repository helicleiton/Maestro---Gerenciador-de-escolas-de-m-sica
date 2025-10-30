// Fix: Replaced placeholder content with a generic Modal component implementation.
import React from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    size?: 'md' | 'lg' | 'xl' | '2xl';
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title, size = 'md' }) => {
    const sizeClasses = {
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className={`bg-slate-800 rounded-lg shadow-xl w-full ${sizeClasses[size]}`}>
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;