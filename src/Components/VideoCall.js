import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "./Modal/modalReducer";
import { UnderlineOutlined } from "@ant-design/icons";
import { json } from "react-router-dom";

function VideoCall(props) {
  const { socket, recepientSocketId } = props;
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const { videoCallModal } = useSelector((state) => state.modal);
  // const [iceArray, setIceArray] = useState(null)
  const iceRef = useRef([]);
  const { offer, offerSdp, callResponse, senderSocketId } = useSelector(
    (state) => state.videoCall
  );
  const dispatch = useDispatch();
  const pc = useRef(new RTCPeerConnection(null));
  const recepientSocketIdRef = useRef(null)
  const textRef = useRef();
  const handleClose = (second) => {
    dispatch(modalAction({ name: "videoCallModal", val: false }));
  };
  const getUserMedia = () => {
    const contraints = {
      audio: false,
      video: true,
    };
    navigator.mediaDevices.getUserMedia(contraints).then((stream) => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => {
        _pc.addTrack(track, stream);
      });
    });

    const _pc = new RTCPeerConnection(null);
    _pc.onicecandidate = (e) => {
      // e.candidate && setIceArray(e.candidate)
      console.log("candidate", e.candidate)
      let iceArray = []
      if (e.candidate) {
        iceArray.push(e.candidate)
        socket.emit('candidate', {candidate:e.candidate, recepientSocketId:recepientSocketIdRef})
      }

      iceRef.current = iceArray

    };

    _pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    _pc.ontrack = (e) => {
      // remote video feed
      console.log("e", e.streams[0])
      remoteVideoRef.current.srcObject = e.streams[0];
    };

    pc.current = _pc;
  };

  const createOffer = async () => {
    pc.current
      .createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        // console.log(JSON.stringify(sdp));
        pc.current.setLocalDescription(sdp);
        socket.emit("offerVideo", {
          offer: sdp,
          recepientSocketId: recepientSocketId,
          senderSocketId: JSON.parse(localStorage.getItem("selfSocketId"))
            .userID,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAnswer = () => {
    // console.log("inside create answer");
    pc.current
      .createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
      .then((sdp) => {
        pc.current.setLocalDescription(sdp);
        socket.emit("answerVideo", {
          answer: sdp,
          recepientSocketId: recepientSocketId,
          senderSocketId: senderSocketId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setRemoteDescription = async () => {
    // console.log(offerSdp);
    await pc.current.setRemoteDescription(new RTCSessionDescription(offerSdp));
    createAnswer();
  };

  const addCandidate = (candidate) => {
    console.log("candidate", candidate)
    pc.current.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate))).then(data =>{
      console.log("completed", data)
    }).catch((err)=>{
      console.log("error", err)
    });
  };

  const triggerIce = () => {
    // console.log("iceArray", iceRef.current, recepientSocketIdRef?.current);
    socket.emit("addIce", {
      iceCandidate: JSON.stringify(iceRef.current),
      recepientSocketId: recepientSocketIdRef?.current,
    });
  };

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
        answer: answer,
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
    callResponse && setRemoteDescription();
    return () => {};
  }, [videoCallModal, callResponse]);

  useEffect(() => {
    socket.on("answerVideo", (data) => {
      // console.log("answerVideo", data.answer);
      pc.current
        .setRemoteDescription(new RTCSessionDescription(data?.answer))
        .then((data) => {
          // console.log("done setting remote description", iceRef.current);
          triggerIce();
        })
        .catch((err) => {
          // console.log("setRemoteDescription", err);
        });
    });

  

    socket.on("addIce", (data) => {
      addCandidate(data?.iceCandidate)
    });

    return () => {};
  }, [socket]);

  useEffect(() => {

    if (props != null || props != undefined) {
      recepientSocketIdRef.current = props.recepientSocketId
    }
  
    return () => {
      
    }
  }, [props])

  console.log("iceRef", iceRef.current)

  return (
    <div>
      <Modal
        className="modal-md"
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
                  height: "200px",
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
                  height: "200px",
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
              {/* <button
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
              </button> */}
              <div
                className="close-button mx-2"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                <i
                  className="bi bi-camera-video-fill"
                  onClick={createOffer}
                ></i>
              </div>
              <div
                className="close-button mx-2"
                style={{ backgroundColor: "white", color: "black" }}
              >
                <i className="bi bi-mic-fill"></i>
              </div>
              <div className="close-button mx-2">
                <i className="bi bi-telephone-x-fill"></i>
              </div>
            </div>
          </div>
{/* 
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
              <button className="mx-1" onClick={setRemoteDescription}>
                Set remote description
              </button>
              <button className="mx-1" onClick={addCandidate}>
                Set ICE
              </button>
            </div>
          </div> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoCall;
