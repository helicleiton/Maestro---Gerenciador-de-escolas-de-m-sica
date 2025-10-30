// Fix: Replaced placeholder content with the ScheduleView component implementation.
import React from 'react';
import { lessons, students, teachers } from '../data';

const ScheduleView: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Agenda de Aulas</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Data</th>
                            <th className="p-2">Hora</th>
                            <th className="p-2">Aluno</th>
                            <th className="p-2">Professor</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(lesson => {
                            const student = students.find(s => s.id === lesson.studentId);
                            const teacher = teachers.find(t => t.id === lesson.teacherId);
                            const statusColor = lesson.status === 'Concluída' ? 'text-green-600' : lesson.status === 'Agendada' ? 'text-blue-600' : 'text-red-600';

                            return (
                                <tr key={lesson.id} className="border-b hover:bg-slate-50">
                                    <td className="p-2">{new Date(lesson.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                                    <td className="p-2">{lesson.time}</td>
                                    <td className="p-2">{student?.name}</td>
                                    <td className="p-2">{teacher?.name}</td>
                                    <td className={`p-2 font-semibold ${statusColor}`}>{lesson.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleView;
