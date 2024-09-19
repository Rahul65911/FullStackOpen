import React from 'react'
import { Children } from 'react'
import { useState } from 'react'

const Button = ({ text, setStatistics }) => {
    return (
        <button onClick={() => setStatistics(text)}>{text}</button>
    )
}

const StatisticLine = ({ text, value, text2 }) => <tr><td>{text}</td> <td>{value} {text2}</td></tr>

const Statistics = ({ good, bad, neutral }) => {
    const total = good + bad + neutral;

    if(total === 0) {
        return(
            <>
                <h2>Statistics</h2>
                <div>No feedback given</div>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <table>
                <StatisticLine text="good" value ={good} />
                <StatisticLine text="neutral" value ={neutral} />
                <StatisticLine text="bad" value ={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={(good*1+bad*-1)/(total)} />
                <StatisticLine text="positive" value={good/(total)*100} text2="%"/>
            </table>
        </>
    )
}

export default function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const setStatistics = (text) => {
        if(text === 'good') setGood(good+1);
        else if(text === 'bad') setBad(bad+1);
        else setNeutral(neutral+1);
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button text='good' setStatistics={setStatistics} />
            <Button text='neutral' setStatistics={setStatistics} />
            <Button text='bad' setStatistics={setStatistics} />
            
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}
