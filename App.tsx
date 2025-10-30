// Fix: Replaced placeholder content with the main App component implementation.
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import ScheduleView from './components/ScheduleView';
import Billing from './components/Billing';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Painel');

  const renderPage = () => {
    switch (currentPage) {
      case 'Painel':
        return <Dashboard />;
      case 'Alunos':
        return <StudentList />;
      case 'Professores':
        return <TeacherList />;
      case 'Agenda':
        return <ScheduleView />;
      case 'Financeiro':
        return <Billing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
