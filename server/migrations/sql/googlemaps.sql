-- public.googlemaps definition

-- Drop table

-- DROP TABLE public.googlemaps;

CREATE TABLE public.googlemaps (
	id serial4 NOT NULL,
	code varchar(6) NOT NULL,
	origin point NULL,
	destination point NULL,
	distance varchar(50) NULL,
	duration varchar(50) NULL,
	route varchar(3000) NULL,
	created_at timestamptz(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at timestamptz(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
	CONSTRAINT googlemaps_pkey PRIMARY KEY (code)
);

-- Permissions

ALTER TABLE public.googlemaps OWNER TO macbookspro;
GRANT ALL ON TABLE public.googlemaps TO macbookspro;
