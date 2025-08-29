import type { WithClassName } from "@/lib/types";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { cn, isValidNumberWord } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Textarea } from "./ui/textarea";
import InputGroup from "./ui/input-group";

type Props = WithClassName;

export default function CalculatorForm({ className }: Props) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as "en" | "tr";

  const formSchema = z.object({
    firstNumber: z
      .string()
      .transform((val) => val.replace(/\s+/g, " ").trim())
      .refine((val) => val.length >= 3, { message: "Must be at least 3 characters." })
      .refine((val) => isValidNumberWord(val, currentLanguage), {
        message: "Must be a valid number.",
      }),
    secondNumber: z
      .string()
      .transform((val) => val.replace(/\s+/g, " ").trim())
      .refine((val) => val.length >= 3, { message: "Must be at least 3 characters." })
      .refine((val) => isValidNumberWord(val, currentLanguage), {
        message: "Must be a valid number.",
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
        <FormItem>
          <FormLabel>Numbers</FormLabel>
          <InputGroup>
            <FormField
              control={form.control}
              name="firstNumber"
              render={({ field }) => (
                <FormControl>
                  <Textarea placeholder="First Number..." {...field} />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="secondNumber"
              render={({ field }) => (
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              )}
            />
          </InputGroup>

          <FormDescription>Enter the numbers to operate on.</FormDescription>
        </FormItem>
      </form>
    </Form>
  );
}
