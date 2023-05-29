export const strToObj = (str) => {
   let obj = {}
   if (str && typeof str === "string") {
      let objStr = str.match(/\{(.)+\}/g)
      eval("obj =" + objStr)
   }
   return obj
}

export const specialTyTypes = [
   "General",
   "Cardiology",
   "Dermatology",
   "Endocrinology",
   "Gastroenterology",
   "Gynecology",
   "Hematology",
   "Hepatology",
   "Neurology",
   "Neurosurgery",
   "Nephrology",
   "Oncology",
   "Ophthalmology",
   "Orthopedics",
   "Otolaryngology",
   "Pediatrics",
   "Pulmonology",
   "Radiology",
   "Rheumatology",
   "Urology",
   "Vascular",
]

export const specialtyFormat = [
   { value: 0, label: "General" },
   { value: 1, label: "Cardiology" },
   { value: 2, label: "Dermatology" },
   { value: 3, label: "Endocrinology" },
   { value: 4, label: "Gastroenterology" },
   { value: 5, label: "Gynecology" },
   { value: 6, label: "Hematology" },
   { value: 7, label: "Hepatology" },
   { value: 8, label: "Neurology" },
   { value: 9, label: "Neurosurgery" },
   { value: 10, label: "Nephrology" },
   { value: 11, label: "Oncology" },
   { value: 12, label: "Ophthalmology" },
   { value: 13, label: "Orthopedics" },
   { value: 14, label: "Otolaryngology" },
   { value: 15, label: "Pediatrics" },
   { value: 16, label: "Pulmonology" },
   { value: 17, label: "Radiology" },
   { value: 18, label: "Rheumatology" },
   { value: 19, label: "Urology" },
   { value: 20, label: "Vascular" },
]
