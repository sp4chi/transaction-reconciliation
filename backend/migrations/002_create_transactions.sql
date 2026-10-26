create table transactions (
    id BIGINT generated always as identity primary key,
    merchant_id BIGINT REFERENCES merchants(id) not null,
    transaction_ref text not null, 
    amount numeric(12,2) not null check (amount > 0),
    currency char(3) default 'INR' not null,
    occurred_at timestamptz not null,
    created_at timestamptz default now() not null,
    UNIQUE (merchant_id, transaction_ref)
);