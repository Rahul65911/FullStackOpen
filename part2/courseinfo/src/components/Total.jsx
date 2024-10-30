function Total({ parts }) {
    return (
      <p><b>
        Number of exercises: {parts.reduce((sum,p) => {
          console.log(p.exercises);
          return sum+p.exercises
          }, 0)}
      </b></p>
    )
}

export default Total;