import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
const HomeLayout = () => {
  const location = useLocation();
  // console.log(location);
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Navbar />
      {isLoading &&
      location.pathname !== "/products" &&
      location.search === "" ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
