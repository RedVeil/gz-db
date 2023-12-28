import Navbar from "@/components/Navbar";
import { BUTTON_LABEL, PAGE_SUBTITLE, PAGE_TITLE } from "@/lib/localization";
import { localizationAtom } from "@/lib/localization/state";
import { createClient } from "@supabase/supabase-js"
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const supabase = createClient('https://jqamrmyapfbelhmkcpvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYW1ybXlhcGZiZWxobWtjcHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQyOTgsImV4cCI6MjAxNzE4MDI5OH0.nusNDsT1mIZF1r5rFnjc6C_VlsCgbKtdSMOGD_MVgQU')

interface Report {
  id: string;
  report: string;
}

async function getReports() {
  const reports = []
  const countRes = await supabase
    .from('reports')
    .select('*', { count: 'exact', head: true })
  const count = countRes.count || 0

  let i = 0;
  while (i < count) {
    let res = await supabase
      .from('reports')
      .select('*')
      .range(i, i + 999)
    reports.push(...res.data as Report[])

    i += 1000
  }

  return reports
}

function ReportCell({ report, closeReport }: { report: Report, closeReport: (report: Report) => void }): JSX.Element {
  const [localization] = useAtom(localizationAtom);
  return (
    <div className="py-4 border-b border-gray-500">
      <p>{report.report}</p>
      <button
        type="button"
        className="block rounded-md bg-indigo-600 px-3 py-2 mt-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
        onClick={() => closeReport(report)}
      >
        {BUTTON_LABEL.close[localization]}
      </button>
    </div>
  )
}

export default function Index() {
  const [localization] = useAtom(localizationAtom);
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => { if (reports.length === 0) getReports().then(res => setReports(res)) }, [])

  async function closeReport(report: Report) {
    const newReports = [...reports]

    const removeRes = await supabase
      .from('reports')
      .delete()
      .eq('id', report.id)

    if (removeRes.status === 201 || removeRes.status === 204) {
      setReports(newReports.filter(r => r.id !== report.id))

      toast.success('Successfully removed!');
    } else {
      toast.error('There was an error!');
    }
  }

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">{PAGE_TITLE.reports[localization]}</h1>
            <p className="mt-2 text-sm text-gray-700">
              {PAGE_SUBTITLE.reports[localization]}
            </p>
          </div>
        </div>

        <div className="mt-8 flow-root">
          {/* DESKTOP TABLE */}
          <div className="hidden sm:block -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {reports.length > 0 && reports.map(report => <ReportCell key={report.id} report={report} closeReport={closeReport} />)}
            </div>
          </div>
        </div>

        {/* MOBILE TABLE */}
        <div className="sm:hidden -mx-4 -my-2">
          <div className="inline-block w-full py-2 align-middle">
            {reports.length > 0 && reports.map(report => <ReportCell key={report.id} report={report} closeReport={closeReport} />)}
          </div>
        </div>
      </div>
    </>
  )
}