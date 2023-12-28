import SearchBar from "@/components/SearchBar";
import Sorting, { SortingItem } from "@/components/Sorting";
import { useEffect, useState } from "react";
import PersonCell from "@/components/PersonCell"
import type { Index, Person } from "@/lib/types";
import MobileModal from "@/components/modal/MobileModal";
import AddPerson from "@/components/AddPerson";
import { createClient } from "@supabase/supabase-js";
import NoSSR from "react-no-ssr";
import Report from "@/components/Report";
import { BUTTON_LABEL, PAGE_SUBTITLE, PAGE_TITLE, TABLE_TITLE } from "@/lib/localization";
import { localizationAtom } from "@/lib/localization/state";
import { useAtom } from "jotai";
import Navbar from "@/components/Navbar";

const SORTING_ITEMS: SortingItem[] = [
  {
    label: "Sort Sample",
    onClick: () => { },
    active: false
  },
]

const supabase = createClient('https://jqamrmyapfbelhmkcpvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYW1ybXlhcGZiZWxobWtjcHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQyOTgsImV4cCI6MjAxNzE4MDI5OH0.nusNDsT1mIZF1r5rFnjc6C_VlsCgbKtdSMOGD_MVgQU')

async function getPeople({ start, end, people }: { start: number, end: number, people: Person[] }) {
  const countRes = await supabase
    .from('people')
    .select('*', { count: 'exact', head: true })
  const count = countRes.count || 0

  let res = await supabase
    .from('people')
    .select('*')
    .range(start, end > count ? count : end)
  people.push(...res.data as Person[])

  return people
}

const EMPTY_PERSON = {
  id: "",
  name: "",
  sex: "",
  age: "",
}

export default function Index(): JSX.Element {
  const [localization] = useAtom(localizationAtom);
  const [people, setPeople] = useState<Person[]>([])
  const [index, setIndex] = useState<Index>({ start: 0, end: 99 })

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
        .from('people')
        .select('*')
        .ilike('name', `%${value}%`)
      setPeople(res.data as Person[])
    }
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
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">{PAGE_TITLE.people[localization]}</h1>
            <p className="mt-2 text-sm text-gray-700">
              {PAGE_SUBTITLE.people[localization]}
            </p>
          </div>
        </div>

        <div className="md:flex md:flex-row md:items-center md:justify-between mt-4">
          <div>
            <SearchBar handleSearch={handleSearch} />
            {/* <Sorting sortingItems={SORTING_ITEMS} /> */}
          </div>
          <div className="flex flex-row items-center space-x-4 mt-4 md:mt-0">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
              onClick={() => showProposePersonModal()}
            >
              {BUTTON_LABEL.addPerson[localization]}
            </button>
            <button
              type="button"
              className="block rounded-md bg-yellow-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:bg-gray-500"
              onClick={() => showReportAndFeedbackModal()}
            >
              {BUTTON_LABEL.comment[localization]}
            </button>
          </div>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {people.length > 0 && people.map((person) =>
                    <PersonCell
                      key={`desktop-${person.id}`}
                      person={person}
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
                      key={`mobile-${person.id}`}
                      person={person}
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

      </div>
    </>
  )
}