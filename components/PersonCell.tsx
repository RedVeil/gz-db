import { Person } from "@/lib/types"

interface PersonCellProps {
  person: Person;
  searchTerm: string;
}

export default function PersonCell({ person, searchTerm }: PersonCellProps): JSX.Element {
  if (searchTerm !== "" &&
    !String(person.id).includes(searchTerm) &&
    !person.name.toLowerCase().includes(searchTerm)
  ) return <></>

  return (
    <>
      {/* DESKTOP */}
      <tr className="hidden md:table-row">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {person.id}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.name}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.sex}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.age}</td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">
      Edit<span className="sr-only">, {person.name}</span>
    </a> */}
        </td>
      </tr >
      {/* MOBILE */}
      <tr className="md:hidden">
        <td className="md:hidden whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          <p className="text-sm text-gray-900">{person.name}</p>
          <p className="text-sm text-gray-500">{person.sex}</p>
          <p className="text-sm text-gray-500">{person.age}</p>
          {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {person.name}</span>
                      </a> */}
        </td>
      </tr >
    </>
  )
}