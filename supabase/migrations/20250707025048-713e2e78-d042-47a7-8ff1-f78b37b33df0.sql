
-- Create or replace the trigger function to handle despacho inventory updates
CREATE OR REPLACE FUNCTION handle_despacho_inventory_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the product already exists in inventory for the same department
  IF EXISTS (
    SELECT 1 FROM public.stocks 
    WHERE product = NEW.product 
    AND departament_id = NEW.departament_id 
    AND is_active = true
  ) THEN
    -- Update existing stock by adding the new quantity
    UPDATE public.stocks 
    SET 
      input_quantity = input_quantity + NEW.input_quantity,
      updated_at = now()
    WHERE product = NEW.product 
    AND departament_id = NEW.departament_id 
    AND is_active = true;
  ELSE
    -- Create new stock entry if it doesn't exist
    INSERT INTO public.stocks (product, input_quantity, departament_id, is_active)
    VALUES (NEW.product, NEW.input_quantity, NEW.departament_id, true);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists and create it again
DROP TRIGGER IF EXISTS trigger_despacho_inventory_update ON public.despacho;

-- Create the trigger that fires after inserting into despacho
CREATE TRIGGER trigger_despacho_inventory_update
  AFTER INSERT ON public.despacho
  FOR EACH ROW 
  EXECUTE FUNCTION handle_despacho_inventory_update();
