// Fix: Replaced placeholder content with the TeacherDetail component implementation.
import React from 'react';
import { Teacher } from '../types';
import { students } from '../data';

interface TeacherDetailProps {
    teacher: Teacher;
    onBack: () => void;
}

const TeacherDetail: React.FC<TeacherDetailProps> = ({ teacher, onBack }) => {
    const teacherStudents = students.filter(s => teacher.students.includes(s.id));

    return (
        <div>
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &larr; Voltar para a lista de professores
            </button>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-slate-600 mr-6">
                        {teacher.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800">{teacher.name}</h1>
                        <p className="text-lg text-gray-500">Leciona: {teacher.instrument}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Informações Pessoais</h2>
                        <p><strong>Email:</strong> {teacher.email}</p>
                        <p><strong>Telefone:</strong> {teacher.phone}</p>
                        <p><strong>Endereço:</strong> {teacher.address}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Biografia</h2>
                        <p>{teacher.bio}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Alunos</h2>
                    <ul className="space-y-2">
                        {teacherStudents.map(student => (
                            <li key={student.id} className="bg-slate-50 p-3 rounded-lg flex justify-between">
                                <span>{student.name}</span>
                                <span className="text-gray-500">{student.instrument}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeacherDetail;
