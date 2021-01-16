import ScheduleHeader from './ScheduleHeader'
import ScheduleRow from './ScheduleRow.jsx';
import React from 'react';

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = { schedule: new Map()};
    }

    componentDidMount() {
        fetch('http://localhost:8080/schedule/1')
            .then(response => response.json())
            .then((data) => {
                this.setState({schedule: this.processScheduleData(data)})

            })
            .catch(console.log)

    }

    render() {
        let hours = [];
        for (let i = 0; i < 14; i++) {
            hours[i] = i + 7;
        }

        return (
            <div>
                <button className="App-button App-save-button" onClick={this.saveSchedule}>
                    Save
                </button>
                <table className="App-schedule">
                    <tbody>
                    <ScheduleHeader/>
                    {hours.map((hour, index) => {
                        return <ScheduleRow
                            hour={hour}
                            rowData={this.state.schedule.get(hour)}
                            key={(hour + index + "")}
                            updateSchedule={this.updateSchedule}
                            addSchedule={this.addSchedule}
                        />
                    })}
                    </tbody>
                </table>
            </div>
        );
    }

    processScheduleData(data) {
        let scheduleMap = new Map();

        data.sort((a, b) => {return a.hour - b.hour});

        data.forEach(item => {
            if(!scheduleMap.has(item.hour))
                scheduleMap.set(item.hour, new Map())
            scheduleMap.get(item.hour).set(item.day, item.activity);
        });

        return scheduleMap;
    }

    updateSchedule(hour, day, activity) {
        console.log("callback " + hour + " " + day + " " + activity);
    }

    addSchedule(hour, day, activity) {
        console.log("callback " + hour + " " + day + " " + activity);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    userId: 1,
                    day: day,
                    hour: hour,
                    activity: activity
                    }
                )
        };
        fetch('http://localhost:8080/schedule', options)
            .then(response => response.json())
            .then((data) => {console.log(data)});
    }


}

export default Schedule;


