import { userTable } from './_user.ts'
import { roleTable } from './_role.ts'
import { menuTable } from './_menu.ts'

const db = {
  user: userTable,
  role: roleTable,
  menu: menuTable
}

export default db
