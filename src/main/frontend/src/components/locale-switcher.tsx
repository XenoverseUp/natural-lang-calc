import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { GlobeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { WithClassName } from "@/lib/types";

type Props = WithClassName;

export default function LanguageSwitcher({ className }: Props) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    i18n.on("languageChanged", setLanguage);
    return () => i18n.off("languageChanged", setLanguage);
  }, [i18n]);

  return (
    <div
      className={cn(
        className,
        "flex items-center gap-2.5 text-sm px-2.5 py-1.5 rounded-full bg-background z-30 select-none",
        "border border-b-3 transition-[transform_opacity]",
        "has-active:scale-99 has-active:opacity-80 has-active:border-b has-active:translate-y-0.5",
      )}
    >
      <GlobeIcon className="size-4 pointer-events-none text-blue-500" strokeWidth={1.5} />
      <div className="flex items-center gap-1.5 text-muted-foreground *:transition">
        <button
          onClick={() => i18n.changeLanguage("en")}
          className={cn("cursor-pointer", {
            "font-medium text-foreground pointer-events-none": language === "en",
          })}
        >
          EN
        </button>
        <span aria-hidden className="w-px bg-muted-foreground/70 h-3"></span>
        <button
          onClick={() => i18n.changeLanguage("tr")}
          className={cn("cursor-pointer", {
            "font-medium text-foreground pointer-events-none": language === "tr",
          })}
        >
          TR
        </button>
      </div>
    </div>
  );
}
