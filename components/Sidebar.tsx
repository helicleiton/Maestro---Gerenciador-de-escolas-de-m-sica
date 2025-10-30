import React from 'react';
import { Page } from '../types';
import { DashboardIcon, StudentsIcon, TeachersIcon, ScheduleIcon, BillingIcon } from './Icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  pageName: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ pageName, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === pageName;
  return (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-slate-700 hover:text-white'
      }`}
      onClick={() => setCurrentPage(pageName)}
    >
      {children}
      <span className="ml-4 font-medium">{pageName}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col p-4">
      <div className="text-2xl font-bold text-center py-4 border-b border-slate-700">
        MusicSchool
      </div>
      <nav className="mt-6">
        <ul>
          <NavItem pageName="Painel" currentPage={currentPage} setCurrentPage={setCurrentPage}>
            <DashboardIcon />
          </NavItem>
          <NavItem pageName="Alunos" currentPage={currentPage} setCurrentPage={setCurrentPage}>
            <StudentsIcon />
          </NavItem>
          <NavItem pageName="Professores" currentPage={currentPage} setCurrentPage={setCurrentPage}>
            <TeachersIcon />
          </NavItem>
          <NavItem pageName="Agenda" currentPage={currentPage} setCurrentPage={setCurrentPage}>
            <ScheduleIcon />
          </NavItem>
          <NavItem pageName="Financeiro" currentPage={currentPage} setCurrentPage={setCurrentPage}>
            <BillingIcon />
          </NavItem>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;