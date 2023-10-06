-- Create the vendor_orders database
CREATE DATABASE vendor_orders;

-- Switch to the vendor_orders database
\c vendor_orders

-- Create the user
CREATE USER vo_admin WITH PASSWORD 'adminpass' CREATEDB;

-- Grant the user the necessary permissions
GRANT ALL PRIVILEGES ON DATABASE vendor_orders TO vo_admin;

-- Grant all privileges on all tables in the public schema
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vo_admin;

-- Grant all privileges on all sequences in the public schema (useful if you have serial columns)
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vo_admin;

-- Ensure vo_admin has usage on the public schema
GRANT USAGE ON SCHEMA public TO vo_admin;

-- Ensure vo_admin can create tables in the public schema
GRANT CREATE ON SCHEMA public TO vo_admin;

-- Ensure vo_admin can select, insert, update, delete on all tables in the public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO vo_admin;

