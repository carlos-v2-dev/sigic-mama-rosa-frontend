
-- Create gasto_menu table with same structure as stocks/despacho
CREATE TABLE public.gasto_menu (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  product character varying NOT NULL,
  input_quantity integer NOT NULL,
  departament_id uuid NOT NULL,
  CONSTRAINT gasto_menu_departament_id_fkey FOREIGN KEY (departament_id) REFERENCES public.departaments(id)
);

-- Create productos table
CREATE TABLE public.productos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  name character varying NOT NULL UNIQUE,
  description text
);

-- Add RLS for both tables
ALTER TABLE public.gasto_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_gasto_menu_departament_id ON public.gasto_menu(departament_id);
CREATE INDEX idx_gasto_menu_created_at ON public.gasto_menu(created_at);
CREATE INDEX idx_productos_name ON public.productos(name);

-- Create function to update inventory when despacho is added
CREATE OR REPLACE FUNCTION handle_despacho_inventory_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Add quantity from despacho to inventory (stocks)
  INSERT INTO public.stocks (product, input_quantity, departament_id)
  VALUES (NEW.product, NEW.input_quantity, NEW.departament_id)
  ON CONFLICT (product, departament_id) 
  DO UPDATE SET 
    input_quantity = stocks.input_quantity + NEW.input_quantity,
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to validate and update inventory when gasto_menu is added
CREATE OR REPLACE FUNCTION handle_gasto_menu_inventory_update()
RETURNS TRIGGER AS $$
DECLARE
  current_stock INTEGER;
BEGIN
  -- Get current stock for this product and department
  SELECT input_quantity INTO current_stock
  FROM public.stocks 
  WHERE product = NEW.product AND departament_id = NEW.departament_id AND is_active = true;
  
  -- If no stock exists, raise error
  IF current_stock IS NULL THEN
    RAISE EXCEPTION 'No hay stock disponible para el producto % en esta área', NEW.product;
  END IF;
  
  -- If requested quantity is greater than available stock, raise error
  IF NEW.input_quantity > current_stock THEN
    RAISE EXCEPTION 'Cantidad solicitada (%) es mayor al stock disponible (%)', NEW.input_quantity, current_stock;
  END IF;
  
  -- Subtract quantity from inventory
  UPDATE public.stocks 
  SET 
    input_quantity = input_quantity - NEW.input_quantity,
    updated_at = now()
  WHERE product = NEW.product AND departament_id = NEW.departament_id AND is_active = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_despacho_inventory_update
  AFTER INSERT ON public.despacho
  FOR EACH ROW EXECUTE FUNCTION handle_despacho_inventory_update();

CREATE TRIGGER trigger_gasto_menu_inventory_update
  BEFORE INSERT ON public.gasto_menu
  FOR EACH ROW EXECUTE FUNCTION handle_gasto_menu_inventory_update();

-- Add unique constraint to stocks to prevent duplicates
ALTER TABLE public.stocks ADD CONSTRAINT unique_product_department UNIQUE (product, departament_id);
