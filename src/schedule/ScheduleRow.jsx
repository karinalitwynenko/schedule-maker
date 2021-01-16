import React from 'react';

class ScheduleRow extends React.Component {
    previousContent = '';

    constructor(props) {
        super(props);
    }

    render() {
        let daysOfTheWeek = [];
        for (let i = 0; i < 7; i++) {
            daysOfTheWeek[i] = i;
        }

        return (
            <tr className='App-row' >
                <td className='App-hour' key={this.props.hour}>
                    {this.props.hour}
                </td>
                {daysOfTheWeek.map((day) => {
                    return <td contentEditable="true"
                               key={this.props.hour + day}
                               onFocus={(e) => this.handleOnFocus(e)}

                               onBlur={(e) => this.handleOnBlur(e, day)}>
                        {this.props.rowData === undefined ? "" : this.props.rowData.get(day)}

                    </td>
                })}
            </tr>

        );
    }

    handleOnFocus(e) {
        this.previousContent = e.target.innerHTML;
    }

    handleOnBlur(e, day) {
        if(this.previousContent.length === 0 && e.target.innerHTML.length !== 0) {
            this.props.addSchedule(this.props.hour, day, e.target.innerHTML);
        }
        else if(e.target.innerHTML.length !== 0 && e.target.innerHTML !== this.previousContent) {
            this.props.updateSchedule(this.props.hour, day, e.target.innerHTML);
            console.log("changed");

        }
    }

}

export default ScheduleRow;