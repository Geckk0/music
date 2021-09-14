import React, {useState} from "react"

function Search(){

    const [searchValue, searchValueUpdateMethod] = useState('')

    return <>
    <div id="search-page">
        <h1>Search</h1>
        <input value={searchValue} onChange={(e)=>searchValueUpdateMethod(e.target.value)}/>
        <div className="divider">a</div>
    </div>
    </>
}

export default Search