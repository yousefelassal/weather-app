import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => {

  return (
    <>
      <Sidebar />
      <div className="ml-64 px-4">
        <Outlet />
      </div>
    </>
  );
};

export default App;