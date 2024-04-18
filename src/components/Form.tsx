import { useState } from 'react';
const loginData = {
    name: "alex",
    password: "1234",
  }
function Form(){
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleSubmit = (event : any) => {
        event.preventDefault();
        if(name === loginData.name && password === loginData.password){
            alert("Login successful");
        }else if(name === "" || password === ""){
            alert("");
        }
        
    }

    return(
        <>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" className="form-input" placeholder="Enter your name" onChange={(event)=>setName(event.target.value)} />
          <input type="password" className="form-input" placeholder="Enter your password" onChange={(event)=>setPassword(event.target.value)} />
          <button type="submit">Login</button>
        </form>
      </>
    )
}
export default Form;