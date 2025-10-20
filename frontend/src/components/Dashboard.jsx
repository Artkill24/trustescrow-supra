import { useState } from 'react';
import { Plus, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all');
  
  const mockEscrows = [
    {
      id: 1,
      buyer: '0x742d...35a0',
      seller: '0x8f9e...21b4',
      amount: 1000,
      status: 'active',
      createdAt: '2025-01-15',
      description: 'Web development services'
    },
    {
      id: 2,
      buyer: '0x123a...45c6',
      seller: '0x456d...78e9',
      amount: 500,
      status: 'completed',
      createdAt: '2025-01-10',
      description: 'Logo design project'
    },
    {
      id: 3,
      buyer: '0x789f...12ab',
      seller: '0xabc3...45de',
      amount: 2500,
      status: 'disputed',
      createdAt: '2025-01-12',
      description: 'Smart contract audit'
    },
  ];

  const filteredEscrows = activeTab === 'all' 
    ? mockEscrows 
    : mockEscrows.filter(e => e.status === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your escrow transactions</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-5 w-5" />
            <span className="font-medium">New Escrow</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="Active"
            value="1"
            color="blue"
          />
          <StatCard
            icon={<CheckCircle className="h-5 w-5" />}
            label="Completed"
            value="1"
            color="green"
          />
          <StatCard
            icon={<AlertCircle className="h-5 w-5" />}
            label="Disputed"
            value="1"
            color="yellow"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="As Arbiter"
            value="0"
            color="purple"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <TabButton
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            label="All"
          />
          <TabButton
            active={activeTab === 'active'}
            onClick={() => setActiveTab('active')}
            label="Active"
          />
          <TabButton
            active={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
            label="Completed"
          />
          <TabButton
            active={activeTab === 'disputed'}
            onClick={() => setActiveTab('disputed')}
            label="Disputed"
          />
        </div>

        {/* Escrow List */}
        <div className="space-y-4">
          {filteredEscrows.map(escrow => (
            <EscrowCard key={escrow.id} escrow={escrow} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
    purple: 'bg-purple-500/10 text-purple-500',
  };

  return (
    <div className="p-6 bg-card border border-border rounded-xl">
      <div className={`inline-flex p-2 rounded-lg ${colorClasses[color]} mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function TabButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`}
    >
      {label}
    </button>
  );
}

function EscrowCard({ escrow }) {
  const statusConfig = {
    active: {
      label: 'Active',
      color: 'bg-blue-500/10 text-blue-500',
      icon: <Clock className="h-4 w-4" />
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-500/10 text-green-500',
      icon: <CheckCircle className="h-4 w-4" />
    },
    disputed: {
      label: 'Disputed',
      color: 'bg-yellow-500/10 text-yellow-500',
      icon: <AlertCircle className="h-4 w-4" />
    }
  };

  const status = statusConfig[escrow.status];

  return (
    <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold mb-1">{escrow.description}</h3>
              <p className="text-sm text-muted-foreground">ID: #{escrow.id}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.color}`}>
              {status.icon}
              <span className="text-sm font-medium">{status.label}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Buyer</p>
              <p className="text-sm font-mono">{escrow.buyer}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Seller</p>
              <p className="text-sm font-mono">{escrow.seller}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Created</p>
              <p className="text-sm">{escrow.createdAt}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{escrow.amount} SUPRA</p>
            </div>
            <div className="flex gap-2">
              {escrow.status === 'active' && (
                <>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                    Confirm Delivery
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                    Open Dispute
                  </button>
                </>
              )}
              {escrow.status === 'completed' && (
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                  View Details
                </button>
              )}
              {escrow.status === 'disputed' && (
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium">
                  View Arbitration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
