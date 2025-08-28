import type { ClassValue } from "clsx";
import { Form } from "./ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import InputGroup from "./ui/input-group";
import { Textarea } from "./ui/textarea";

interface Props {
  className?: ClassValue;
}

export default function CalculatorForm({ className }: Props) {
  const form = useForm();

  return (
    <Form {...form}>
      <form className={cn(className, "px-6")}>
        <InputGroup>
          <Textarea placeholder="First Number" className="font-mono" />
          <Textarea placeholder="Second Number" className="font-mono" />
        </InputGroup>
      </form>
    </Form>
  );
}
