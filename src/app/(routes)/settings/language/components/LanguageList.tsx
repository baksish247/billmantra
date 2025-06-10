"use client";

import { indianLanguages } from "../lib/locales";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function LanguageList() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setSelectedLang(stored);
  }, []);

  const handleApply = () => {
    localStorage.setItem("lang", selectedLang);
    router.push(`/${selectedLang}`);
  };

  return (
    <div className="space-y-6 max-w-md">
      <RadioGroup value={selectedLang} onValueChange={setSelectedLang} className="space-y-3">
        {indianLanguages.map((lang) => (
          <div
            key={lang.code}
            className="flex items-center justify-between px-4 py-3 border rounded-md hover:bg-muted cursor-pointer"
          >
            <Label htmlFor={lang.code} className="text-base">
              {lang.name}
            </Label>
            <RadioGroupItem id={lang.code} value={lang.code} />
          </div>
        ))}
      </RadioGroup>

      <Button className="w-full" onClick={handleApply}>
        Apply Language
      </Button>
    </div>
  );
}
