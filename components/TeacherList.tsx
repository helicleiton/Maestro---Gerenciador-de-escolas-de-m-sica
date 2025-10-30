// Fix: Replaced placeholder content with the TeacherList component implementation.
import React, { useState } from 'react';
import { teachers as initialTeachers } from '../data';
import { Teacher } from '../types';
import TeacherDetail from './TeacherDetail';
import AddTeacherModal from './AddTeacherModal';

const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleAddTeacher = (newTeacher: Omit<Teacher, 'id' | 'students'>) => {
        const teacherToAdd: Teacher = {
            ...newTeacher,
            id: Math.max(...teachers.map(t => t.id), 0) + 1,
            students: [],
        };
        setTeachers([...teachers, teacherToAdd]);
    };


    if (selectedTeacher) {
        return <TeacherDetail teacher={selectedTeacher} onBack={() => setSelectedTeacher(null)} />;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Professores</h1>
                <button 
                    onClick={() => setAddModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Adicionar Professor
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Nome</th>
                            <th className="p-2">Instrumento(s)</th>
                            <th className="p-2">Nº de Alunos</th>
                            <th className="p-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedTeacher(teacher)}>
                                <td className="p-2 font-medium">{teacher.name}</td>
                                <td className="p-2">{teacher.instrument}</td>
                                <td className="p-2">{teacher.students.length}</td>
                                <td className="p-2">{teacher.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isAddModalOpen && <AddTeacherModal onClose={() => setAddModalOpen(false)} onAddTeacher={handleAddTeacher} />}
        </div>
    );
};

export default TeacherList;
