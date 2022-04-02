import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import { useTodo } from "../hooks/hook1";

// モック用のサーバーセットアップ
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { userid: 1, id: 1, title: "user1", completed: false },
        { userid: 2, id: 2, title: "user2", completed: true },
      ])
    );
  })
)

// テスト前にサーバー起動
beforeAll(() => server.listen())

// テスト毎cleanup
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

// テスト後にサーバーを落とす
afterAll(() => server.close())

describe('useTodo Test', () => {
  test('fetch関数を実行してユーザーが取得されること', async () => {
    const { result } = renderHook(() => useTodo())
    expect(result.current.users).toHaveLength(0)

    await act(async () => {
      await result.current.fetch()
    })
    expect(result.current.users).toHaveLength(2)
  })
})

