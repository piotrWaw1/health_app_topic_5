import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Pressable, View } from "react-native";
import { format } from "date-fns";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";

interface DatePickerProps<T extends FieldValues, TName extends Path<T>, TForm extends Record<string, any>> {
  field: ControllerRenderProps<T, TName>;
  fieldName: Path<TForm>
  form: UseFormReturn<TForm>,
  disable?: boolean;
}

export default function DatePicker<T extends FieldValues, TName extends Path<T>, TForm extends Record<string, any>>(props: DatePickerProps<T, TName, TForm>) {
  const { field, fieldName, form, disable = false } = props
  const [showPicker, setShowPicker] = useState(false);

  const changeShowPicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event
    if (type === "set") {
      form.setValue(fieldName, (date ?? new Date()) as any);
    }
    changeShowPicker()
  }

  return (
    <View className="flex py-2 gap-2">
      {showPicker &&
          <RNDateTimePicker
              value={new Date(field.value)}
              onChange={onChange} mode="time"
              display="spinner"
              is24Hour={true}
          />
      }
      <ThemedText className="border border-gray-400 rounded-xl p-2">
        {format(field.value, "HH:mm dd-MM-yyyy")}
      </ThemedText>
      <Pressable
        disabled={disable}
        className="p-2 bg-blue-500 hover:bg-blue-400 rounded-xl"
        onPress={changeShowPicker}
      >
        <ThemedText className="m-auto text-lg font-semibold text-white">Set time</ThemedText>
      </Pressable>
    </View>
  )
}