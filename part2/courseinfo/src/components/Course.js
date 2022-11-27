import React from 'react'

export default function Course(props) {

    const courses = props.course

    const courseElement = courses.map((ele) => {
        const partsElements = ele.parts.map((ele) => {
            return <p>{`${ele.name} ${ele.exercises}`}</p>
        })

        const sum = ele.parts.reduce((acc, ele) =>
            acc + ele.exercises
            , 0)

        return (
            <div>
                <h2>{ele.name}</h2>
                {partsElements}
                <b>{`total of ${sum} exercises`}</b>
            </div>
        )
    })


    return (
        <div>
            <h1>Web development curriculum</h1>
            {courseElement}
        </div>
    )
}