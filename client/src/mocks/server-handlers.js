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
]
