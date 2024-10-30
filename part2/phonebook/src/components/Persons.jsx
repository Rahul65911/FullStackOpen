export default function Persons({persons, deleteEntry}) {
    return (
      <>
        {persons.map(person => {
          return (
          <div key={person.id}>
            <p>{person.name}: {person.number} 
              <button type="button" onClick={() => deleteEntry(person.id, person.name)}>Delete</button>
            </p>
          </div>
        )})}
      </>
    )
}