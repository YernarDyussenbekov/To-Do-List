import "./styles.css";
import PLUS_SIGN from "./Images/Plus Math.svg";
import { useState, useEffect } from "react";
import TASK_DOTS from "./Images/Vector.svg";
import Modal from "./Modal";
import DeleteModal from "./Modal/DeleteModal";
import MoveToTrashModal from "./Modal/MoveToTrashModal";

const localStorageKey = "todoList";

export default function Main() {
  const [items, setItems] = useState(() => {
    const storedData = localStorage.getItem(localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  });
  const [filter, setFilter] = useState("To Do");
  const [isAddModalShown, setIsAddModalShown] = useState(false);
  const [isActiveToDo, setIsActiveToDo] = useState(true);
  const [isActiveDone, setIsActiveDone] = useState(false);
  const [isActiveTrash, setIsActiveTrash] = useState(false);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [items]);

  const selectToDo = () => {
    setIsActiveToDo(true);
    setIsActiveDone(false);
    setIsActiveTrash(false);
  };
  const selectDone = () => {
    setIsActiveToDo(false);
    setIsActiveDone(true);
    setIsActiveTrash(false);
  };
  const selectTrash = () => {
    setIsActiveToDo(false);
    setIsActiveDone(false);
    setIsActiveTrash(true);
  };

  const openAddModal = () => {
    setIsAddModalShown(!isAddModalShown);
  };

  const handleCheck = (keyFromCheck) => {
    const index = items.findIndex((item) => item.id === keyFromCheck);
    const oldObject = items[index];
    if (oldObject.type === "Trash") {
      setItems(items);
    } else {
      if (oldObject.type === "To Do") {
        const newObject = { ...oldObject };
        newObject.checked = true;
        newObject.type = "Done";
        const leftPart = items.slice(0, index);
        const rightPart = items.slice(index + 1, items.length);
        const newItems = [...leftPart, newObject, ...rightPart];
        return setItems(newItems);
      }
      if (oldObject.type === "Done") {
        const newObject = { ...oldObject };
        newObject.checked = false;
        newObject.type = "To Do";
        const leftPart = items.slice(0, index);
        const rightPart = items.slice(index + 1, items.length);
        const newItems = [...leftPart, newObject, ...rightPart];
        return setItems(newItems);
      }
    }
  };

  const handleModal = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    items.forEach((item) => (item.isModalOpen = false));
    newObject.isModalOpen = !newObject.isModalOpen;
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, newObject, ...rightPart];
    return setItems(newItems);
  };

  const addToDo = (todo) => {
    const newItem = {
      id: generateUniqueId(),
      content: todo,
      type: "To Do",
      checked: false,
    };
    return setItems([newItem, ...items]);
  };

  const handleMoveClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    newObject.type = "Trash";
    newObject.isModalOpen = false;
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, newObject, ...rightPart];
    setItems(newItems);
  };

  const handleFirstClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, ...rightPart];
    setItems(newItems);
  };

  const handleSecondClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    if (newObject.checked === true) {
      newObject.type = "Done";
      newObject.isModalOpen = false;
      const leftPart = items.slice(0, index);
      const rightPart = items.slice(index + 1, items.length);
      const newItems = [...leftPart, newObject, ...rightPart];
      setItems(newItems);
    } else {
      newObject.type = "To Do";
      newObject.isModalOpen = false;
      const leftPart = items.slice(0, index);
      const rightPart = items.slice(index + 1, items.length);
      const newItems = [...leftPart, newObject, ...rightPart];
      setItems(newItems);
    }
  };

  const filteredData = items.filter((item) => {
    if (filter === "To Do") {
      return item.type === "Done" || item.type === "To Do";
    } else if (filter === "Done") {
      return item.type === "Done";
    } else {
      return item.type === "Trash";
    }
  });

  document.title = filter;

  function compare(a, b) {
    if (a.checked < b.checked) {
      return -1;
    }
    if (a.checked > b.checked) {
      return 1;
    }
    return 0;
  }

  const sortedData = filteredData.sort(compare);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  return (
    <div className="main">
      <div className="top-buttons">
        <div className="top-left-buttons">
          <button
            className="categories"
            style={{
              backgroundColor: isActiveToDo
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
              color: isActiveToDo ? "white" : "",
            }}
            onClick={() => {
              selectToDo();
              setFilter("To Do");
            }}
          >
            To Do
          </button>
          <button
            className="categories"
            style={{
              backgroundColor: isActiveDone
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
              color: isActiveDone ? "white" : "",
            }}
            onClick={() => {
              selectDone();
              setFilter("Done");
            }}
          >
            Done
          </button>
          <button
            className="categories"
            style={{
              backgroundColor: isActiveTrash
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
              color: isActiveTrash ? "white" : "",
            }}
            onClick={() => {
              selectTrash();
              setFilter("Trash");
            }}
          >
            Trash
          </button>
        </div>
        <div>
          <button
            className="add-button"
            onClick={openAddModal}
            style={{ transform: isAddModalShown ? "rotate(45deg)" : "" }}
          >
            <img src={PLUS_SIGN} alt="plus" />
          </button>
          {isAddModalShown && (
            <Modal addToDo={addToDo} closeModal={openAddModal} />
          )}
        </div>
      </div>
      <div className="window-title">
        <h4 className="title-text">{filter}</h4>
      </div>
      <div className="task-list">
        {sortedData.map((item) => (
          <div className="task" key={item.id}>
            <div className="modal-container">
              <button
                className="task-dots-button"
                onClick={() => {
                  handleModal(item.id);
                }}
              >
                <img
                  className="task-dots-img"
                  src={TASK_DOTS}
                  alt="task menu"
                />
              </button>
              {item.isModalOpen &&
              (item.type === "To Do" || item.type === "Done") ? (
                <MoveToTrashModal
                  onClick={() => {
                    handleMoveClick(item.id);
                  }}
                />
              ) : item.isModalOpen && item.type === "Trash" ? (
                <DeleteModal
                  onFirstClick={() => handleFirstClick(item.id)}
                  onSecondClick={() => handleSecondClick(item.id)}
                />
              ) : (
                ""
              )}
            </div>

            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => {
                handleCheck(item.id);
              }}
            />
            <label className="task-text">{item.content}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
