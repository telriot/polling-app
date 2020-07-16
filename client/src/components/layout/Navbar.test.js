import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { AuthStateContext } from "../../contexts/authContext"
import Navbar from "./Navbar"
import { MemoryRouter } from "react-router-dom"

describe("Landing tests", () => {
  describe("Logged in", () => {
    let authState = {
      isAuthenticated: true,
      user: "test",
    }
    let getByText, getByRole
    beforeEach(() => {
      return ({ getByText, getByRole } = render(
        <AuthStateContext.Provider value={authState}>
          <Navbar />
        </AuthStateContext.Provider>,
        { wrapper: MemoryRouter }
      ))
    })
    test("Title renders successfully", () => {
      expect(getByText(/Polling App/)).toBeDefined()
    })
    test("Menu button renders successfully", () => {
      expect(getByRole("button")).toBeDefined()
    })
    test("Menu to have multiple choices when logged in", () => {
      const menuButton = getByRole("button")
      fireEvent.click(menuButton)
      expect(getByText(/Logout/)).toBeDefined()
      expect(getByText(/My Polls/)).toBeDefined()
      expect(getByText(/New Polls/)).toBeDefined()
    })
  })
  describe("logged out", () => {
    let authState = {
      isAuthenticated: false,
      user: null,
    }
    let getByText, getByRole
    beforeEach(() => {
      return ({
        getByText,

        getByRole,
      } = render(
        <AuthStateContext.Provider value={authState}>
          <Navbar />
        </AuthStateContext.Provider>,
        { wrapper: MemoryRouter }
      ))
    })
    test("Menu to have login option", () => {
      const menuButton = getByRole("button")
      fireEvent.click(menuButton)
      expect(getByText(/Login/)).toBeDefined()
    })
  })
})
