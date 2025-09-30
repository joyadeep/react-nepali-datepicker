import React from 'react'
import './style.css'
import { englishNo2Nep } from '../../NepaliDateConverter'

const Select = ({ options, value, setValue, year }) => {
    return (
        <select className='datepicker-select' value={value} onChange={(e) => { setValue(e.target.value) }}>
            {options.map((option, key) =>
                year ? <option key={key} value={englishNo2Nep(option)}>{option}</option> : <option key={key} value={key}>{option}</option>
            )}
        </select>
    )
}

export default Select
