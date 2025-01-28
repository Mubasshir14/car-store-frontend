/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAddProductMutation } from "@/redux/features/Admin/productManagement.api";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [addProduct, { isLoading }] = useAddProductMutation();

  const onSubmit = async (data: any) => {
    console.log(data); 
    try {
      await addProduct(data).unwrap();
      toast.success("Product added successfully!", {
        className: "bg-emerald-500 text-white",
      });
      reset();
    } catch (error) {
      toast.error("Failed to add product. Please try again.", {
        className: "bg-rose-500 text-white",
      });
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Card className="shadow-2xl rounded-3xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-4xl">
        <CardHeader className="bg-gradient-to-r from-rose-600 to-red-500 py-6">
          <CardTitle className="text-4xl font-extrabold text-white text-center tracking-wide drop-shadow-lg">
            Add New Car
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[ 
                { name: "brand", label: "Brand", type: "text" },
                { name: "carName", label: "Car Name", type: "text" },
                { name: "image", label: "Image URL", type: "text" },
                { name: "model", label: "Model", type: "text" },
                { name: "year", label: "Year", type: "number" },
                { name: "price", label: "Price", type: "number" },
                { name: "milage", label: "Mileage", type: "text" },
                { name: "quantity", label: "Quantity", type: "number" },
              ].map(({ name, label, type }) => (
                <div key={name} className="relative group">
                  <Label
                    htmlFor={name}
                    className="text-lg font-semibold text-gray-700 group-hover:text-rose-600 transition-colors"
                  >
                    {label}
                  </Label>
                  <Input
                    id={name}
                    type={type}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="border-2 border-gray-300 focus:border-rose-500 transition-colors 
                               rounded-xl py-2.5 px-4 font-medium text-gray-900
                               group-hover:shadow-md"
                    {...register(name, {
                      required: `${label} is required`,
                      ...(type === "number" && { valueAsNumber: true }),
                    })}
                  />
                  {errors[name] && (
                    <span className="text-rose-500 text-sm font-semibold absolute left-1 -bottom-5">
                      {errors[name]?.message as string}
                    </span>
                  )}
                </div>
              ))}

              {/* Category Dropdown */}
              <div className="relative group">
                <Label className="text-lg font-semibold text-gray-700 group-hover:text-rose-600 transition-colors">
                  Category
                </Label>
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger
                        className="border-2 border-gray-300 focus:border-rose-500 
                                             rounded-xl py-2.5 px-4 font-medium text-gray-900
                                             group-hover:shadow-md"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Sedan", "SUV", "Truck", "Coupe", "Convertible"].map(
                          (category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <span className="text-rose-500 text-sm font-semibold absolute left-1 -bottom-5">
                    {errors.category?.message as string}
                  </span>
                )}
              </div>

              {/* Fuel Type Dropdown */}
              <div className="relative group">
                <Label className="text-lg font-semibold text-gray-700 group-hover:text-rose-600 transition-colors">
                  Fuel Type
                </Label>
                <Controller
                  control={control}
                  name="fuelType"
                  rules={{ required: "Fuel type is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger
                        className="border-2 border-gray-300 focus:border-rose-500 
                                             rounded-xl py-2.5 px-4 font-medium text-gray-900
                                             group-hover:shadow-md"
                      >
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Petrol", "Diesel", "Electric"].map((fuelType) => (
                          <SelectItem key={fuelType} value={fuelType}>
                            {fuelType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.fuelType && (
                  <span className="text-rose-500 text-sm font-semibold absolute left-1 -bottom-5">
                    {errors.fuelType?.message as string}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="relative group">
              <Label
                htmlFor="description"
                className="text-lg font-semibold text-gray-700 group-hover:text-rose-600 transition-colors"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                className="border-2 border-gray-300 focus:border-rose-500 
                           rounded-xl py-2.5 px-4 font-medium text-gray-900 min-h-[120px]
                           group-hover:shadow-md transition-colors"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-rose-500 text-sm font-semibold absolute left-1 -bottom-5">
                  {errors.description?.message as string}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-red-700 
                         hover:from-rose-700 hover:to-red-800 
                         text-white font-bold py-3.5 rounded-xl 
                         transition-all duration-300 
                         hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? "Adding Car..." : "Add Car"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
