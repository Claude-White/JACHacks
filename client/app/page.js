import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Link from "next/link";
import Image from "next/image";
import MrMean from "@/app/media/MrMean.jpg";
import Teach from "@/app/media/Teach.jpg";
import GeoGoat from "@/app/media/GeoGoat.jpg";

const page = () => {
  return (
    <main className="h-full">
      <Header />
      <header className="flex items-center w-full p-2 bg-base-100">
        <h1>YOU FOUND AN EASTER EGG</h1>
        <button className="btn btn-primary">
          IM A BUTTON THAT DOES NOTHING!
        </button>
      </header>

      <div className="grid grid-cols-1 gap-20 px-20 py-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="min-h-full shadow-xl card bg-base-100">
          <div
            className="rounded-t-[20px] relative overflow-hidden card-image"
            style={{ aspectRatio: "16/9" }}>
            <Image src={MrMean} alt="Comp Sci Teacher" />
          </div>
          <div className="card-body bg-blue-500 rounded-b-[20px] text-white">
            <h2 className="text-2xl card-title">Computer Science</h2>
            <p>
              Dive into coding languages and algorithmic thinking, mastering
              digital problem-solving skills for today's tech-driven world.
            </p>
            <div className="justify-end card-actions">
              <Link href="/ChatRoom?class=Computer-Science&dif=beginner">
                <button className="btn btn-primary">Beginner</button>
              </Link>
              <Link href="/ChatRoom?class=Computer-Science&dif=intermediate">
                <button className="btn btn-primary">Intermediate</button>
              </Link>
              <Link href="/ChatRoom?class=Computer-Science&dif=advanced">
                <button className="btn btn-primary">Advanced</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="min-h-full shadow-xl card bg-base-100">
          <div
            className="rounded-t-[20px] relative overflow-hidden card-image"
            style={{ aspectRatio: "16/9" }}>
            <Image src={Teach} alt="History Teacher" />
          </div>
          <div className="card-body bg-red-500 rounded-b-[20px] text-white">
            <h2 className="text-2xl card-title">History</h2>
            <p>
              Journey through time, unraveling the stories and events that
              shaped civilizations, from ancient times to modern revolutions,
              gaining insights into the enduring impact of the past on the
              present.
            </p>
            <div className="justify-end card-actions">
              <Link href="/ChatRoom?class=History&dif=beginner">
                <button className="btn btn-primary">Beginner</button>
              </Link>
              <Link href="/ChatRoom?class=History&dif=intermediate">
                <button className="btn btn-primary">Intermediate</button>
              </Link>
              <Link href="/ChatRoom?class=History&dif=advanced">
                <button className="btn btn-primary">Advanced</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="min-h-full shadow-xl card bg-base-100">
          <div
            className="rounded-t-[20px] relative overflow-hidden card-image"
            style={{ aspectRatio: "16/9" }}>
            <Image src={GeoGoat} alt="Geography Teacher" />
          </div>
          <div className="card-body bg-green-500 rounded-b-[20px] text-white">
            <h2 className="text-2xl card-title">Geography</h2>
            <p>
              Explore the diverse landscapes and cultures of our planet, using
              maps and field studies to understand the interconnectedness of
              physical geography and human societies.
            </p>
            <div className="justify-end card-actions">
              <Link href="/ChatRoom?class=Geography&dif=beginner">
                <button className="btn btn-primary">Beginner</button>
              </Link>
              <Link href="/ChatRoom?class=Geography&dif=intermediate">
                <button className="btn btn-primary">Intermediate</button>
              </Link>
              <Link href="/ChatRoom?class=Geography&dif=advanced">
                <button className="btn btn-primary">Advanced</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
