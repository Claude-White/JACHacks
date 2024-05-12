import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Link from "next/link";

const page = () => {
  return (
    <main className="h-full">
      <Header />
      <header className="flex items-center p-2 bg-base-100 w-full">
        <h1>YOU FOUND AN EASTER EGG</h1>
        <button className="btn btn-primary">IM A BUTTON THAT DOES NOTHING!</button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <Link href="/ChatRoom?class=Computer-Science">
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center text-2xl font-bold">Computer Science</div>
        </Link>
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center text-2xl font-bold">Empty</div>
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center text-2xl font-bold">Empty</div>
      </div>
    </main>
  );
};

export default page;
