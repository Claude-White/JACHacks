import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center p-2">
      <div className="flex flex-1">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button mr-4">
          Open drawer
        </label>
        <h1 className="text-4xl"><Link href="../home">Kahoot But Worse</Link></h1>
      </div>
      <button className="btn">Logout</button>
    </header>
  );
};

export default Header;
