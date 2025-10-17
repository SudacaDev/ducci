import Content from "./BlockContent";
import Body from "./Body";
import ContentBlock from "./ContentBlock";
import Footer from "./Footer";
import Subtitle from "./Subtitle";
import Title from "./Title";

import "./style/block.css";

const Block = Object.assign(ContentBlock, {
  Subtitle,
  Title,
  Content,
  Body,
  Footer,
});
export default Block;
