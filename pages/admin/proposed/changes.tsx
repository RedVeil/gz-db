import SearchBar from "@/components/SearchBar"
import { Person } from "@/lib/types"
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const supabase = createClient('https://jqamrmyapfbelhmkcpvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYW1ybXlhcGZiZWxobWtjcHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQyOTgsImV4cCI6MjAxNzE4MDI5OH0.nusNDsT1mIZF1r5rFnjc6C_VlsCgbKtdSMOGD_MVgQU')

interface Change extends Person {
  target_id: string;
}

async function getChanges() {
  const changes = []
  const countRes = await supabase
    .from('proposed_changess')
    .select('*', { count: 'exact', head: true })
  const count = countRes.count || 0

  let i = 0;
  while (i < count) {
    let res = await supabase
      .from('proposed_changess')
      .select('*')
      .range(i, i + 999)
    changes.push(...res.data)

    i += 1000
  }

  return changes
}

async function getPeople(userIds: string[]) {
  const people = []
  const countRes = await supabase
    .from('people')
    .select('*', { count: 'exact', head: true })
    .in('id', userIds)
  const count = countRes.count || 0

  let i = 0;
  while (i < count) {
    let res = await supabase
      .from('people')
      .select('*')
      .in('id', userIds)
      .range(i, i + 999)
    people.push(...res.data)

    i += 1000
  }

  return people
}

interface PersonWithChanges {
  person: Person;
  changes: Change[];
  changeLength: number;
}

async function prepareData(): Promise<PersonWithChanges[]> {
  const changes = await getChanges()

  let userIds: string[] = []
  changes.forEach(change => {
    if (!userIds.includes(change.target_id)) userIds.push(change.target_id)
  })

  const people = await getPeople(userIds)

  return people.map(person => {
    const personChanges = changes.filter(change => change.target_id === person.id)
      .map(change => {
        return {
          id: change.id,
          first_name: change.first_name,
          last_name: change.last_name,
          sex: change.sex,
          age: change.age,
          birth_day: change.birth_day,
          date_of_death: change.date_of_death,
          home: change.home,
          location_of_death: change.location_of_death
        }
      })
    return {
      ...person,
      changes: personChanges,
      changeLength: personChanges.length
    }
  })
}

export default function Index() {
  const [peopleWithChanges, setPeopleWithChanges] = useState<PersonWithChanges[]>([])

  useEffect(() => {
    if (peopleWithChanges.length === 0) {
      prepareData().then(res => setPeopleWithChanges(res))
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(value: string) {
    setSearchTerm(value.toLowerCase());
  }

  async function acceptChange(change: Change) {
    let latestChangeRes = await supabase
      .from('people')
      .select('last_change')
      .eq("id", "a19e2fe0-da0b-46ed-8c15-0482de665114")
    const latestChange = latestChangeRes.data[0].last_change || 0

    const currentTime = Number(new Date());

    if (latestChange < currentTime) {
      const updatedPerson = {
        id: change.target_id,
        first_name: change.first_name,
        last_name: change.last_name,
        sex: change.sex,
        age: change.age,
        birth_day: change.birth_day,
        date_of_death: change.date_of_death,
        home: change.home,
        location_of_death: change.location_of_death,
        last_change: currentTime
      }
      const updateRes = await supabase
        .from('people')
        .update(updatedPerson)
        .eq('id', change.target_id)

      if (updateRes.status === 201) {
        const removeRes = await supabase
          .from('proposed_changes')
          .delete()
          .eq('id', change.id)

        const newChanges = [...peopleWithChanges];
        const entryIndex = newChanges.findIndex(entry => entry.person.id === change.target_id)

        newChanges[entryIndex] = {
          person: updatedPerson,
          changes: newChanges[entryIndex].changes.filter(entry => entry.id !== change.id),
          changeLength: newChanges[entryIndex].changeLength - 1
        }

        setPeopleWithChanges(newChanges)

        toast.success('Successfully added!');
      } else {
        toast.error('There was an error!');
      }
    }
  }

  async function denyChange(change: Change) {
    const removeRes = await supabase
      .from('proposed_changes')
      .delete()
      .eq('id', change.id)

    if (removeRes.status === 201) {
      const newChanges = [...peopleWithChanges];
      const entryIndex = newChanges.findIndex(entry => entry.person.id === change.target_id)

      newChanges[entryIndex] = {
        person: newChanges[entryIndex].person,
        changes: newChanges[entryIndex].changes.filter(entry => entry.id !== change.id),
        changeLength: newChanges[entryIndex].changeLength - 1
      }

      setPeopleWithChanges(newChanges)

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
                  </th>
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
                <tr className="hidden md:table-row">
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    <p className="text-gray-500">Old:</p>
                    <p className="text-gray-500">New:</p>
                  </th>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                    <p className="text-gray-500">Nahed Thabet Salman Al-Rafati</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-yellow-500">Nahed Thabet</p>
                      <div className="bg-yellow-500 w-4 h-4 rounded-full flex items-center justify-center">
                        <img src="/icons/circleArrow.svg" className="w-3 h-3 text-white" />
                      </div>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-500">________</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-green-500">Salman Al-Rafati</p>
                      <div className="bg-green-500 w-4 h-4 rounded-full flex items-center justify-center">
                        <img src="/icons/plus.svg" className="w-3 h-3 text-white" />
                      </div>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-500">male</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-gray-500">male</p>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-500">62</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-gray-500">62</p>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-500">17.12.1996</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-red-500">__________</p>
                      <div className="bg-red-500 w-4 h-4 rounded-full flex items-center justify-center">
                        <img src="/icons/minus.svg" className="w-3 h-3 text-white" />
                      </div>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-500">__________</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-gray-500">__________</p>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-500">__________</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-gray-500">__________</p>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <p className="text-gray-500">__________</p>
                    <span className="flex flex-row items-center space-x-4">
                      <p className="text-gray-500">__________</p>
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <p className="text-white">__________</p>
                    <a className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => acceptChange()}>
                      Accept
                    </a>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <p className="text-white">__________</p>
                    <a className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => { }}>
                      Deny
                    </a>
                  </td>
                </tr >
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

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}