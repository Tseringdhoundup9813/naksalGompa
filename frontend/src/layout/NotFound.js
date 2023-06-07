import { NavLink } from "react-router-dom";
import notfoundimg from "../images/news/news2.jpg";
export default function NotFound() {
  return (
    <div className="notFound text-center py-5">
      <div className="notdfound">
        <h2>Page not found!</h2>
        <p>
          Go to the <NavLink to="/">Homepage</NavLink>.
        </p>
      </div>
      <img src={notfoundimg} alt="" />
    </div>
  );
}
