import { NAV } from "@/constants/nav"

const Footer = () => {
    return (
        <footer className="flex justify-center items-center">
            <div className="w-full flex justify-center items-center flex-col ">
                <div className="grid container grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] m-auto px-4 py-8  gap-4 -gap-4">
                    <div className="footer_logo"> logo </div>
                    <div className="footer_links">
                        {NAV.map((item) => (
                            <div className="footer_link" key={item.id}>
                                <p> {item.label} </p>
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <p>address</p>
                            <p>Rosario -  Santa Fe</p>
                        </div>
                        <div>
                            <p>email</p>
                            <p>contacto@ducci.com</p>
                        </div>
                    </div>
                    <div> 
                         <div> phone</div>
                        <div> social networks</div>
                    </div>
                </div>
                <div className="py-4 w-full justify-center items-center flex footer-copy container">
                    <small> Copyright &copy;  2024 Ducci Gelateria. All rights reserved.</small>
                </div>
            </div>
        </footer>
    )
}

export default Footer