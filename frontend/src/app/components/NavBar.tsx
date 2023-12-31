import Link from "next/link";
import Image from "next/legacy/image";
import ano_sono_icon from "../../../public/ano_sono_icon.svg";

export function NavBar() {
  return (
    <nav className="navbar-container bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold flex items-center">
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
        <Link href="/" className="ml-8 mr-5 hover:text-gray-300 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Home
        </Link>
        <Link href="/search" className="mr-5 hover:text-gray-300 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Search
        </Link>
        <Link href="/about" className="hover:text-gray-300 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          About
        </Link>
      </div>
    </nav>
  );
}