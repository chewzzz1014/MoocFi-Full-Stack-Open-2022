import React from 'react'

export default function Output(props) {

    const { countries, handleClick } = props

    let countriesEle;

    if (countries.length > 10) {
        countriesEle = <p>To many matches, specify another filter</p>
    } else if (countries.length == 1) {
        const c = countries[0]
        countriesEle = (
            <div>
                <h1>{c.name.common || 'not found'}</h1>
                <p>capital {c.capital}</p>
                <p>area {c.area}</p>
                <br />
                <b>languages</b>
                <ul>
                    {Object.values(c.languages).map((l) => {
                        return <li>{l}</li>
                    })}
                </ul>
                <img src={c.flags.png} />
            </div>
        )
    }
    else if (countries.length <= 10) {
        countriesEle = countries.map((ele) => {
            return <p>{ele.name.common} <button onClick={handleClick} value={ele.name.common}>show</button></p>
        })
    }

    return (
        <div>
            {countriesEle}
        </div>
    )
}