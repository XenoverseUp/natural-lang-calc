import type { WithClassName } from "@/lib/types";

import { Tally5Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import OrderedList from "./ui/ordered-list";

type Props = WithClassName;

export default function Landing({ className }: Props) {
  const { t } = useTranslation();

  return (
    <header className={cn(className, "px-16")}>
      <div className="p-2 rounded-lg bg-indigo-100 w-fit mx-auto grid place-items-center mb-4">
        <Tally5Icon className="text-indigo-600" />
      </div>

      <h1 className="bg-opacity-50 bg-gradient-to-b text-center from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold text-transparent md:text-5xl pb-1">
        {t("title")}
      </h1>

      <p className="mt-10 text-balance text-muted-foreground text-center max-w-2xl mx-auto">{t("description")}</p>

      <OrderedList.Root className="mt-8 mx-auto">
        <OrderedList.Step>{t("steps.1")}</OrderedList.Step>
        <OrderedList.Step>{t("steps.2")}</OrderedList.Step>
        <OrderedList.Step>{t("steps.3")}</OrderedList.Step>
      </OrderedList.Root>

      <p className="absolute left-8 bottom-6 text-xs text-muted-foreground">&copy; Can Durmus {new Date().getFullYear()}</p>
    </header>
  );
}
