import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Checkout() {

    const [formdata , setFormData] = useState({

        Name:"" , 
        Email:"" , 
        Address: "" , 
        Mobile:"" , 
        Payment:""

    })

    const [error , setError] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const navigate = useNavigate()

    function handleForm(event) {
        const {name , value} = event.target 
        console.log(event.target.name)
        setFormData( {...formdata , [name]: value} )
       
    }

    function ValidateForm() {
        

        const newerror= {}

        if(formdata.Name.trim()===""){
            newerror.Name= " This Field is Must"
        }

        if (formdata.Email.trim() === "") {
            newerror.Email = "Email is required"
        }
        else if (!formdata.Email.endsWith("@gmail.com")) {
            newerror.Email = "Email must end with @gmail.com"
        }

        if(!/^\d{10}$/.test(formdata.Mobile)){
            newerror.Mobile= "Enter Numbers only which must Contain 10 digits"
        }
        setError(newerror)

        return Object.keys(newerror).length===0
    }

    function handleSubmit(event) {
        event.preventDefault()

        const isvalid = ValidateForm()

        if(isvalid){
            setSubmitted(true)
            console.log(formdata)
            navigate('/payment' , {
                state: {formdata} 
            })
        }
        else{
            return 
        }

        

    }
    return(

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input  type= "text" name="Name" value={formdata.Name} onChange={handleForm}></input>
                {error.Name && <p>{error.Name}</p>}
            </div>
            <div>
                <label>Email</label>
                <input type= "email" name="Email" value={formdata.Email} onChange={handleForm}></input>
                {error.Email && <p>{error.Email}</p>}
            </div>
            <div>
                <label>Address</label>
                <input type= "text" name="Address" value={formdata.Address} onChange={handleForm}></input>
                {error.Address && <p>{error.Address}</p>}
            </div>
            <div>
                <label>Mobile Number</label>
                <input type= "text" name="Mobile" value={formdata.Mobile} onChange={handleForm}></input>
                {error.Mobile && <p>{error.Mobile}</p>}
            </div>
            <div>
                <label>Payment Methods</label>
                <select  name="Payment"
            value={formdata.Payment}
            onChange={handleForm} >
                    <option value="">Select Payment Method</option>
                    <option value="Card">Card</option>
                    <option value="upi">Upi</option>
                </select>
            </div>
           <button type= "submit" >Continue to Payment</button>
            {submitted && <p> Form is Submitted</p>}
        </form>
    )

}

export default Checkout