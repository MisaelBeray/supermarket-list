import { NextComponentType } from "next";
import Link from "next/link";
import { signOut } from "next-auth/client";

const Nav: NextComponentType = ({ children }) => {
  return (
    <aside className="flex flex-col items-center bg-green-600 text-white shadow h-full">
      <ul>
        <li
          className={
            children === "home"
              ? "bg-green-800 hover:bg-yellow-500"
              : "hover:bg-green-800"
          }
        >
          <Link href="/">
            <a
              href="."
              className="h-16 px-6 flex flex justify-center items-center w-full
        focus:text-orange-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </Link>
        </li>

        <li
          className={
            children === "cart"
              ? "bg-green-800 hover:bg-yellow-500"
              : "hover:bg-green-800"
          }
        >
          <Link href="/cart">
            <a
              href="."
              className="h-16 px-6 flex flex justify-center items-center w-full
        focus:text-orange-500"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0
                2-1.61L23 6H6"
                ></path>
              </svg>
            </a>
          </Link>
        </li>

        <li
          className={
            children === "settings"
              ? "bg-green-800 hover:bg-yellow-500"
              : "hover:bg-green-800"
          }
        >
          <Link href="/">
            <a
              href="."
              className="h-16 px-6 flex flex justify-center items-center w-full
        focus:text-orange-500"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path
                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
                0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
                0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
                2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
                0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
                0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
                0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
                0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
                1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
                1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
                0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
                1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
                2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
                0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
                1.65 0 0 0-1.51 1z"
                ></path>
              </svg>
            </a>
          </Link>
        </li>
      </ul>
      <div className="mt-auto h-16 flex items-center w-full">
        <button
          className="h-16 w-18 mx-auto flex flex justify-center items-center
    w-full focus:text-orange-500 hover:bg-green-800 focus:outline-none"
          onClick={(): Promise<void> => signOut()}
        >
          <svg
            className="h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Nav;
