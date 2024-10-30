import Header from './Header';
import Content from './Content';
import Total from './Total';

function Course({ courses }) {
    return (
        <>
        {courses.map((course,i) => {
            return (
            <div key={i}>
            <Header {...course} />
            <Content {...course} />
            <Total {...course} />
            </div>
            )
        })}
        </>
    )
}

export default Course;