import React from "react";

class ScheduleHeader extends React.Component {
    render() {
        return (
            <tr className='App-schedule-header'>
                <td></td>
                <td>Monday</td>
                <td>Tuesday</td>
                <td>Wednesday</td>
                <td>Thursday</td>
                <td>Friday</td>
                <td>Saturday</td>
                <td>Sunday</td>
            </tr>
        );
    }
}

export default ScheduleHeader;
