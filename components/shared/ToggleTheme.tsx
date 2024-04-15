"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleTheme } from "@/constants";
import useTheme from "@/context/ThemeProvider";
import Image from "next/image";

const ToggleTheme = () => {
  const { mode, setMode } = useTheme();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-primary-500 focus:outline-none">
          {mode === "light" ? (
            <Image
              src={"/assets/icons/sun.svg"}
              alt="sun icon"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src={"/assets/icons/moon.svg"}
              alt="moon icon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="background-light800_dark400 flex flex-col p-2">
          {toggleTheme.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                setMode(item.value);
                if (localStorage.theme !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
              className={`flex gap-3 ${item.value === mode ? "text-primary-500" : ""}`}
            >
              <Image src={item.icon} alt={item.title} width={20} height={20} />
              <p>{item.title}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ToggleTheme;
