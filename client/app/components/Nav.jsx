import Link from "next/link";

const Nav = () => {
  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <h3>-- Computer Science --</h3>
      <li>
        <Link href="/ChatRoom?class=Computer-Science&dif=beginner">Beginner</Link>
      </li>
      <li>
        <Link href="/ChatRoom?class=Computer-Science&dif=intermediate">Intermediate</Link>
      </li>
      <li>
        <Link href="/ChatRoom?class=Computer-Science&dif=advanced">Advanced</Link>
      </li>
      <h3>-- Geography --</h3>
      <li>
        <Link href="/ChatRoom?class=Geography&dif=beginner">Beginner</Link>
      </li>
      <li>
        <Link href="/ChatRoom?class=Geography&dif=intermediate">Intermediate</Link>
      </li>
      <li>
        <Link href="/ChatRoom?class=Geography&dif=advanced">Advanced</Link>
      </li>
      <h3>-- History --</h3>
      <li>
        <Link href="/ChatRoom?class=History&dif=beginner">Beginner</Link>
      </li>
      <li>
        <Link href="/ChatRoom?class=History&dif=intermediate">Intermediate</Link>
      </li>
      <li>
        <Link href="/ChatRoom?class=History&dif=advanced">Advanced</Link>
      </li>
    </>
  );
};

export default Nav;
