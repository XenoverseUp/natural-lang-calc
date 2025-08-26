import { Children, createContext, isValidElement, useContext, type ReactNode } from "react";

import type { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface RootProps {
  children: ReactNode;
  className?: ClassValue;
}

interface StepProps {
  children: ReactNode;
}

const OrderedListContext = createContext<{ step: number }>({ step: 0 });

const OrderedList = {
  Root: ({ children, className }: RootProps) => {
    let step = 0;

    const wrappedChildren = Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      step += 1;
      return <OrderedListContext.Provider value={{ step }}>{child}</OrderedListContext.Provider>;
    });

    return <div className={cn(className, "flex flex-col gap-2 w-fit")}>{wrappedChildren}</div>;
  },
  Step: ({ children }: StepProps) => {
    const { step } = useContext(OrderedListContext);
    return (
      <div className={cn("flex gap-4")}>
        <div
          className={cn(
            "w-8 aspect-square select-none relative rounded-lg grid place-items-center border-2 border-b-4 text-xs text-muted-foreground ",
            {
              "before:w-[2px] before:bg-border before:h-1/2 before:-z-10 before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2":
                step !== 1,
            },
          )}
        >
          {step}
        </div>
        <p className="mt-0.5">{children}</p>
      </div>
    );
  },
};

export default OrderedList;
