export default function Filter({list, handleFilterChange}) {
    return (
        <>
        <div>filter shown with <input type="text" onChange={handleFilterChange}/></div>
        <div>
            {list.map(item => {
            return <p key={item.id}>{item.name}: {item.number}</p>
            })}
        </div>
        </>
    )
}