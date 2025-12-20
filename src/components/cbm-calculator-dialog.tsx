"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DIMENSION_UNITS } from "@/lib/constants";
import { Card, CardContent } from "./ui/card";
import { Calculator } from "lucide-react";

interface CbmCalculatorDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function CbmCalculatorDialog({ open, setOpen }: CbmCalculatorDialogProps) {
    const [length, setLength] = useState<number | undefined>();
    const [width, setWidth] = useState<number | undefined>();
    const [height, setHeight] = useState<number | undefined>();
    const [packages, setPackages] = useState<number | undefined>();
    const [unit, setUnit] = useState<typeof DIMENSION_UNITS[number]>("CMS");

    const cbm = useMemo(() => {
        const l = length || 0;
        const w = width || 0;
        const h = height || 0;
        const p = packages || 0;
        if (l <= 0 || w <= 0 || h <= 0 || p <= 0) return 0;
        
        let cbmValue = l * w * h * p;
        switch (unit) {
            case "CMS": cbmValue /= 1000000; break;
            case "FEET": cbmValue *= 0.0283168; break;
            case "MM": cbmValue /= 1000000000; break;
            case "METRE": break; // Already in CBM if packages are considered
        }
        return parseFloat(cbmValue.toFixed(4));
    }, [length, width, height, packages, unit]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Calculator />CBM Calculator</DialogTitle>
          <DialogDescription>
            Calculate the Cubic Meter (CBM) for your shipment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="calc-length">Length</Label>
                    <Input id="calc-length" type="number" placeholder="0" value={length || ''} onChange={e => setLength(parseFloat(e.target.value))} />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="calc-width">Width</Label>
                    <Input id="calc-width" type="number" placeholder="0" value={width || ''} onChange={e => setWidth(parseFloat(e.target.value))} />
                 </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="calc-height">Height</Label>
                    <Input id="calc-height" type="number" placeholder="0" value={height || ''} onChange={e => setHeight(parseFloat(e.target.value))} />
                 </div>
                  <div className="space-y-2">
                    <Label htmlFor="calc-packages">No. of Packages</Label>
                    <Input id="calc-packages" type="number" placeholder="0" value={packages || ''} onChange={e => setPackages(parseInt(e.target.value))} />
                 </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="calc-unit">Unit</Label>
                 <Select value={unit} onValueChange={(val: any) => setUnit(val)}>
                    <SelectTrigger id="calc-unit">
                        <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {DIMENSION_UNITS.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
             <Card className="mt-4 bg-secondary">
                <CardContent className="p-4 text-center">
                    <p className="text-muted-foreground">Total Volume</p>
                    <p className="text-3xl font-bold">{cbm} <span className="text-lg font-medium">CBM</span></p>
                </CardContent>
            </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
