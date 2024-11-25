import { ModeToggle } from "./mode-toogle";
import Link from "next/link";
export default function Header() {
    return(
        <div>
            <ul>
                <li>
                    <Link href='/login'>
                    </Link>
                </li>
                <li>
                    <Link href={'/register'}>
                    </Link>
                </li>
            </ul>
        </div>
    )
}