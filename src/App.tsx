import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './component/Footer';
import ResponsiveAppBar from './component/NavBar';
import TermsOfService from './pages/Termsofservice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQs from './pages/FAQs';
import Findstorelocation from './pages/Findstorelocation';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AbourUs';
import Shop from './pages/Shop';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProductDetails from './pages/ProducrDetails';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BasicExampleDataGrid from './pages/dashboard/Products';
import DataGridDemo from './pages/dashboard/Products';
import Products from './pages/dashboard/Products';
import AddProduct from './pages/dashboard/AddProduct';
import EditProduct from './pages/dashboard/EditProduct';
import Team from './pages/dashboard/Team';
import EditTeam from './pages/dashboard/EditTeam';
import AddTeam from './pages/dashboard/AddTeam';
import Brand from './pages/dashboard/Brand';
import Comments from './pages/dashboard/Comments';
import Blog from './pages/dashboard/Blog';
import BlogHome from './pages/BlogHome';
import BlogHomeDetails from './pages/BlogHomeDetails';
import AddBlog from './pages/dashboard/AddBlog';
import EditBlog from './pages/dashboard/EditBlog';
import Mail from './pages/dashboard/Mail';
import MailDetails from './pages/dashboard/MailDetails';
import DashboardHome from './pages/dashboard/DadhboardHome';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    // go to top page when open the page
    window.scrollTo(0, 0);
  }, [pathname]);
  return (

    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path='TermsofService' element={<TermsOfService />} />
        <Route path='PrivacyPolicy' element={<PrivacyPolicy />} />
        <Route path='FAQs' element={<FAQs />} />
        <Route path='Findstorelocation' element={<Findstorelocation />} />
        <Route path='Contact us' element={<ContactUs />} />
        <Route path='About us' element={<AboutUs />} />
        <Route path='Shop' element={<Shop />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='Shop/:id/:title' element={<ProductDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='wishList' element={<WishList />} />
        <Route path='Home' element={<Home />} />
        <Route path='Blog' element={<BlogHome />} />
        <Route path='Blog/:id/:title' element={<BlogHomeDetails />} />

        <Route path='' element={<Home />} />
        <Route
          path="dashboard"
          element={<Dashboard></Dashboard>}
        >
          <Route index element={<DashboardHome />}></Route>
          <Route path="comments" element={<Comments />}></Route>
          {/*  */}
          <Route path="mail" element={<Mail />}></Route>
          <Route path="mail/:id" element={<MailDetails />}></Route>

          {/*  */}
          <Route path="products" element={<Products />}></Route>
          <Route path="products/edit/:id" element={<EditProduct />}></Route>
          <Route path="products/addProduct" element={<AddProduct />}></Route>
          {/*  */}
          <Route path="team" element={<Team />}></Route>
          <Route path="team/edit/:id" element={<EditTeam />}></Route>
          <Route path="team/addTeam" element={<AddTeam />}></Route>
          {/*  */}
          <Route path="brands" element={<Brand />}></Route>
          {/*  */}
          <Route path="blogs" element={<Blog />}></Route>
          <Route path="blogs/edit/:id" element={<EditBlog />}></Route>
          <Route path="blogs/addBlog" element={<AddBlog />}></Route>
        </Route>
      </Routes>
      <Footer></Footer>

    </div>
  );
}

export default App;
