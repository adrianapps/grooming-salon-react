import HomeButton from "../components/HomeButton";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="page-container">
      <div className="max-w-lg">
        <div className="button-container">
          <HomeButton route="/serwisy" message="Zobacz serwisy"></HomeButton>
          <HomeButton route="/wizyty" message="Zarezerwuj Wizytę"></HomeButton>
          <HomeButton route="/psy" message="Dodaj Psa"></HomeButton>
        </div>
      </div>
    </div>
  );
}
