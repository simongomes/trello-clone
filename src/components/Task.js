import { useState, useEffect } from "react";

const Task = ({ task, items, listIndex, taskIndex, handleMoveCard }) => {
  const { title, description, labels, members } = task;

  const [taskMembers, setTaskMembers] = useState([]);
  const [showMove, setShowMove] = useState(false);

  useEffect(() => {
    async function setMembers() {
      const storageMembers = await JSON.parse(localStorage.getItem("members"));

      setTaskMembers(
        storageMembers.filter((member, index) => {
          return members.includes(index);
        })
      );
    }
    setMembers();
  }, []);

  const moveCardHandler = (taskIndex, listIndex, index) => {
    if (listIndex === index) return;
    handleMoveCard(taskIndex, listIndex, index);
    setShowMove(false);
  };

  return (
    <div className="task-item">
      <div className="task-labels">
        {labels.map((label, i) => (
          <span className={label} key={i}></span>
        ))}
      </div>
      <div className="move-wrapper">
        <div className="move-button" onClick={() => setShowMove(true)}>
          Move
        </div>
        {showMove && (
          <div
            className="move-item-wrapper"
            onMouseLeave={() => setShowMove(false)}
          >
            {items &&
              items.map(
                (item, index) =>
                  index !== listIndex && (
                    <div
                      className="move-item"
                      key={index}
                      onClick={() =>
                        moveCardHandler(taskIndex, listIndex, index)
                      }
                    >
                      {item.title}
                    </div>
                  )
              )}
          </div>
        )}
      </div>
      <span className="task-title">{title}</span>
      <div className="task-members">
        {taskMembers &&
          taskMembers.map((member, i) => (
            <img src={member.picture.thumbnail} key={i} alt="user" />
          ))}
      </div>
    </div>
  );
};

export default Task;
