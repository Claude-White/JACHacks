
import Link from "next/link";

const Nav = () => {


  return (
    <>
      <li>
      <Link href="../ChatRoom?class=Computer-Science">Computer Science</Link>
      </li>
      <li>
        <a href="../testing" className="block">
          Somewhere
        </a>
      </li>
      <li>
        <a href="../testing" className="block">
          Anywhere
        </a>
      </li>
      <li>
        <a href="../testing" className="block">
          Helooo??
        </a>
      </li>
    </>
  );
};

export default Nav;
