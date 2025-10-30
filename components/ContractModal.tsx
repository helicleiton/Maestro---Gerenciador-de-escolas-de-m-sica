import React from 'react';
import { Student } from '../types';
import { PrintIcon } from './Icons';

interface ContractModalProps {
    student: Student;
    onClose: () => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ student, onClose }) => {
    
    const planInMonths = parseInt(student.plan.split(' ')[0]);
    const totalValue = (student.monthlyFee * planInMonths).toFixed(2);
    const today = new Date().toLocaleDateString('pt-BR');

    const handlePrint = () => {
        const printContent = document.getElementById('printable-contract');
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'height=800,width=800');
        if (!printWindow) {
            alert('Por favor, permita pop-ups para imprimir o contrato.');
            return;
        }

        printWindow.document.write('<html><head><title>Contrato de Prestação de Serviços</title>');
        printWindow.document.write(`
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    margin: 40px;
                    color: #334155; /* slate-700 */
                }
                h1, h2, strong {
                    color: #0f172a; /* slate-900 */
                }
                h1 { text-align: center; font-size: 1.5rem; margin-bottom: 2rem; }
                h2 { font-size: 1.125rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 2rem; margin-bottom: 1rem; }
                p { margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.6; }
                .signature-section { margin-top: 6rem; display: flex; justify-content: space-around; text-align: center; font-size: 0.875rem; }
                .signature-line { border-top: 1px solid #334155; padding-top: 0.5rem; width: 250px; }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent.innerHTML.replace('signature-section', '')); // prevent duplicated classes
        
        // Re-create the signature part with print-specific classes
        printWindow.document.write(`
            <div class="signature-section">
                <div>
                    <p class="signature-line">Assinatura do Responsável pela CONTRATADA</p>
                </div>
                <div>
                    <p class="signature-line">Assinatura do(a) CONTRATANTE</p>
                </div>
            </div>
        `);

        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div id="contract-modal-container" className="bg-white rounded-lg shadow-2xl w-full max-w-3xl flex flex-col h-[90vh]">
                 <div className="flex justify-between items-center p-4 border-b print:hidden">
                    <h2 className="text-xl font-semibold text-slate-800">Contrato de Prestação de Serviços</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                <div id="printable-contract" className="p-8 overflow-y-auto flex-grow font-sans">
                    <h1 className="text-2xl font-bold text-center mb-8 text-slate-800">CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS</h1>

                    <p className="mb-4 text-sm text-slate-700 leading-relaxed"><strong>CONTRATADA:</strong> MusicSchool Ltda., com sede em [Endereço da Escola], inscrita no CNPJ sob o nº [CNPJ da Escola].</p>
                    
                    <p className="mb-4 text-sm text-slate-700 leading-relaxed"><strong>CONTRATANTE:</strong> <span className="font-semibold">{student.guardianName || student.name}</span>, portador(a) do CPF nº <span className="font-semibold">{student.guardianCpf || student.cpf}</span>, residente e domiciliado(a) em {student.address}.</p>

                    {student.guardianName && (
                        <p className="mb-6 text-sm text-slate-700 leading-relaxed"><strong>ALUNO(A):</strong> {student.name}, portador(a) do CPF nº {student.cpf}.</p>
                    )}

                    <h2 className="text-lg font-semibold mt-8 mb-3 border-b pb-2 text-slate-800">CLÁUSULA 1ª - DO OBJETO</h2>
                    <p className="mb-4 text-sm text-slate-700 leading-relaxed">O objeto do presente contrato é a prestação de serviços educacionais de música, especificamente no curso de <strong className="text-slate-900">{student.instrument}</strong>, a serem ministradas ao ALUNO(A) acima qualificado.</p>

                    <h2 className="text-lg font-semibold mt-8 mb-3 border-b pb-2 text-slate-800">CLÁUSULA 2ª - DO PLANO E DURAÇÃO</h2>
                    <p className="mb-4 text-sm text-slate-700 leading-relaxed">O presente contrato tem a duração de <strong className="text-slate-900">{planInMonths} meses</strong>, iniciando-se em {today}. As aulas ocorrerão em frequência e horários a serem combinados entre as partes.</p>

                    <h2 className="text-lg font-semibold mt-8 mb-3 border-b pb-2 text-slate-800">CLÁUSULA 3ª - DO VALOR E PAGAMENTO</h2>
                    <p className="mb-4 text-sm text-slate-700 leading-relaxed">Pelos serviços prestados, o(a) CONTRATANTE pagará à CONTRATADA o valor mensal de <strong className="text-slate-900">R$ {student.monthlyFee.toFixed(2)}</strong>. O valor total do presente contrato é de <strong className="text-slate-900">R$ {totalValue}</strong>.</p>
                    <p className="text-sm text-slate-700 leading-relaxed">O pagamento da mensalidade deverá ser efetuado até o dia 05 (cinco) de cada mês, através dos meios disponibilizados pela CONTRATADA.</p>

                    <h2 className="text-lg font-semibold mt-8 mb-3 border-b pb-2 text-slate-800">CLÁUSULA 4ª - DISPOSIÇÕES GERAIS</h2>
                    <p className="mb-4 text-sm text-slate-700 leading-relaxed">A CONTRATADA se compromete a fornecer ensino de qualidade, com professores qualificados e material didático adequado. O(A) CONTRATANTE se compromete a zelar pelo cumprimento dos horários e regras da escola.</p>
                    <p className="mb-4 text-sm text-slate-700 leading-relaxed">E, por estarem justos e contratados, assinam o presente instrumento em 2 (duas) vias de igual teor e forma.</p>
                    
                    <div className="mt-24 flex justify-around text-center text-sm signature-section">
                        <div>
                            <p className="pt-2 border-t border-slate-400 w-64 mx-auto">Assinatura do Responsável pela CONTRATADA</p>
                        </div>
                        <div>
                            <p className="pt-2 border-t border-slate-400 w-64 mx-auto">Assinatura do(a) CONTRATANTE</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t bg-gray-50 flex justify-end items-center space-x-4 print:hidden">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                        Fechar
                    </button>
                    <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors">
                        <PrintIcon />
                        <span className="ml-2">Imprimir Contrato</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContractModal;