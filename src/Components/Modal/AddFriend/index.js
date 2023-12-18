import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsList } from '../../Chatpage/ChatpageAction';

const AddFriend = (prop) => {
    const {friend_id, showModal, setshowModal} = prop;
    const {ownerInfo} = useSelector(state => state.ownerInfo)
    const dispatch = useDispatch()
    // const [modalShow,  setshowModal] = useState(false)
    const handleClose = (second) => { 
        setshowModal(false)
     }

     const addFriend = () => { 
        axios.post('http://localhost:3000/add-friend',{
            owner_id:ownerInfo?.id,
            friend_id:friend_id
        }).then((data)=>{
            console.log("data", data)
            if (data?.status) {
                setshowModal(false)
                getFriendsList(ownerInfo?.id, dispatch)
            }
        }).catch((ex)=>{console.log(ex)})
      }
    return (
        <div
            // className="modal show"
            // style={{ display: 'block', position: 'initial' }}
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