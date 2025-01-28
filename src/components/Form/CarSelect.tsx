import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TCarProps = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

const CarSelect = ({ name, label, options, placeholder }: TCarProps) => {
  const { control } = useFormContext();

  return (
    <FormItem>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            {error && <FormMessage>{error.message}</FormMessage>}
          </>
        )}
      />
    </FormItem>
  );
};

export default CarSelect;