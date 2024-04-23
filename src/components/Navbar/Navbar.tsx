import Image from "next/image";
import Link from "next/link";
import IconHome from "@/assets/icons/icon-home.svg";
import IconNotification from "@/assets/icons/icon-notification.svg";
import IconTicket from "@/assets/icons/icon-ticket.svg";
import IconUser from "@/assets/icons/icon-user.svg";
import styles from "./Navbar.module.css";

export const Navbar = () => (
  <nav className={styles["Navbar"]}>
    <ul className={styles["Navbar__list"]}>
      <li className={styles["Navbar__item"]}>
        <Link href="/home">
          <Image
            src={IconHome}
            alt=""
            width={48}
            height={48}
            className={styles["Navbar__icon"]}
          />
        </Link>
      </li>
      <li className={styles["Navbar__item"]}>
        <Link href="/notifications">
          <Image
            src={IconNotification}
            alt=""
            width={48}
            height={48}
            className={styles["Navbar__icon"]}
          />
        </Link>
      </li>
      <li className={styles["Navbar__item"]}>
        <Link href="/cart">
          <Image
            src={IconTicket}
            alt=""
            width={48}
            height={48}
            className={styles["Navbar__icon"]}
          />
        </Link>
      </li>
      <li className={styles["Navbar__item"]}>
        <Link href="/account">
          <Image
            src={IconUser}
            alt=""
            width={48}
            height={48}
            className={styles["Navbar__icon"]}
          />
        </Link>
      </li>
    </ul>
  </nav>
);
