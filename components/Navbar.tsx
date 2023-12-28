import { localizationAtom } from "@/lib/localization/state";
import { useAtom } from "jotai";

export default function Navbar(): JSX.Element {
  const [localization, setLocalization] = useAtom(localizationAtom);

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between mt-4">
      <div></div>
      <div className="border border-gray-500 rounded-md px-1 flex flex-row items-center justify-between space-x-2">
        <button
          onClick={() => setLocalization("eng")}
          className={`text-gray-500 hover:text-gray-900 ${localization === "eng" ? "text-gray-900" : ""}`}
        >
          Eng
        </button>
        <p className="text-gray-500">|</p>
        <button
          onClick={() => setLocalization("arabic")}
          className={`text-gray-500 hover:text-gray-900 ${localization === "arabic" ? "text-gray-900" : ""}`}
        >
          العربية
        </button>
      </div>
    </div >
  )
}