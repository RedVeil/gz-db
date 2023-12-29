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
    eng: `Since the israeli attacks on palestinans in gaza and the westbank countless people lost there lives. 
    With the incredible amount of suffering going on these deaths just become an anonymous number. One in hundreds. A statistic. 
    The goal of this project is to create an archive for each and every palestinian that has died directly through or following israli attacks.
    The dead shouldnt just be an anonymous number but be remembered as the people that they were and hopefully this data can help to give them a face.
    `,
    arabic: "منذ الهجمات الإسرائيلية على الفلسطينيين في غزة والضفة الغربية ، فقد عدد لا يحصى من الناس أرواحهم. مع كمية لا تصدق من المعاناة التي تحدث هذه الوفيات تصبح مجرد رقم مجهول. واحد في المئات. إحصائية. الهدف من هذا المشروع هو إنشاء أرشيف لكل فلسطيني مات مباشرة خلال أو بعد الهجمات الإسرائيلية. لا ينبغي أن يكون الموتى مجرد رقم مجهول ولكن يجب تذكرهم على أنهم الأشخاص الذين كانوا عليهم ونأمل أن تساعد هذه البيانات في منحهم وجها."
  },
  proposedPeople: {
    eng: "Accept or deny the addition of new people to the archive.",
    arabic: "قبول أو رفض إضافة أشخاص جدد إلى الأرشيف."
  },
  reports: {
    eng: "Reports, comments and other messages",
    arabic: "التقارير والتعليقات والرسائل الأخرى"
  }
}

type OtherLabel = {
  search: LocalizedTerm;
  comment: LocalizedTerm;
  download: LocalizedTerm;
  methodology: LocalizedTerm;
}

export const OTHER_LABEL: OtherLabel = {
  search: {
    eng: "Search...",
    arabic: "بحث..."
  },
  comment: {
    eng: "Report / Comment...",
    arabic: "تقرير / تعليق..."
  },
  download: {
    eng: "Download current table",
    arabic: "تحميل الجدول الحالي"
  },
  methodology: {
    eng: `The original data for this project comes from a list published by the palestinian ministry of health. 
    Now anyone can add new people to this list to commemorate friends, family and neighbors to make sure that no one gets forgotten. 
    Since this could be missued to spread disinformation or hate each submission must be verified and accepted by a network of trusted of palestinians and other helpers.
    New helpers can only be added if already existing ones vouch for them.
    If you have any questions, comments or want to join the project to verify people aswell please leave a report / comment.`,
    arabic: "تأتي البيانات الأصلية لهذا المشروع من قائمة نشرتها وزارة الصحة الفلسطينية. الآن يمكن لأي شخص إضافة أشخاص جدد إلى هذه القائمة لإحياء ذكرى الأصدقاء والعائلة والجيران للتأكد من عدم نسيان أي شخص. وبما أن هذا يمكن أن يكون لنشر معلومات مضللة أو كراهية، يجب التحقق من كل طلب وقبوله من قبل شبكة من الفلسطينيين الموثوق بهم وغيرهم من المساعدين. لا يمكن إضافة مساعدين جدد إلا إذا كان المساعدون الحاليون يشهدون لهم. إذا كان لديك أي أسئلة أو تعليقات أو ترغب في الانضمام إلى المشروع للتحقق من الأشخاص أيضا ، فيرجى ترك تقرير / تعليق."
  },
}
