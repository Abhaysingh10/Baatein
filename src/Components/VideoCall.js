import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "./Modal/modalReducer";

function VideoCall(props) {
  const { socket, recepientSocketId } = props;
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const {ownerInfo} = useSelector(state => state.ownerInfo)
  const { videoCallModal } = useSelector((state) => state.modal);
  const { offer,  offerSdp, callResponse } = useSelector(state => state.videoCall)
  const dispatch = useDispatch();

  const handleClose = (second) => {
    dispatch(modalAction({ name: "videoCallModal", val: false }));
  };


  useEffect(() => {
    if (callResponse) {
      enableVideo()
      answer()
    }
    return () => {}
  }, [callResponse])
  

const answer = async() => { 
  const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
  const peerConnection = new RTCPeerConnection(configuration)
    if (offer == "offer") {
      peerConnection.setRemoteDescription(new RTCSessionDescription(offerSdp))
      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)
      socket.emit("answerVideo", {"offer": answer?.type, "sdp":answer?.sdp, "recepientSocketId": recepientSocketId})

    }
 }


 const makeCall = async() => { 
  const configuration = {'iceServers':[{'urls': 'stun:stun.l.google.com:19302'}]}
  const peerConnection = new RTCPeerConnection(configuration)
  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)
  socket.emit("offerVideo", {"offer":  offer,  "recepientSocketId": recepientSocketId})
 }

  const enableVideo = async() => {
    console.log("here")
    const constraint = {
        video: true,
        audio: true
    }
    navigator.mediaDevices.getUserMedia(constraint)
    .then(stream => {
        localVideoRef.current.srcObject = stream
    }).catch(err =>{
        alert("error in stream !", err)
    })
  };

 

  return (
    <div>
      <Modal
        className="modal-xl"
        show={videoCallModal}
        onHide={() => handleClose(false)}
        //   dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body style={{ backgroundColor: "" }}>
          <div className="row p-1" style={{ backgroundColor: "" }}>
            <div className="col" style={{ backgroundColor: "" }}>
              <div
                className="remote-video"
                style={{
                  display: "flex",
                  backgroundColor: "black",
                  height: "400px",
                  borderRadius: "5px",
                }}
              >
                <video
                  id="remoteVideo"
                  ref={remoteVideoRef}
                  className="video"
                  autoPlay
                  style={{ maxWidth: "100%" }}
                ></video>
              </div>
            </div>
            <div className="col" style={{ backgroundColor: "" }}>
              <div
                className="self-video"
                style={{
                  display: "flex",
                  backgroundColor: "black",
                  height: "400px",
                  borderRadius: "5px",
                }}
              >
                <video
                  id="localVideo"
                  ref={localVideoRef}
                  className="video"
                  autoPlay
                  style={{ maxWidth: "100%" }}
                ></video>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div
              className="col"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className="close-button mx-2"
                style={{ backgroundColor: "white", color: "black", cursor:"pointer" }}
                 onClick={()=>{
                  enableVideo()
                  makeCall()

                }}
              >
                <i className="bi bi-camera-video-fill"></i>
              </div>
              <div
                className="close-button mx-2"
                style={{ backgroundColor: "white", color: "black" }}
              >
                <i className="bi bi-mic-fill"></i>
              </div>
              <div className="close-button mx-2">
                {/* End call ... */}
                <i class="bi bi-telephone-x-fill"></i>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoCall;
