import { LocalizedTerm } from "../types"

type TableTitle = {
  name: LocalizedTerm;
  sex: LocalizedTerm;
  age: LocalizedTerm;
  person: LocalizedTerm;
}

export const TABLE_TITLE: TableTitle = {
  name: {
    eng: "Name",
    arabic: "اسم"
  },
  sex: {
    eng: "Sex",
    arabic: "جنس"
  },
  age: {
    eng: "Age",
    arabic: "عمر"
  },
  person: {
    eng: "Person",
    arabic: "شخص"
  },
}

type ButtonLabel = {
  accept: LocalizedTerm;
  deny: LocalizedTerm;
  addPerson: LocalizedTerm;
  comment: LocalizedTerm;
  pagination: LocalizedTerm;
  submit: LocalizedTerm;
  close: LocalizedTerm;
}

export const BUTTON_LABEL: ButtonLabel = {
  accept: {
    eng: "Accept",
    arabic: "تقبل"
  },
  deny: {
    eng: "Deny",
    arabic: "أنكر"
  },
  addPerson: {
    eng: "Add Person",
    arabic: "إضافة شخص"
  },
  comment: {
    eng: "Report / Comment",
    arabic: "تقرير / تعليق"
  },
  pagination: {
    eng: "Load More",
    arabic: "عرض المزيد"
  },
  submit: {
    eng: "Submit",
    arabic: "إرسال"
  },
  close: {
    eng: "Close",
    arabic: "غلق"
  },
}

type PageLocalization = {
  people: LocalizedTerm;
  proposedPeople: LocalizedTerm;
  reports: LocalizedTerm;
}

export const PAGE_TITLE: PageLocalization = {
  people: {
    eng: "People",
    arabic: "شعب"
  },
  proposedPeople: {
    eng: "Proposed People",
    arabic: "الأشخاص المقترحين"
  },
  reports: {
    eng: "Reports / Comments",
    arabic: "التقارير / التعليقات"
  }
}

export const PAGE_SUBTITLE: PageLocalization = {
  people: {
    eng: "",
    arabic: ""
  },
  proposedPeople: {
    eng: "",
    arabic: ""
  },
  reports: {
    eng: "",
    arabic: ""
  }
}

type OtherLabel = {
  search: LocalizedTerm;
  comment: LocalizedTerm;
}

export const OTHER_LABEL: OtherLabel = {
  search: {
    eng: "Search...",
    arabic: "بحث..."
  },
  comment: {
    eng: "Report / Comment...",
    arabic: "تقرير / تعليق..."
  }
}
