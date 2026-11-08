type User = {
  email: string
  pass: string
  name: string
  role: string
  other: string
}

const users: User[] = [
  {
    email: 'jame@gmail.com',
    pass: '123',
    name: 'jame',
    role: 'admin 1',
    other: ''
  },
  {
    email: 'hona@gmail.com',
    pass: '1234',
    name: 'hona',
    role: 'admin 2',
    other: ''
  },
  {
    email: 'bye@gmail.com',
    pass: '12345',
    name: 'bye',
    role: 'admin 3',
    other: ''
  }
]

export type Credential = {
  token: string
  email: string
  name: string
  role: string

}

export const login = (email: string, pass: string): Promise<Credential> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.8) {
        const user = users.find((u) => u.email === email && u.pass === pass)
        if (user === undefined) {
          reject('user not found')
          return
        }

        const newCredential: Credential = {
          token: crypto.randomUUID(),
          email: user.email,
          name: user.name,
          role: user.role,
        }

        // store credential
        resolve(newCredential)
      } else {
        reject('connection refused')
      }
    }, 1000 + Math.random() * 2000)
  })
}

export const logout = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.8) {
        // remove credential
        resolve('success')
      } else {
        reject('connection refused')
      }
    }, 1000 + Math.random() * 2000)
  })
}