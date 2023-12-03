import { FieldSetItem } from "@/lib/types";
import FieldSet from "./FieldSet";
import MobileModal from "./modal/MobileModal";
import { useState } from "react";

const FIELD_SET_ITEMS: FieldSetItem[] = [
  {
    key: "firstName",
    label: "First Name",
    value: ""
  },
  {
    key: "lastName",
    label: "Last Name",
    value: ""
  },
  {
    key: "sex",
    label: "Sex",
    value: ""
  },
  {
    key: "age",
    label: "Age",
    value: ""
  },
  {
    key: "birthday",
    label: "Birthday",
    description: "DD/MM/YYYY",
    value: ""
  },
  {
    key: "deathday",
    label: "Deathday",
    description: "DD/MM/YYYY",
    value: ""
  },
]

interface AddPersonProps {
  visible: boolean;
  onClosePopUpModal: () => void;
}

export default function AddPerson({ visible, onClosePopUpModal }: AddPersonProps): JSX.Element {
  const [data, setData] = useState<FieldSetItem[]>(FIELD_SET_ITEMS)

  function handleChange(value: string, key: string) {
    const newData = [...data];
    const target = newData.find(d => d.key === key)

    // @ts-ignore @dev the target per definition will be found and cant be undefined
    target.value = value

    setData(newData)
  }

  return (
    <MobileModal visible={visible} onClosePopUpModal={onClosePopUpModal}>
      <div className="flex flex-wrap gap-x-4">
        {data.map(item => <FieldSet key={item.key} fieldSetItem={item} setValue={handleChange} />)}
      </div>
      <button
        type="button"
        className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
        onClick={() => onClosePopUpModal()}
      >
        Submit
      </button>
    </MobileModal >
  )
}