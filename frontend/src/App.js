import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import AddCustomer from './screens/AddCustomer';
import ShowCustomers from './screens/ShowCustomers';
import DeleteCustomer from './screens/DeleteCustomer';
import EditCustomer from './screens/EditCustomer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/add' element={<AddCustomer/>}/>
        <Route exact path='/delete' element={<DeleteCustomer/>}/>
        <Route exact path='/edit' element={<EditCustomer/>}/>
        <Route exact path='/customers' element={<ShowCustomers/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
