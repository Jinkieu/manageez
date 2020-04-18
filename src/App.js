import React, { Component } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import axios from 'axios';
import aws_exports from './aws-exports';

/*import { withAuthenticator } from "aws-amplify-react";*/
Amplify.configure(aws_exports);
axios.defaults.withCredentials = false;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get(`https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/employe`)
            .then(res => {
                const persons = res.data;
                const employees = persons.Employees;
                this.setState({ employees });
                console.log(employees);
            })
    }

    render() {

        return (
            <div>
                {this.state.employees.map((item, index) => {
                    return (
                        <div key={index}>
                            <li>ID : {item.ID_Employe}</li>
                            <li>Anciennete : {item.Anciennete}</li>
                            <li>Employe_name : {item.Employe_name}</li>
                            <li>Emploi : {item.Emploi}</li>
                            <li>Employe_surname : {item.Employe_surname}</li>
                        </div>)
                })}
            </div>
        )

    }
}

export default App;
