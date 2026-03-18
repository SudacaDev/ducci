import Footer from "./Footer";

import Nav from "./Nav";
import Address from "./Address";
import Social from "./Social";
import Phones from "./Phones";

import "./style/footer.css";
import FooterLogo from "./Logo";

const FooterWithComponents = Object.assign(Footer, {
  Logo: FooterLogo,
  Nav,
  Address,
  Social,
  Phones,
});

export default FooterWithComponents;
