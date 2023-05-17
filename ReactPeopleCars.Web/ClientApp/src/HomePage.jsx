import React from 'react';
import { Link } from 'react-router-dom';
import PersonRow from './PersonRow';
import axios from 'axios';
import { produce } from 'immer';

class HomePage extends React.Component {

    state = {
        people: [],
        cars: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            cars: []
        },
        //searchBarText: '',
        searchedPeople: []
    }

    componentDidMount = async () => {
        await this.refreshTable();
    }

    refreshTable = async () => {
        const response = await axios.get('/api/people/getpeople');
        const people = response.data;
        this.setState({ people });
    }

    onTextChange = e => {
        const searchBarText = e.target.value;
        this.setState({ searchBarText });
        const searchPeople = this.state.people.filter(person => person.firstName.toLowerCase().includes(searchBarText.toLowerCase()) || person.lastName.toLowerCase().includes(searchBarText.toLowerCase()))
        this.setState({ searchedPeople: searchPeople })
    }


    onClearClick = () => {
        this.setState({ searchBarText: '' })
    }

    

    render() {
        const peopleToList = this.state.searchedPeople.length > 0 ? this.state.searchedPeople : this.state.people;

        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <div >
                    <div className='row'>
                        <div className='col-md-10'>
                            <input className='form-control form-control-lg' type='text' placeholder='Search People' onChange={this.onTextChange} value={this.state.searchBarText} />
                        </div>
                        <div className='col-md-2'>
                            <button className='btn btn-dark btn-lg w-100' onClick={this.onClearClick}>Clear</button>
                        </div>
                        <div className='col-md-12' style={{ marginTop: '20px' }}>
                            <Link to='/AddPerson'>
                                <button className='btn btn-success btn-lg w-100'>Add Person</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <table className="table table-hover table-striped table-bordered" style={{marginTop: '20px'} }>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Car Count</th>
                            <th>Add Car</th>
                            <th>Delete Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peopleToList.map(p => <PersonRow key={p.id} person={p} />)}
                    </tbody>
                </table>

            </div>
        )
    }
}
export default HomePage;
