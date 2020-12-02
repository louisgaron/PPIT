import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import e from 'cors';


export class MovieItem extends React.Component {

    constructor(){
        super();

        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(){
        e.preventDefault();
        console.log("Delete: " + this.props.movie._id);

        axios.delete("http://localhost:4000/api/movies/" + this.props.movie._id)
        .then(() => {
            this.props.reloadData();
        })
        .catch();
    }

    render() {
        return (
            <div>
                {/*<h1>This is the Movie Item Component</h1> */}

                <Card>
                    <Card.Header> <h4>{this.props.movie.title}</h4></Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.poster} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                <p>{this.props.movie.year}</p>
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>
                    <Button variant = "danger" onClick = {this.DeleteMovie}>Delete</Button>
                </Card>

            </div>
        );
    }
}