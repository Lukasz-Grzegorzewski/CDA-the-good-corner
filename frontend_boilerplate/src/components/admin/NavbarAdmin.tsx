import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import navbarAdmin from "./NavbarAdmin.module.css";

const navbarElements: string[] = ["ads", "categories", "tags"];

function NavbarAdmin() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("item") || "ads";

  return (
    <nav className={navbarAdmin["navbar-admin"]}>
      {navbarElements.map((item) => (
        <Link
          key={item}
          className={`${navbarAdmin["navbar-admin-link"]} ${
            queryParam === item ? navbarAdmin["navbar-admin-link-active"] : ""
          }`}
          href={`admin?item=${item}`}
        >
          {item[0].toUpperCase() + item.slice(1, item.length)}
        </Link>
      ))}
    </nav>
  );
}

export default NavbarAdmin;
