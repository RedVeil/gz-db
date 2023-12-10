import PersonCell from "@/components/PersonCell"
import SearchBar from "@/components/SearchBar"
import { Person } from "@/lib/types"
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const supabase = createClient('https://jqamrmyapfbelhmkcpvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYW1ybXlhcGZiZWxobWtjcHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQyOTgsImV4cCI6MjAxNzE4MDI5OH0.nusNDsT1mIZF1r5rFnjc6C_VlsCgbKtdSMOGD_MVgQU')

async function getProposedPeople() {
  const people = []
  const countRes = await supabase
    .from('proposed_people')
    .select('*', { count: 'exact', head: true })
  const count = countRes.count || 0

  let i = 0;
  while (i < count) {
    let res = await supabase
      .from('proposed_people')
      .select('*')
      .range(i, i + 999)
    people.push(...res.data)

    i += 1000
  }

  return people
}

export default function Index() {
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => { if (people.length === 0) getProposedPeople().then(res => setPeople(res)) }, [])

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(value: string) {
    setSearchTerm(value.toLowerCase());
  }

  async function acceptPerson(person: Person) {
    const addRes = await supabase
      .from("people")
      .insert([person])
      .select()

    if (addRes.status === 201) {
      const removeRes = await supabase
        .from('proposed_people')
        .delete()
        .eq('id', person.id)
      people.filter(p => p.id !== person.id)
      toast.success('Successfully added!');
    } else {
      toast.error('There was an error!');
    }
  }

  async function denyPerson(person: Person) {
    const removeRes = await supabase
      .from('proposed_people')
      .delete()
      .eq('id', person.id)

    if (removeRes.status === 201) {
      people.filter(p => p.id !== person.id)
      toast.success('Successfully removed!');
    } else {
      toast.error('There was an error!');
    }
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
      </div>

      <div className="mt-8 flow-root">
        {/* DESKTOP TABLE */}
        <div className="hidden sm:block -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    First Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Sex
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Age
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Birthday
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Deathday
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Home
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Location of Death
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Accept</span>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Deny</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.length > 0 && people.map((person) =>
                  <PersonCell
                    key={person.id}
                    person={person}
                    searchTerm={searchTerm}
                    mainAction={{ label: "Accept", handleAction: acceptPerson }}
                    secondaryAction={{ label: "Deny", handleAction: denyPerson }}
                  />
                )}
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
                {people.length > 0 && people.map((person) =>
                  <PersonCell
                    key={person.id}
                    person={person}
                    searchTerm={searchTerm}
                    mainAction={{ label: "Accept", handleAction: acceptPerson }}
                    secondaryAction={{ label: "Deny", handleAction: denyPerson }}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}