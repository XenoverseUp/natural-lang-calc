import { useState, useEffect } from "react";
import i18n from "@/i18n";
import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";
import { GlobeIcon } from "lucide-react";

interface Props {
  className?: ClassValue;
}

export default function LanguageSwitcher({ className }: Props) {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("calc-lang", language);
    setLanguage(language);
  };

  useEffect(() => {
    i18n.on("languageChanged", setLanguage);
    return () => i18n.off("languageChanged", setLanguage);
  }, []);

  return (
    <div
      className={cn(
        className,
        "flex items-center gap-2.5 text-sm px-2.5 py-1.5 has-active:scale-95 has-active:opacity-80 rounded-full bg-[#FAFAF9] z-30 border transition-[transform_opacity] select-none",
      )}
    >
      <GlobeIcon className="size-4 pointer-events-none" strokeWidth={1.5} />
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <button
          className={cn("cursor-pointer", {
            "font-medium text-foreground pointer-events-none": language === "en",
          })}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <span aria-hidden className="w-px bg-muted-foreground/70 h-3"></span>
        <button
          className={cn("cursor-pointer", {
            "font-medium text-foreground pointer-events-none": language === "tr",
          })}
          onClick={() => changeLanguage("tr")}
        >
          TR
        </button>
      </div>
    </div>
  );
}
