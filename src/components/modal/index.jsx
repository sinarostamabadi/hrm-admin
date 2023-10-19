import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const Modal = ({ state, onCloseModal, children }) => {
  // ---------- variables ----------
  const contentStyle = {
    background: "#fff",
    borderRadius: "10px",
    border: "none",
    maxHeight: "95vh",
    width: "850px",
    maxWidth: "95%",
    overflow: "visible",
    padding: "0",
    display: "flex",
    flexDirection: "column"
  };

  // ---------- render jsx ----------
  return (
    <Popup
      open={state}
      position="center center"
      modal
      onClose={onCloseModal}
      {...{ contentStyle }}
    >
      {children}
    </Popup>
  );
};
