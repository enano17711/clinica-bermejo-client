import { faker } from "@faker-js/faker"

let dataDep = []
const createDepartments = () => {
   for (let i = 0; i < 15; i++) {
      dataDep.push({
         id: faker.datatype.uuid(),
         name: faker.commerce.department(),
         description: faker.company.bs(),
         createdDate: faker.date
            .birthdate({
               min: 2000,
               max: 2023,
               mode: "year"
            })
            .toString(),
         updatedDate: faker.date
            .birthdate({
               min: 2000,
               max: 2023,
               mode: "year"
            })
            .toString()
      })
   }
}
createDepartments()
export default dataDep
