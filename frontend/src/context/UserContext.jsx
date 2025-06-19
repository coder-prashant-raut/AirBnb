import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthDataContext } from "./AuthContext.jsx";


export const userDataContext = createContext()

function UserContext({ children }) {
   let { serverUrl } = useContext(AuthDataContext)

 
  const [userData, setUserData] = useState(null)

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, { withCredentials: true })
      setUserData(result.data)

console.log(result.data);

    } catch (error) {
      console.log("Current serverUrl:", serverUrl);

      setUserData(null)
      console.error(error)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, []) // ← Add dependency array to avoid multiple calls

  const value = {
    userData,
    setUserData
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
