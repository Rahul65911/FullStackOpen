import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./services/personDetails";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [list, setList] = useState([]);
  const [classN, setClassN] = useState("error");

  useEffect(() => {
    services.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const handleFilterChange = (e) => {
    if (e.target.value) {
      const filteredList = persons.filter((person) =>
        person.name.startsWith(e.target.value)
      );
      setList(filteredList);
    } else {
      setList([]);
    }
  };

  const deleteEntry = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      services.deleteEntry(id).then(() => {
        setPersons(persons.filter((person) => person.id != id));
        setClassN("error");
        setMessage(`Deleted`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} classN={classN} />
      <Filter list={list} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        setPersons={setPersons}
        persons={persons}
        setMessage={setMessage}
        setClassN={setClassN}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
