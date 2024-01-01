import Link from "next/link";
import Image from "next/legacy/image";
import ano_sono_icon from "../../../public/ano_sono_icon.svg";

export function NavBar() {
  return (
    <nav className="navbar-container bg-gray-800 text-white p-4 flex flex-wrap justify-between">
      <div className="text-2xl font-bold flex items-center w-full">
        <Link href="/">
          <div className="relative w-20 h-20">
            <Image
              src={ano_sono_icon}
              alt="ano_sono"
              layout="responsive"
              objectFit="contain"
            />{" "}
          </div>
        </Link>
        <div className="flex-grow flex space-x-5 mt-4 sm:mt-0">
          <Link
            href="/"
            className="ml-5 hover:text-gray-300 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="hover:text-gray-300 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl"
          >
            Search
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-300 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl"
          >
            About
          </Link>
        </div>
        <div className="ml-auto">
          <Link
            href="/logout"
            className="ml-5 mr-5 hover:text-gray-300 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
