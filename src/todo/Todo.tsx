/* eslint-disable no-nested-ternary */
import {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import "./todo.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "../button/Button";
import { useTodo } from "../hooks/hook1";
import { UserInfoContext } from "../provider/UserInfoProvider";
import { UserState } from "../recoile/userState";

export const Todo = () => {
  const [definiteTodos, setDefiniteTodos] = useRecoilState(UserState);
  const [indefiniteTodos, setindefiniteTodos] = useState<string[]>([]);
  const {userInfo, setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const onClickBack: () => void = useCallback(() => {
    navigate(-1);
  }, []);
  const [textInput, setTextInput] = useState<string>('');

  const { users, isLoading, fetch } = useTodo();
  

  useEffect(() => {
    fetch();
  }, [fetch]);

  const textChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextInput(e.target.value);
  };

  const addData = () => {
    setUserInfo(users);
  }

  const addArea = () => {
    const newTextInput = [...indefiniteTodos, textInput];
    setindefiniteTodos(newTextInput);
    setTextInput("");
    toast("新しい議案が提出されました。", {
      style: {
        background: "skyblue",
      },
      duration: 1000,
    });
  };

  const deleteArea = (index: number) => {
    deleteList(index);
    toast("議案が否決されました。", {
      style: {
        background: "skyblue",
      },
      duration: 1000,
    });
  };

  const completeArea = (index: number) => {
    deleteList(index);

    const defineteLine = [...definiteTodos, indefiniteTodos[index]];
    setDefiniteTodos(defineteLine);
    toast("議案が可決されました。", {
      style: {
        background: "skyblue",
      },
      duration: 1000,
    });
  };

  const backArea = (index: number) => {
    const backLine = [...definiteTodos];
    backLine.splice(index, 1);
    setDefiniteTodos(backLine);
    const indefiniteLine = [...indefiniteTodos, definiteTodos[index]];
    setindefiniteTodos(indefiniteLine);
    toast("可決された議案が保留になりました。", {
      style: {
        background: "skyblue",
      },
      duration: 1000,
    });
  };

  const deleteList = (index: number) => {
    const deleteLine = [...indefiniteTodos];
    deleteLine.splice(index, 1);
    setindefiniteTodos(deleteLine);
  };

  const filteredUsers = users.filter((user) => {
    return user.completed === false;
  });
  console.log(filteredUsers);

  return (
    <>
      <h1 className="title">議案投票箱</h1>
      <div className="add-area">
        <input
          type="text"
          id="add-text"
          placeholder="投票してください"
          value={textInput}
          onChange={textChange}
        />
        <Button
          id="add-button"
          data-testid="add-button"
          onClick={addArea}
          disabled={textInput[0] === "" || textInput === ""}
        >
          追加
        </Button>
        <Toaster />
        <Button id="add-button" onClick={addData}>
          決定箱のデータ取得
        </Button>
        <Toaster />
      </div>
      <div className="indefinite-area">
        <div className="box">未決定箱</div>
        <div>
          {isLoading ? (
            <p className="loading">データ取得中</p>
          ) : users && users.length && filteredUsers.length ? (
            <ul>
              {filteredUsers.map((user, index) => {
                return (
                  <div key={index} className="container-list">
                    <li className="api-data">{user.title}</li>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p className="loaded">該当するデータはありません。</p>
          )}
        </div>
        <ul id="indefinite-list">
          {indefiniteTodos.map((value, index) => {
            return (
              <div key={index} className="container-list">
                <li className="each-list">{value}</li>
                <Button margin="10px 5px" onClick={() => completeArea(index)}>
                  決定
                </Button>
                <Toaster />
                <Button margin="10px 5px" onClick={() => deleteArea(index)}>
                  却下
                </Button>
                <Toaster />
              </div>
            );
          })}
        </ul>
      </div>
      <div className="definite-area">
        <div className="box">決定箱</div>
        <div>
          {isLoading ? (
            <p className="loading">データ取得中</p>
          ) : users ? (
            <ul>
              {userInfo
                .filter((user) => {
                  return user.completed === true;
                })
                .map((user, index) => {
                  return (
                    <div key={index} className="container-list">
                      <li className="api-data">{user.title}</li>
                    </div>
                  );
                })}
            </ul>
          ) : (
            <p className="loaded">該当するデータはありません。</p>
          )}
        </div>
        <ul id="indefinite-list">
          {definiteTodos.map((value, index) => {
            return (
              <div key={index} className="container-list">
                <li className="each-list">{value}</li>
                <Button margin="10px 5px" onClick={() => backArea(index)}>
                  保留
                </Button>
                <Toaster />
              </div>
            );
          })}
        </ul>
      </div>
      <Button inputColor="purple" onClick={onClickBack} margin="50px 50px 0">
        戻る
      </Button>
    </>
  );
};
