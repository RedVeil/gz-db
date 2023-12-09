import { FieldSetItem, Person } from "@/lib/types";
import FieldSet from "./FieldSet";
import MobileModal from "./modal/MobileModal";
import { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

interface ReportProps {
  visible: boolean;
  onClosePopUpModal: () => void;
  supabase: SupabaseClient;
  tableName: "reports" | "people_reports"
  targetId?: string
}

export default function Report({ visible, onClosePopUpModal, supabase, tableName, targetId }: ReportProps): JSX.Element {
  const [value, setValue] = useState<string>("abc")

  async function sendReport() {
    const data = { id: uuidv4(), report: value }

    if (tableName === "people_reports") data.target_id = targetId;

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
        <fieldset className={`flex flex-col mt-4`}>
          <div>
            <div className={`flex justify-between`}>
              <h2 className="text-gray-800 text-[18px]">{tableName === "reports" ? "Report & Feedback" : "Report"}</h2>
            </div>
          </div>
          <div className={`flex flex-col mt-4`}>
            <div className="">
              <textarea
                className=""
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
          Submit
        </button>
        <button
          type="button"
          className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
          onClick={() => onClosePopUpModal()}
        >
          Close
        </button>
      </div>
    </MobileModal >
  )
}