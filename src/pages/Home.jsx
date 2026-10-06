import { useNavigate } from "react-router-dom";
import data from '../data/productitems'
//import 'bootstrap/dist/css/bootstrap.min.css';
import Productcard from "../component/common/Productcard";

function Home(){

    const navigate = useNavigate()

    
    return (

<>
<div className="px-4 py-5 my-5 text-center"> 

     <h1 className="display-5 fw-bold text-body-emphasis text-blue-500">Welcome to Dental Kart</h1> 
     <div  className="col-lg-6 mx-auto">
         <p className="lead mb-4">Your one-stop store for dental care products.</p> 
         
         {data.map((item)=> ( <Productcard key={item.id} product= {item} />))}

         <div  className="d-grid gap-2 d-sm-flex justify-content-sm-center"> 
         <p>For more products </p>      
         <button className="rounded-lg border border-blue-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:bg-blue-100"  onClick={()=>(navigate('/products'))}>Click Here Now</button>
          </div> </div> </div>
    

    

</>
        
    )
}

export default Home;