import { setupServer } from "msw/node"
import { handlers } from "./server-handlers"
import { rest } from "msw"

const server = setupServer(...handlers)
export { server, rest }
