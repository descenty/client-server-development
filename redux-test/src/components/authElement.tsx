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
        <Link color="foreground" href="/users/22" className="text-lg">
          {user.profile.name}
        </Link>
        <Button className="text-lg" variant="flat" color="danger" onClick={() => auth.signoutSilent()}>
          Sign Out
        </Button>
      </>
    );
};

export default AuthElement;
