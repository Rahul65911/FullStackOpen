import React from 'react';

function Header({ name }) {
  return (
    <h1>{name}</h1>
  )
}

function Part({ part, exercise }) {
  return(
    <p>
      {part}: {exercise}
    </p>
  )
}

function Content({ parts }) {
  return (
    <>
      {parts.map(({name,exercises}) => {
        return <Part part={name} exercise={exercises}/>;
      })}
    </>
  )
}

function Total({ parts }) {
  return (
    <p>
      Number of exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  )
}

export default function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header {...course} />
      <Content {...course} />
      <Total {...course} />
    </div>
  )
}
