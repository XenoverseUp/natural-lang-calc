import type { ClassValue } from "clsx";
import { Form } from "./ui/form";
import { cn, isValidNumberWord } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";

interface Props {
  className?: ClassValue;
}

export default function CalculatorForm({ className }: Props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as "en" | "tr";

  const formSchema = z.object({
    firstNumber: z
      .string()
      .transform((val) => val.replace(/\s+/g, " ").trim())
      .refine((val) => val.length >= 3, { message: "Must be at least 3 characters" })
      .refine((val) => isValidNumberWord(val, currentLanguage), {
        message: "Must be a valid number in words",
      }),
    secondNumber: z
      .string()
      .transform((val) => val.replace(/\s+/g, " ").trim())
      .refine((val) => val.length >= 3, { message: "Must be at least 3 characters" })
      .refine((val) => isValidNumberWord(val, currentLanguage), {
        message: "Must be a valid number in words",
      }),
    operation: z.enum(["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE", "MOD"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operation: "ADD",
      firstNumber: "",
      secondNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className, "px-6")}>
        Form.
      </form>
    </Form>
  );
}
