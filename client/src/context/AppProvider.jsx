import React from 'react'
import { UserProvider } from './userContext'
function AppProvider({children}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}

export default AppProvider