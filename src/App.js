import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import notfound from "./404.svg";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [form, setForm] = useState({
    name: "",
    notes: "",
  });
  const [search, setSearch] = useState("");

  const [todo, setTodo] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${API}`);

      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandle = (e) => {
    setForm({
      ...form,
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

      const body = JSON.stringify(form);

      await axios.post(`${API}`, body, config);
      setForm({
        name: "",
        notes: "",
      });

      inputReset();
      getTodos();
    } catch (error) {
      console.log("Error");
    }
  };

  const inputReset = () => {
    document.getElementById("formInput").reset();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="Left">
        <div className="card">
          <form className="form" id="formInput" onSubmit={onSubmitHandle}>
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Task name"
              onChange={onChangeHandle}
            />
            <label htmlFor="notes">Detail Task</label>
            <textarea
              name="notes"
              id="notes"
              placeholder="Detail task"
              onChange={onChangeHandle}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="Right">
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Find Task"
            name="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="todoContainer">
          {todo.length !== 0 ? (
            <>
              {todo
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                    val.notes.toLowerCase().includes(search.toLocaleLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item, index) => (
                  <Card item={item} key={index} refresh={getTodos} />
                ))}
            </>
          ) : (
            <div className="notfound">
              <img src={notfound} alt={notfound} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
