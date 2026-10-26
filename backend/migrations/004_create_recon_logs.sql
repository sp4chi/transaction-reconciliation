create table recon_logs (
    id BIGINT generated always as identity primary key,
    merchant_id BIGINT not null REFERENCES merchants(id),
    transaction_id BIGINT REFERENCES transactions(id),
    settlement_id BIGINT REFERENCES settlements(id),
    result text not null check( result in ('matched','amount_mismatch','missing_in_settlement','missing_in_internal','duplicate')),
    reason text,
    reconciled_at TIMESTAMPTZ not null default now(),
    CONSTRAINT recon_logs_needs_a_side CHECK (transaction_id IS NOT NULL OR settlement_id IS NOT NULL)
);

CREATE INDEX idx_recon_logs_merchant_time ON recon_logs (merchant_id, reconciled_at);