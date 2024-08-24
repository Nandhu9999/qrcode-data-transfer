import { Link, Outlet } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { DataContextProvider } from "./contexts/DataContext";

function App() {
  return (
    <AppLayout header={<AppHeader />}>
      <div className="m-4 mt-0 rounded-md bg-slate-800">
        <DataContextProvider>
          <Outlet />
        </DataContextProvider>
      </div>
    </AppLayout>
  );
}

function AppHeader() {
  const links = ["scan", "scan2", "read"];
  return (
    <div className="flex place-items-center pl-4 font-bold">
      <Link to={"/"}>
        Quick Response
        {" - "}
        <span className="font-thi1 pl-1"> de</span>code
      </Link>
      <div className="flex items-center gap-2 pl-4 font-normal">
        {links.map((url) => (
          <Link key={url} to={url}>
            {url}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
