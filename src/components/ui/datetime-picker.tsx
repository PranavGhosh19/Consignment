
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";
import { Input } from "./input";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
  disabledDates?: (date: Date) => boolean;
}

export function DateTimePicker({ date, setDate, disabled, disabledDates }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) {
      setDate(undefined);
      return;
    }
    const oldHours = date ? date.getHours() : 12; // Default to noon
    const oldMinutes = date ? date.getMinutes() : 0;
    newDate.setHours(oldHours, oldMinutes, 0, 0);
    setDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, part: "hours" | "minutes") => {
    const value = e.target.value;
    const newDate = date ? new Date(date) : new Date();

    if (value === "") {
        // Handle empty input if needed, maybe reset to a default or just allow it
        // For now, we'll let the visual input be empty but won't change the date object's time until a valid number is entered.
        // A better approach would be to manage a separate string state for the input if strict control is needed.
    } else {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
            if (part === "hours" && numValue >= 0 && numValue < 24) {
                newDate.setHours(numValue);
                setDate(newDate);
            } else if (part === "minutes" && numValue >= 0 && numValue < 60) {
                newDate.setMinutes(numValue);
                setDate(newDate);
            }
        }
    }
  };
  
  const handleSet = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={disabledDates}
          initialFocus
        />
        <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5" />
                <p className="font-semibold">Set Time</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <Label htmlFor="hours">Hour</Label>
                    <Input 
                        id="hours"
                        type="number"
                        value={date ? date.getHours().toString().padStart(2, '0') : ''}
                        onChange={(e) => handleTimeChange(e, 'hours')}
                        min="0"
                        max="23"
                    />
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="minutes">Minute</Label>
                    <Input 
                        id="minutes"
                        type="number"
                        value={date ? date.getMinutes().toString().padStart(2, '0') : ''}
                        onChange={(e) => handleTimeChange(e, 'minutes')}
                        min="0"
                        max="59"
                    />
                </div>
            </div>
            <Button onClick={handleSet} className="w-full mt-4">Set Date and Time</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
