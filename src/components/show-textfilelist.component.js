import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateFileListEntry = props => (
    <tr>
        <td>{props.createEntry.file_name}</td>
        <td>{props.createEntry.file_description}</td>
        <td>{props.createEntry.file_email}</td>
        <td><Link to={"/edit/" + props.createEntry._id}>View</Link></td>
    </tr>
)

export default class TextFileList extends Component{

    constructor(props){
        super(props);

        // Establish all bindings

        // Set the default state
        this.state = {fileEntries: []};
    }

    componentDidMount(){
        //alert("Email = " + this.props.match.params.email);
        axios.get('http://localhost:4000/mern1/search/'+this.props.match.params.email)
            .then(response => {
                this.setState({fileEntries: response.data});
            })
            .catch(function(error){
                console.log(error);
            });
    }

    componentDidUpdate(){
        //axios.get('http://localhost:4000/mern1')
        axios.get('http://localhost:4000/mern1/search/'+this.props.match.params.email)
            .then(response => {
                this.setState({fileEntries: response.data});
            })
            .catch(function(error){
                console.log(error);
            });
    }

     createFileList(){
        return this.state.fileEntries.map(
            function(currentFileList, i){
                return <CreateFileListEntry createEntry={currentFileList} key={i} />;
            }
        )
    }

    render(){
        return(
            <div>
                <h3>Audio to Text File List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <th>Name</th>
                        <th>Description</th>
                        <th>EMail</th>
                    </thead>
                    <tbody>
                        {this.createFileList()}
                    </tbody>
                </table>
            </div>
        );
    }
    
}