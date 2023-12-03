import SearchBar from "@/components/SearchBar";
import Sorting, { SortingItem } from "@/components/Sorting";
import getPeople from "@/lib/getPeople";
import { useEffect, useState } from "react";
import PersonCell from "@/components/PersonCell"
import type { Person } from "@/lib/types";

const SORTING_ITEMS: SortingItem[] = [
  {
    label: "Sort Sample",
    onClick: () => { },
    active: false
  },
]

export default function Index(): JSX.Element {
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => { if (people.length === 0) setPeople(getPeople()) }, [])

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(value: string) {
    setSearchTerm(value.toLowerCase());
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Title</h1>
          <p className="mt-2 text-sm text-gray-700">
            Subtitle
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mt-4">
        <span>
          <SearchBar handleSearch={handleSearch} />
          {/* <Sorting sortingItems={SORTING_ITEMS} /> */}
        </span>
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
          disabled
        >
          Add Person
        </button>
      </div>

      <div className="mt-8 flow-root">
        {/* DESKTOP TABLE */}
        <div className="hidden sm:block -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    ID Number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Sex
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Age
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.length > 0 && people.map((person) => <PersonCell key={person.id} person={person} searchTerm={searchTerm} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE TABLE */}
        <div className="sm:hidden -mx-4 -my-2">
          <div className="inline-block w-full py-2 align-middle">
            <table className="w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Person
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.length > 0 && people.map((person) => <PersonCell key={person.id} person={person} searchTerm={searchTerm} />)}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}