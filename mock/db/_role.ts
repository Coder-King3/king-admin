interface RoleInfo {
  id: string
  name: string
  intro: string
  access: string[]
}

const roleTable: RoleInfo[] = [
  {
    id: 'role:super',
    name: 'super',
    intro: '拥有所有权限',
    access: [
      'directory:1',
      'menu:1_1',
      'menu:1_2',
      'directory:2',
      'directory:2_1',
      'menu:2_1_1',
      'menu:2_1_2',
      'menu:2_1',
      'button:2_4',
      'button:2_5',
      'button:2_6',
      'button:2_7',
      'button:2_8'
    ]
  },
  {
    id: 'role:admin',
    name: 'admin',
    intro: '拥有管理员权限',
    access: [
      'directory:1',
      'menu:1_1',
      'menu:1_2',
      'directory:2',
      'directory:2_1',
      'menu:2_1_1',
      'menu:2_1_2',
      'menu:2_2',
      'button:2_4',
      'button:2_5',
      'button:2_6',
      'button:2_7'
    ]
  },
  {
    id: 'role:user',
    name: 'user',
    intro: '拥有部分权限',
    access: [
      'directory:1',
      'menu:1_1',
      'menu:1_2',
      'directory:2',
      'directory:2_1',
      'menu:2_1_1',
      'menu:2_1_2',
      'menu:2_3',
      'button:2_4',
      'button:2_5'
    ]
  }
]

export { roleTable, type RoleInfo }
