-- public.destinations definition

-- Drop table

-- DROP TABLE public.destinations;

CREATE TABLE public.destinations (
	id serial4 NOT NULL,
	"location" point NULL,
	created_at timestamptz(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at timestamptz(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
	uuid uuid NULL DEFAULT uuid_generate_v4(),
	CONSTRAINT destinations_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.destinations OWNER TO macbookspro;
GRANT ALL ON TABLE public.destinations TO macbookspro;

-- create extention

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";


-- add table auto generated uuid

ALTER TABLE destinations
ADD COLUMN uuid UUID DEFAULT (uuid_generate_v4());

-- data sample

INSERT INTO public.destinations ("location") values (point(2.2312, 120.000));
