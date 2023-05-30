import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout.js";
import Home from "./components/Home.js";
import UploadBanner from "./Admin/UploadBanner.js"

//bootstrap style
import "bootstrap/dist/css/bootstrap.min.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/admin/uploadbanner" element={<UploadBanner />} />

      
      
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
