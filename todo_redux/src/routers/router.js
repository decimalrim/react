/**
 * React Application  의 URL 규칙을 정의한다.
 * Spring Framework의 Controller 와 유사하게 동작.
 * URL (End-Point)에 대응할 Component를 지정.
 *     - Spring에서는 Controller의 URL에 대응하는 View를 지정.
 */
/**
 * createBrowserRouter: URL 규칙을 정의.
 *            - URL별로 브라우저에 노출시킬 컴포넌트를 정의.
 * RouterProvider: createBrowserRouter에서 정의한 규칙을 전파하는 역할.
 */
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Main from "../components/main/Main";
import ToolkitProvider from "../stores/toolkit/store";
import TodoApp from "../components/todo/TodoApp";
import MainLayout from "../layout/MainLayout";
import ForumApp from "../components/forum/ForumApp";
import SubTodo from "../components/todo/SubTodo";

export default function RouterAppProvider() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // MainLayout 컴포넌트의 Outlet 컴포넌트에 Main 컴포넌트를 노출시킨다.

        //위에서 기본 주소 localhost:3000/ 으로 설정하고 있기 때문에 아래에서 또 적을 필요 없음
        //children 말 그대로 자식이기때문에 /이후의 자식주소만 적어주면 됨

        // 빈 path: "" 대신 index: true 쓰는걸 권장!
        { index: true, element: <Main /> },

        // MainLayout 컴포넌트의 Outlet 컴포넌트에 ToolkitProvider 컴포넌트를 노출시킨다.
        {
          path: "todo/",
          element: (
            <ToolkitProvider>
              <Outlet />
            </ToolkitProvider>
          ),
          // url : /todo/:id
          children: [
            { index: true, element: <TodoApp /> },
            { path: ":id", element: <SubTodo /> },
          ],
        },

        { path: "forum", element: <ForumApp /> },
      ],
    },
  ]);

  //   const routers = createBrowserRouter([
  //     // path: URL (End-Point)
  //     // element: Component (View)
  //     // path:"/" ==> http://localhost:3000
  //     { path: "/", element: <Main /> },
  //     // path:"/todo" ==> http://localhost:3000/todo
  //     {
  //       path: "/todo",
  //       element: (
  //         <ToolkitProvider>
  //           <TodoApp />
  //         </ToolkitProvider>
  //       ),
  //     },
  //   ]);

  return <RouterProvider router={routers} />;
}
