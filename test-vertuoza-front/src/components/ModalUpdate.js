import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from "react";

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

export default function ModalUpdate(props) {
    const [error, setError] = useState(null);
    const handleClose = () => props.setShowUpdateModal(false);
    const handleUpdate = () => {
        const formSend = {
            "id" : props.idToUpdate,
            "firstname" : props.firstnameToUpdate,
            "lastname" : props.lastnameToUpdate,
            "address" : props.addressToUpdate,
            "cp" : props.cpToUpdate,
            "city" : props.cityToUpdate,
            "email" : props.emailToUpdate,
            "phone" : props.phoneToUpdate
        };
        fetch('http://localhost:3200/api/contact', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body : JSON.stringify(formSend)
        })
            .then(response => response.json())
            .then(json => {
                props.setListContact(null);
            })
            .catch(err => {
                setError(err.message);
            })
        props.setShowUpdateModal(false);
    }


    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.showUpdateModal}
                BackdropComponent={Backdrop}
            >
                <Box sx={style} id="box-modal">
                    <h2 id="unstyled-modal-title">Add a new contact</h2>

                    <TextField id="firstname" label="Firstname" variant="outlined" value={props.firstnameToUpdate} onChange={e => props.setFirstnameToUpdate(e.target.value)}/>
                    <TextField id="lastname" label="Lastname" variant="outlined" value={props.lastnameToUpdate} onChange={e => props.setLastnameToUpdate(e.target.value)} />
                    <TextField id="address" label="Address" variant="outlined" value={props.addressToUpdate} onChange={e => props.setAddressToUpdate(e.target.value)} />
                    <TextField id="cp" label="Postal Code" variant="outlined" value={props.cpToUpdate} onChange={e => props.setCpToUpdate(e.target.value)} />
                    <TextField id="city" label="City" variant="outlined" value={props.cityToUpdate} onChange={e => props.setCityToUpdate(e.target.value)} />
                    <TextField id="email" label="Mail" variant="outlined" value={props.emailToUpdate} onChange={e => props.setEmailToUpdate(e.target.value)} />
                    <TextField id="phone" label="Phone" variant="outlined" value={props.phoneToUpdate} onChange={e => props.setPhoneToUpdate(e.target.value)} />

                    <Button variant="outlined" onClick={handleClose} id="close"> Cancel</Button>
                    <Button variant="contained" onClick={handleUpdate} id="add"> Update Contact</Button>
                </Box>
            </StyledModal>
        </div>
    );
}