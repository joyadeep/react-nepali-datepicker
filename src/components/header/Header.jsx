import React from 'react'
import './style.css'
import Select from '../Select/Select'
import { englishNo2Nep } from '../../NepaliDateConverter'
import previmg from '../../assets/left-arrow.svg';
import nextimg from '../../assets/right-arrow.svg';

const Header = ({ year, month, setyear, setmonth }) => {
    const months = ['बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'];
    const years = []
    for (let i = 2e3; i <= 2090; i++) {
        years.push(englishNo2Nep(i));
    }
    return (
        <div className='picker-header-container'>
            <div className={`prev-btn ${year <= 2e3 ? 'hide' : ''}`} onClick={() => { if (month == 0) { setmonth(11); setyear(year - 1); } else { setmonth(month - 1) } }}>
                <img src={previmg} height={15} alt='Previous Button' />
            </div>
            <div className='month-select'><Select options={months} value={month} setValue={setmonth} /></div>
            <div className='year-select'><Select options={years} year value={year} setValue={setyear} /></div>
            <div className={`next-btn ${year >= 2090 ? 'hide' : ''}`} onClick={() => { if (month == 11) { setmonth(0); setyear(year + 1); } else { setmonth(month + 1) } }}>
                <img src={nextimg} height={15} alt='Next Button' />
            </div>
        </div>
    )
}

export default Header
