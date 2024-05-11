import {
  SignInButton,
  SignedIn,
  SignOutButton,
  SignedOut,
} from "@clerk/nextjs";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="flex items-center p-2">
      <div className="flex flex-1">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button mr-4">
          <FaBars size={28} />
        </label>
        <h1 className="text-4xl">Kahoot But Worse</h1>
      </div>
      <SignedOut>
        <SignInButton>
          <button className="btn btn-neutral">Login</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <button className="btn btn-neutral">Logout</button>
        </SignOutButton>
      </SignedIn>
    </header>
  );
};

export default Header;
