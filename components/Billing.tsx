// Fix: Replaced placeholder content with the Billing component implementation.
import React from 'react';
import { payments, students } from '../data';

const Billing: React.FC = () => {
    const totalPaid = payments.filter(p => p.status === 'Pago').reduce((sum, p) => sum + p.amount, 0);
    const totalPending = payments.filter(p => p.status === 'Pendente' || p.status === 'Atrasado').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Financeiro</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Total Recebido</h3>
                    <p className="mt-1 text-3xl font-semibold text-green-600">R$ {totalPaid.toFixed(2)}</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-sm font-medium text-gray-500">Pendente de Recebimento</h3>
                    <p className="mt-1 text-3xl font-semibold text-red-600">R$ {totalPending.toFixed(2)}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Todos os Pagamentos</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Data</th>
                            <th className="p-2">Aluno</th>
                            <th className="p-2">Valor</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(payment => {
                            const student = students.find(s => s.id === payment.studentId);
                            const statusColor = payment.status === 'Pago' ? 'text-green-600' : payment.status === 'Pendente' ? 'text-yellow-600' : 'text-red-600';

                            return (
                                <tr key={payment.id} className="border-b hover:bg-slate-50">
                                    <td className="p-2">{new Date(payment.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                                    <td className="p-2">{student?.name}</td>
                                    <td className="p-2">R$ {payment.amount.toFixed(2)}</td>
                                    <td className={`p-2 font-semibold ${statusColor}`}>{payment.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billing;
