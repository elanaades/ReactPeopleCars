import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

class DeleteCars extends React.Component {

    state = {
        cars: [],
        id: '',
        //searchBarText: '',
        searchedCars: []
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getcarsbyid/${id}`);
        this.setState({
            cars: data,
            id: id,
        });
    }

    onNoClick = () => {
        this.props.history.push('/');
    }

    onYesClick = async () => {
        await axios.post(`/api/people/deletecars/${this.state.id}`);
        this.props.history.push('/');
    }

    onClearClick = () => {
        this.setState({ searchBarText: '' })
    }

    onTextChange = e => {
        const searchBarText = e.target.value;
        this.setState({ searchBarText });
        const searchCars = this.state.cars.filter(car =>
            car.make.toLowerCase().includes(searchBarText.toLowerCase()) ||
            car.model.toLowerCase().includes(searchBarText.toLowerCase()))
        this.setState({ searchedCars: searchCars })
    }

    render() {
        const carsToList = this.state.searchedCars.length > 0 ? this.state.searchedCars : this.state.cars;

        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <div >
                    <div className='row'>
                        <div className='col-md-10'>
                            <input className='form-control form-control-lg' type='text' placeholder='Search Cars' onChange={this.onTextChange} value={this.state.searchBarText} />
                        </div>
                        <div className='col-md-2'>
                            <button className='btn btn-dark btn-lg w-100' onClick={this.onClearClick}>Clear</button>
                        </div>
                    </div>
                </div>
                <table className="table table-hover table-striped table-bordered" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carsToList.map(c =>

                            <tr key={c.id}>
                                <td>{c.make}</td>
                                <td>{c.model}</td>
                                <td>{c.year}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2>Are you sure you want to delete all of these cars?</h2>
                        <div className='d-flex'>
                            <div className='col-md-6'>
                                <button className="btn btn-primary btn-lg w-100" style={{ marginRight: '5px' }} onClick={this.onNoClick}>No</button>
                            </div>
                            <div className='col-md-6'>
                                <button className="btn btn-danger btn-lg w-100" style={{marginLeft: '5px'}} onClick={this.onYesClick}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default DeleteCars;