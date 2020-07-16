import React from "react"
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { AuthStateContext } from "../../contexts/authContext"
import { server, rest } from "../../mocks/server"

import NewPoll from "./NewPoll"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

afterEach(cleanup)

let authState = {
  isAuthenticated: true,
  user: "test",
}
describe("NewPoll tests", () => {
  let getAllByText, getByTestId, getByLabelText, queryByText, getByText

  beforeEach(() => {
    return ({
      getAllByText,
      getByTestId,
      getByLabelText,
      queryByText,
      getByText,
    } = render(
      <AuthStateContext.Provider value={authState}>
        <NewPoll />
      </AuthStateContext.Provider>
    ))
  })
  test("NewPoll renders successfully", () => {
    expect(getByTestId("component-newpoll")).toBeDefined()
  })
  test("Submit button is disabled if !title or !options", () => {
    expect(getByTestId("submit-button")).toBeDisabled()
  })

  describe("If option is present", () => {
    let titleInput, newOptionInput, addOptionButton, submitButton

    beforeEach(() => {
      titleInput = getByLabelText("Title")
      newOptionInput = getByLabelText("New Option")
      addOptionButton = getByTestId("add-option-button")
      submitButton = getByTestId("submit-button")
      fireEvent.change(titleInput, { target: { value: "test" } })
      fireEvent.change(newOptionInput, { target: { value: "test" } })
      fireEvent.click(addOptionButton)
    })
    test("Submit button !disabled if title && options", () => {
      expect(submitButton).not.toBeDisabled()
    })
    test("Options render correctly after add click", () => {
      fireEvent.change(newOptionInput, { target: { value: "toast" } })
      fireEvent.click(addOptionButton)
      expect(queryByText("test")).toBeInTheDocument()
      expect(queryByText("toast")).toBeInTheDocument()
    })
    test("Click on delete button removes the selected option", () => {
      const option = queryByText("test")
      expect(option).toBeInTheDocument()
      fireEvent.click(getByTestId("poll-option-delete"))
      expect(option).not.toBeInTheDocument()
    })
    test("Succesfully submitting a poll opens a link to visit it", async () => {
      fireEvent.click(submitButton)
      await waitFor(() =>
        expect(getByText(/visit your poll/gi)).toBeInTheDocument()
      )
    })
    test("Succesfully submitting a poll opens a confirmation alert", async () => {
      fireEvent.click(submitButton)
      await waitFor(() =>
        expect(getByText(/poll successfully created/gi)).toBeInTheDocument()
      )
    })
    test("Alerts get cleared on option change", async () => {
      fireEvent.click(submitButton)
      await waitFor(() =>
        expect(getByText(/poll successfully created/gi)).toBeInTheDocument()
      )
      fireEvent.change(titleInput, { target: { value: "test" } })
      expect(queryByText(/poll successfully created/gi)).not.toBeInTheDocument
    })
    test("Failed post submission results in failure alert", async () => {
      server.use(
        rest.post("/api/polls/new", (req, res, ctx) => {
          return res(ctx.status(500), ctx.json("Something went wrong"))
        })
      )
      fireEvent.click(submitButton)
      await waitFor(() =>
        expect(getByText(/something went wrong/gi)).toBeInTheDocument()
      )
    })
  })
})
