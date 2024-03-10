import React, { useEffect, useRef, useState  } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "./Modal/modalReducer";
function VideoCall(props) {
  const { socket, recepientSocketId } = props;
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const { videoCallModal } = useSelector((state) => state.modal);
  // const [iceArray, setIceArray] = useState(null)
  const iceRef = useRef([]);
  const senderSocketRef = useRef()
  const [iceCandidates, setIceCandidates] = useState([]);
  const {  offerSdp, callResponse, senderSocketId } = useSelector(
    (state) => state.videoCall
  );
  const dispatch = useDispatch();
  const pc = useRef(new RTCPeerConnection(null));
  const recepientSocketIdRef = useRef(null)
  const handleClose = (second) => {
    dispatch(modalAction({ name: "videoCallModal", val: false }));
  };
  const getUserMedia = async() => {
    const contraints = {
      audio: true,
      video: true,
    };
    navigator.mediaDevices.getUserMedia(contraints).then((stream) => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => {
        // console.log("track", track)
        _pc.addTrack(track, stream);
      });
    });

    const _pc = new RTCPeerConnection(null);
    _pc.onicecandidate = (e) => {
      if (e.candidate != null) {
        setIceCandidates((prevCandidates) => [...prevCandidates, e.candidate]);
        socket.emit('candidate', {candidate:e.candidate, recepientSocketId:recepientSocketIdRef.current})
      }


    };

    _pc.oniceconnectionstatechange = (e) => {
      // console.log(e);
    };

    _pc.ontrack = (e) => {
      // remote video feed
      // console.log("e", e.streams[0])
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
    console.log("called RemoteDescription");
    pc.current.setRemoteDescription(new RTCSessionDescription(offerSdp)).then((data)=>{
      createAnswer();
    });
  };

  const addCandidate = (candidate) => {
    // console.log("candidate", candidate)
    candidate.map((candy) => {
      pc.current.addIceCandidate(new RTCIceCandidate(candy)).then(data =>{
      }).catch((err)=>{
        console.log("error", err)
      });
    })
    console.log("iceRef", iceRef.current)
    console.log("senderSocketRef", senderSocketRef)
    iceRef.current.length > 0 && socket.emit('answerIce',  {"answerIce": iceRef.current, "senderSocketId": senderSocketRef.current} )
  };

  const triggerIce = () => {
    // console.log("iceArray", iceRef.current, recepientSocketIdRef?.current);
    socket.emit("addIce", {
      iceCandidate: JSON.stringify(iceRef.current),
      recepientSocketId: recepientSocketIdRef?.current,
      senderSocketId:JSON.parse(localStorage.getItem("selfSocketId"))
      .userID
    });
  };


  useEffect(() => {

    const waitForGetUserMedia = async() =>{
      await getUserMedia();
      dispatch(modalAction({ name: "callNotification", val: false }));

      callResponse && setRemoteDescription();
    }
    
    videoCallModal && waitForGetUserMedia()

    return () => {};
  }, [videoCallModal, callResponse]);

  useEffect(() => {
    iceRef.current = iceCandidates
    return () => {
    }
  }, [iceCandidates])

  useEffect(() => {
    
    senderSocketRef.current = senderSocketId
  
    return () => {}
  }, [senderSocketId])
  
  


  useEffect(() => {
    socket.on("answerVideo", (data) => {
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

    socket.on('answerIce', data =>{
      console.log("answerIce",data)
      data?.map((ele)=>{
        pc.current.addIceCandidate(new RTCIceCandidate(ele)).then((data=>{})).catch((err)=>{
          console.log(err)
        })
      })
    })

    return () => {};
  }, [socket]);

  useEffect(() => {

    if (props != null || props != undefined) {
      recepientSocketIdRef.current = props.recepientSocketId
    }
  
    return () => {
      
    }
  }, [props])

  
  return (
    <div>
      <Modal
        className="modal-lg"
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
