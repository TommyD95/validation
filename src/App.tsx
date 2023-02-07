import { error } from 'console';
import React, { useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import './App.css';
import { formSchema } from './validation/formValidation';

type Form = {
  name: string,
  email: string,
  password:string
}

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("function")
    const schemaForm :Form= {
      name: name,
      email: email,
      password: password
    }
    
    await formSchema.isValid(schemaForm)
      .then((valid) => {
        if (valid === false) {
          validate(schemaForm)
          setIsValid(valid)
        } else {
          setErrors({name: "",
          email: "",
          password: "",})
       setIsValid(valid)
        }
       
      })
         
  }

  const validate = (formData:Form) => {
    
    const errors = {name: "",
    email: "",
      password: "",
    };
    
    if (!formData.name) {
      errors.name = "Il nome è obbligatorio";
    } else if (!/^[a-zA-Z]+$/.test(formData.name)) {
      errors.name = "Il nome può contenere solo lettere";
    }
    if (!formData.email) {
      errors.email = "L'email è obbligatoria";
    }else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        .test(formData.email)
    ) {
      errors.email =
        "l'email non è valida";
    }
    if (!formData.password) {
      errors.password = "La password è obbligatoria";
    } else if (
      !/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/
        .test(formData.password)
    ) {
      errors.password =
        "La password deve contenere almeno 4 e massimo 10 caratteri, di cui uno speciale";
    }
    return setErrors(errors);
  };


  useEffect(() => {
    console.log(isValid)
  }, [isValid])


    return (
      <>
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <label >Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          {errors.name ? <p>{errors.name}</p> : <></>}

          <div>
            <label >Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          {errors.email.length>0 ? <p>{errors.email }</p> : <></>}
          <div>
            <label>Password:</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          {errors.password.length>0 ? <p>{errors.password }</p> : <></>}

          <button type="submit">Submit</button>
        </form>
        {isValid ? <p>form valido!</p> : <>non valido</>}
        
     
      </>
    );
  }

export default App;
