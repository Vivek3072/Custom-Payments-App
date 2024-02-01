import Header from "../header/Header";
import Products from "../products/Products";

export default function Hero() {
  return (
    <>
      <Header />
      <div className="px-2 md:px-10">
        <Products />
      </div>
    </>
  );
}
