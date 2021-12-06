import React, {useState} from 'react'

const ModalDropdownFilter = ({labelText, valueArray}) => {

    const [selection, setSelection] = useState("")

    let handleOnChange = (e) => {setSelection(e.target.value)}

    return (
        <div>
            <h4>{labelText}</h4>        
            <select onChange={(e)=>handleOnChange(e)}>
                <option value="Placeholder Option">Placeholder Option</option>
                {valueArray.map((selection) => <option value={selection}>{selection}</option>)}
            </select>   
        </div>
        )
    
}

export default ModalDropdownFilter
