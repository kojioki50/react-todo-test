import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DragDrop } from "../drag&drop/DragDrop";
import { Button } from "../button/Button";

describe("dnd test", () => {
  // ボタン押下時に戻る関数が実行されること
  test("ボタン押下時に関数実行", async () => {
    const clickFn = jest.fn();
    render(<Button onClick={clickFn}>戻る</Button>);
    const button = screen.getByText("戻る");
    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  test("renders App Component", () => {
    render(
      <BrowserRouter>
        <DragDrop />
      </BrowserRouter>
    );
    const lists = screen.getAllByRole("listItem");
    const penne1 = lists.indexOf(lists[0]);
    const pennePosition = lists.indexOf(lists[3]);

    const [reorderedItem] = lists.splice(penne1, 1);
    screen.debug([reorderedItem]);
    lists.splice(pennePosition, 0, reorderedItem);
    expect(lists[0].textContent).toEqual("ペンネ２");
    expect(lists[3].textContent).toEqual("ペンネ１");
  });
});
