import { useState, useEffect } from "react";
import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";
import { GlobeIcon } from "lucide-react";

interface Props {
  className?: ClassValue;
}

export default function LanguageSwitcher({ className }: Props) {
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    i18n.on("languageChanged", setLanguage);
    return () => i18n.off("languageChanged", setLanguage);
  }, []);

  return (
    <div
      className={cn(
        className,
        "flex items-center gap-2.5 text-sm px-2.5 py-1.5 rounded-full bg-background z-30 select-none",
        "border border-b-3 transition-[transform_opacity]",
        "has-active:scale-97 has-active:opacity-80 has-active:border-b has-active:translate-y-1",
      )}
    >
      <GlobeIcon className="size-4 pointer-events-none text-blue-500" strokeWidth={1.5} />
      <div className="flex items-center gap-1.5 text-muted-foreground *:transition">
        <button
          className={cn("cursor-pointer", {
            "font-medium text-foreground pointer-events-none": language === "en",
          })}
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </button>
        <span aria-hidden className="w-px bg-muted-foreground/70 h-3"></span>
        <button
          className={cn("cursor-pointer", {
            "font-medium text-foreground pointer-events-none": language === "tr",
          })}
          onClick={() => i18n.changeLanguage("tr")}
        >
          TR
        </button>
      </div>
    </div>
  );
}
