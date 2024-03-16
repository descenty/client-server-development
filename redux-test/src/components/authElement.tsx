import { useAuth } from "react-oidc-context";
import { useAppSelector } from "../stores/hooks";
import { Button, Link, Spinner } from "@nextui-org/react";

const AuthElement = () => {
  const auth = useAuth();
  const user = useAppSelector((state) => state.user.data);
  if (auth.isLoading) return <Spinner />;
  if (user)
    return (
      <>
        <Link color="foreground" href={`/users/${user.profile.sub}`} className="text-lg">
          {user.profile.name}
        </Link>
        <Button size="md" variant="flat" color="danger" onClick={() => auth.signoutSilent()}>
          Sign Out
        </Button>
      </>
    );
  return (
    <Button className="text-lg" variant="flat" color="primary" onClick={() => auth.signinPopup()}>
      Sign In
    </Button>
  );
};

export default AuthElement;
