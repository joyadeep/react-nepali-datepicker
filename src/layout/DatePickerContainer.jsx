import React from "react";
import Day from "../components/Day/Day";
import styles from "../style.module.css";
import Header from "../components/header/Header";
import {
  numberOfBsDays,
  englishNo2Nep,
  getDaynumberFromBsDate,
  getNepaliDate,
  getBSMonths,
  get2DigitNo,
  getBsday,
  getBsyear,
  getBsmonth,
} from "../NepaliDateConverter";

const DatePickerContainer = ({
  onSelect,
  Month,
  setInputdate,
  maxdate,
  inputdate,
  setIsOpen,
  format,
}) => {
  const today = getNepaliDate();
  const todayyear = getBsyear(today);
  const todaymonth = getBsmonth(today);
  const todayday = getBsday(today);
  const takendate = inputdate ? inputdate : today;
  const [year, setyear] = React.useState(getBsyear(takendate));
  const [month, setmonth] = React.useState(Month || getBsmonth(takendate));
  var skipday = getDaynumberFromBsDate(`${year}-${parseInt(month) + 1}-1`);
  var totalday = numberOfBsDays(year, month);
  const columns = 7;
  var rows = Math.ceil((totalday + skipday) / columns);
  const DayPick = (props) => {
    const date = `${props.year}-${get2DigitNo(
      parseInt(props.month) + 1
    )}-${get2DigitNo(props.engday)}`;
    if (maxdate && date && date > maxdate) {
      return <Day disabled {...props} />;
    } else {
      return <Day {...props} />;
    }
  };
  const table = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 1; j <= columns; j++) {
      const dataIndex = i * columns + j - skipday;
      if (i === 0 && j <= skipday) {
        row.push(<td key={dataIndex}></td>);
      } else if (dataIndex <= totalday) {
        if (year == todayyear && month == todaymonth && dataIndex == todayday) {
          row.push(
            <td key={dataIndex}>
              <DayPick
                onSelect={onSelect}
                format={format}
                day={englishNo2Nep(dataIndex)}
                setIsOpen={setIsOpen}
                engday={dataIndex}
                setInputdate={setInputdate}
                year={year}
                month={month}
                className={styles.today}
              />
            </td>
          );
        } else if (
          year == getBsyear(takendate) &&
          month == getBsmonth(takendate) &&
          dataIndex == getBsday(takendate)
        ) {
          row.push(
            <td key={dataIndex}>
              <DayPick
                onSelect={onSelect}
                format={format}
                day={englishNo2Nep(dataIndex)}
                setIsOpen={setIsOpen}
                engday={dataIndex}
                setInputdate={setInputdate}
                year={year}
                month={month}
                className={styles.dayselected}
              />
            </td>
          );
        } else {
          row.push(
            <td key={dataIndex}>
              <DayPick
                onSelect={onSelect}
                format={format}
                day={englishNo2Nep(dataIndex)}
                setIsOpen={setIsOpen}
                engday={dataIndex}
                setInputdate={setInputdate}
                year={year}
                month={month}
                className={styles.daynormal}
              />
            </td>
          );
        }
      } else {
        row.push(<td key={dataIndex}></td>);
      }
    }
    table.push(<tr key={i}>{row}</tr>);
  }

  return (
    <>
      <div>
        <Header
          year={year}
          month={month}
          setyear={setyear}
          setmonth={setmonth}
        />
      </div>
      <div className="datepicker-table">
        <table>
          <tbody>
            <tr>
              <th>आ</th>
              <th>सो</th>
              <th>मं</th>
              <th>बु</th>
              <th>बि</th>
              <th>शु</th>
              <th>शं</th>
            </tr>
            {table}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DatePickerContainer;
