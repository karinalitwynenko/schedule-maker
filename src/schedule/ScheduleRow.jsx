import React from 'react';

class ScheduleRow extends React.Component {
    previousContent = '';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className='App-row' >
                <td className='App-hour' key={this.props.hour}>
                    {this.props.hour}
                </td>
                {this.props.scheduleForRow.map((item, day) => {
                    return <td
                               suppressContentEditableWarning='true'
                               contentEditable='true'
                               key={this.props.hour + '' + day}
                               onFocus={(e) => this.handleOnFocus(e, day)}
                               onBlur={(e) => this.handleOnBlur(e, day)}>

                        {item.activity}
                    </td>
                    })
                }
            </tr>

        );
    }

    handleOnFocus(e, day) {
        this.previousContent = e.target.innerText.trim();
        // if item id is specified, delete option should be available
        if(this.props.scheduleForRow[day].id !== undefined) {
            this.props.selectItem(this.props.scheduleForRow[day]);
            this.props.displayDeleteButton();
        }
    }

    handleOnBlur(e, day) {
        let content = e.target.innerText.trim();

        if(this.previousContent.length === 0 && content.length !== 0) {
            this.props.addSchedule(this.props.hour, day, content);
        }
        else if(content.length !== 0 && content !== this.previousContent) {
            this.props.updateSchedule(this.props.scheduleForRow[day], content);
        }

        if(!e.relatedTarget || e.relatedTarget.className !== 'App-button') {
            this.props.hideDeleteButton();
        }
    }

}

export default ScheduleRow;