import { FieldSetItem } from "@/lib/types"

interface FieldSetProps {
  fieldSetItem: FieldSetItem;
  setValue: Function;
  className?: string;
}

export default function FieldSet({ fieldSetItem, setValue, className = "" }: FieldSetProps): JSX.Element {
  return (
    <fieldset className={`${className} flex flex-col mt-4`}>
      <div>
        <div className={`flex justify-between`}>
          <h2 className="text-gray-800 text-[18px]">{fieldSetItem.label}</h2>
        </div>
        <p className="text-gray-500 opacity-40 text-[14px]">{fieldSetItem.description}</p>
      </div>
      <div className={`flex flex-col mt-4`}>
        <div className="w-80 h-10 flex items-center rounded-lg border border-black border-opacity-40 group/search hover:border-opacity-80">
          <input
            className="w-9/12 pl-2 pb-1 focus:outline-none border-0 leading-none bg-transparent"
            type="text"
            value={fieldSetItem.value}
            onChange={(e) => setValue(e.target.value, fieldSetItem.key)}
          />
        </div>
      </div>
    </fieldset>
  )
}