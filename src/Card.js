import "./Card.css";
import axios from "axios";
import edit from "./edit.svg";
import { useState } from "react";
import EditCard from "./EditCard";

const API = process.env.REACT_APP_API_URL;

function Card({ item, refresh }) {
  const [modalView, setModalView] = useState(null);

  const done = { isDone: 1 };

  const delTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const setIsDone = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(done);

      await axios.patch(`${API}/${id}`, body, config);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (title, content) => {
    const modal = (
      <>
        <div className="bgBlur" onClick={() => setModalView(null)}></div>
        <div className="modalCard">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </>
    );

    setModalView(modal);
  };

  const editModalShow = (id, title, content) => {
    const modal = (
      <EditCard
        id={id}
        title={title}
        content={content}
        close={() => setModalView(null)}
        refresh={() => refresh()}
      />
    );

    setModalView(modal);
  };

  return (
    <>
      {modalView ? modalView : <></>}
      <div className="container">
        <div className="menuBox">
          {item.isDone === 0 ? (
            <>
              <div
                className="edit"
                onClick={() => editModalShow(item._id, item.name, item.notes)}
              >
                <img src={edit} alt={edit} />
              </div>
              <p className="check" onClick={() => setIsDone(item._id)}>
                {" "}
                &#10003;
              </p>
            </>
          ) : (
            <></>
          )}
          <p className="close" onClick={() => delTodo(item._id)}>
            X
          </p>
        </div>
        <div className="title">
          <h1
            style={{
              textDecoration: item.isDone === 1 ? "line-through" : "none",
            }}
          >
            {item.name}
          </h1>
        </div>
        <div className="content">
          <p
            style={{
              textDecoration: item.isDone === 1 ? "line-through" : "none",
            }}
          >
            {item.notes}
          </p>
        </div>
        <div
          className="detail"
          onClick={() => showModal(item.name, item.notes)}
        >
          <p>Detail</p>
        </div>
      </div>
    </>
  );
}

export default Card;
