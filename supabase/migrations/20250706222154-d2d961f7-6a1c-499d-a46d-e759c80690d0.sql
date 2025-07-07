
-- Create despacho table with same structure as stocks
CREATE TABLE public.despacho (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  product character varying NOT NULL,
  input_quantity integer NOT NULL,
  departament_id uuid NOT NULL,
  CONSTRAINT despacho_departament_id_fkey FOREIGN KEY (departament_id) REFERENCES public.departaments(id)
);

-- Add RLS (Row Level Security) - currently no policies but enabled for future use
ALTER TABLE public.despacho ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_despacho_departament_id ON public.despacho(departament_id);
CREATE INDEX idx_despacho_created_at ON public.despacho(created_at);
