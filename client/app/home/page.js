import Header from "../components/Header";
import Nav from "../components/Nav";

const page = () => {
  return (
    <main className="h-full">
      <div className="drawer h-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-full">
          <Header />
          
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Nav />
          </ul>
        </div>
      </div>
    </main>
  );

};

export default page;
