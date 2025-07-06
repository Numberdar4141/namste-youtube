import { Provider } from "react-redux";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./utils/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Watchpage from "./components/Watchpage";
import SearchResultVedioList from "./components/SearchResultVedioList";
import ChannelPage from "./components/ChannelPage/ChannelMain";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "/:username",
          element: <ChannelPage />,
        },
        {
          path: "/watch",
          element: <Watchpage />,
        },
        {
          path: "/result",
          element: <SearchResultVedioList />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <Head />
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
