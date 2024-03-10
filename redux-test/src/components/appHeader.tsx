import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { useAppDispatch } from "../stores/hooks";
import { setUserAgree } from "../stores/termsOfUseSlice";
import AuthElement from "./authElement";

const AppHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <Navbar className="px-4 flex flex-row items-center justify-center gap-6 w-[100vw]">
      <Link href="/" className="font-bold text-inherit flex flex-row gap-2 items-center ml-2 mr-16">
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
          <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <span className="text-lg">ACME</span>
      </Link>
      <NavbarContent className="flex flex-row gap-12">
        <NavbarItem>
          <Link className="text-lg" href="/" color="foreground">
            Notes
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link className="text-lg cursor-pointer" aria-current="page" onClick={() => dispatch(setUserAgree(false))}>
            Terms of Use
          </Link>
        </NavbarItem>
      </NavbarContent>
      <div className="flex flex-row justify-center items-center gap-8 w-80">
        <AuthElement />
      </div>
    </Navbar>
  );
};

export default AppHeader;
