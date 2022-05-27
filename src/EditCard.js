import { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function EditCard({ id, title, content, close, refresh }) {
  const [forms, setForms] = useState({
    name: "",
    notes: "",
  });

  const [editID, setEditID] = useState("");

  const onChangeHandle = (e) => {
    setForms({
      ...forms,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(forms);

      await axios.patch(`${API}/${editID}`, body, config);
      setForms({
        name: "",
        notes: "",
      });

      setEditID("");

      close();

      refresh();
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    setForms({
      name: title,
      notes: content,
    });
    setEditID(id);
  }, []);

  return (
    <>
      <div className="bgBlur"></div>
      <div className="modalCard">
        <form className="editForm" id="formInput" onSubmit={onSubmitHandle}>
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Task name"
            onChange={onChangeHandle}
            value={forms.name}
          />
          <label htmlFor="notes">Detail Task</label>
          <textarea
            name="notes"
            id="notes"
            placeholder="Detail task"
            onChange={onChangeHandle}
            value={forms.notes}
          />
          <div className="btnGroup">
            <button
              className="btnCancel"
              onClick={() => {
                setForms({
                  name: "",
                  notes: "",
                });
                setEditID("");
                close();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btnSave">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditCard;
