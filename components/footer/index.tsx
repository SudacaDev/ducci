import Footer from "./Footer";

 
import Nav from "./Nav";
import Address from "./Address";
import Social from "./Social";

import "./style/footer.css";
import FooterLogo from "./Logo";

const FooterWithComponents = Object.assign(Footer, {
  Logo: FooterLogo,
  Nav,
  Address,
  Social,
});

export default FooterWithComponents;
