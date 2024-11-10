import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Home } from './components/Home';
import { Pastes } from './components/Pastes';
import { Navbar } from './components/Navbar';
import { ViewPaste } from './components/ViewPaste';
function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <div>
        <Navbar/>
        <Home/>
      </div>
    },

    {
      path :"/pastes",
      element :<div>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path:"/pastes/:id",
      element :<div>
        <Navbar/>
        <ViewPaste/>
      </div>
    },
  ])
  return (
 
   
    <div>
       <RouterProvider router={router}/>
   </div>
   
  );
}

export default App;
