// Fix: Replaced placeholder content with the AddTeacherModal component implementation.
import React, { useState } from 'react';
import Modal from './Modal';
import { Teacher } from '../types';

interface AddTeacherModalProps {
    onClose: () => void;
    onAddTeacher: (teacher: Omit<Teacher, 'id' | 'students'>) => void;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ onClose, onAddTeacher }) => {
    const [name, setName] = useState('');
    const [instrument, setInstrument] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    
    const inputClasses = "shadow appearance-none border border-slate-600 bg-slate-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTeacher({
            name,
            instrument,
            email,
            phone,
            bio,
            address: 'Não informado',
        });
        onClose();
    };

    return (
        <Modal title="Adicionar Novo Professor" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">Nome Completo</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">Instrumento(s)</label>
                    <input type="text" value={instrument} onChange={e => setInstrument(e.target.value)} className={inputClasses} required />
                </div>
                 <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">Telefone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClasses} required />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">Bio</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} className={`${inputClasses} h-24`} required />
                </div>
                <div className="flex items-center justify-end pt-4 border-t border-slate-700">
                    <button type="button" onClick={onClose} className="bg-slate-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-slate-500">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Adicionar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddTeacherModal;