import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <div>
      <Link
        href="/"
        className="text-black dark:text-white text-decoration-none flex text-lg items-center select-none"
      >
        <Image
          className="w-[60px] h-[60px]"
          alt="OpenStreetMap logo"
          width="60"
          height="60"
          src="/OSMNL_Square.svg"
          priority={true}
        ></Image>

        <span className="flex flex-col">
          <span className="font-semibold text-[18px]">OpenStreetMap</span>
          <span className="text-gray-700 text-sm font-medium text-muted-foreground dark:text-muted-foreground relative bottom-1">
            Nederland
          </span>
        </span>
      </Link>
    </div>
  );
}
