import React from 'react'

export default function Notification(props) {

    const { type, msg } = props.notiMsg

    if (!msg) {
        return null
    }
    return (
        <div className={type}>
            {msg}
        </div>
    )
}