import { FieldSetItem, Person } from "@/lib/types";
import FieldSet from "./FieldSet";
import MobileModal from "./modal/MobileModal";
import { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { BUTTON_LABEL, OTHER_LABEL, PAGE_TITLE } from "@/lib/localization";
import { localizationAtom } from "@/lib/localization/state";
import { useAtom } from "jotai";

interface ReportProps {
  visible: boolean;
  onClosePopUpModal: () => void;
  supabase: SupabaseClient;
  tableName: "reports" | "people_reports"
  targetId?: string
}

export default function Report({ visible, onClosePopUpModal, supabase, tableName, targetId }: ReportProps): JSX.Element {
  const [localization] = useAtom(localizationAtom);
  const [value, setValue] = useState<string>("")

  async function sendReport() {
    const data = { id: uuidv4(), report: value }

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
      <div className="flex flex-wrap gap-x-4 w-full">
        <fieldset className={`flex flex-col mt-4 w-full`}>
          <div>
            <div className={`flex justify-between`}>
              <h2 className="text-gray-800 text-[18px]">{PAGE_TITLE.reports[localization]}</h2>
            </div>
          </div>
          <div className={`flex flex-col mt-4 w-full`}>
            <div className="w-full">
              <textarea
                className="w-full md:w-1/2 h-24 flex items-center rounded-lg border border-black border-opacity-40 hover:border-opacity-80 p-2"
                placeholder={OTHER_LABEL.comment[localization]}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div className="flex flex-row items-center space-x-4">
        <button
          type="button"
          className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
          onClick={() => sendReport()}
        >
          {BUTTON_LABEL.submit[localization]}
        </button>
        <button
          type="button"
          className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
          onClick={() => onClosePopUpModal()}
        >
          {BUTTON_LABEL.close[localization]}
        </button>
      </div>
    </MobileModal >
  )
}