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
      <header className="flex items-center p-2 bg-base-100 w-full">
        <h1>YOU FOUND AN EASTER EGG</h1>
        <button className="btn btn-primary">IM A BUTTON THAT DOES NOTHING!</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-20 py-10">
        <Link href="/ChatRoom?class=Computer-Science">
          <div className="min-h-full card bg-base-100 shadow-xl">
            <div className="rounded-t-2xl card-image relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image src={MrMean} alt="Comp Sci Teacher" />
            </div>
            <div className="card-body bg-blue-500 rounded-b-[20px] text-white">
              <h2 className="card-title text-2xl">Computer Science</h2>
              <p>Dive into coding languages and algorithmic thinking, mastering digital problem-solving skills for today's tech-driven world.</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </Link>

        <Link href="/ChatRoom?class=History">
          <div className="min-h-full card bg-base-100 shadow-xl">
          <div className="rounded-t-2xl card-image relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image src={Teach} alt="History Teacher" />
            </div>
            <div className="card-body bg-red-500 rounded-b-[20px] text-white">
              <h2 className="card-title text-2xl">History</h2>
              <p>Journey through time, unraveling the stories and events that shaped civilizations, from ancient times to modern revolutions, gaining insights into the enduring impact of the past on the present.</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </Link>

        <Link href="/ChatRoom?class=Geography">
          <div className="min-h-full card bg-base-100 shadow-xl">
          <div className="rounded-t-2xl card-image relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image src={GeoGoat} alt="Geography Teacher" />
            </div>
            <div className="card-body bg-green-500 rounded-b-[20px] text-white">
              <h2 className="card-title text-2xl">Geography</h2>
              <p>Explore the diverse landscapes and cultures of our planet, using maps and field studies to understand the interconnectedness of physical geography and human societies.</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default page;
