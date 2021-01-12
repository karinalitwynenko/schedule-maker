import React from 'react';

class ScheduleRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hour: props.hour
        };
    }

    render() {
        return (
            <tr className='App-row'>
                <td className='App-hour'>
                    {this.props.hour}
                </td>
                <td>
                    M
                </td>
                <td >
                    T
                </td>
                <td >
                    W
                </td>
                <td >
                    T
                </td>
                <td >
                    F
                </td>
                <td >
                    S
                </td>
                <td >
                    S
                </td>

            </tr>

        );
    }
}

export default ScheduleRow;