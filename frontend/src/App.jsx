import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/admin/Home";
import Products from "./pages/Products";
import ProductsAdmin from "./pages/admin/Products";
import OrdersAdmin from "./pages/admin/Orders/Orders";
import Product from "./pages/Product";
import AdminProduct from "./pages/admin/Product";
import AdminUsers from "./pages/admin/Users";
import AdminFeatures from "./pages/admin/Features";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrders";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { useLoadUserQuery } from "./redux/services/auth";
import Order from "./pages/Order";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Information from "./pages/Information";
import Address from "./pages/Address";
import ChangePassword from "./pages/ChangePassword";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Referral from "./pages/Referral";

function App() {
  useLoadUserQuery();
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/products"} element={<Products />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/orders"} element={<Orders />} />
        <Route path={"/trackorder/:id"} element={<TrackOrder />} />
        <Route path={"/account"} element={<Profile />} />
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/information"} element={<Information />} />
        <Route path={"/address"} element={<Address />} />
        <Route path={"/changepassword"} element={<ChangePassword />} />
        <Route path={"/product/:id"} element={<Product />} />
        <Route path={"/forgotpassword"} element={<ForgotPassword />} />
        <Route path={"/referral"} element={<Referral />} />
        <Route path={"/password/reset/:token"} element={<ResetPassword />} />
        <Route path={"/order/:id"} element={<Order />} />
        <Route path={"/admin/"} element={<Admin />} />
        <Route path={"/admin/products"} element={<ProductsAdmin />} />
        <Route path={"/admin/orders"} element={<OrdersAdmin />} />
        <Route path={"/admin/product/:id"} element={<AdminProduct />} />
        <Route path={"/admin/updateproduct/:id"} element={<UpdateProduct />} />
        <Route path={"/admin/users"} element={<AdminUsers />} />
        <Route path={"/admin/features"} element={<AdminFeatures />} />
      </Routes>
    </>
  );
}

export default App;
