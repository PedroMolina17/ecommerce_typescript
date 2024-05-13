import Navigation from "@/Components/Navigation";
import { Outlet } from "react-router-dom";

const EcommerceLayout = () => {
  return (
    <div className="bg-white/95">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default EcommerceLayout;
