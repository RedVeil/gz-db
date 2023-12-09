import { FieldSetItem, Person } from "@/lib/types";
import FieldSet from "./FieldSet";
import MobileModal from "./modal/MobileModal";
import { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const FIELD_SET_ITEMS: FieldSetItem[] = [
  {
    key: "first_name",
    label: "First Name",
  },
  {
    key: "last_name",
    label: "Last Name",
  },
  {
    key: "sex",
    label: "Sex",
  },
  {
    key: "age",
    label: "Age",
  },
  {
    key: "birth_day",
    label: "Birthday",
    description: "DD/MM/YYYY",
  },
  {
    key: "date_of_death",
    label: "Deathday",
    description: "DD/MM/YYYY",
  },
  {
    key: "home",
    label: "Home",
  },
  {
    key: "location_of_death",
    label: "Location of Death",
  },
]


interface AddPersonProps {
  visible: boolean;
  onClosePopUpModal: () => void;
  supabase: SupabaseClient;
  tableName: "proposed_changes" | "proposed_people"
  person: Person
}

export default function AddPerson({ visible, onClosePopUpModal, supabase, tableName, person }: AddPersonProps): JSX.Element {
  const [proposedPerson, setProposedPerson] = useState<Person>(person)

  useEffect(() => setProposedPerson(person), [person])

  function handleChange(value: string, key: string) {
    console.log(key, value)
    const newData = { ...proposedPerson };

    // @ts-ignore @dev the target per definition will be found and cant be undefined
    newData[key] = value

    setProposedPerson(newData)
  }

  async function proposePerson() {
    const data = { ...proposedPerson }

    if (tableName === "proposed_changes") data.target_id = data.id;

    data.id = uuidv4()

    const res = await supabase
      .from(tableName)
      .insert([data])
      .select()
    if (res.status === 201) {
      toast.success('Successfully created!');
    } else {
      toast.error('There was an error!');
    }
    onClosePopUpModal()
  }

  return (
    <MobileModal visible={visible} onClosePopUpModal={onClosePopUpModal}>
      <div className="flex flex-wrap gap-x-4">
        {FIELD_SET_ITEMS.map(item => (
          <FieldSet
            key={item.key}
            fieldSetItem={item}
            // @ts-ignore
            value={proposedPerson[item.key]}
            setValue={handleChange}
          />
        ))}
      </div>
      <button
        type="button"
        className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
        onClick={() => proposePerson()}
      >
        Submit
      </button>
    </MobileModal >
  )
}