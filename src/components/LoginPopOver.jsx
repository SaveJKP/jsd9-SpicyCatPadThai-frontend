import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Link } from "react-router-dom";

// const [popOverOpen, setPopOverOpen] = useState(false);
const togglePopOver = () => {
  setPopOverOpen(!popOverOpen);
};

export function LoginPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="55px"
          className="hover:cursor-pointer min-[1024px]:hidden"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#e3e3e3"
        >
          <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
        </svg>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-[var(--color-greenBackground)]">
        <div className="flex w-[50%] flex-col gap-6 justify-self-center text-center text-[var(--color-text)]">
          <Link
            to={"/login"}
            className="items-center rounded-xl bg-[var(--color-buttonBrown)] p-3 text-center hover:bg-[#bc7142cb] min-[1024px]:hidden"
            onClick={togglePopOver}
          >
            Log in
          </Link>
          <Link
            to={"/register"}
            className="rounded-xl bg-[var(--color-buttonBlue)] p-3 text-center hover:bg-[#416683] min-[1024px]:hidden"
            onClick={togglePopOver}
          >
            Register
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
