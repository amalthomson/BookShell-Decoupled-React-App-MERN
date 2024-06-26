import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./components/CommonPages/Signup";
import LoginPage from "./components/CommonPages/LoginPage";
import AdminDashboard from "./components/AdminPages/AdminDashboard/AdminDashboard";
import Users from "./components/AdminPages/User/User";
import AddProduct from "./components/AdminPages/AddProduct/AddProduct";
import Orders from "./components/AdminPages/Orders/Orders";
import Products from  "./components/AdminPages/Products/Products";
import AdminHome from "./components/AdminPages/AdminHome/AdminHome";
import AppHome from "./components/UserPages/AppHome/AppHome";
import Home from "./components/CommonPages/Home";
import ProductDetails from "./components/UserPages/ProductDetails/ProductDetails";
import MyOrders from "./components/UserPages/MyOrders/MyOrders";
import MyWishlist from "./components/UserPages/MyWishlist/MyWishlist";
import MyCart from "./components/UserPages/MyCart/MyCart";
import ManageAddress from "./components/UserPages/ManageAddress/ManageAddress";
import AllOrders from "./components/AdminPages/Orders/Orders";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/manage-addresses" element={<ManageAddress />} />
          <Route path="/cart" element={<MyCart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<MyWishlist />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="admin-home" element={<AdminHome />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
