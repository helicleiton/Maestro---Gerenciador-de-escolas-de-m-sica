// Fix: Replaced placeholder content with the Dashboard component implementation.
import React from 'react';
import { students, teachers, lessons, payments } from '../data';

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
);


const Dashboard: React.FC = () => {
    const totalStudents = students.length;
    const totalTeachers = teachers.length;
    const upcomingLessons = lessons.filter(l => l.status === 'Agendada').length;
    const pendingPayments = payments.filter(p => p.status === 'Pendente' || p.status === 'Atrasado').length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Painel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total de Alunos" value={totalStudents} description="Alunos ativos na escola." />
                <StatCard title="Total de Professores" value={totalTeachers} description="Professores lecionando." />
                <StatCard title="Aulas Agendadas" value={upcomingLessons} description="Próximas aulas na semana." />
                <StatCard title="Pagamentos Pendentes" value={pendingPayments} description="Mensalidades a receber." />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Próximas Aulas</h2>
                    <ul>
                        {lessons.filter(l => l.status === 'Agendada').slice(0, 5).map(lesson => {
                             const student = students.find(s => s.id === lesson.studentId);
                             const teacher = teachers.find(t => t.id === lesson.teacherId);
                             return (
                                <li key={lesson.id} className="border-b py-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{student?.name}</p>
                                        <p className="text-sm text-gray-500">{teacher?.name} - {student?.instrument}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{new Date(lesson.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                                        <p className="text-sm text-gray-500">{lesson.time}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Atividade Financeira Recente</h2>
                    <ul>
                         {payments.slice(0, 5).map(payment => {
                             const student = students.find(s => s.id === payment.studentId);
                             const statusColor = payment.status === 'Pago' ? 'text-green-500' : payment.status === 'Pendente' ? 'text-yellow-500' : 'text-red-500';
                             return (
                                <li key={payment.id} className="border-b py-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{student?.name}</p>
                                        <p className="text-sm text-gray-500">Valor: R$ {payment.amount.toFixed(2)}</p>
                                    </div>
                                    <p className={`font-semibold ${statusColor}`}>{payment.status}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
