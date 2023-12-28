import Navbar from "@/components/Navbar"
import PersonCell from "@/components/PersonCell"
import SearchBar from "@/components/SearchBar"
import { BUTTON_LABEL, PAGE_SUBTITLE, PAGE_TITLE, TABLE_TITLE } from "@/lib/localization"
import { localizationAtom } from "@/lib/localization/state"
import { Index, Person } from "@/lib/types"
import { createClient } from "@supabase/supabase-js"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const supabase = createClient('https://jqamrmyapfbelhmkcpvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYW1ybXlhcGZiZWxobWtjcHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQyOTgsImV4cCI6MjAxNzE4MDI5OH0.nusNDsT1mIZF1r5rFnjc6C_VlsCgbKtdSMOGD_MVgQU')

async function getPeople({ start, end, people }: { start: number, end: number, people: Person[] }) {
  const countRes = await supabase
    .from('proposed_people')
    .select('*', { count: 'exact', head: true })
  const count = countRes.count || 0

  let res = await supabase
    .from('proposed_people')
    .select('*')
    .range(start, end > count ? count : end)
  people.push(...res.data as Person[])

  return people
}

export default function Index() {
  const [localization] = useAtom(localizationAtom);
  const [people, setPeople] = useState<Person[]>([])
  const [index, setIndex] = useState<Index>({ start: 0, end: 100 })

  async function addPeople(oldPeople: Person[]) {
    const newPeople = await getPeople({ ...index, people: oldPeople })
    setPeople(newPeople)
    setIndex({ start: index.start + 100, end: index.end + 100 })
  }

  useEffect(() => {
    if (people.length === 0) {
      addPeople([])
    }
  }, [])

  async function handleSearch(value: string) {
    if (value === "") {
      setIndex({ start: 0, end: 99 })
      addPeople([])
    } else {
      let res = await supabase
        .from('proposed_people')
        .select('*')
        .ilike('name', `%${value}%`)
      setPeople(res.data as Person[])
    }
  }

  async function acceptPerson(person: Person) {
    const newPeople = [...people]
    const addRes = await supabase
      .from("people")
      .insert([person])
      .select()

    if (addRes.status === 201) {
      const removeRes = await supabase
        .from('proposed_people')
        .delete()
        .eq('id', person.id)

      setPeople(newPeople.filter(p => p.id !== person.id))

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
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">{PAGE_TITLE.proposedPeople[localization]}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {PAGE_SUBTITLE.proposedPeople[localization]}
          </p>
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
                      {TABLE_TITLE.name[localization]}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {TABLE_TITLE.sex[localization]}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {TABLE_TITLE.age[localization]}
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">{BUTTON_LABEL.accept[localization]}</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">{BUTTON_LABEL.deny[localization]}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.length > 0 && people.map((person) =>
                    <PersonCell
                      key={person.id}
                      person={person}
                      buttons={[
                        {
                          label: BUTTON_LABEL.accept[localization],
                          handleAction: acceptPerson,
                          className: "text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        },
                        {
                          label: BUTTON_LABEL.deny[localization],
                          handleAction: denyPerson,
                          className: "text-red-600 hover:text-red-900 cursor-pointer"
                        }
                      ]}
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
                      {TABLE_TITLE.person[localization]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.length > 0 && people.map((person) =>
                    <PersonCell
                      key={person.id}
                      person={person}
                      buttons={[
                        {
                          label: BUTTON_LABEL.accept[localization],
                          handleAction: acceptPerson,
                          className: "text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        },
                        {
                          label: BUTTON_LABEL.deny[localization],
                          handleAction: denyPerson,
                          className: "text-red-600 hover:text-red-900 cursor-pointer"
                        }
                      ]}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="w-full flex flex-row items-center justify-center mt-4">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
            onClick={() => addPeople(people)}
          >
            {BUTTON_LABEL.pagination[localization]}
          </button>
        </div>

      </div >
    </>
  )
}