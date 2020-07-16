import React from "react"
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { AuthStateContext } from "../../contexts/authContext"
import { server } from "../../mocks/server"

import MyPolls from "./MyPolls"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

afterEach(cleanup)

let authState = {
  isAuthenticated: true,
  user: "test",
}
describe("Landing tests", () => {
  let getByTestId, getByText, queryByTestId, getAllByText, getByRole
  beforeEach(() => {
    return ({
      getByTestId,
      getByText,
      getAllByText,
      queryByTestId,
      getByRole,
    } = render(
      <AuthStateContext.Provider value={authState}>
        <MyPolls />
      </AuthStateContext.Provider>
    ))
  })
  test("Landing renders successfully", () => {
    expect(getByTestId("component-mypolls")).toBeDefined()
  })
  test("Title renders correctly", () => {
    expect(getByText(/Polling App/)).toBeDefined()
  })
  test("Spinner shows when loading", () => {
    expect(getByTestId("spinner")).toBeDefined()
  })
  test("Spinner disappears after loading", async () => {
    await waitForElementToBeRemoved(() => queryByTestId("spinner"))
  })
  test("The right number of polls shows after loading", async () => {
    await waitFor(() => {
      expect(getAllByText(/titolo/)).toHaveLength(2)
    })
  })
})
