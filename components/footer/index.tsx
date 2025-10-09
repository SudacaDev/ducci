import Footer from "./Footer";

import Logo from "./Logo";
import Nav from "./Nav";
import Address from "./Address";
import Social from "./Social";


import './style/footer.css'

const FooterWithComponents = Object.assign(Footer, {
  Logo,
  Nav,
  Address,
  Social,
});

export default FooterWithComponents;