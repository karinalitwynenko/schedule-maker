class Api {
    static logIn(login, password, callback) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${login}&password=${password}`
        };

        fetch('/public/users/login', options)
            .then(response => {
                if(!response.ok)
                    throw Error(response.statusText)
                else
                    return response.text()
            })
            .then((token) => {
                document.cookie = `token=${token};max-age=1800`
                localStorage.setItem('username', login);
                callback('success');
            })
            .catch(function(error) {
                callback('failed');
                console.log(error);
            });
    }

    static register(login, password, callback) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${login}&password=${password}`
        };

        fetch('/public/users/register', options)
            .then(response => {
                if(!response.ok)
                    throw Error(response.statusText)
                else
                    return  response.text()
            })
            .then((token) => {
                document.cookie = `token=${token};max-age=1800`
                localStorage.setItem('username', login);
                callback('success');
            })
            .catch(function(error) {
                callback('failed');
                console.log(error);
            });
    }

    static updateScheduleItem(item, newActivity, callback) {
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    ...item,
                    activity: newActivity
                }
            )
        };
        fetch('http://localhost:8080/schedule', options)
            .then(response => response.json())
            .then((data) => {
                callback(data);
            });
    }

    static getToken() {
        const cookies = `;${document.cookie}`;
        const parts = cookies.split(`;token=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    static removeToken() {
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }

}

export default Api;