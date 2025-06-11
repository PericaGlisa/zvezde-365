"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(props.selected || new Date())
  
  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i)
  
  const months = [
    "Januar", "Februar", "Mart", "April", "Maj", "Jun",
    "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
  ]

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = months.indexOf(newMonth)
    const newDate = new Date(month.getFullYear(), monthIndex, 1)
    setMonth(newDate)
  }

  const handleYearChange = (newYear: string) => {
    const newDate = new Date(parseInt(newYear), month.getMonth(), 1)
    setMonth(newDate)
  }

  return (
    <div className="p-3">
      {/* Year and Month Selectors */}
      <div className="flex gap-2 mb-4 justify-center">
        <Select value={months[month.getMonth()]} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
            {months.map((monthName) => (
              <SelectItem key={monthName} value={monthName} className="text-white">
                {monthName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={month.getFullYear().toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="w-20 bg-gray-800 border-gray-600 text-white text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()} className="text-white">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        className={cn("", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium text-gray-200",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent border-gray-600 p-0 opacity-80 hover:opacity-100 hover:bg-gray-800"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-gray-400 rounded-md w-9 font-medium text-[0.8rem] text-center",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal text-gray-300 aria-selected:opacity-100 hover:bg-gray-800 hover:text-gray-200"
          ),
          day_today: "bg-purple-800/30 text-purple-300 border border-purple-500/50",
          day_outside: "text-gray-500 opacity-50",
          day_disabled: "text-gray-600 opacity-50 line-through",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }