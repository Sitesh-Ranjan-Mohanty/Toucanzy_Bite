import { Link } from "react-router-dom";

export default function Brand({ light = false }) {
  return (
    <Link className={`brand${light ? " brand-light" : ""}`} to="/" aria-label="Toucanzy Bite home">
      <img className="brand-logo" src="/Toucanzy_Bite_Logo_Transparent.png" alt="" />
    </Link>
  );
}
