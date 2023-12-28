import { Person } from "@/lib/types"
import MaleIcon from "./svg/MaleIcon";
import FemaleIcon from "./svg/FemaleIcon";

type ButtonProps = {
  label: string;
  handleAction: (person: Person) => void;
  className?: string;
}

interface PersonCellProps {
  person: Person;
  buttons?: ButtonProps[];
}

export default function PersonCell({ person, buttons }: PersonCellProps): JSX.Element {
  return (
    <>
      {/* DESKTOP */}
      <tr className="hidden md:table-row">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {person.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm">
          {person.sex === "male" ?
            <MaleIcon size="18" color="#6b7280" /> :
            <FemaleIcon size="18" color="#6b7280" />
          }
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500">{person.age}</td>
        {buttons && buttons?.length > 0 && buttons?.map(button =>
          <td key={button.label} className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <a className={`${button.className}`} onClick={() => button.handleAction(person)}>
              {button.label}
            </a>
          </td>
        )}
      </tr >
      {/* MOBILE */}
      < tr className="md:hidden" >
        <td className="md:hidden whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          <p className="text-sm text-gray-900">{person.name}</p>
          <span className="text-sm text-gray-500">
            {person.sex === "male" ?
              <MaleIcon size="18" color="#6b7280" /> :
              <FemaleIcon size="18" color="#6b7280" />
            }
          </span>
          <p className="text-sm font-medium text-gray-500">{person.age}</p>
          {buttons && buttons?.length > 0 && buttons?.map(button =>
            <a key={button.label} className={`${button.className}`} onClick={() => button.handleAction(person)}>
              {button.label}
            </a>
          )}
        </td>
      </tr >
    </>
  )
}