import React, { useState } from 'react';
import DentistList from './components/DentistList';
import BookAppointment from './components/BookAppointment';
import AdminPanel from './components/AdminPanel';
import { Stethoscope, ShieldCheck } from 'lucide-react';

function App() {
  const [view, setView] = useState('list');
  const [selectedDentist, setSelectedDentist] = useState(null);

  const handleBookClick = (dentist) => {
    setSelectedDentist(dentist);
    setView('book');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => setView('list')}
          >
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter italic">OroGlee</span>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-2xl">
            <button 
              onClick={() => setView('list')} 
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view !== 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Find Dentist
            </button>
            <button 
              onClick={() => setView('admin')} 
              className={`flex items-center px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Admin
            </button>
          </div>
        </div>
      </nav>

      <main className="animate-in fade-in duration-500">
        {view === 'list' && (
          <div className="max-w-7xl mx-auto py-12 px-4">
            <div className="mb-12 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Book your next<br/><span className="text-blue-600">Dental Session.</span></h1>
              <p className="text-gray-500 mt-4 max-w-md">Access top-rated dental professionals and manage your health seamlessly.</p>
            </div>
            <DentistList onBook={handleBookClick} />
          </div>
        )}

        {view === 'book' && (
          <BookAppointment dentist={selectedDentist} onBack={() => setView('list')} />
        )}

        {view === 'admin' && <AdminPanel />}
      </main>

      <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100 mt-20">
        &copy; 2026 OroGlee Dental Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default App;