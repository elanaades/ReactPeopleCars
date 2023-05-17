import React from 'react';
import { Link } from 'react-router-dom';

export default function PersonRow(props) {
    const { firstName, lastName, age, id, cars } = props.person;
    const carCount = cars ? cars.length : 0;

    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{carCount}</td>
            <td>
                <Link to={`/addcar/${id}`}>
                    <button className="btn btn-primary">Add Car</button>
                </Link>
            </td>
            <td>
                <Link to={`/deletecars/${id }`}>
                    <button style={{ marginLeft: 10 }} className="btn btn-danger">Delete Cars</button>
                </Link>
            </td>
        </tr>
    );
}