// import pictures from './images/wp.png';
import './App.css';
import { BrowserRouter,  Route } from 'react-router-dom'
import LandingPage from './ClientPage/landingpage';
import VenueDetailsPage from './ClientPage/VenuesDetails';
import SignupPage from './ClientPage/signupPage';
import SignupPageVendor from './VenderPage/signupPage';
import SignInPage from './ClientPage/signinPage';
import Vendorpage from './VenderPage/VenderPage';
import CartScreen from './ClientPage/Cartpage';
import NavBar from './Header/navbar';
import ProfilePage from './ClientPage/Profile';
import { Footer } from './components/Footer';
import { Orders } from './ClientPage/Profile/orders';
import { Account } from './ClientPage/Profile/account';
import { Wishlist } from './ClientPage/Profile/Wishlist';
import { Review } from './ClientPage/Profile/Review';



function App() {


  


   

 
  return (
      <BrowserRouter>
    <div className="grid-container">
        
            
          <NavBar></NavBar>
       
       
          
      
        <main>
              {/* Admin Screen */}


                {/*vender Screeen  */}
             
              
              <Route path="/dashboard" component={Vendorpage}></Route>
              <Route path="/service/:id/edit"  component={Vendorpage}></Route>
              <Route path="/venue/:id/edit" component={Vendorpage}>  </Route>
              <Route path="/accounts"  component={Vendorpage}></Route>
              <Route path="/upload_image"   component={Vendorpage}></Route>
              <Route path="/serviceManage" exact component={Vendorpage}></Route>
              <Route path="/VenueManage"  component={Vendorpage}></Route>
              <Route path="/orders"  component={Vendorpage}></Route>
              <Route path="/vendor_register" component={SignupPageVendor}></Route>


                {/* Client screen */}


                <Route path="/account"  component={Account}></Route>
                    <Route path="/order" component={Orders}></Route>
                    <Route path="/wishlist" component={Wishlist}></Route>
                    <Route path="/reviews" component={Review}></Route>
                    <Route path ='/profile' component ={ProfilePage}></Route>
               
                <Route path='/cart/:id?' component={CartScreen}></Route>
            <Route path='/signin' component={SignInPage}></Route>
            <Route path="/register" component={SignupPage}></Route>
            <Route path="/venue/:id" component={VenueDetailsPage}></Route>
            <Route path="/" component={LandingPage} exact></Route>
            
            
           

        </main>
        <footer>
        <Footer ></Footer>
        </footer>
        
    </div>
    </BrowserRouter>
  );
}

export default App;
