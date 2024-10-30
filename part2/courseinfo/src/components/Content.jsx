import Part from './Part';

function Content({ parts }) {
    return (
      <>
        {parts.map(({name,exercises,id}) => {
          return <Part key={id} part={name} exercise={exercises}/>;
        })}
      </>
    )
}

export default Content;