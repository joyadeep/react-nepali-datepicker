import DatePickerContainer from './layout/DatePickerContainer'
import './App.css'
import { useState, useEffect, useRef, forwardRef } from 'react';

const NepaliDatePicker = forwardRef(({ inputprops, disabled, className, month, value, maxdate, format, renderInput, onChange, name, onSelect, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const bsDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const validate = (v) => {
    if (v && v != '') {
      if (bsDateRegex.test(v)) {
        return v;
      } else {
        console.error("Invalid Date Format!");
        return '';
      }
    }
  }
  const [inputdate, setInputdate] = useState(value || '');
  const datePickerRef = useRef(null);

  useEffect(() => {
    setInputdate(validate(value) || '');
  }, [value]);

  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    if (inputdate != '' && inputdate) {
      if (!bsDateRegex.test(inputdate)) {
        // console.error("Invalid Date Format!");
        setInputdate('');
      }
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handlefocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  }
  const handlechange = (e) => {
    setInputdate(e.target.value);
  }

  const onSelectmain = (e) => {
    if (onSelect) {
      onSelect(e);
    }
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <>
      <div style={{
        position: 'relative', display: 'inline-block'
      }} className={className} ref={datePickerRef}>
        {renderInput ? renderInput({ value: inputdate, onChange: handlechange, onFocus: handlefocus, readOnly: true, ref: ref, ...props }) : <input ref={ref} disabled={disabled} type='text' onChange={handlechange} {...props} value={inputdate} onFocus={handlefocus} readOnly  {...inputprops} />}
        {isOpen && <div className='picker-container'>
          <DatePickerContainer Month={month} onSelect={onSelectmain} maxdate={maxdate} format={format} inputdate={inputdate} setIsOpen={setIsOpen} setInputdate={setInputdate} />
        </div>}
      </div>
    </>
  )
})

export default NepaliDatePicker
