import React from "react";
import {  Modal, Row } from "react-bootstrap";
import acceptCall from "./../../Assest/Image/accept-call.png";
import rejectCall from "./../../Assest/Image/reject-call.png";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "./modalReducer";
import { setCallResponse } from "../videoCallReducer";
function CallNotification() {
    

  const { callNotification } = useSelector((state) => state.modal);
  const dispatch = useDispatch()
  const callAccepted = () => { 
    dispatch(setCallResponse(true))
    dispatch(modalAction({ name: "videoCallModal", val: true }));
   }

   const callRejected = () => { 
    dispatch(setCallResponse(false))
    dispatch(modalAction({ name: "callNotification", val: false }));
    
    }


  return (
    <div className="animate__animated animate__bounce animate__faster">
      <Modal
        size="sm"
        show={callNotification}
        // onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Incoming call
          </Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <Row>
          <div className="col-8">From Abhay</div>
            <div className="col-2">
              <div>
                <img
                  src={acceptCall}
                  width="24px"
                  height="24px"
                  alt="incoming call"
                  onClick={callAccepted}
                />
              </div>
            </div>
            <div className="col-2">
              <img
                src={rejectCall}
                width="24px"
                height="24px"
                alt="incoming call"
                onClick={callRejected}
              />
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CallNotification;
