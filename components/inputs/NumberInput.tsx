import { Text, TextInput } from "react-native";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { cn } from "@/components/utils/cn";

interface NumberInputProps<T extends FieldValues, TName extends Path<T>> {
  field: ControllerRenderProps<T, TName>;
  disable?: boolean;
  errorMessage?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export default function NumberInput<T extends FieldValues, TName extends Path<T>>(props: NumberInputProps<T, TName>) {
  const { field, errorMessage, inputClassName, errorClassName, disable = false } = props
  return (
    <>
      <TextInput
        {...field}
        value={field.value?.toString()}
        onChangeText={field.onChange}
        keyboardType="numeric"
        className={cn("border border-gray-400 rounded-xl px-2 my-2", inputClassName)}
        aria-disabled={disable}
      />
      {errorMessage && (
        <Text className={cn("text-red-600 mb-2", errorClassName)}>{errorMessage}</Text>
      )}
    </>
  )
}