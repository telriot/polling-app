import React from "react"
import { TYPES } from "./types"
import axios from "axios"

const initialState = {
  isAuthenticated: false,
  user: null,
}
const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case TYPES.SET_AUTH_STATE:
        return {
          ...state,
          isAuthenticated: action.isAuthenticated,
          user: action.isAuthenticated ? action.user : null,
        }
      default:
        return state
    }
  }
  const [state, dispatch] = React.useReducer(authReducer, initialState)

  const fetchAuth = async () => {
    try {
      const response = await axios.get("/api/auth/login/success")
      const { success, user } = response.data
      dispatch({
        type: TYPES.SET_AUTH_STATE,
        isAuthenticated: success,
        user,
      })
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchAuth()
  }, [])

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
function useAuthState() {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider")
  }
  return context
}
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider")
  }
  return context
}
export {
  AuthStateContext,
  AuthDispatchContext,
  AuthContextProvider,
  useAuthState,
  useAuthDispatch,
}
