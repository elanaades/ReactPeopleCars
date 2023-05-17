import React from 'react';
import { produce } from 'immer';
import axios from 'axios';

class AddCar extends React.Component {

    state = {
        car: {
            make: '',
            model: '',
            year: '',
            personId: '',
        },
        name: '',

    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getpersonbyid/${id}`);
        this.setState({
            car:
            {
                personId: id,
            },
            name: data.firstName + ' ' + data.lastName
       })
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onSubmitCarClick = async () => {
        console.log(this.state.car);
        await axios.post('/api/people/addcar', this.state.car);
        this.props.history.push('/');
    }

    render() {
        return (

            <div className='row' style={{ marginTop: '200px' }}>
                <div className="col-md-6 offset-md-3 card bg-light p-4">
                    <h2 style={{marginBottom: '20px'} }>Add Car For {this.state.name}</h2>
                    <input type="text" className="form-control" name="make" placeholder="Make" onChange={this.onTextChange} />
                    <br />
                    <input type="text" className="form-control" name="model" placeholder="Model" onChange={this.onTextChange} />
                    <br />
                    <input type="text" className="form-control" name="year" placeholder="Year" onChange={this.onTextChange} />
                    <br />
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.onSubmitCarClick}>Submit</button>
                </div>
            </div>
        )
    }
}

export default AddCar;