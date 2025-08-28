import type { ClassValue } from "clsx";
import { Form } from "./ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

interface Props {
  className?: ClassValue;
}

export default function CalculatorForm({ className }: Props) {
  const form = useForm();

  return (
    <Form {...form}>
      <form className={cn(className)}></form>
    </Form>
  );
}
