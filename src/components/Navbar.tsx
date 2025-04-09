import { IoMoon } from "react-icons/io5";
import { BsMoon } from "react-icons/bs";

interface NavbarProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

export default function Navbar({ setDarkMode, darkMode }: NavbarProps) {
  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <nav className="flex flex-col md:flex-row md:justify-between gap-2 items-center py-5 px-16 md:gap-0 bg-[var(--color-very-light-gray)] text-[var(--color-very-dark-blue-txt)] dark:bg-[var(--color-dark-blue)] dark:text-white shadow-xl">
      <h1 className="font-extrabold text-2xl">Where in the world?</h1>
      <div
        className="flex items-center justify-center gap-2 cursor-pointer"
        onClick={toggleDarkMode}
      >
        {darkMode ? <IoMoon /> : <BsMoon />}
        <p>Dark Mode</p>
      </div>
    </nav>
  );
}
