import { Navbar, NavbarContent, NavbarItem, Link, Button, Spinner } from "@nextui-org/react";
import { useCallback } from "react";
import { useAuth } from "react-oidc-context";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setUserAgree } from "../stores/termsOfUseSlice";

const AppHeader = () => {
  const auth = useAuth();
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const AuthElement = useCallback(() => {
    if (auth.isLoading) return <Spinner />;
    if (user)
      return (
        <>
          <span>{user.profile.name}</span>
          <Button variant="flat" color="danger" onClick={() => auth.signoutSilent()}>
            Sign Out
          </Button>
        </>
      );
    return (
      <Button color="primary" onClick={() => auth.signinPopup()}>
        Sign In
      </Button>
    );
  }, [auth, user]);
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
        <span>ACME</span>
      </Link>
      <NavbarContent className="flex flex-row gap-6">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" onClick={() => dispatch(setUserAgree(false))}>
            Terms of Use
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <div className="flex flex-row justify-center items-center gap-6 w-64">
        <AuthElement />
      </div>
    </Navbar>
  );
};

export default AppHeader;
