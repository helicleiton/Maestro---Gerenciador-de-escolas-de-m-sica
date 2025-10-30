// Fix: Replaced placeholder content with the StudentDetail component implementation.
import React, { useState } from 'react';
import { Student, Lesson, Payment } from '../types';
import { teachers } from '../data';
import CertificateModal from './CertificateModal';

interface StudentDetailProps {
    student: Student;
    onBack: () => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">{title}</h2>
        <div className="space-y-2 text-gray-700">
            {children}
        </div>
    </div>
);

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
    const [isCertificateModalOpen, setCertificateModalOpen] = useState(false);
    const teacher = teachers.find(t => t.id === student.teacherId);
    
    // In a real app, this would be fetched, but we'll use the embedded data for now
    const studentLessons: Lesson[] = student.lessons; 
    const studentPayments: Payment[] = student.payments;

    return (
        <div>
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &larr; Voltar para a lista de alunos
            </button>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                    <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-slate-600 mr-6 mb-4 sm:mb-0 flex-shrink-0">
                        {student.name.charAt(0)}
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-4xl font-bold text-slate-800">{student.name}</h1>
                        <p className="text-lg text-gray-500">{student.instrument} - {student.grade}</p>
                        <p className="text-sm text-gray-500">Membro desde: {new Date(student.memberSince).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                    </div>
                    <button 
                        onClick={() => setCertificateModalOpen(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-4 sm:mt-0"
                    >
                        Gerar Certificado
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InfoCard title="Informações Pessoais">
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Telefone:</strong> {student.phone}</p>
                        <p><strong>Endereço:</strong> {student.address}</p>
                        <p><strong>Data de Nasc.:</strong> {new Date(student.dob).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                        <p><strong>CPF:</strong> {student.cpf}</p>
                        {student.guardianName && <p><strong>Responsável:</strong> {student.guardianName} (CPF: {student.guardianCpf})</p>}
                    </InfoCard>
                     <InfoCard title="Detalhes do Curso">
                        <p><strong>Professor:</strong> {teacher?.name}</p>
                        <p><strong>Próxima Aula:</strong> {student.nextClass}</p>
                        <p><strong>Plano:</strong> {student.plan}</p>
                        <p><strong>Mensalidade:</strong> R$ {student.monthlyFee.toFixed(2)}</p>
                    </InfoCard>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Histórico de Aulas</h2>
                     <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Data</th>
                                    <th className="p-2">Hora</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentLessons.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(lesson => (
                                    <tr key={lesson.id} className="border-b">
                                        <td className="p-2">{new Date(lesson.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                                        <td className="p-2">{lesson.time}</td>
                                        <td className="p-2">{lesson.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                 <div className="mt-8">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Histórico de Pagamentos</h2>
                     <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Data</th>
                                    <th className="p-2">Valor</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentPayments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(payment => (
                                    <tr key={payment.id} className="border-b">
                                        <td className="p-2">{new Date(payment.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                                        <td className="p-2">R$ {payment.amount.toFixed(2)}</td>
                                        <td className="p-2">{payment.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isCertificateModalOpen && <CertificateModal student={student} onClose={() => setCertificateModalOpen(false)} />}
        </div>
    );
};

export default StudentDetail;
