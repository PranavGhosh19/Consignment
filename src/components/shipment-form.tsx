
"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  SHIPMENT_TYPES,
  MODES_OF_SHIPMENT,
  DIMENSION_UNITS,
  INCOTERMS,
  INCENTIVE_SCHEMES,
  CURRENCIES,
  INLAND_CONTAINER_DEPOTS,
  INDIAN_SEA_PORTS,
  FOREIGN_SEA_PORTS,
  ATTACHMENT_TYPES,
  EQUIPMENT_TYPES,
  CARGO_TYPES,
  PACKAGE_TYPES,
} from "@/lib/constants";

import { Button } from "@/components/ui/button";
import {
  Form,
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { ScheduleDialog } from "@/components/schedule-dialog";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Anchor,
  Calendar,
  FileText,
  FileUp,
  MapPin,
  Package,
  Receipt,
  User,
  Calculator
} from "lucide-react";
import { ShipmentDetailsSection } from "./shipment-details-section";
import { CbmCalculatorDialog } from "./cbm-calculator-dialog";
import { Combobox } from "./ui/combobox";

const formSchema = z
  .object({
    // Shipment Information
    shipmentType: z.enum(SHIPMENT_TYPES, { required_error: "Shipment type is required." }),
    productName: z.string().min(3, "Product name must be 3-100 characters.").max(100, "Product name must be 3-100 characters."),
    hsnCode: z
      .string()
      .min(6, "HSN code must be 6-8 digits.")
      .max(8, "HSN code must be 6-8 digits.")
      .regex(/^\d+$/, "HSN code must be numeric."),
    modeOfShipment: z.enum(MODES_OF_SHIPMENT, { required_error: "Mode of shipment is required." }),
    cargoType: z.string().min(1, "Cargo type is required."),
    packageType: z.string().optional(),
    numberOfPackages: z.coerce.number().int().positive("This field must contain a positive integer."),
    equipmentType: z.string().optional(),
    weight: z.coerce.number().positive("Weight must be a positive number.").multipleOf(0.01, "Max 2 decimal places allowed."),
    dimensionL: z.coerce.number().optional(),
    dimensionW: z.coerce.number().optional(),
    dimensionH: z.coerce.number().optional(),
    dimensionUnit: z.enum(DIMENSION_UNITS).optional(),
    incoterm: z.enum(INCOTERMS, { required_error: "Incoterm is required."}),
    
    // Trade & Customs
    incentiveScheme: z.enum(INCENTIVE_SCHEMES),
    invoiceValueINR: z.coerce.number().positive("Invoice value must be positive."),
    currency: z.enum(CURRENCIES),
    
    // Documentation
    invoiceNo: z.string().min(1, "Invoice number is required."),
    packingListNo: z.string().min(1, "Packing list number is required"),
    
    // Shipment Timing
    departureDate: z.date({ required_error: "Departure date is required." }),
    deliveryDeadline: z.date().optional(),

    // Routing Information
    placeOfReceipt: z.string().min(1, "Place of receipt is required."),
    otherPlaceOfReceipt: z.string().optional(),
    originAddress: z.string().optional(),
    portOfLoading: z.string().min(1, "Port of loading is required."),
    portOfDischarge: z.string().min(1, "Port of discharge is required."),
    finalPlaceOfDelivery: z.string().min(1, "Final place of delivery is required."),
    otherFinalPlaceOfDelivery: z.string().optional(),
    destinationAddress: z.string().optional(),
    
    // Buyer Details
    buyerDetails: z.object({
        companyName: z.string().min(1, "Company name is required."),
        address: z.string().min(1, "Address is required."),
        country: z.string().min(1, "Country is required."),
        email: z.string().email("Invalid email address."),
        phone: z.string().min(1, "Phone number is required."),
    }),
    attachments: z.array(z.string()).optional(),

    // Additional Details
    specialInstructions: z.string().optional(),
  })
  .refine(
    (data) => {
      const { modeOfShipment, cargoType } = data;
      const requiresDimensions =
        (modeOfShipment === "Air Cargo" || modeOfShipment === "Sea – LCL (Less than Container Load)") &&
        ["General Cargo", "HAZMAT", "Perishable"].includes(cargoType);

      if (requiresDimensions) {
        return (
          data.dimensionL &&
          data.dimensionL > 0 &&
          data.dimensionW &&
          data.dimensionW > 0 &&
          data.dimensionH &&
          data.dimensionH > 0 &&
          data.dimensionUnit
        );
      }
      return true;
    },
    {
      message: "Length, Width, and Height are required for this cargo type.",
      path: ["dimensionL"],
    }
  )
  .refine(
    (data) => {
      if (data.modeOfShipment !== "Sea – FCL (Full Container Load)") {
        return !!data.packageType;
      }
      return true;
    },
    {
      message: "Package type is required.",
      path: ["packageType"],
    }
  )
  .refine(
    (data) => {
      if (data.modeOfShipment === "Sea – FCL (Full Container Load)") {
        return !!data.equipmentType;
      }
      return true;
    },
    {
      message: "Equipment type is required for FCL shipments.",
      path: ["equipmentType"],
    }
  )
  .refine(
    (data) => {
      if (data.departureDate && data.deliveryDeadline) {
        return data.deliveryDeadline > data.departureDate;
      }
      return true;
    },
    {
      message: "Delivery deadline must be after the departure date.",
      path: ["deliveryDeadline"],
    }
  )
  .refine(
    (data) => {
      if (data.placeOfReceipt === "Other") {
        return !!data.otherPlaceOfReceipt && data.otherPlaceOfReceipt.length > 0;
      }
      return true;
    },
    {
      message: "Please specify the place of receipt.",
      path: ["otherPlaceOfReceipt"],
    }
  ).refine(
    (data) => {
      if (data.finalPlaceOfDelivery === "Other") {
        return !!data.otherFinalPlaceOfDelivery && data.otherFinalPlaceOfDelivery.length > 0;
      }
      return true;
    },
    {
      message: "Please specify the final place of delivery.",
      path: ["otherFinalPlaceOfDelivery"],
    }
  );

type ShipmentFormValues = z.infer<typeof formSchema>;


export function ShipmentForm() {
  const { toast } = useToast();
  
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isCbmDialogOpen, setIsCbmDialogOpen] = useState(false);
  const [dataForSchedule, setDataForSchedule] = useState<ShipmentFormValues | null>(null);

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipmentType: "EXPORT",
      productName: "",
      hsnCode: "",
      modeOfShipment: "Sea – FCL (Full Container Load)",
      cargoType: "General Cargo",
      packageType: "PALLETS",
      numberOfPackages: undefined,
      equipmentType: EQUIPMENT_TYPES[0],
      weight: undefined,
      dimensionL: undefined,
      dimensionW: undefined,
      dimensionH: undefined,
      dimensionUnit: "CMS",
      incoterm: "FOB",
      incentiveScheme: "None",
      invoiceValueINR: undefined,
      currency: "USD",
      invoiceNo: "",
      packingListNo: "",
      departureDate: undefined,
      deliveryDeadline: undefined,
      placeOfReceipt: "",
      otherPlaceOfReceipt: "",
      originAddress: "",
      portOfLoading: "",
      portOfDischarge: "",
      destinationAddress: "",
      finalPlaceOfDelivery: "",
      otherFinalPlaceOfDelivery: "",
      buyerDetails: {
        companyName: "",
        address: "",
        country: "",
        email: "",
        phone: "",
      },
      attachments: [],
      specialInstructions: "",
    },
  });

  const departureDate = form.watch("departureDate");
  const placeOfReceipt = form.watch("placeOfReceipt");
  const finalPlaceOfDelivery = form.watch("finalPlaceOfDelivery");
  const modeOfShipment = form.watch("modeOfShipment");
  const dimensionL = form.watch("dimensionL");
  const dimensionW = form.watch("dimensionW");
  const dimensionH = form.watch("dimensionH");
  const dimensionUnit = form.watch("dimensionUnit");
  const numberOfPackages = form.watch("numberOfPackages");

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
        // Already in CBM
        break;
    }

    return parseFloat(cbm.toFixed(4));
  }, [dimensionL, dimensionW, dimensionH, dimensionUnit, numberOfPackages]);
  
  useEffect(() => {
    if (departureDate && form.getValues("deliveryDeadline") && form.getValues("deliveryDeadline")! < departureDate) {
      form.setValue("deliveryDeadline", undefined, { shouldValidate: true });
    }
  }, [departureDate, form]);

  const onSubmit = (data: ShipmentFormValues) => {
    const dataWithCbm = { ...data, cbm: calculatedCBM };
    setDataForSchedule(dataWithCbm);
    setIsScheduleDialogOpen(true);
  };
  
  const onConfirmSchedule = (scheduledData: any) => {
    console.log("SCHEDULED SHIPMENT:", scheduledData);
    toast({
      title: "Shipment Scheduled!",
      description: "Your shipment has been scheduled and will go live at the specified time.",
    });
    setIsScheduleDialogOpen(false);
    form.reset();
  }

  const handleSaveDraft = () => {
    form.trigger().then((isValid) => {
      const data = form.getValues();
      console.log("DRAFT SAVED:", { ...data, status: "draft", cbm: calculatedCBM });
      toast({
        title: "Draft Saved",
        description: "Your shipment request has been saved as a draft.",
      });
      form.reset();
    });
  };

  const isFCL = modeOfShipment === "Sea – FCL (Full Container Load)";

  const foreignPortOptions = useMemo(() => {
    return FOREIGN_SEA_PORTS.map(port => ({value: port, label: port}));
  }, []);
  
  const indianPortOptions = useMemo(() => {
    return INDIAN_SEA_PORTS.map(port => ({value: port, label: port}));
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline flex items-center gap-2"><Package className="h-6 w-6 text-primary" /> Shipment Information</CardTitle>
                <CardDescription>Enter the core details of your shipment.</CardDescription>
              </div>
              {isFCL && (
                <Button variant="outline" size="icon" type="button" onClick={() => setIsCbmDialogOpen(true)}>
                  <Calculator className="h-4 w-4" />
                  <span className="sr-only">Open CBM Calculator</span>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <ShipmentDetailsSection form={form} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Calendar className="h-6 w-6 text-primary" /> Shipment Timing</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Departure Date</FormLabel>
                      <DateTimePicker 
                        date={field.value} 
                        setDate={field.onChange}
                        disabledDates={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="deliveryDeadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Delivery Deadline</FormLabel>
                      <DateTimePicker 
                        date={field.value} 
                        setDate={field.onChange}
                        disabled={!departureDate}
                        disabledDates={(date) => departureDate ? date < departureDate : date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                       <FormDescription>{!departureDate ? "Select departure date first." : "Optional. Latest arrival date."}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Anchor className="h-6 w-6 text-primary" /> Origin</CardTitle>
                    <CardDescription>Where the shipment starts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="placeOfReceipt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Place of Receipt</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an Inland Container Depot" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INLAND_CONTAINER_DEPOTS.map((depot) => (
                                <SelectItem key={depot} value={depot}>
                                  {depot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {placeOfReceipt === "Other" && (
                      <FormField
                        control={form.control}
                        name="otherPlaceOfReceipt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please specify Place of Receipt</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ICD name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="portOfLoading"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port of Loading</FormLabel>
                          <Combobox
                              options={indianPortOptions}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select a port..."
                              searchPlaceholder="Search ports..."
                              noResultsMessage="No ports found."
                           />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="originAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Origin Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter the full origin address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><MapPin className="h-6 w-6 text-primary" /> Destination</CardTitle>
                     <CardDescription>Where the shipment is going.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="portOfDischarge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port of Discharge</FormLabel>
                           <Combobox
                              options={foreignPortOptions}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select a port..."
                              searchPlaceholder="Search ports..."
                              noResultsMessage="No ports found."
                           />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="finalPlaceOfDelivery"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Final Place of Delivery</FormLabel>
                             <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an Inland Container Depot" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {INLAND_CONTAINER_DEPOTS.map((depot) => (
                                    <SelectItem key={depot} value={depot}>
                                      {depot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            <FormMessage />
                          </FormItem>
                      )}
                    />
                    {finalPlaceOfDelivery === "Other" && (
                        <FormField
                          control={form.control}
                          name="otherFinalPlaceOfDelivery"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Please specify Final Place of Delivery</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter ICD name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    )}
                     <FormField
                      control={form.control}
                      name="destinationAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter the full destination address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Receipt className="h-6 w-6 text-primary" /> Documentation</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="invoiceNo"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Export Invoice Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., EXP-001/23-24" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Invoice Upload</FormLabel>
                        <FormControl>
                            <Input type="file" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                 </div>
                 <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="packingListNo"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Packing List Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., PKL-001/23-24" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Packing List Upload</FormLabel>
                        <FormControl>
                            <Input type="file" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                 </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><User className="h-6 w-6 text-primary" />Buyer's / Seller's Information</CardTitle>
                 <CardDescription>Details of the overseas buyer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="buyerDetails.companyName"
                    render={({ field }) => (
                        <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Buyer's company name" {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="buyerDetails.country"
                    render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="Country" {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="buyerDetails.address"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2"><FormLabel>Address</FormLabel><FormControl><Textarea placeholder="Full address" {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="buyerDetails.email"
                    render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="Buyer's email" {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="buyerDetails.phone"
                    render={({ field }) => (
                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="Buyer's phone" {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                />
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><FileUp className="h-6 w-6 text-primary" /> Certificate Attachments</CardTitle>
                <CardDescription>Select all relevant certificates to be attached. Actual file upload is not yet implemented.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                    control={form.control}
                    name="attachments"
                    render={() => (
                        <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ATTACHMENT_TYPES.map((item) => (
                            <FormField
                                key={item}
                                control={form.control}
                                name="attachments"
                                render={({ field }) => {
                                return (
                                    <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                        (value) => value !== item
                                                    )
                                                    )
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {item}
                                    </FormLabel>
                                    </FormItem>
                                )
                                }}
                            />
                            ))}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><FileText className="h-6 w-6 text-primary" /> Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
                 <FormField
                    control={form.control}
                    name="specialInstructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Special Instructions</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="e.g., Handle with care, Fumigation certificate attached, Maintain below 5°C"
                                className="resize-y min-h-[100px]"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
          </Card>

          <CardFooter className="flex justify-end gap-4 p-0 pt-6">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>Save as Draft</Button>
            <Button type="submit">
              Schedule
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      {dataForSchedule && <ScheduleDialog 
        open={isScheduleDialogOpen} 
        setOpen={setIsScheduleDialogOpen}
        shipmentData={dataForSchedule}
        onConfirm={onConfirmSchedule}
      />}

      <CbmCalculatorDialog
        open={isCbmDialogOpen}
        setOpen={setIsCbmDialogOpen}
       />

    </>
  );
}
