import Image from "next/image";
import React, { useState } from "react";
import { Sidebar } from "@/components";
import { useAuthLogout } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { AuthStore } from "@/stores/auth.store";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const route = useRouter();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { mutateAsync: logout } = useAuthLogout();
  const [userData, removeUserData, removeToken] = AuthStore(
    (state) => [state.userData, state.removeUserData, state.removeToken],
    shallow
  );

  const handleLogout = async () => {
    await logout(
      {},
      {
        onSuccess: () => {
          removeUserData();
          removeToken();
          route.replace("/login");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const onLogout = () => {
    setShowDropdown(false);
    toast.promise(handleLogout(), {
      loading: "Logout...",
      success: "Logout Berhasil",
      error: "Logout Gagal",
    });
  };
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Image
                src="/logo.jpg"
                className="h-8 mr-3 !relative"
                alt="logo"
                fill
              />
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="w-8 !h-8 rounded-full !static"
                      src="/user.jpg"
                      alt="user photo"
                      fill
                    />
                  </button>
                </div>
                {showDropdown && (
                  <div
                    className="z-50 m-0 text-base list-none absolute right-0 top-0 -translate-x-4 translate-y-16 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {userData?.name}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {userData?.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 cursor-pointer"
                          onClick={onLogout}
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;
