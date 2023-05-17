import React from 'react';
import { produce } from 'immer';
import axios from 'axios';


class AddPerson extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitPersonClick = async () => {
        await axios.post('/api/people/addperson', this.state.person);
        this.props.history.push('/');        
    }

    render() {
        return (

            <div className='row' style={{marginTop: '200px'} }>
                <div className="col-md-6 offset-md-3 card bg-light p-4">
                    <h2>Add a New Person</h2>
                    <input type="text" className="form-control" name="firstName" placeholder="First Name" onChange={this.onTextChange} value={this.state.personfirstName}/>
                    <br />
                    <input type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={this.onTextChange} value={this.state.person.lastName} />
                    <br />
                    <input type="text" className="form-control" name="age" placeholder="Age" onChange={this.onTextChange} value={this.state.person.age} />
                    <br />
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.onSubmitPersonClick}>Submit</button>
                </div>
            </div>
        )
    }
}

export default AddPerson;