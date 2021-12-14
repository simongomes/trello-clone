import { useState } from "react";
import Task from "./Task";

const List = ({
  items,
  item,
  index,
  addNewCardHandler,
  moveCardHandler,
  removeListItem,
}) => {
  const [createMode, setCreateMode] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const inputhandler = (e) => {
    const value = e.target.value;
    setNewCardTitle(value);
  };

  const addCardHandler = () => {
    if (!newCardTitle || newCardTitle === "") {
      return;
    }
    addNewCardHandler(newCardTitle, index);
  };
  const handleMoveCard = (cardIndex, listIndex, index) => {
    moveCardHandler(cardIndex, listIndex, index);
  };
  const removeListHandler = () => {
    removeListItem(index);
  };
  return (
    <div className="list-wrapper">
      <div className="list-header">
        <h4 className="list-title">{item.title}</h4>
      </div>
      <div className="tasks-wrapper">
        <span className="list-close-button" onClick={removeListHandler}>
          +
        </span>
        {item.tasks.map((task, i) => (
          <Task
            task={task}
            key={i}
            listIndex={index}
            taskIndex={i}
            items={items}
            handleMoveCard={handleMoveCard}
          />
        ))}
        <div className="create-task-wrapper">
          {!createMode && (
            <div className="create-button" onClick={() => setCreateMode(true)}>
              + Add a card
            </div>
          )}
          {createMode && (
            <div className="create-box">
              <textarea
                className="create-input-title"
                placeholder="Enter a title for the card..."
                value={newCardTitle}
                onInput={inputhandler}
              ></textarea>
              <button
                className="button button-primary"
                onClick={() => addCardHandler()}
              >
                Add card
              </button>
              <button
                className="button button-secondary"
                onClick={() => setCreateMode(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
