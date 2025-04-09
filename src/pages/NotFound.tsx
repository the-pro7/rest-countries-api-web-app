import { useNavigate } from "react-router";
import NotFoundImage from "../assets/notfound.svg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <img
        src={NotFoundImage}
        alt="404 not found illustration"
        className="w-[400px] aspect-square"
      />
      <h1 className="text-5xl font-extrabold text-center">Page Not Found</h1>
      <p className="text-gray-800 text-xl">
        Oops!! The page you're looking for does not exist on this website.
      </p>
      <button
        className="outline-transparent py-2 px-6 cursor-pointer bg-blue-500 text-white rounded-md shadow-md transition-colors ease-linear hover:bg-blue-400"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else navigate("/", { replace: true });
        }}
      >
        Let's get you to safety
      </button>
    </div>
  );
}
