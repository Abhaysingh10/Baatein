import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const AddFriend = (prop) => {
    const {friend_id, showModal, setshowModal} = prop;
    const {userInfo} = useSelector(state => state.login)
    // const [modalShow,  setshowModal] = useState(false)
    const handleClose = (second) => { 
        setshowModal(false)
     }

     const addFriend = () => { 
        axios.post('http://localhost:3000/add-friend',{
            owner_id:userInfo?.id,
            friend_id:friend_id
        }).then(()=>{}).catch((ex)=>{console.log(ex)})
      }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add this user as friend</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addFriend}>
                        Add 
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddFriend