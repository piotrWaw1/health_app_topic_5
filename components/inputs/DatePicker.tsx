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
  const [showPickerTime, setShowPickerTime] = useState(false);
  const [showPickerDate, setShowPickerDate] = useState(false);

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event
    if (type === "set") {
      form.setValue(fieldName, (date ?? new Date()) as any);
    }

    setShowPickerDate(false)
    setShowPickerTime(false)
  }

  return (
    <View className="flex py-2 gap-2">
      {showPickerTime &&
          <RNDateTimePicker
              value={new Date(field.value)}
              onChange={onChange} mode="time"
              display="spinner"
              is24Hour={true}
          />
      }
      {showPickerDate &&
          <RNDateTimePicker
              value={new Date(field.value)}
              onChange={onChange} mode="date"
              display="spinner"
              is24Hour={true}
          />
      }
      <ThemedText className="border border-gray-400 rounded-xl p-2">
        {format(field.value, "HH:mm dd-MM-yyyy")}
      </ThemedText>
      <View className="flex flex-row gap-4">
        <Pressable
          disabled={disable || showPickerDate}
          className="p-2 bg-blue-500 hover:bg-blue-400 rounded-xl w-40"
          onPress={() => setShowPickerTime(true)}
        >
          <ThemedText className="m-auto text-lg font-semibold text-white" style={{ color: "white" }}>
            Set time
          </ThemedText>
        </Pressable>
        <Pressable
          disabled={disable || showPickerTime}
          className="p-2 bg-blue-500 hover:bg-blue-400 rounded-xl w-40"
          onPress={() => setShowPickerDate(true)}
        >
          <ThemedText className="m-auto text-lg font-semibold text-white" style={{ color: "white" }}>
            Set date
          </ThemedText>
        </Pressable>
      </View>
    </View>
  )
}