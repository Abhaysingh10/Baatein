import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../modalReducer";

export const VideoScreen = () => {
  const { videoCallModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = (second) => {
    dispatch(modalAction({ name: "videoCallModal", val: false }));
  };

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
              className="self-video"
              style={{
                backgroundColor: "black",
                height: "400px",
                borderRadius: "5px",
              }}
            ></div>
          </div>
          <div className="col" style={{ backgroundColor: "" }}>
            <div
              className="other-video"
              style={{
                backgroundColor: "black",
                height: "400px",
                borderRadius: "5px",
              }}
            ></div>
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
