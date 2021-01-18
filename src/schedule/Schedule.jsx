import ScheduleHeader from './ScheduleHeader'
import ScheduleRow from './ScheduleRow.jsx';
import React from 'react';
import Api from '../Api'

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: new Array(14).fill([]).map(() => new Array(7).fill({})),
            deleteButtonVisible: false
        };

        this.deleteItemRef = React.createRef();
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.displayDeleteButton = this.displayDeleteButton.bind(this);
        this.hideDeleteButton = this.hideDeleteButton.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
        this.fetchSchedule = this.fetchSchedule.bind(this);
        this.clearScheduleData = this.clearScheduleData.bind(this);
    }

    render() {
        let hours = [];
        for (let i = 0; i < 14; i++) {
            hours[i] = i + 7;
        }

        return (
            <div className="App-schedule" >
                <table className="App-table">
                    <tbody>
                    <ScheduleHeader/>
                    {hours.map((hour, index) => {
                        return <ScheduleRow
                            hour={hour}
                            scheduleForRow={this.state.schedule[index]}
                            key={hour + '' + index}
                            updateSchedule={this.updateItem}
                            addSchedule={this.addItem}
                            displayDeleteButton={this.displayDeleteButton}
                            hideDeleteButton={this.hideDeleteButton}
                            selectItem={this.selectItem}
                        />
                    })}
                    </tbody>
                </table>
                <div className="App-delete App-hidden"
                     ref={this.deleteItemRef}>
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
        let scheduleArray = new Array(14).fill([]).map(() => new Array(7).fill({activity: ''}));

        data.sort((a, b) => {return a.hour - b.hour});

        data.forEach((item) => {
            scheduleArray[item.hour - 7][item.day] = item;
            });

        return scheduleArray;
    }

    updateItem(item, newActivity) {
        let token = Api.getToken();
        if(token === undefined)
            return;

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {
                    ...item,
                    activity: newActivity
                }
            )
        };
        fetch('/schedules', options)
            .then(response => response.json())
            .then((data) => {
                let schedule = this.state.schedule;
                schedule[item.hour - 7][item.day] = data;
                this.setState({schedule: schedule});

                console.log("Updated item with id " + item.id);

            });
    }

    addItem(hour, day, activity) {
        let token = Api.getToken();
        if(token === undefined)
            return;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {
                    username: this.props.username,
                    day: day,
                    hour: hour,
                    activity: activity
                    }
                )
        };
        fetch('/schedules', options)
            .then(response => response.json())
            .then((data) => {
                let schedule = this.state.schedule;
                schedule[hour - 7][day] = data;
                this.setState({schedule: schedule});
            });
    }

    displayDeleteButton() {
        this.deleteItemRef.current.classList.remove('App-hidden');
    }

    hideDeleteButton() {
        this.deleteItemRef.current.classList.add('App-hidden');
    }

    selectItem(item) {
        this.setState({selectedItem: item});
    }

    deleteSelectedItem() {
        let token = Api.getToken();
        if(token === undefined)
            return;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        fetch('/schedules/' + this.state.selectedItem.id, options)
            .then(response => {
                    console.log("Removed item with id " + this.state.selectedItem.id);
                    let schedule = this.state.schedule;
                    schedule[this.state.selectedItem.hour - 7][this.state.selectedItem.day].id = -1;
                    schedule[this.state.selectedItem.hour - 7][this.state.selectedItem.day].activity = '';
                    this.setState({schedule: schedule});
                    this.hideDeleteButton();
            });
    }


    fetchSchedule() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + Api.getToken()
            }
        };
        fetch('/schedules/' + this.props.username, options)
            .then(response => response.json())
            .then((data) => {
                this.setState(
                    {
                        schedule: this.processScheduleData(data),
                        selectedItem: null
                    }
                )
                console.log("Fetched " + data.length + " row(s) for user: " + this.props.username);

            })
            .catch(console.log)
    }

    clearScheduleData() {
        this.setState({
            schedule: new Array(14).fill([]).map(() => new Array(7).fill({}))
        })
    }

}

export default Schedule;


