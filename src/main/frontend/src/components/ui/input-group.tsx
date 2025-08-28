import type { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function InputGroup({ children }: Props) {
  return (
    <div className="flex flex-col -space-y-px *:first:rounded-t-lg *:first:rounded-b-none  *:last:rounded-t-none *:last:rounded-b-lg *:rounded-none">
      {children}
    </div>
  );
}
