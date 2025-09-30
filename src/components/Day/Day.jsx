import React from 'react'
import styles from "../../style.module.css"
import { get2DigitNo } from '../../NepaliDateConverter'

const Day = ({ onSelect, className, day, engday, setIsOpen, month, year, setInputdate, format, disabled }) => {
    const handlesubmit = () => {
        setInputdate(`${year}-${get2DigitNo(parseInt(month) + 1)}-${get2DigitNo(engday)}`);
        if (onSelect) {
            onSelect(`${year}-${get2DigitNo(parseInt(month) + 1)}-${get2DigitNo(engday)}`);
        }
        setIsOpen(false);
    }
    return (
        <button disabled={disabled} className={`${styles.daybutton} ${className} ${disabled ? styles.daydiasbled : ''}`} onClick={handlesubmit}>{day}</button>
    )
}

export default Day
