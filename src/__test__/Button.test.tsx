import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../button/Button";


describe("Button Test", () => {
  afterEach(() => cleanup());
  test("render", () => {
    render(
      <Button disabled={false}  onClick={() => jest.fn()}>
        ボタン
      </Button>
    );
    expect(screen.getByRole("button")).toBeTruthy();
  });
  // ボタン押下時に関数が実行されること
  test("ボタン押下時に関数実行", () => {
    const clickFn = jest.fn();
    render(
      <Button disabled={false} onClick={clickFn}>
        ボタン
      </Button>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
  // 非活性になること
  test("非活性になること", () => {
    render(
      <Button disabled onClick={() => jest.fn()}>
        ボタン
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
