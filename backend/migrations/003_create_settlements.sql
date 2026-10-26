create table settlements (
    id BIGINT generated always as identity primary key,
    merchant_id bigint not null references merchants(id),
    transaction_ref text not null,
    amount numeric(12,2) not null check (amount > 0),
    settled_at timestamptz not null,
    source_file text not null ,
    line_number int not null,
    created_at timestamptz default now() not null,
    UNIQUE(source_file,line_number)
);
CREATE INDEX idx_settlements_merchant_ref ON settlements (merchant_id, transaction_ref);