import ScheduleHeader from './ScheduleHeader'
import ScheduleRow from './ScheduleRow.jsx';
import React from 'react';

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        let schedule = new Array(14).fill([]).map(() => new Array(7).fill({}));
        this.state = {
            schedule: schedule,
            deleteButtonVisible: false
        };
        this.deleteItemRef = React.createRef();
        this.addSchedule = this.addSchedule.bind(this);
        this.displayDeleteButton = this.displayDeleteButton.bind(this);
        this.hideDeleteButton = this.hideDeleteButton.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/schedule/1')
            .then(response => response.json())
            .then((data) => {
                this.setState(
                    {
                        schedule: this.processScheduleData(data),
                        selectedItem: null
                        }
                    )

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
                            scheduleForRow={this.state.schedule[index]}
                            key={hour + '' + index}
                            updateSchedule={this.updateSchedule}
                            addSchedule={this.addSchedule}
                            displayDeleteButton={this.displayDeleteButton}
                            hideDeleteButton={this.hideDeleteButton}
                            selectItem={this.selectItem}
                        />
                    })}
                    </tbody>
                </table>
                <div className="App-delete App-hidden"
                     ref={this.deleteItemRef}>
                    {/*<img src={process.env.PUBLIC_URL + '/garbage.svg'}/>*/}
                    <button
                        onClick={this.deleteSelectedItem}
                        className="App-button">
                            Delete item
                    </button>
                </div>
            </div>
        );
    }

    processScheduleData(data) {
        let scheduleArray = new Array(14).fill([]).map(() => new Array(7).fill({}));

        data.sort((a, b) => {return a.hour - b.hour});

        data.forEach((item) => {
            scheduleArray[item.hour - 7][item.day] = item;
            });

        return scheduleArray;
    }

    updateSchedule(hour, day, activity) {
    }

    addSchedule(hour, day, activity) {
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
            .then((data) => {
                let schedule = this.state.schedule;
                schedule[hour - 7][day] = {
                    id: data,
                    activity: activity,
                    hour: hour,
                    day: day
                }

                console.log(schedule[hour - 7][day])
                this.setState({schedule: schedule});
            });
    }

    displayDeleteButton(item) {
        this.deleteItemRef.current.classList.remove('App-hidden');
    }

    hideDeleteButton() {
        this.deleteItemRef.current.classList.add('App-hidden');
    }

    selectItem(item) {
        this.setState({selectedItem: item});
    }

    deleteSelectedItem() {
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8080/schedule/' + this.state.selectedItem.id, options)
            .then(response => {
                    console.log("removed item with id " + this.state.selectedItem.id);
                    let schedule = this.state.schedule;
                    schedule[this.state.selectedItem.hour - 7][this.state.selectedItem.day].id = -1;
                    schedule[this.state.selectedItem.hour - 7][this.state.selectedItem.day].activity = '';

                    this.setState({schedule: schedule});

            });
    }
}

export default Schedule;


