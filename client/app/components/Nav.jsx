
import Link from "next/link";

const Nav = () => {


  return (
    <>
      <li>
      <Link href="/">Home</Link>
      </li> 
      <li>
      <Link href="../ChatRoom?class=Computer-Science">Computer Science</Link>
      </li>
      <li>
      <Link href="../ChatRoom?class=Geography">Geography</Link>
      </li>
      <li>
      <Link href="../ChatRoom?class=History">History</Link>
      </li>
    </>
  );
};

export default Nav;
