import { useState } from "react";
import services from "../services/personDetails";

export default function PersonForm({ setPersons, persons, setMessage, setClassN }) {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleChange = (e,set) => {
      set(e.target.value);
    }

    const message = () => {
      setNewName('');
      setNewNumber('');
      setClassN("add_update");
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  
    const addPerson = async (e) => {
      e.preventDefault();

      if(persons.some(person => person.name === newName)) {
        const p = persons.find(person => person.name === newName);
        const newPerson = {
          name: newName,
          number: newNumber,
          id: p.id
        };
        
        const data = await services.getAll();
        const t = data.find(d => d.id === p.id)
        if(t) {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            services
              .update(p.id, newPerson)
              .then(() => {
                setPersons(persons.map(person => person.id === p.id? newPerson : person));
                setMessage(`Updated ${newPerson.name}`);
                message();
              });
          }
        } else {
          setMessage(`Information of ${p.name} has already been removed from the server`);
          message();
          setClassN("error")
        }
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
          id: `${persons.length+1}`
        };

        services
          .create(newPerson)
          .then(() => {
            setPersons(persons.concat(newPerson));
            setMessage(`Added ${newPerson.name}`);
            message();
          });
      }
    }
  
    return (
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={() => handleChange(event, setNewName)} /> </div>
        <div> number: <input value={newNumber} onChange={() => handleChange(event, setNewNumber)} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}