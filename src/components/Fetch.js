import React from 'react'

const Fetch = (props) => {
    return(
    <form onSubmit={props.fetcher}>
        <input type="text" onChange={props.changeHandler} value={props.inputValue}/>
    </form>
    )
}

export default Fetch