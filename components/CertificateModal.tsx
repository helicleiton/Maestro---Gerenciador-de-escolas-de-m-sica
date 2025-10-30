// Fix: Replaced placeholder content with a new CertificateModal component.
import React from 'react';
import { Student } from '../types';
import { PrintIcon } from './Icons';
import { teachers } from '../data';

interface CertificateModalProps {
    student: Student;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ student, onClose }) => {
    const teacher = teachers.find(t => t.id === student.teacherId);
    const today = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    
    const handlePrint = () => {
        const printContents = document.getElementById('printable-certificate')?.innerHTML;
        const originalContents = document.body.innerHTML;
        if (printContents) {
            // A simple style block to make the print look better
            const style = `
                <style>
                    body { font-family: serif; text-align: center; padding: 40px; }
                    h1 { font-size: 3rem; margin-bottom: 1rem; color: #1e3a8a; }
                    h2 { font-size: 2.5rem; margin-bottom: 2rem; font-weight: normal; }
                    p { font-size: 1.2rem; line-height: 1.6; margin-bottom: 1.5rem; }
                    .signature-line { border-top: 1px solid #333; width: 250px; margin: 0 auto; padding-top: 8px; }
                    .footer { margin-top: 4rem; font-size: 1rem; color: #555; }
                </style>
            `;
            document.body.innerHTML = style + printContents;
            window.print();
            document.body.innerHTML = originalContents;
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col h-[90vh]">
                 <div className="flex justify-between items-center p-4 border-b print:hidden">
                    <h2 className="text-xl font-semibold">Certificado de Conclusão</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                <div className="p-8 overflow-y-auto flex-grow bg-gray-50 flex justify-center items-center">
                    <div id="printable-certificate" className="w-full h-full p-10 border-4 border-blue-900 bg-white" style={{ fontFamily: 'serif' }}>
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-blue-900 mb-4">Certificado de Conclusão</h1>
                            
                            <p className="text-xl mt-12">Certificamos que</p>
                            
                            <h2 className="text-4xl font-semibold my-8">{student.name}</h2>
                            
                            <p className="text-xl">
                                concluiu com sucesso o curso de <strong>{student.instrument}</strong> em nível <strong>{student.grade}</strong>,
                                demonstrando dedicação e talento musical.
                            </p>
                            
                            <div className="mt-20">
                                <p>Emitido em {today}.</p>
                            </div>
                            
                            <div className="mt-24 flex justify-around">
                                <div className="text-center">
                                    <p className="border-t border-gray-700 pt-2 px-8">_________________________</p>
                                    <p>{teacher?.name}</p>
                                    <p>Professor(a)</p>
                                </div>
                                <div className="text-center">
                                    <p className="border-t border-gray-700 pt-2 px-8">_________________________</p>
                                    <p>Direção da MusicSchool</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="p-4 border-t bg-gray-50 flex justify-end items-center space-x-4 print:hidden">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                        Fechar
                    </button>
                    <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                        <PrintIcon />
                        <span className="ml-2">Imprimir Certificado</span>
                    </button>
                </div>
            </div>
            
            <style>{`
                @media print {
                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CertificateModal;
