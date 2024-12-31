interface UserInfo {
  id: string
  username: string
  password: string
  realName: string
  roleId: string
}

const userTable: UserInfo[] = [
  {
    id: 'user:Super',
    username: 'super',
    password: '123456',
    realName: 'Super',
    roleId: 'role:super'
  },
  {
    id: 'user:Admin',
    username: 'admin',
    password: '123456',
    realName: 'Admin',
    roleId: 'role:super'
  },
  {
    id: 'user:User',
    username: 'user',
    password: '123456',
    realName: 'User',
    roleId: 'role:user'
  }
]

export { userTable, type UserInfo }
