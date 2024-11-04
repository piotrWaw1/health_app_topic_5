import { useState } from "react";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Path, UseFormReturn } from "react-hook-form";

export default function useDatePicker() {
  const [showPicker, setShowPicker] = useState(false);

  const changeShowPicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = <T extends Record<string, any>>(
    form: UseFormReturn<T>,
    field: Path<T>,
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    const { type } = event
    if (type === "set") {
      form.setValue(field, (date ?? new Date()) as any);
    }
    changeShowPicker()
  }

  return { showPicker, changeShowPicker, onChange };
}