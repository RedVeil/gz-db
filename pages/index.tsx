import SearchBar from "@/components/SearchBar";
import Sorting, { SortingItem } from "@/components/Sorting";
import { useEffect, useState } from "react";
import PersonCell from "@/components/PersonCell"
import type { Person } from "@/lib/types";
import MobileModal from "@/components/modal/MobileModal";
import AddPerson from "@/components/AddPerson";
import { createClient } from "@supabase/supabase-js";
import NoSSR from "react-no-ssr";
import Report from "@/components/Report";

const SORTING_ITEMS: SortingItem[] = [
  {
    label: "Sort Sample",
    onClick: () => { },
    active: false
  },
]

const supabase = createClient('https://jqamrmyapfbelhmkcpvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYW1ybXlhcGZiZWxobWtjcHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQyOTgsImV4cCI6MjAxNzE4MDI5OH0.nusNDsT1mIZF1r5rFnjc6C_VlsCgbKtdSMOGD_MVgQU')

async function getPeople() {
  const people = []
  const countRes = await supabase
    .from('people')
    .select('*', { count: 'exact', head: true })
  const count = countRes.count || 0

  let i = 0;
  while (i < count) {
    let res = await supabase
      .from('people')
      .select('*')
      .range(i, i + 999)
    people.push(...res.data)

    i += 1000
  }

  return people
}

const EMPTY_PERSON = {
  id: "",
  first_name: "",
  last_name: "",
  sex: "",
  age: 0,
  birth_day: 0,
  date_of_death: 0,
  home: "",
  location_of_death: "",
  last_change: 0
}

export default function Index(): JSX.Element {
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => { if (people.length === 0) getPeople().then(res => setPeople(res)) }, [])

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(value: string) {
    setSearchTerm(value.toLowerCase());
  }

  const [showProposeModal, setShowProposeModal] = useState<boolean>(false)
  const [proposeModalData, setProposeModalData] = useState<Person>(EMPTY_PERSON)
  const [proposeModalTableName, setProposeModalTableName] = useState<"proposed_changes" | "proposed_people">("proposed_people")

  function closeProposeModal() {
    setShowProposeModal(false)
  }

  function showProposePersonModal() {
    setProposeModalData(EMPTY_PERSON);
    setProposeModalTableName("proposed_people")
    setShowProposeModal(true)
  }

  function showProposeChangesModal(person: Person) {
    setProposeModalData(person);
    setProposeModalTableName("proposed_changes")
    setShowProposeModal(true)
  }

  const [showReportModal, setShowReportModal] = useState<boolean>(false)
  const [reportModalData, setReportModalData] = useState<string | undefined>(undefined)
  const [reportModalTableName, setReportModalTableName] = useState<"reports" | "people_reports">("reports")

  function closeReportModal() {
    setShowReportModal(false)
  }

  function showReportAndFeedbackModal() {
    setReportModalData(undefined);
    setReportModalTableName("reports")
    setShowReportModal(true)
  }

  function showReportPersonModal(person: Person) {
    setReportModalData(person.id);
    setReportModalTableName("people_reports")
    setShowReportModal(true)
  }

  return (
    <>
      <AddPerson
        visible={showProposeModal}
        onClosePopUpModal={closeProposeModal}
        supabase={supabase}
        tableName={proposeModalTableName}
        person={proposeModalData}
      />
      <Report
        visible={showReportModal}
        onClosePopUpModal={closeReportModal}
        supabase={supabase}
        tableName={reportModalTableName}
        targetId={reportModalData}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">People</h1>
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
          <span className="flex flex-row items-center space-x-4">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
              onClick={() => showProposePersonModal()}
            >
              Add Person
            </button>
            <button
              type="button"
              className="block rounded-md bg-yellow-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:bg-gray-500"
              onClick={() => showReportAndFeedbackModal()}
            >
              Report & Feedback
            </button>
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
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Report</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.length > 0 && people.map((person) =>
                    <PersonCell
                      key={person.id}
                      person={person}
                      searchTerm={searchTerm}
                      mainAction={{ label: "Edit", handleAction: showProposeChangesModal }}
                      secondaryAction={{ label: "Edit", handleAction: showReportPersonModal }}
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
                      mainAction={{ label: "Edit", handleAction: showProposeChangesModal }}
                      secondaryAction={{ label: "Edit", handleAction: showReportPersonModal }}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}