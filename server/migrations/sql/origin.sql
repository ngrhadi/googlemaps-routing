-- public.origins definition

-- Drop table

-- DROP TABLE public.origins;

CREATE TABLE public.origins (
	id serial4 NOT NULL,
	"location" point NULL,
	created_at timestamptz(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at timestamptz(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
	uuid uuid NULL DEFAULT uuid_generate_v4(),
	CONSTRAINT origins_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.origins OWNER TO macbookspro;
GRANT ALL ON TABLE public.origins TO macbookspro;
