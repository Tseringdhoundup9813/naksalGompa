import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout.js";
import Home from "./components/Home.js";
import UploadBanner from "./Admin/UploadBanner.js"
import NotFound from "./layout/NotFound.js"
import UploadNews from "./Admin/AdminNews.js"
import AdminStudent from "./Admin/AdminStudent.js";
import AdminTeam from "./Admin/AdminTeam.js";
import AdminDirector from "./Admin/AdminDirector.js";
import AdminFounder from "./Admin/AdminFounder.js";
import AdminGallery from "./Admin/AdminGallery.js";
//bootstrap style
import "bootstrap/dist/css/bootstrap.min.css";
//router link

import History from "./components/about/History.js";
import Donation from "./components/Donation.js";
import Founder from "./components/about/Founder.js";
import Director from "./components/about/Director.js";
import OurTeam from "./components/about/OurTeam.js";
import OurStudent from "./components/about/OurStudent.js";
import DonationMain from "./components/DonationMain.js";
import News from "./components/News.js";
import Gallery from "./components/Gallery.js";
import Contact from "./components/Contact.js";
import ScrollToTop from "./components/ScrollToTop.js";

import { ScrollRestoration } from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about/history" element={<History />} />
      <Route path="/about/founder" element={<Founder />} />
      <Route path="/about/director" element={<Director />} />
      <Route path="/about/our-team" element={<OurTeam />} />
      <Route path="/about/our-student" element={<OurStudent />} />
      <Route path="/donation" element={<Donation />} />
      <Route path="/donation/donation-pay" element={<DonationMain />} />
      <Route path="/news" element={<News />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />

      <Route path="/admin/uploadbanner" element={<UploadBanner />} />
      <Route path="/admin/uploadnews" element={<UploadNews />} />
      <Route path="/admin/team" element={<AdminTeam/>} />
      <Route path="/admin/student" element={<AdminStudent/>} />
      <Route path="/admin/director" element={<AdminDirector/>} />
      <Route path="/admin/founder" element={<AdminFounder/>} />
      <Route path="/admin/gallery" element={<AdminGallery/>} />





      
      
    </Route>


   
  ),

);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
