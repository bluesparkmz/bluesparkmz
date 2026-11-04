"use client";

import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuthHeaderControls() {
  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Globe className="h-4 w-4" />
        <Select defaultValue="pt-PT">
          <SelectTrigger className="h-10 min-w-[112px] border-0 bg-transparent px-1 text-sm shadow-none focus:ring-0 focus:ring-offset-0 sm:min-w-[150px] sm:px-2">
            <SelectValue placeholder="Idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pt-PT">Portugues (Portugal)</SelectItem>
            <SelectItem value="pt-MZ">Portugues (Mocambique)</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
