"use client";

import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SHIPMENT_TYPES,
  MODES_OF_SHIPMENT,
  DIMENSION_UNITS,
  PACKAGE_TYPES,
  EQUIPMENT_TYPES,
  INCOTERMS,
  INCENTIVE_SCHEMES,
  CURRENCIES,
  CARGO_TYPES
} from "@/lib/constants";
import { Badge } from "./ui/badge";

interface ShipmentDetailsSectionProps {
  form: UseFormReturn<any>;
}

export function ShipmentDetailsSection({ form }: ShipmentDetailsSectionProps) {
  const modeOfShipment = form.watch("modeOfShipment");
  const cargoType = form.watch("cargoType");
  const dimensionL = form.watch("dimensionL");
  const dimensionW = form.watch("dimensionW");
  const dimensionH = form.watch("dimensionH");
  const dimensionUnit = form.watch("dimensionUnit");
  const numberOfPackages = form.watch("numberOfPackages");
  
  const isFCL = modeOfShipment === "Sea – FCL (Full Container Load)";
  
  const calculatedCBM = useMemo(() => {
    const l = dimensionL || 0;
    const w = dimensionW || 0;
    const h = dimensionH || 0;
    const packages = numberOfPackages || 0;

    if (l <= 0 || w <= 0 || h <= 0 || packages <= 0) {
      return 0;
    }

    let cbm = l * w * h * packages;

    switch (dimensionUnit) {
      case "CMS":
        cbm /= 1000000;
        break;
      case "FEET":
        cbm *= 0.0283168;
        break;
      case "MM":
        cbm /= 1000000000;
        break;
      case "METRE":
        // Already in CBM if packages are considered
        break;
    }

    return parseFloat(cbm.toFixed(4));
  }, [dimensionL, dimensionW, dimensionH, dimensionUnit, numberOfPackages]);

  const showDimensions =
    (modeOfShipment === "Air Cargo" || modeOfShipment === "Sea – LCL (Less than Container Load)") &&
    ["General Cargo", "HAZMAT", "Perishable"].includes(cargoType);
    
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FormField
        control={form.control}
        name="shipmentType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shipment Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select shipment type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SHIPMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Electronics, Textiles" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hsnCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>HSN / ITC-HS Code</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 85171290" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="modeOfShipment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mode of Shipment</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {MODES_OF_SHIPMENT.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cargoType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cargo Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a cargo type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CARGO_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {!isFCL && (
        <FormField
          control={form.control}
          name="packageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a package type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PACKAGE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {isFCL && (
        <FormField
          control={form.control}
          name="equipmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EQUIPMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="numberOfPackages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Packages</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 10" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Weight (kg)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 1200" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       {showDimensions && (
        <>
          <div className="lg:col-span-3">
            <FormLabel>Dimensions (per package)</FormLabel>
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 mt-2">
              <FormField
                control={form.control}
                name="dimensionL"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Length" type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dimensionW"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Width" type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dimensionH"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Height" type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dimensionUnit"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DIMENSION_UNITS.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
             <FormMessage>{form.formState.errors.dimensionL?.message}</FormMessage>
          </div>
          <div className="flex items-center justify-end lg:col-span-3">
            <Badge variant="secondary">Calculated Volume: {calculatedCBM} CBM</Badge>
          </div>
        </>
      )}

      <FormField
        control={form.control}
        name="incoterm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Incoterm</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an incoterm" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {INCOTERMS.map((term) => (
                  <SelectItem key={term} value={term}>
                    {term}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="incentiveScheme"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Incentive Scheme</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a scheme" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {INCENTIVE_SCHEMES.map((scheme) => (
                  <SelectItem key={scheme} value={scheme}>
                    {scheme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-[3fr_1fr] gap-2">
        <FormField
            control={form.control}
            name="invoiceValueINR"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Invoice Value</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 50000" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {CURRENCIES.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                            {currency}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
      </div>
    </div>
  );
}
