import Link from "next/link";
import { siteConfig } from "@/config/site";

export function MainNav() {
  return (
    <nav>
      <ul>
        {siteConfig.navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
