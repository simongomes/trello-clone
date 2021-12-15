import { useState, useEffect } from "react";

const EditTask = ({ task, updateTask, closeEdit }) => {
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    labels: task.labels,
    members: task.members,
  });

  const [callRerender, setCallRerender] = useState(0);

  const [allMembers, setAllMembers] = useState([]);
  const allLebels = ["green", "yellow", "blue", "red"];

  useEffect(() => {
    const getMembers = JSON.parse(localStorage.getItem("members"));
    setAllMembers(getMembers);
  }, []);

  const { title, description, labels, members } = editedTask;

  const handleFieldValue = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const addMemberHandler = (index) => {
    const newAditedTask = editedTask;
    newAditedTask.members.push(index);
    setEditedTask(newAditedTask);
    setCallRerender(callRerender + 1);
  };

  const addLabelHandler = (label) => {
    const newAditedTask = editedTask;
    newAditedTask.labels.push(label);
    setEditedTask(newAditedTask);
    setCallRerender(callRerender + 1);
  };

  const updateTaskHandler = () => {
    updateTask(editedTask);
  };

  return (
    <div className="edit-task-wrapper" key={callRerender}>
      <div className="edit-task-container">
        <div className="edit-inputes">
          <input
            className="input-field title-input"
            type="text"
            name="title"
            value={title}
            onInput={handleFieldValue}
          />
          <textarea
            className="input-field title-input"
            name="description"
            value={description}
            onInput={handleFieldValue}
          ></textarea>
        </div>
        <div className="edit-actions">
          <div className="edit-assigns">
            <h4>Assigned To</h4>
            <div className="assign-contents">
              <div className="already-assigned">
                {allMembers.length &&
                  members.map((member, index) => (
                    <img
                      className="assigne-thumb"
                      src={allMembers[member].picture.thumbnail}
                      alt={
                        allMembers[member].name.first +
                        " " +
                        allMembers[member].name.first
                      }
                      title={
                        allMembers[member].name.first +
                        " " +
                        allMembers[member].name.first
                      }
                      key={index}
                    />
                  ))}
              </div>
              <div className="non-assigned">
                {allMembers.length &&
                  allMembers.map(
                    (member, index) =>
                      !members.includes(index) && (
                        <div
                          className="non-assigned-member"
                          key={index}
                          onClick={() => addMemberHandler(index)}
                        >
                          <img
                            className="assigne-thumb"
                            src={member.picture.thumbnail}
                            alt={member.name.first + " " + member.name.first}
                            title={member.name.first + " " + member.name.first}
                          />{" "}
                          <span className="member-name">
                            {member.name.first + " " + member.name.first}
                          </span>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
          <div className="edit-labels">
            <h4>Assigned To</h4>
            <div className="label-contents">
              <div className="already-assigned">
                <div className="task-labels">
                  {labels.map((label, i) => (
                    <span className={label} key={i}></span>
                  ))}
                </div>
              </div>
              <div className="non-assigned">
                {allLebels &&
                  allLebels.map(
                    (label, index) =>
                      !labels.includes(label) && (
                        <div
                          className={`label-block ${label}`}
                          onClick={() => addLabelHandler(label)}
                          key={index}
                        ></div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
        <button className="button button-primary" onClick={updateTaskHandler}>
          Save
        </button>
        <br />
        <button className="button button-secondary" onClick={closeEdit}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditTask;
