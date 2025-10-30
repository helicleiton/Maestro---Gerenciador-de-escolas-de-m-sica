// Fix: Replaced placeholder content with mock data for the application.
import { Student, Teacher, Lesson, Payment } from './types';

export const teachers: Teacher[] = [
  {
    id: 1,
    name: 'Carlos Mendes',
    instrument: 'Piano',
    students: [1, 3],
    email: 'carlos.mendes@musicschool.com',
    phone: '(11) 99999-1111',
    address: 'Rua do Conservatório, 10, São Paulo, SP',
    bio: 'Pianista clássico com mais de 15 anos de experiência em ensino para todas as idades.'
  },
  {
    id: 2,
    name: 'Daniela Rocha',
    instrument: 'Violão e Guitarra',
    students: [2, 4],
    email: 'daniela.rocha@musicschool.com',
    phone: '(21) 98888-2222',
    address: 'Travessa da Harmonia, 20, Rio de Janeiro, RJ',
    bio: 'Especialista em música popular brasileira e rock, com foco em técnica e improvisação.'
  },
  {
    id: 3,
    name: 'Fernanda Lima',
    instrument: 'Canto',
    students: [5],
    email: 'fernanda.lima@musicschool.com',
    phone: '(31) 97777-3333',
    address: 'Alameda dos Cantores, 30, Belo Horizonte, MG',
    bio: 'Cantora lírica e popular, com vasta experiência em técnica vocal e performance de palco.'
  },
];

export const students: Student[] = [
  {
    id: 1,
    name: 'Ana Silva',
    instrument: 'Piano',
    teacherId: 1,
    nextClass: '2024-08-05 10:00',
    grade: 'Intermediário',
    email: 'ana.silva@example.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123, São Paulo, SP',
    memberSince: '2023-01-15',
    dob: '1998-05-20',
    cpf: '123.456.789-10',
    plan: '6 months',
    monthlyFee: 250,
    lessons: [
        { id: 101, studentId: 1, teacherId: 1, date: '2024-07-29', time: '10:00', status: 'Concluída' },
        { id: 102, studentId: 1, teacherId: 1, date: '2024-08-05', time: '10:00', status: 'Agendada' }
    ],
    payments: [
        { id: 201, studentId: 1, amount: 250, date: '2024-07-01', status: 'Pago' },
        { id: 202, studentId: 1, amount: 250, date: '2024-08-01', status: 'Pendente' }
    ]
  },
  {
    id: 2,
    name: 'Bruno Costa',
    instrument: 'Violão',
    teacherId: 2,
    nextClass: '2024-08-05 14:00',
    grade: 'Iniciante',
    email: 'bruno.costa@example.com',
    phone: '(21) 91234-5678',
    address: 'Avenida Copacabana, 456, Rio de Janeiro, RJ',
    memberSince: '2023-03-20',
    dob: '2010-11-15',
    cpf: '234.567.890-21',
    guardianName: 'Marcos Costa',
    guardianCpf: '987.654.321-00',
    plan: '12 months',
    monthlyFee: 180,
    lessons: [
        { id: 103, studentId: 2, teacherId: 2, date: '2024-07-29', time: '14:00', status: 'Concluída' },
        { id: 104, studentId: 2, teacherId: 2, date: '2024-08-05', time: '14:00', status: 'Agendada' }
    ],
    payments: [
        { id: 203, studentId: 2, amount: 180, date: '2024-07-01', status: 'Pago' },
        { id: 204, studentId: 2, amount: 180, date: '2024-08-01', status: 'Pago' }
    ]
  },
  {
    id: 3,
    name: 'Carla Dias',
    instrument: 'Piano',
    teacherId: 1,
    nextClass: '2024-08-06 11:00',
    grade: 'Avançado',
    email: 'carla.dias@example.com',
    phone: '(11) 96543-2109',
    address: 'Praça da Sé, 789, São Paulo, SP',
    memberSince: '2022-11-10',
    dob: '1995-02-10',
    cpf: '345.678.901-32',
    plan: '3 months',
    monthlyFee: 300,
    lessons: [
        { id: 105, studentId: 3, teacherId: 1, date: '2024-07-30', time: '11:00', status: 'Concluída' },
        { id: 106, studentId: 3, teacherId: 1, date: '2024-08-06', time: '11:00', status: 'Agendada' }
    ],
    payments: [
        { id: 205, studentId: 3, amount: 300, date: '2024-07-01', status: 'Pago' },
        { id: 206, studentId: 3, amount: 300, date: '2024-08-01', status: 'Atrasado' }
    ]
  },
  {
    id: 4,
    name: 'Diego Martins',
    instrument: 'Guitarra',
    teacherId: 2,
    nextClass: '2024-08-07 18:00',
    grade: 'Intermediário',
    email: 'diego.martins@example.com',
    phone: '(21) 95432-1098',
    address: 'Rua Ipanema, 101, Rio de Janeiro, RJ',
    memberSince: '2023-05-01',
    dob: '2008-09-01',
    cpf: '456.789.012-43',
    guardianName: 'Sandra Martins',
    guardianCpf: '111.222.333-44',
    plan: '6 months',
    monthlyFee: 220,
    lessons: [
        { id: 107, studentId: 4, teacherId: 2, date: '2024-07-31', time: '18:00', status: 'Concluída' },
        { id: 108, studentId: 4, teacherId: 2, date: '2024-08-07', time: '18:00', status: 'Agendada' }
    ],
    payments: [
        { id: 207, studentId: 4, amount: 220, date: '2024-07-01', status: 'Pago' },
        { id: 208, studentId: 4, amount: 220, date: '2024-08-01', status: 'Pago' }
    ]
  },
  {
    id: 5,
    name: 'Elisa Ferreira',
    instrument: 'Canto',
    teacherId: 3,
    nextClass: '2024-08-08 09:00',
    grade: 'Iniciante',
    email: 'elisa.ferreira@example.com',
    phone: '(31) 94321-0987',
    address: 'Avenida Afonso Pena, 121, Belo Horizonte, MG',
    memberSince: '2024-02-12',
    dob: '2001-07-30',
    cpf: '567.890.123-54',
    plan: '12 months',
    monthlyFee: 190,
    lessons: [
        { id: 109, studentId: 5, teacherId: 3, date: '2024-08-01', time: '09:00', status: 'Concluída' },
        { id: 110, studentId: 5, teacherId: 3, date: '2024-08-08', time: '09:00', status: 'Agendada' }
    ],
    payments: [
        { id: 209, studentId: 5, amount: 190, date: '2024-07-01', status: 'Pago' },
        { id: 210, studentId: 5, amount: 190, date: '2024-08-01', status: 'Pendente' }
    ]
  }
];

export const lessons: Lesson[] = [
    ...students.flatMap(s => s.lessons)
];

export const payments: Payment[] = [
    ...students.flatMap(s => s.payments)
];