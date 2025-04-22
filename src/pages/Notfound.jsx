import { Link } from "react-router-dom";
function Notfound() {
  return (
    <h1 className="font-bold text-2xl">
      Page not found. Go to <Link to="/" className="text-blue-500">Home</Link>
    </h1>
  );
}
export default Notfound;
