import { fireEvent, render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Button } from "../button/Button";
import { UserInfoProvider } from "../provider/UserInfoProvider";
import { Todo } from "../todo/Todo";

// 追加ボタンが非活性
describe("Todoコンポーネントテスト", () => {
  afterEach(() => cleanup);
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn().mockImplementation((query) => ({
      matches: true,
    })),
  });

  // ボタン押下時に追加関数が実行されること
  test("ボタン押下時に関数実行", () => {
    const clickFn = jest.fn();
    render(<Button onClick={clickFn}>決定箱のデータ取得</Button>);
    const button = screen.getByText("決定箱のデータ取得");
    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  // ボタン押下時に決定箱のデータ取得関数が実行されること
  test("ボタン押下時に関数実行", () => {
    const clickFn = jest.fn();
    render(<Button onClick={clickFn}>決定箱のデータ取得</Button>);
    const button = screen.getByText("決定箱のデータ取得");
    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  // ボタン押下時に戻る関数が実行されること
  test("ボタン押下時に関数実行", async () => {
    const clickFn = jest.fn();
    render(<Button onClick={clickFn}>戻る</Button>);
    const button = screen.getByText("戻る");
    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  /* todo */
  test("render", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <UserInfoProvider>
            <Todo />
          </UserInfoProvider>
        </BrowserRouter>
      </RecoilRoot>
    );

    /* 追加ボタンの初期状態はdisabledであるか */
    const button = screen.getByText("追加");
    expect(button).toBeDisabled();

    /* inputで「hoge」を入力してdisabledでは無くなるか */
    const input = screen.getByRole("textbox");
    userEvent.type(input, "hoge");
    expect(button).not.toBeDisabled();

    /* inputで「hoge」を入力して未決定箱リストに追加されているか */
    fireEvent.click(screen.getByText("追加"));
    let listItem = screen.getAllByRole("listitem");
    expect(listItem[listItem.length - 1].textContent).toEqual("hoge");

    /* inputで「hogehoge」を入力して未決定箱リストに追加されているか */
    userEvent.type(input, "hogehoge");
    fireEvent.click(screen.getByText("追加"));
    const listItem2 = screen.getAllByRole("listitem");
    expect(listItem2[listItem2.length - 1].textContent).toEqual("hogehoge");

    /* 「hoge」の決定ボタンを押して決定箱リストに追加 */
    fireEvent.click(screen.getAllByText("決定")[listItem.length - 1]);
    listItem = screen.getAllByRole("listitem");
    expect(listItem[listItem.length - 1].textContent).toEqual("hoge");

    /* 「hoge」の保留ボタンを押して決定箱リストに追加 */
    fireEvent.click(screen.getByText("保留"));
    listItem = screen.getAllByRole("listitem");
    expect(listItem[listItem.length - 1].textContent).toEqual("hoge");

    /* 「hoge」の却下ボタンを押して削除決定箱リストの配列数が減っている残っているのは「hogehoge」 */
    fireEvent.click(screen.getAllByText("却下")[listItem.length - 1]);
    let listItemAfter = screen.queryAllByRole("listitem");
    expect(listItem.length).toBeGreaterThan(listItemAfter.length);
    expect(screen.getAllByRole("listitem")).toHaveLength(listItem.length - 1);
    listItemAfter = screen.getAllByRole("listitem");
    expect(listItemAfter[listItemAfter.length - 1].textContent).toEqual(
      "hogehoge"
    );
  });
});
