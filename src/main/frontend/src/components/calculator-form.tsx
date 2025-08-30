import type { TFunction } from "i18next";
import { OperationEnum, type WithClassName } from "@/lib/types";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { cn, isValidNumberWord } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Textarea } from "./ui/textarea";
import InputGroup from "./ui/input-group";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { DivideIcon, DraftingCompass, MinusIcon, PercentIcon, PlusIcon, XIcon } from "lucide-react";
import For from "@/components/common/for";
import { If, IfValue } from "@/components/common/if";
import { Button } from "./ui/button";
import { useState } from "react";
import { calculate } from "@/services/calculation";

type Props = WithClassName;

export default function CalculatorForm({ className }: Props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as "en" | "tr";

  const formSchema = getFormSchema(currentLanguage, t);
  const operations = getOperations(t);

  const [result, setResult] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operation: OperationEnum.ADD,
      firstNumber: "",
      secondNumber: "",
    },
  });

  async function onSubmit({ firstNumber, secondNumber, operation }: z.infer<typeof formSchema>) {
    const data = await calculate({
      numbers: {
        first: firstNumber,
        second: secondNumber,
      },
      operation: operation,
      locale: currentLanguage,
    });

    if (!data.result) {
      setResult("");
      return;
    }

    setResult(data.result);
  }

  const activeOperation = operations.find((op) => op.value === form.watch("operation"))!;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className, "p-6 pb-8 flex flex-col gap-6")}>
        {/* Number Inputs */}
        <FormItem>
          <FormLabel>{t("form.numbers")}</FormLabel>
          <InputGroup>
            <FormField
              control={form.control}
              name="firstNumber"
              render={({ field }) => (
                <FormControl>
                  <Textarea placeholder={t("form.firstNumber")} {...field} />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="secondNumber"
              render={({ field }) => (
                <FormControl>
                  <Textarea placeholder={t("form.secondNumber")} {...field} />
                </FormControl>
              )}
            />
          </InputGroup>

          <IfValue
            present={form.formState.errors.firstNumber}
            renderItem={(firstNumber) => <FormMessage>{firstNumber.message}</FormMessage>}
            renderElse={() => (
              <IfValue
                present={form.formState.errors.secondNumber}
                renderItem={(secondNumber) => <FormMessage>{secondNumber.message}</FormMessage>}
              />
            )}
          />
        </FormItem>

        {/* Operation Radio Group */}
        <FormField
          control={form.control}
          name="operation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.operation")}</FormLabel>
              <FormDescription>{t("form.operationDescription")}</FormDescription>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="grid w-full gap-2">
                  <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-2">
                    <For
                      each={operations}
                      renderItem={({ value, Icon, activeStyle }) => (
                        <Label
                          key={value}
                          htmlFor={value}
                          className={cn(
                            "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-b-4 px-4 py-2 transition",
                            field.value === value ? activeStyle : "hover:bg-muted",
                          )}
                        >
                          <Icon className="size-4" />
                          <RadioGroupItem value={value} id={value} className="hidden" />
                        </Label>
                      )}
                    />
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Result Box */}

        <div className="w-full h-20 border bg-accent rounded-lg overflow-auto">
          <If
            condition={result === ""}
            renderItem={() => (
              <div className="w-full h-full flex items-center justify-center gap-2.5 text-base opacity-75">
                <DraftingCompass className="size-5" />
                {t("form.result")}
              </div>
            )}
            renderElse={() => <p className="py-2 px-3 text-sm text-primary/80 capitalize">{result}</p>}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-3">
          <Button size="lg" className={cn("grow", activeOperation.activeStyle)} type="submit">
            <activeOperation.Icon />
            {activeOperation.label}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            type="reset"
            onClick={() => {
              form.resetField("firstNumber");
              form.resetField("secondNumber");
              setResult("");
            }}
          >
            {t("form.reset")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

const getFormSchema = (language: "en" | "tr", t: TFunction) =>
  z.object({
    firstNumber: z
      .string()
      .transform((val) => val.replace(/\s+/g, " ").trim())
      .refine((val) => val.length >= 3, {
        message: t("form.errors.minLength"),
      })
      .refine((val) => isValidNumberWord(val, language), {
        message: t("form.errors.invalidNumber"),
      }),
    secondNumber: z
      .string()
      .transform((val) => val.replace(/\s+/g, " ").trim())
      .refine((val) => val.length >= 3, {
        message: t("form.errors.minLength"),
      })
      .refine((val) => isValidNumberWord(val, language), {
        message: t("form.errors.invalidNumber"),
      }),
    operation: z.enum(OperationEnum),
  });

const getOperations = (t: TFunction) => [
  {
    label: t("form.operations.add"),
    value: OperationEnum.ADD,
    Icon: PlusIcon,
    activeStyle: "bg-blue-400 border-blue-500 text-primary-foreground",
  },
  {
    label: t("form.operations.subtract"),
    value: OperationEnum.SUBTRACT,
    Icon: MinusIcon,
    activeStyle: "bg-orange-400 border-orange-500 text-primary-foreground",
  },
  {
    label: t("form.operations.multiply"),
    value: OperationEnum.MULTIPLY,
    Icon: XIcon,
    activeStyle: "bg-lime-500 border-lime-600 text-primary-foreground",
  },
  {
    label: t("form.operations.divide"),
    value: OperationEnum.DIVIDE,
    Icon: DivideIcon,
    activeStyle: "bg-teal-400 border-teal-500 text-primary-foreground",
  },
  {
    label: t("form.operations.modulus"),
    value: OperationEnum.MOD,
    Icon: PercentIcon,
    activeStyle: "bg-purple-400 border-purple-500 text-primary-foreground",
  },
];
