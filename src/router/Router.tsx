import React, { VFC } from "react";
import { Route, Routes } from "react-router-dom";
import { Page404 } from "../pages/404";
import { Home } from "../pages/Home";
import { Page2 } from "../pages/Page2";
import { Todo } from "../todo/Todo";
import { Parameter } from "../pages/Parameter";
import { Calender } from "../pages/Calender";
import { DragDrop } from "../drag&drop/DragDrop";
import { Page1 } from "../pages/Page1";

// type Rout = {
//   exact?: boolean;
// }

export const Router: VFC = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="page1">
        <Route path="" element={<Page1 />} />
        <Route path="detailA" element={<Calender />} />
        <Route path="detailB" element={<DragDrop />} />
      </Route>
      <Route path="page2">
        <Route path="" element={<Page2 />} />
        <Route path="todo" element={<Todo />} />
        <Route path=":id" element={<Parameter />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
