import '../assets/css/App.css';
import {useState, useEffect} from "react";
import Contact from "./Contact";
import Button from '@mui/material/Button';
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";

function App() {
  const [listContact, setListContact] = useState(null);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(false);
  const [firstnameToUpdate, setFirstnameToUpdate] = useState(null);
  const [lastnameToUpdate, setLastnameToUpdate] = useState(null);
  const [addressToUpdate, setAddressToUpdate] = useState(null);
  const [cpToUpdate, setCpToUpdate] = useState(null);
  const [cityToUpdate, setCityToUpdate] = useState(null);
  const [emailToUpdate, setEmailToUpdate] = useState(null);
  const [phoneToUpdate, setPhoneToUpdate] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3200/api/contact')
        .then(response => response.json())
        .then ((json => {
              setListContact(json);
        }))
        .catch(err => {
              setError(err.message);
              setListContact(undefined);
        })
  }, [listContact]);

  if (listContact) return (
      <main>
      {error ? <div>{error.message}</div> :
          <div>
          <Button variant="contained" onClick={() => setShowAddModal(true)}>Add a contact</Button>
              <table>
                  <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>City</th>
                        <th>Mail</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {listContact.map((elem) =>
                      <Contact key={elem.id} elem={elem} setListContact={setListContact} showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal}
                               setIdToUpdate={setIdToUpdate} setFirstnameToUpdate={setFirstnameToUpdate} setLastnameToUpdate={setLastnameToUpdate}
                               setAddressToUpdate={setAddressToUpdate} setCpToUpdate={setCpToUpdate} setCityToUpdate={setCityToUpdate}
                               setEmailToUpdate={setEmailToUpdate} setPhoneToUpdate={setPhoneToUpdate}/>
                  )}
                  </tbody>
              </table>
              {showAddModal && <ModalAdd showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>}
              {showUpdateModal && <ModalUpdate showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} idToUpdate={idToUpdate}
              setIdToUpdate={setIdToUpdate} firstnameToUpdate={firstnameToUpdate}
              setFirstnameToUpdate={setFirstnameToUpdate} lastnameToUpdate={lastnameToUpdate} setLastnameToUpdate={setLastnameToUpdate}
              addressToUpdate={addressToUpdate} setAddressToUpdate={setAddressToUpdate} cpToUpdate={cpToUpdate} setCpToUpdate={setCpToUpdate}
              cityToUpdate={cityToUpdate} setCityToUpdate={setCityToUpdate} emailToUpdate={emailToUpdate} setEmailToUpdate={setEmailToUpdate}
              phoneToUpdate={phoneToUpdate} setPhoneToUpdate={setPhoneToUpdate}/>}
          </div>
      }
      </main>
  );

  return (
    <div>
        Loading ....
    </div>
  );
}

export default App;
