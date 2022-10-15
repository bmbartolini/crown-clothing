import {useState} from "react";

import FormInput from "../form-input/form-input.component"

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss"
import Button from "../button/button.component"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("password does not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, { displayName});
            resetFormFields();

        } catch(error) {
            console.log("user creation encountered an error", error)
        }

    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }     

    return(
        <div className = "sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit= {handleSubmit}>
        
                <FormInput label= "Display Name" type= "text" required onChange= {handleChange} name= "displayName" value= {displayName} />
                
                <FormInput label = "Email" type= "text" required  onChange= {handleChange} name= "email" value = {email} />
                
                <FormInput label = "Password" type= "password" required  onChange= {handleChange} name= "password" value= {password}/>
            
                <FormInput label = "Confirm Password" type= "password" required  onChange= {handleChange} name= "confirmPassword" value= {confirmPassword}/>
                <Button>Sign up </Button>
            </form>
        
        </div>
    )
}

export default SignUpForm









// import {useState} from "react"

// const defaultFormFields = {
//     displayName: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
// }

// const SignUpForm = () => {

//     const [formFields, setFormFields] = useState(defaultFormFields)
//     const {displayName, email, password, confirmPassword} = formFields;

//     console.log(formFields);

//     const handleChange = (event) => {
//         const {name, value} = event.target;
//         setFormFields({ ...formFields, [name] : value });
//     };

//     return(
//         <div>
//             <h1>Sign up with email and password</h1>
//             <form onSubmit= {() => {}}>
//                 <label>Display Name</label>
//                 <input type="text" required onChange= {handleChange} name ="displayName" value = {displayName}/>

//                 <label>Email</label>
//                 <input type="email" required onChange= {handleChange} name = "email" value= {email} />

//                 <label>Password</label>
//                 <input type="password" required onChange= {handleChange} name= "password" value= {password}/>

//                 <label>Confirm Password</label>
//                 <input type= "password" required onChange= {handleChange} name = "confirmPassword" value = {confirmPassword}/>
//                 <button type= "submit">Submit</button>
//             </form>

//         </div>
//     )
// }

// export default SignUpForm;