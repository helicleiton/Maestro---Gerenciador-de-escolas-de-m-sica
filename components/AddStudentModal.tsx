// Fix: Replaced placeholder content with the AddStudentModal component implementation.
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Student } from '../types';

interface AddStudentModalProps {
    onClose: () => void;
    onAddStudent: (student: Omit<Student, 'id' | 'lessons' | 'payments'>) => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onAddStudent }) => {
    const [name, setName] = useState('');
    const [instrument, setInstrument] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [cpf, setCpf] = useState('');
    const [address, setAddress] = useState('');
    const [guardianName, setGuardianName] = useState('');
    const [guardianCpf, setGuardianCpf] = useState('');
    const [isMinor, setIsMinor] = useState(false);
    const [plan, setPlan] = useState<'3 months' | '6 months' | '12 months'>('3 months');
    const [monthlyFee, setMonthlyFee] = useState('');

    const inputClasses = "shadow appearance-none border border-slate-600 bg-slate-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400";


    useEffect(() => {
        if (dob) {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setIsMinor(age < 18);
        } else {
            setIsMinor(false);
        }
    }, [dob]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddStudent({
            name,
            instrument,
            email,
            phone,
            dob,
            cpf,
            address,
            guardianName: isMinor ? guardianName : undefined,
            guardianCpf: isMinor ? guardianCpf : undefined,
            plan,
            monthlyFee: parseFloat(monthlyFee),
            teacherId: 1, // Placeholder
            nextClass: 'A agendar',
            grade: 'Iniciante',
            memberSince: new Date().toISOString().slice(0, 10),
        });
        // onClose(); // The parent component will close this and open the contract modal
    };

    return (
        <Modal title="Adicionar Novo Aluno" onClose={onClose} size="2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">Nome Completo</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClasses} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Data de Nascimento</label>
                        <input type="date" value={dob} onChange={e => setDob(e.target.value)} className={inputClasses} required />
                    </div>
                     <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">CPF</label>
                        <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} className={inputClasses} placeholder="000.000.000-00" required />
                    </div>
                </div>
                 <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">Endereço</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} className={inputClasses} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} required />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Telefone</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClasses} placeholder="(00) 90000-0000" required />
                    </div>
                </div>
                
                <div className="border-t border-slate-700 pt-4 mt-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2">Instrumento</label>
                            <input type="text" value={instrument} onChange={e => setInstrument(e.target.value)} className={inputClasses} required />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2">Plano de Aulas</label>
                            <select value={plan} onChange={e => setPlan(e.target.value as any)} className={inputClasses} required>
                                <option value="3 months">3 Meses</option>
                                <option value="6 months">6 Meses</option>
                                <option value="12 months">12 Meses</option>
                            </select>
                        </div>
                     </div>
                     <div className="mt-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Valor da Mensalidade (R$)</label>
                        <input type="number" step="0.01" value={monthlyFee} onChange={e => setMonthlyFee(e.target.value)} className={inputClasses} required />
                    </div>
                </div>


                {isMinor && (
                    <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                        <h3 className="font-bold text-yellow-900 mb-2">Dados do Responsável (Aluno menor de idade)</h3>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-yellow-900 text-sm font-bold mb-2">Nome do Responsável</label>
                                <input type="text" value={guardianName} onChange={e => setGuardianName(e.target.value)} className={inputClasses} required={isMinor} />
                            </div>
                            <div>
                                <label className="block text-yellow-900 text-sm font-bold mb-2">CPF do Responsável</label>
                                <input type="text" value={guardianCpf} onChange={e => setGuardianCpf(e.target.value)} className={inputClasses} placeholder="000.000.000-00" required={isMinor} />
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center justify-end pt-4 border-t border-slate-700">
                    <button type="button" onClick={onClose} className="bg-slate-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-slate-500">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Adicionar e Gerar Contrato
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddStudentModal;