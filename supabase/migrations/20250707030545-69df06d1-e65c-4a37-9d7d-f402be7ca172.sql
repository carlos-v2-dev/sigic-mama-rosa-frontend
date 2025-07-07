
-- Update the trigger function to handle the unique constraint properly
CREATE OR REPLACE FUNCTION handle_despacho_inventory_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Use INSERT ... ON CONFLICT to handle the unique constraint gracefully
  INSERT INTO public.stocks (product, input_quantity, departament_id, is_active, created_at, updated_at)
  VALUES (NEW.product, NEW.input_quantity, NEW.departament_id, true, now(), now())
  ON CONFLICT (product, departament_id) 
  DO UPDATE SET 
    input_quantity = stocks.input_quantity + NEW.input_quantity,
    updated_at = now(),
    is_active = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
