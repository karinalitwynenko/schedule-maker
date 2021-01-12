import ScheduleHeader from './ScheduleHeader'
import ScheduleRow from './ScheduleRow.jsx';
import React from 'react';

class Schedule extends React.Component {
    render() {
        let hours = [];
        for(let i = 0; i < 13; i++) {
            hours[i] = i + 7;
        }

        return (
            <table className="App-schedule">
                <ScheduleHeader />
                {hours.map((hour, index) => {
                    return <ScheduleRow hour={hour}></ScheduleRow>
                })}
            </table>

        );
    }
}

export default Schedule;


