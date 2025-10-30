// Fix: Replaced placeholder content with actual type definitions.
export type Page = 'Painel' | 'Alunos' | 'Professores' | 'Agenda' | 'Financeiro';

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  instrument: string;
  teacherId: number;
  nextClass: string;
  grade: string;
  address: string;
  memberSince: string;
  dob: string; // Date of Birth
  cpf: string;
  guardianName?: string;
  guardianCpf?: string;
  plan: '3 months' | '6 months' | '12 months';
  monthlyFee: number;
  lessons: Lesson[];
  payments: Payment[];
}

export interface Teacher {
  id: number;
  name:string;
  instrument: string;
  students: number[];
  email: string;
  phone: string;
  address: string;
  bio: string;
}

export interface Lesson {
  id: number;
  studentId: number;
  teacherId: number;
  date: string;
  time: string;
  status: 'Agendada' | 'Concluída' | 'Cancelada';
  notes?: string;
}

export interface Payment {
  id: number;
  studentId: number;
  amount: number;
  date: string;
  status: 'Pago' | 'Pendente' | 'Atrasado';
}