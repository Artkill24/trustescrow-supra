import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CreateEscrowModal from './components/CreateEscrowModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen dark">
      <Header onNavigate={setCurrentPage} onCreateEscrow={() => setIsModalOpen(true)} />
      
      {currentPage === 'home' ? (
        <Hero onGetStarted={() => setCurrentPage('dashboard')} />
      ) : (
        <Dashboard onCreateEscrow={() => setIsModalOpen(true)} />
      )}

      <CreateEscrowModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
