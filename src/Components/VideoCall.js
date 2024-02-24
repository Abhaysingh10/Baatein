import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "./Modal/modalReducer";
import { UnderlineOutlined } from "@ant-design/icons";
import { json } from "react-router-dom";

function VideoCall(props) {
  const { socket, recepientSocketId } = props;
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const { ownerInfo } = useSelector((state) => state.ownerInfo);
  const { videoCallModal } = useSelector((state) => state.modal);
  const { offer, offerSdp, callResponse } = useSelector(
    (state) => state.videoCall
  );
  const dispatch = useDispatch();

  const handleClose = (second) => {
    dispatch(modalAction({ name: "videoCallModal", val: false }));
  };

  const pc = useRef(new RTCPeerConnection(null));
  const textRef = useRef()
  const getUserMedia = () => {
    const contraints = {
      audio: false,
      video: true,
    };
    navigator.mediaDevices.getUserMedia(contraints).then((stream) => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach(track =>{
        _pc.addTrack(track, stream)
      })
    });

    const _pc = new RTCPeerConnection(null);
    _pc.onicecandidate = (e) => {
      console.log(JSON.stringify(e.candidate));
    };

    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    _pc.ontrack = (e) => {
      // remote video feed
      console.log("getting stream", e)
      remoteVideoRef.current.srcObject = e.streams[0]
    };

    pc.current = _pc;
  };

  const createOffer = () => {
    pc.current
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAnswer = () => {
    pc.current
      .createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const setRemoteDescription = () => { 
    const sdp = JSON.parse(textRef.current.value)
    console.log(sdp)
    pc.current.setRemoteDescription(new RTCSessionDescription(sdp))
   }

   const addCandidate = () => { 
    const candidate = JSON.parse(textRef.current.value)
    console.log(candidate)
    pc.current.addIceCandidate(candidate)    
    }

  const answer = async () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const peerConnection = new RTCPeerConnection(configuration);
    if (offer == "offer") {
      peerConnection.setRemoteDescription(new RTCSessionDescription(offerSdp));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("answerVideo", {
        offer: answer?.type,
        sdp: answer?.sdp,
        recepientSocketId: recepientSocketId,
      });
    }
  };

  const makeCall = async () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const peerConnection = new RTCPeerConnection(configuration);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offerVideo", {
      offer: offer,
      recepientSocketId: recepientSocketId,
    });
  };

  useEffect(() => {
    videoCallModal && getUserMedia();
    return () => {};
  }, [videoCallModal]);

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
              <button
                onClick={() => {
                  createOffer();
                }}
              >
                Create offer
              </button>
              <button
                onClick={() => {
                  createAnswer();
                }}
                className="mx-2"
              >
                Create Answer
              </button>
              {/* <div
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
                style={{ backgroundColor: "white", color: "black" }}>
                <i className="bi bi-mic-fill"></i>
              </div>
              <div className="close-button mx-2">
                <i class="bi bi-telephone-x-fill"></i>
              </div> */}
            </div>
          </div>

          <div className="row mt-1">
            <div
              className="col"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <textarea ref={textRef}></textarea>
            </div>
          </div>
          <div className="row mt-1">
            <div
              className="col"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {/* <button>Set local description</button> */}
              <button className="mx-1" onClick={setRemoteDescription}>Set remote description</button>
              <button className="mx-1" onClick={addCandidate}>Set ICE</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoCall;