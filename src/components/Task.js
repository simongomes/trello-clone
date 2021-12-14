import { useState, useEffect } from "react";

const Task = ({ task }) => {
  const { title, description, labels, members } = task;

  const [taskMembers, setTaskMembers] = useState([]);

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

  return (
    <div className="task-item">
      <div className="task-labels">
        {labels.map((label) => (
          <span className={label}></span>
        ))}
      </div>
      <span className="task-title">{title}</span>
      <div className="task-members">
        {taskMembers &&
          taskMembers.map((member) => (
            <img src={member.picture.thumbnail} alt="user" />
          ))}
      </div>
    </div>
  );
};

export default Task;
