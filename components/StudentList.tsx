// Fix: Replaced placeholder content with the StudentList component implementation.
import React, { useState } from 'react';
import { students as initialStudents, teachers } from '../data';
import { Student } from '../types';
import StudentDetail from './StudentDetail';
import AddStudentModal from './AddStudentModal';
import ContractModal from './ContractModal';

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [studentForContract, setStudentForContract] = useState<Student | null>(null);

    const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'lessons' | 'payments'>) => {
        const newStudent: Student = {
            ...newStudentData,
            id: Math.max(...students.map(s => s.id), 0) + 1,
            lessons: [],
            payments: [],
        };
        setStudents([...students, newStudent]);
        setAddModalOpen(false);
        setStudentForContract(newStudent);
    };

    if (selectedStudent) {
        return <StudentDetail student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Alunos</h1>
                <button 
                    onClick={() => setAddModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Adicionar Aluno
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Nome</th>
                            <th className="p-2">Instrumento</th>
                            <th className="p-2">Professor</th>
                            <th className="p-2">Próxima Aula</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => {
                            const teacher = teachers.find(t => t.id === student.teacherId);
                            return (
                                <tr key={student.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedStudent(student)}>
                                    <td className="p-2 font-medium">{student.name}</td>
                                    <td className="p-2">{student.instrument}</td>
                                    <td className="p-2">{teacher?.name}</td>
                                    <td className="p-2">{student.nextClass}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isAddModalOpen && <AddStudentModal onClose={() => setAddModalOpen(false)} onAddStudent={handleAddStudent} />}
            {studentForContract && <ContractModal student={studentForContract} onClose={() => setStudentForContract(null)} />}
        </div>
    );
};

export default StudentList;