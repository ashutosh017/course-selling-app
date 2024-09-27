import { Route, Routes } from "react-router-dom";
import Gate from "./components/Gate";
import Logo from "./components/Logo";
import User from "./components/User";
import Admin from "./components/Admin";

export default function App() {
  return (
    <div className="bg-black  min-h-screen w-screen flex justify-center">
      <div className=" text-white min-h-screen w-screen sm:w-4/5  flex flex-col justify-center">
        <Logo />
        <div className="flex-grow mt-10">
        <Routes>
          <Route path="/" element={<Gate />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}
