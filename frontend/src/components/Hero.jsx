import { Shield, Zap, Lock, Users } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />
      
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Built on Supra L1</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Trustless P2P Escrow with
            <span className="text-primary"> Fair Arbitration</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure peer-to-peer transactions with random arbiter selection using Supra dVRF. 
            Fast, transparent, and decentralized.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
            <a 
              href="https://github.com/Artkill24/trustescrow-supra"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              View on GitHub
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500K</div>
              <div className="text-sm text-muted-foreground">TPS on Supra</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">&lt;1s</div>
              <div className="text-sm text-muted-foreground">Finality</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Transparent</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Trustless"
            description="No intermediaries. Smart contracts handle everything automatically."
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6" />}
            title="Secure"
            description="Funds locked in escrow until both parties confirm or dispute resolved."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Fair Arbitration"
            description="Random arbiter selection via dVRF ensures unbiased dispute resolution."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
