module trustescrow::escrow {
    use std::signer;
    use std::vector;
    use aptos_framework::coin;
    use aptos_framework::timestamp;
    
    // Struttura Escrow
    struct EscrowDeal has key, store {
        id: u64,
        buyer: address,
        seller: address,
        amount: u64,
        status: u8, // 0=active, 1=completed, 2=disputed, 3=resolved
        created_at: u64,
        arbiters: vector<address>,
        votes: vector<bool>, // true=buyer, false=seller
    }
    
    // Registro globale escrow
    struct EscrowRegistry has key {
        deals: vector<EscrowDeal>,
        next_id: u64,
    }
    
    // Pool arbitri
    struct ArbitratorPool has key {
        arbitrators: vector<address>,
    }
    
    // Inizializza il modulo
    public entry fun initialize(account: &signer) {
        let registry = EscrowRegistry {
            deals: vector::empty(),
            next_id: 1,
        };
        move_to(account, registry);
        
        let pool = ArbitratorPool {
            arbitrators: vector::empty(),
        };
        move_to(account, pool);
    }
    
    // Crea nuovo escrow
    public entry fun create_escrow(
        buyer: &signer,
        seller: address,
        amount: u64,
    ) acquires EscrowRegistry {
        let buyer_addr = signer::address_of(buyer);
        
        // TODO: Trasferimento fondi (implementare con coin)
        
        let registry = borrow_global_mut<EscrowRegistry>(@trustescrow);
        let deal_id = registry.next_id;
        
        let deal = EscrowDeal {
            id: deal_id,
            buyer: buyer_addr,
            seller,
            amount,
            status: 0,
            created_at: timestamp::now_seconds(),
            arbiters: vector::empty(),
            votes: vector::empty(),
        };
        
        vector::push_back(&mut registry.deals, deal);
        registry.next_id = deal_id + 1;
    }
    
    // Conferma consegna
    public entry fun confirm_delivery(
        buyer: &signer,
        deal_id: u64,
    ) acquires EscrowRegistry {
        let registry = borrow_global_mut<EscrowRegistry>(@trustescrow);
        let len = vector::length(&registry.deals);
        let i = 0;
        
        while (i < len) {
            let deal = vector::borrow_mut(&mut registry.deals, i);
            if (deal.id == deal_id) {
                assert!(deal.buyer == signer::address_of(buyer), 1);
                assert!(deal.status == 0, 2);
                deal.status = 1; // Completed
                // TODO: Trasferimento fondi al seller
                break
            };
            i = i + 1;
        }
    }
    
    // Apri dispute
    public entry fun open_dispute(
        account: &signer,
        deal_id: u64,
    ) acquires EscrowRegistry {
        let addr = signer::address_of(account);
        let registry = borrow_global_mut<EscrowRegistry>(@trustescrow);
        let len = vector::length(&registry.deals);
        let i = 0;
        
        while (i < len) {
            let deal = vector::borrow_mut(&mut registry.deals, i);
            if (deal.id == deal_id) {
                assert!(deal.buyer == addr || deal.seller == addr, 1);
                assert!(deal.status == 0, 2);
                deal.status = 2; // Disputed
                // TODO: Chiamata dVRF per selezione arbitri
                break
            };
            i = i + 1;
        }
    }
    
    // Registra come arbitro
    public entry fun register_arbitrator(
        account: &signer,
    ) acquires ArbitratorPool {
        let addr = signer::address_of(account);
        let pool = borrow_global_mut<ArbitratorPool>(@trustescrow);
        
        // Verifica che non sia già registrato
        let len = vector::length(&pool.arbitrators);
        let i = 0;
        let exists = false;
        
        while (i < len) {
            if (*vector::borrow(&pool.arbitrators, i) == addr) {
                exists = true;
                break
            };
            i = i + 1;
        };
        
        assert!(!exists, 3);
        vector::push_back(&mut pool.arbitrators, addr);
    }
}
