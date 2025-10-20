import { Shield, Wallet, LayoutDashboard, Home } from 'lucide-react';

export default function Header({ onNavigate, onCreateEscrow }) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">TrustEscrow</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onCreateEscrow}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
          >
            New Escrow
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Wallet className="h-4 w-4" />
            <span className="font-medium hidden sm:inline">Connect Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
}
