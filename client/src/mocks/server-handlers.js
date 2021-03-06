import { rest } from "msw"

export const handlers = [
  rest.get("/api/polls/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          author: "test",
          title: "titolo",
          options: ["a", "b"],
          results: { canidi: 1, gattidi: 2 },
          votes: 3,
        },
        {
          author: "test",
          title: "titolo2",
          options: ["a", "b"],
          results: { canidi: 1, gattidi: 2 },
          votes: 3,
        },
      ])
    )
  }),
  rest.get("/api/users/polls/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          author: "test",
          title: "titolo",
          options: ["a", "b"],
          results: { canidi: 1, gattidi: 2 },
          votes: 3,
        },
        {
          author: "test",
          title: "titolo2",
          options: ["a", "b"],
          results: { canidi: 1, gattidi: 2 },
          votes: 3,
        },
      ])
    )
  }),
  rest.post("/api/polls/new", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Poll successfully created",
        pollId: "123456789",
      })
    )
  }),
  rest.get("/api/polls/:pollId", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        author: "test",
        title: "titolo",
        options: ["option1", "option2"],
        results: { canidi: 1, gattidi: 2 },
        votes: 3,
      })
    )
  }),
  rest.put("/api/polls/vote/:pollId", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "We got your vote!",
      })
    )
  }),
]
