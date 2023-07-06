import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";

const App = () => {

  return (
    <>
      <Sidebar />
      <div className="ml-60 px-4">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </div>
    </>
  );
};

export default App;