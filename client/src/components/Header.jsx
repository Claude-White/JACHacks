const Header = () => {
  return (
    <header className="flex items-center p-2">
      <div className="flex flex-1">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button mr-4" 
        >
          Open drawer
        </label>
        <h1 className="text-4xl">Kahoot But Worse</h1>
      </div>
      <button className="btn">Logout</button>
    </header>
  );
};

export default Header;