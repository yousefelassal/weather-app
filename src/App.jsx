import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => {

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default App;