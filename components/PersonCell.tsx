import { Person } from "@/lib/types"

interface PersonCellProps {
  person: Person;
  searchTerm: string;
  showProposeChangesModal: (person: Person) => void
  showReportPersonModal: (person: Person) => void
}

export default function PersonCell({ person, searchTerm, showProposeChangesModal, showReportPersonModal }: PersonCellProps): JSX.Element {
  if (searchTerm !== "" &&
    !person.first_name.toLowerCase().includes(searchTerm)
  ) return <></>

  return (
    <>
      {/* DESKTOP */}
      <tr className="hidden md:table-row">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {person.first_name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.last_name}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.sex}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.age}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.birth_day > 0 ? person?.birth_day : ""}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.date_of_death > 0 ? person?.date_of_death : ""}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.home}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.location_of_death}</td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <a className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => showProposeChangesModal(person)}>
            Edit
          </a>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <a className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => showReportPersonModal(person)}>
            Report
          </a>
        </td>
      </tr >
      {/* MOBILE */}
      <tr className="md:hidden">
        <td className="md:hidden whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          <p className="text-sm text-gray-900">{person.first_name}</p>
          <p className="text-sm text-gray-500">{person?.last_name}</p>
          <p className="text-sm text-gray-500">{person?.sex}</p>
          <p className="text-sm text-gray-500">{person?.age}</p>
          <p className="text-sm text-gray-500">{person?.birth_day > 0 ? person?.birth_day : ""}</p>
          <p className="text-sm text-gray-500">{person?.date_of_death > 0 ? person?.date_of_death : ""}</p>
          <p className="text-sm text-gray-500">{person?.home}</p>
          <p className="text-sm text-gray-500">{person?.location_of_death}</p>
          <a className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => showProposeChangesModal(person)}>
            Edit
          </a>
          <a className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => showReportPersonModal(person)}>
            Report
          </a>
        </td>
      </tr >
    </>
  )
}