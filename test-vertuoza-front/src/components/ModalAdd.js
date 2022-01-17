import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import '../assets/css/ModalAdd.css';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 700,
    height: 450,
    bgcolor: '#FFFFFF',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};

export default function ModalAdd(props) {
    const [error, setError] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [address, setAddress] = useState(null);
    const [cp, setCp] = useState(null);
    const [city, setCity] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const handleClose = () => props.setShowAddModal(false);
    const handleAdd = () => {
        const formSend = {
            "firstname" : {firstname},
            "lastname" : {lastname},
            "address" : {address},
            "cp" : {cp},
            "city" : {city},
            "email" : {email},
            "phone" : {phone}
        };
        fetch('http://localhost:3200/api/contact', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body : JSON.stringify(formSend)
        })
            .then(response => response.json())
            .then(json => {
                props.setListContact(null);
            })
            .catch(err => {
                setError(err.message);
            })
        props.setShowAddModal(false);
    }


    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.showAddModal}
                BackdropComponent={Backdrop}
            >
                <Box sx={style} id="box-modal">
                    <h2 id="unstyled-modal-title">Add a new contact</h2>

                    <TextField id="firstname" label="Firstname" variant="outlined" value={firstname} onChange={e => setFirstname(e.target.value)}/>
                    <TextField id="lastname" label="Lastname" variant="outlined" value={lastname} onChange={e => setLastname(e.target.value)} />
                    <TextField id="address" label="Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)} />
                    <TextField id="cp" label="Postal Code" variant="outlined" value={cp} onChange={e => setCp(e.target.value)} />
                    <TextField id="city" label="City" variant="outlined" value={city} onChange={e => setCity(e.target.value)} />
                    <TextField id="email" label="Mail" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField id="phone" label="Phone" variant="outlined" value={phone} onChange={e => setPhone(e.target.value)} />

                    <Button variant="outlined" onClick={handleClose} id="close"> Cancel</Button>
                    <Button variant="contained" onClick={handleAdd} id="add"> Add Contact</Button>
                </Box>
            </StyledModal>
        </div>
    );
}