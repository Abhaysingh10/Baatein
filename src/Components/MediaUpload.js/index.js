import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addMessages } from '../Chatpage/ChatpageReducers';

const MediaUpload = ({show, setShow, imgUrl, socket, selectedSocketId, fileDetails}) => {

  const dispatch = useDispatch()
  const { ownerInfo } = useSelector((state) => state.ownerInfo);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => { 


    socket.emit("private message", {
      content: fileDetails,
      to: selectedSocketId?.userID,
      senderId: ownerInfo?.id,
      receiverId: selectedSocketId?.user?.id,
      messageType: 'image',
      timestamp:Date.now()
    });


    dispatch(
      addMessages({
        content: imgUrl,
        senderId: ownerInfo?.id,
        messageType: 'image',
        timestamp:Date.now()
      })
    );
    handleClose()
   }

   useEffect(() => {

    
   
     return () => {
       
     }
   }, [imgUrl])
   
  return (
    <div> 
         <Modal show={show} onHide={handleClose} centered>
     
        <Modal.Body>
          <img src={imgUrl} alt='' style={{width:"100%"}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MediaUpload