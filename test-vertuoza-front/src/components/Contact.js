import deleteIcon from '../assets/img/delete.png';
import editIcon from '../assets/img/edit.png';
import {useState} from "react";

function Contact(props) {
    const [error, setError] = useState(null);
    let formSend= '{"id" : "' + props.elem.id + '"}';
    return(
        <tr>
            <td>{props.elem.firstname}</td>
            <td>{props.elem.lastname}</td>
            <td>{props.elem.address}</td>
            <td>{props.elem.cp}</td>
            <td>{props.elem.city}</td>
            <td>{props.elem.email}</td>
            <td>{props.elem.phone}</td>
            <td>
                <img src={deleteIcon} alt="delete" onClick={
                    () => {
                        fetch('http://localhost:3200/api/contact', {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            method: "DELETE",
                            body : formSend
                        })
                            .then(response => response.json())
                            .then(json => {
                                props.setListContact(null);
                            })
                            .catch(err => {
                                setError(err.message);
                            })
                    }
                }/>
                <img src={editIcon} alt="edit" onClick={() => {
                    props.setShowUpdateModal(true);
                    props.setIdToUpdate(props.elem.id);
                    props.setFirstnameToUpdate(props.elem.firstname);
                    props.setLastnameToUpdate(props.elem.lastname);
                    props.setAddressToUpdate(props.elem.address);
                    props.setCpToUpdate(props.elem.cp);
                    props.setCityToUpdate(props.elem.city);
                    props.setEmailToUpdate(props.elem.email);
                    props.setPhoneToUpdate(props.elem.phone);
                }}/>
            </td>
        </tr>
    );
}

export default Contact;