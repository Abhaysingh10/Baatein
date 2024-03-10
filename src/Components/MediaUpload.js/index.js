import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MediaUpload = ({show, setShow, imgUrl, onImageSent}) => {
  
  const handleClose = () => setShow(false);
  

   
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
          <Button variant="primary" onClick={onImageSent}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MediaUpload