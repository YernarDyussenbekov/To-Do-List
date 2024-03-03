import "./styles.css";
import TRASH_BIN from "../Images/Trash bin.svg";
import MOVE_BACK from "../Images/BackToDo.svg";

export default function DeleteModal({ onFirstClick, onSecondClick }) {
  return (
    <div className="delete-modal">
      <button onClick={onFirstClick}>
        <img src={TRASH_BIN} alt="trash bin" />
        Delete Forever
      </button>
      <button onClick={onSecondClick}>
        <img src={MOVE_BACK} alt="move back icon" />
        Move From Trash
      </button>
    </div>
  );
}
