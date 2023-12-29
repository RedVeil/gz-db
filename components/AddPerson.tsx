import { FieldSetItem, Person } from "@/lib/types";
import FieldSet from "./FieldSet";
import MobileModal from "./modal/MobileModal";
import { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { BUTTON_LABEL, TABLE_TITLE } from "@/lib/localization";
import { localizationAtom } from "@/lib/localization/state";
import { useAtom } from "jotai";
import MaleIcon from "./svg/MaleIcon";
import FemaleIcon from "./svg/FemaleIcon";

const FIELD_SET_ITEMS: FieldSetItem[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "sex",
    label: "Sex",
  },
  {
    key: "age",
    label: "Age",
  },
  // {
  //   key: "birth_day",
  //   label: "Birthday",
  //   description: "DD/MM/YYYY",
  // },
  // {
  //   key: "date_of_death",
  //   label: "Deathday",
  //   description: "DD/MM/YYYY",
  // },
  // {
  //   key: "home",
  //   label: "Home",
  // },
  // {
  //   key: "location_of_death",
  //   label: "Location of Death",
  // },
]


interface AddPersonProps {
  visible: boolean;
  onClosePopUpModal: () => void;
  supabase: SupabaseClient;
  tableName: "proposed_changes" | "proposed_people"
  person: Person
}

export default function AddPerson({ visible, onClosePopUpModal, supabase, tableName, person }: AddPersonProps): JSX.Element {
  const [localization] = useAtom(localizationAtom);
  const [proposedPerson, setProposedPerson] = useState<Person>(person)

  useEffect(() => setProposedPerson(person), [person])

  function handleChange(value: string, key: string) {
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
        <FieldSet
          fieldSetItem={{
            key: "name",
            label: TABLE_TITLE.name[localization],
          }}
          value={proposedPerson.name}
          setValue={handleChange}
        />
        <fieldset className={`flex flex-col mt-4`}>
          <div>
            <div className={`flex justify-between`}>
              <h2 className="text-gray-800 text-[18px]">{TABLE_TITLE.sex[localization]}</h2>
            </div>
            <p className="text-gray-500 opacity-40 text-[14px]"></p>
          </div>
          <div className={`flex flex-row items-center justify-between mt-4 p-2 rounded-lg border border-black border-opacity-40 hover:border-opacity-80`}>
            <button className="font-bold" onClick={() => handleChange("male", "sex")}>
              <MaleIcon size="18" color="#6b7280" />
            </button>
            <p className="mx-4">|</p>
            <button className="font-bold" onClick={() => handleChange("female", "sex")}>
              <FemaleIcon size="18" color="#6b7280" />
            </button>
          </div>
        </fieldset>
        <FieldSet
          fieldSetItem={{
            key: "age",
            label: TABLE_TITLE.age[localization],
          }}
          value={proposedPerson.age}
          setValue={handleChange}
        />
      </div>
      <div className="flex flex-row items-center space-x-4">
        <button
          type="button"
          className="mt-4 rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-gray-500"
          onClick={() => proposePerson()}
        >
          {BUTTON_LABEL.submit[localization]}
        </button>
        <button
          type="button"
          className="mt-4 rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-gray-500"
          onClick={() => onClosePopUpModal()}
        >
          {BUTTON_LABEL.close[localization]}
        </button>
      </div>
    </MobileModal >
  )
}