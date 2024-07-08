"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pathList: { "name": string, "url": string }[] = [
  { "name": "Home", "url": "/" },
  { "name": "Example", "url": "/example" },
]

function Header() {
  const currentPath = usePathname();

  return (
    <header className={`left-0 top-0 z-99999 transition bg-white dark:bg-black duration-100 w-full py-4 sticky`}>
      <div className={`relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0`}>
        <div className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full`}>
          <nav className="max-xl:w-full">
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
              {pathList.map((path, key) => (
                <li className={currentPath == path.url ? "font-bold" : "underline"} key={key}>
                  <Link href={path.url}>{path.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
