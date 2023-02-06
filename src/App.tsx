import React, { useEffect, useState } from 'react';
import { ValidationError } from 'yup';
import './App.css';
import { formSchema } from './validation/formValidation';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("function")
    const schemaForm = {
      name: name,
      email: email,
      password:password
    }
    await formSchema.isValid(schemaForm)
      .then((schema) => setIsValid(schema))
      .catch((err: ValidationError) => console.log(err.message));
  };

  useEffect(() => {
    console.log(isValid)
  }, [isValid])
  

  return (
    <>
    <form  noValidate onSubmit={handleSubmit}>
      <div>
        <label >Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        </div>

      <div>
        <label >Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
          <input
          type="text"
          id="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      </form>
      {isValid ? <p>form valido!</p> : <>non valido</>     }
      </>
  );
}

export default App;
