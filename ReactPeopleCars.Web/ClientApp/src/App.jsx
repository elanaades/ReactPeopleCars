import React from 'react';
import { Route} from 'react-router-dom';
import Layout from './Layout';
import AddPerson from './AddPerson';
import HomePage from './HomePage';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';

const App = () => {
        return (
            <Layout>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/AddPerson' component={AddPerson} />
                <Route exact path='/AddCar/:id' component={AddCar} />
                <Route exact path='/DeleteCars/:id' component={DeleteCars} />
            </Layout>
        )
    }

export default App;