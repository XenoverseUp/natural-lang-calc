import { tryCatch } from "@/lib/try-catch";
import { OperationEnum } from "@/lib/types";
import api from "@/services/api";

type CalculateParams = {
  numbers: {
    first: string;
    second: string;
  };
  operation: OperationEnum;
};

export async function calculate(params: CalculateParams) {
  const { data, error } = await tryCatch(
    api.endpoints.calculate.fetch({
      body: {
        numbers: params.numbers,
        operation: params.operation,
      },
    }),
  );

  if (error !== null) return { result: null };

  return data as { result: string };
}
