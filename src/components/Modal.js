import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  handleClose,
  getPasswordInputs,
  addPasswords,
  handlePasswordClose,
}) {
  const closeModal = () => {
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close-icon">
            <AiOutlineCloseCircle onClick={closeModal} />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={"coral"}
          >
            Add Password
          </Typography>
          <input
            placeholder="Enter service"
            className="input-fields"
            onChange={getPasswordInputs}
            type="text"
            name="name"
          />
          <input
            placeholder="Enter your Password"
            className="input-fields"
            onChange={getPasswordInputs}
            name="password"
            type={"password"}
          />
          <button onClick={addPasswords} className="input-btn ">
            Add a password
          </button>
        </Box>
      </Modal>
    </div>
  );
}
