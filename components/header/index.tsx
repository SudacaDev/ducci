import { NAV } from "@/constants/nav"
import { MENU } from "@/types/nav.type"
import Link from 'next/link'

const Header = () => {
    return (
        <header className="header">
            <div className="flex justify-center items-center m-auto  navBar container px-4">
                <div className="item">
                    <Link href={MENU.HOME}> logo</Link>
                </div>
                <div className="flex gap-4">
                    {NAV.map((item) => (
                        <Link href={item.url} key={item.id}>

                            <div className="item " >
                                <p>{item.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Header