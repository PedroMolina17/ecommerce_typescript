import {
  NavLink,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router-dom";
interface ErrorResponse404 {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: any;
}

const PageNotFoundAdmin = () => {
  const error = useRouteError() as ErrorResponse404;
  const { pathname } = useLocation();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const navigate = useNavigate();

  if (!isDashboardRoute) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>Page not found admin</p>
        <p>hola</p>
      </div>
    );
  }
  return (
    <div className="bg-bg flex items-center justify-center w-full h-screen text-gray-900 ">
      <div className="flex flex-col items-center w-full gap-8">
        <h1 className=" text-shadown animate-pulse text-9xl tracking-wide md:text-16xl w-full select-none text-center font-medium text-white">
          {error.status}
        </h1>
        <p className="text-3xl font-semibold text-center text-slate-500">
          You have discovered a secret place
        </p>
        <p className="text-2xl md:px-12 text-center text-slate-500">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <div className="flex flex-row justify-between gap-8">
          <button
            onClick={() => navigate(-1)}
            className="flex justiy-center items-center px-5 py-2 text-xl rounded-md text-white border border-indigo-500 hover:bg-indigo-500 hover:text-white"
          >
            Previous Page
          </button>

          <NavLink
            to={"/dashboard"}
            className="flex justiy-center items-center px-5 py-2 text-xl rounded-md text-white border border-green-500 hover:bg-green-500 hover:text-white"
          >
            {" "}
            Home{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
const PageNotFoundClient = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>404</h1>
      <p>Page not found admin</p>
      <p>hola</p>
    </div>
  );
};
export {
  PageNotFoundAdmin as PageNotFound,
  PageNotFoundClient as PageNotFoundAdmin,
};
