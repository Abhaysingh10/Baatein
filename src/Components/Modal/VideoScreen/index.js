import React, { useEffect, useRef } from "react";
import {  Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../modalReducer.js";
// import ReactPlayer from "react-player";

const VideoScreen = () => {
  const { videoCallModal } = useSelector((state) => state.modal);
  const { activeChat } = useSelector(state => state.chat);
  const { socketInstance  } = useSelector(state => state.socketInstance) 
  const dispatch = useDispatch();
  // const [localStream, setLocalStream] = useState(null);
  // const [remoteStream, setRemoteStream] = useState(null);
  // const [peerConnection, setPeerConnection] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const handleClose = (second) => {
    dispatch(modalAction({ name: "videoCallModal", val: false }));
  };
  console.log("Inside",socketInstance?.connected)
  useEffect(() => {

    // Get local media stream (video and audio)
    if (videoCallModal) {
      const initWebRTC = async() =>{
        const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
        // setLocalStream(stream)
        localVideoRef.current.srcObject = stream
        const configuration = {iceServers:[{  urls : 'stun:stun.l.google.com:19302'}]}
        const peerConnection = new RTCPeerConnection(configuration)

        peerConnection.onicecandidate = (event) =>{
          if (event.candidate) {
            
          }
        }

        peerConnection.ontrack = (event)=>{
          // setRemoteStream(event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        }

        if (true) {
          console.log("Inside create offer", socketInstance?.connected)
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          socketInstance?.emit('offer', offer, activeChat)
        }
        
      
      }
      
      initWebRTC()

    }


    // Listen for WebRTC signaling events
    socketInstance?.on('offer', (offer, targetsocketId) => {
      // Handle offer and create answer
      // (use peerConnection.setRemoteDescription, createAnswer, etc.)
    });

    socketInstance?.on('answer', (answer) => {
      // Handle answer (use peerConnection.setRemoteDescription)
    });

    socketInstance?.on('ice-candidate', (candidate) => {
      // Handle ICE candidate (use peerConnection.addIceCandidate)
    });

    return () => {
      socketInstance?.disconnect();
    };
  }, [videoCallModal, activeChat, socketInstance]);


  return (
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
              <video id="remoteVideo" ref={remoteVideoRef} className="video" autoPlay style={{ maxWidth: "100%" }} ></video>
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
              <video id="localVideo" ref={localVideoRef} className="video" autoPlay style={{ maxWidth: "100%" }} ></video>

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
              style={{ backgroundColor: "white", color: "black" }}
            >
              <i class="bi bi-camera-video-fill"></i>
            </div>
            <div
              className="close-button mx-2"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <i class="bi bi-mic-fill"></i>
            </div>
            <div className="close-button mx-2">
              {/* End call ... */}
              <i class="bi bi-telephone-x-fill"></i>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoScreen
