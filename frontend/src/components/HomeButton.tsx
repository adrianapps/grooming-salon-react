import { Link } from "react-router-dom";
import "../styles/HomeButton.css";

interface HomeButtonProps {
  route: string;
  message: string;
}

export default function HomeButton({ route, message }: HomeButtonProps) {
  return (
    <Link to={route}>
      <button className="btn-primary font-bold">{message}</button>
    </Link>
  );
}
