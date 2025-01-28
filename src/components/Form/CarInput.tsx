import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type CarInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
};

const CarInput = ({
  name,
  label,
  placeholder,
  type,
  readOnly,
}: CarInputProps) => {
  const [open, setOpen] = useState(false);
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
              <div className="relative">
                <Input
                  {...field}
                  type={type === "password" && !open ? "password" : "text"}
                  placeholder={placeholder}
                  readOnly={readOnly}
                />
                {type === "password" && (
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  >
                    {open ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              </div>
            </FormControl>
            {error && <FormMessage>{error.message}</FormMessage>}
          </>
        )}
      />
    </FormItem>
  );
};

export default CarInput;