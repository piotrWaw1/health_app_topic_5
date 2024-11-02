import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Pressable, Text, View } from "react-native";
import { format } from "date-fns";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface DatePickerProps<T extends FieldValues, TName extends Path<T>> {
  field: ControllerRenderProps<T, TName>;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
  changeShowPicker: () => void;
  showPicker: boolean;
  disable?: boolean;
}

export default function DatePicker<T extends FieldValues, TName extends Path<T>>(props: DatePickerProps<T, TName>) {
  const { field, disable = false, onChange, changeShowPicker, showPicker } = props

  return (
    <View className="flex flex-row py-2">
      {showPicker &&
          <RNDateTimePicker
              value={new Date(field.value)}
              onChange={onChange} mode="time"
              display="spinner"
              is24Hour={true}
          />
      }
      <Text className="border border-gray-400 rounded-l-xl p-2">
        {format(field.value, "HH:mm dd-MM-yyyy")}
      </Text>
      <Pressable disabled={disable} className="p-2 bg-blue-500 hover:bg-blue-400 rounded-r-xl w-48"
                 onPress={changeShowPicker}>
        <Text className="m-auto text-lg font-semibold text-white">Set time</Text>
      </Pressable>
    </View>
  )
}