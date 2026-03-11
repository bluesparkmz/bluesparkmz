"use client";

import { Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuthHeaderControls() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  function toggleTheme() {
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

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

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full"
        onClick={toggleTheme}
        aria-label="Alternar tema"
      >
        {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </div>
  );
}
