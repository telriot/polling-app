import React from "react"
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { server, rest } from "../../mocks/server"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import PollDetail from "./PollDetail"
import { AuthStateContext } from "../../contexts/authContext"
import useResizeObserver from "../../hooks/useResizeObserver"
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
afterEach(cleanup)

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ pollId: "5f0ef40a4b502d0cb96882ee" }),
}))

jest.mock("../../hooks/useResizeObserver")
describe("PollDetail tests", () => {
  useResizeObserver.mockReturnValue({
    bottom: 354,
    height: 354,
    left: 0,
    right: 520,
    top: 0,
    width: 520,
    x: 0,
    y: 0,
  })
  const history = createMemoryHistory()
  const route = "/5f0ef40a4b502d0cb96882ee"
  history.push(route)
  let authState = {
    isAuthenticated: true,
    user: "test",
  }
  let getByTestId, getByText, queryByTestId

  beforeEach(() => {
    return ({ getByTestId, getByText, queryByTestId } = render(
      <Router history={history}>
        <AuthStateContext.Provider value={authState}>
          <PollDetail />
        </AuthStateContext.Provider>
      </Router>
    ))
  })

  test("PollDetail renders successfully", () => {
    expect(getByTestId("component-polldetail")).toBeInTheDocument()
  })
  test("Spinner shows when loading", () => {
    expect(getByTestId("spinner")).toBeInTheDocument()
  })
  test("Spinner disappears after loading", async () => {
    await waitForElementToBeRemoved(() => queryByTestId("spinner"))
  })

  describe("Tests after data render", () => {
    beforeEach(async () => {
      await waitForElementToBeRemoved(() => queryByTestId("spinner"))
    })
    test("Title renders correctly", async () => {
      expect(getByText(/titolo/)).toBeInTheDocument()
    })
    test("Clicking on select renders the right set of options", async () => {
      fireEvent.mouseDown(getByTestId("options-select"))
      await waitFor(() => {
        expect(getByText(/option1/)).toBeInTheDocument()
        expect(getByText(/option2/)).toBeInTheDocument()
        expect(getByText(/new option/)).toBeInTheDocument()
      })
    })
    test("Submit is disabled if no option is selected", async () => {
      expect(getByTestId("submit-button")).toBeDisabled()
    })
    test("Submit is not disabled if valid option is selected", async () => {
      fireEvent.mouseDown(getByTestId("options-select"))
      await waitFor(() => {
        fireEvent.click(getByText(/option1/))
      })
      expect(getByTestId("submit-button")).not.toBeDisabled()
    })
    test("Submit is  disabled if new option is selected and input is empty", async () => {
      fireEvent.mouseDown(getByTestId("options-select"))
      await waitFor(() => {
        fireEvent.click(getByText(/new option/))
      })
      expect(getByTestId("submit-button")).toBeDisabled()
    })
    test("Submit is not disabled if new option is selected and input is present", async () => {
      fireEvent.mouseDown(getByTestId("options-select"))
      await waitFor(() => {
        fireEvent.click(getByText(/new option/))
      })
      await waitFor(() => {
        fireEvent.change(getByTestId("new-option-field"), {
          target: { value: "test" },
        })
      })
      expect(getByTestId("submit-button")).not.toBeDisabled()
    })

    describe("On submission", () => {
      test("On success onfirmation alert pops out", async () => {
        fireEvent.mouseDown(getByTestId("options-select"))
        await waitFor(() => {
          fireEvent.click(getByText(/option1/))
        })
        expect(getByTestId("submit-button")).not.toBeDisabled()
        fireEvent.click(getByTestId("submit-button"))
        await waitFor(() =>
          expect(getByText(/we got your vote/gi)).toBeInTheDocument()
        )
      })
      test("On failure confirmation alert pops out", async () => {
        server.use(
          rest.put("/api/polls/vote/:pollId", (req, res, ctx) => {
            return res(ctx.status(500), ctx.json("Something went wrong"))
          })
        )
        fireEvent.mouseDown(getByTestId("options-select"))
        await waitFor(() => {
          fireEvent.click(getByText(/option1/))
        })
        expect(getByTestId("submit-button")).not.toBeDisabled()
        fireEvent.click(getByTestId("submit-button"))
        await waitFor(() =>
          expect(getByText(/something went wrong/gi)).toBeInTheDocument()
        )
      })
    })
  })
})
