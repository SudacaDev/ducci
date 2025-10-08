import Header from "./index";

const HeaderDefault = () => {
  return (
    <Header>
      <Header.Logo />
      <Header.MenuButton />
      <Header.Overlay />
      <Header.Nav />
    </Header>
  );
};

export default HeaderDefault;