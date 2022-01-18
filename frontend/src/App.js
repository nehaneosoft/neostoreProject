//import logo from './logo.svg';
import {React, createContext ,useReducer} from 'react';
import { UserContext } from './reducer/UserContext';
import './App.css';
import Header from './components/Header';
import {Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Orders from './components/Orders';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Googlemap from './components/Googlemap';
import Thankyou from './components/Thankyou';
import Myaccount from './components/Myaccount';
import RecoverPass from './components/RecoverPass';
import Logout from './components/Logout';
import { initialState, reducer } from '../src/reducer/UseReducer';
import ChangePassword from './components/ChangePassword';
import ResetPass from './components/ResetPass';
import ProductDetails from './components/ProductDetails';
import CartDetails from './components/CartDetails';
import ShippingAddress from './components/ShippingAddress';
import EditDetails from './components/EditDetails';
import OrderPlaced from './components/OrderPlaced';
import Profile from './components/Profile';
//import ReusableAccPage from './components/ReusableAccPage';
//import paginationBasic from './components/paginationBasic'

const Routing = () =>{
  return (
    <Switch>
    <Route path="/" exact><Home /></Route>
    {/* <Route path="/reaccount" component={ReusableAccPage} exact /> */}
    <Route path="/cartdetails" component={CartDetails} exact/>
    <Route path="/orderplaced" component={OrderPlaced} exact/>
   <Route path="/profile" component={Profile} exact />
    <Route path="/shippingAddress" component={ShippingAddress} exact/>
    <Route path="/products" exact><Products /></Route>
    <Route path="/orders" exact><Orders /></Route>
    <Route path="/login" exact><Login /></Route>
    <Route path="/:productId" component={ProductDetails} exact/>
   
    <Route path="/register" exact><Register /></Route>
    <Route path="/locate" exact><Googlemap /></Route>
    <Route path="/thank" component={Thankyou} exact/>
    <Route path="/myaccount" component={Myaccount} exact/>
    <Route path="/recoverpass" component={RecoverPass} exact/>
    <Route path="/logout" component={Logout} exact/>
    <Route path="/changepass" component={ChangePassword} exact/>
    <Route path="/resetpass" component={ResetPass} exact/>
    <Route path="/:userId" component={EditDetails} exact/>
    
    
    </Switch>

  )
}


const App = () => {
  // 1. contextAPI
   //const UserContext = createContext();
   const [state, dispatch] = useReducer(reducer, initialState)
  

  return (
    
    <>
    <UserContext.Provider value={{state,dispatch}}>

    <Header />
    <Routing />
   
    <Footer />

    </UserContext.Provider>
   
    </>
  )
};

export default App;
