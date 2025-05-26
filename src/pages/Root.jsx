import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const Root = () => {

  return (
    <div className="bg-indigo-50">
      <Toaster position="top-right" />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer year={2025} />
    </div>
  );
};

export default Root;
