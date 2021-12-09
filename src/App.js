import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const baseUrl = "http://localhost:8080/api/user"
  const [input, setInput] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserList();
  }, [])

  function changeText(e){
    e.preventDefault();
    setInput(e.target.value)
    console.log(input)
  }

  async function getUserList() {
    await axios
      .get(baseUrl + "/list")
      .then((res) => {
        setUserList(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function insertUser(e){
    e.preventDefault();

    const insertUser = async() => {
      await axios
        .post(baseUrl + "/insert", {
          name: input
        })
        .then((res) => {
          console.log(res.data)
          setInput("");
          getUserList();
        })
        .catch((error) => {
          console.log(error);
        })
    }
    insertUser();
    console.log("유저가 추가됨!");
  }

  function deleteUser(id) {
    const deleteUser = async() => {
      await axios
        .delete(baseUrl + "/delete/" + id, {})
        .then((res) => {
          //getUserList();
          setUserList(
            userList.filter((user) => user.id !== id)
          )
        })
        .catch((error) => {
          console.log(error);
        })
    }
    deleteUser();
  }

  return (
    <div className="App">
      <h1>유저목록</h1>
      <form onSubmit={insertUser}>
        <label>
          User &nbsp;
          <input type="text" required={true} value={input} onChange={changeText}/>
        </label>
        <input type="submit" value="등록"></input>
      </form>
      {
        userList 
        ? userList.map((user) => {
          return (
            <div className="user" key={user.id}>
              <h3>
                <label>
                  {user.name}
                </label>
                <label onClick={() => deleteUser(user.id)}>&nbsp;&nbsp;&nbsp;❌</label>
              </h3>
            </div>
          )
        })
        : null
      }
    </div>
  );
}

export default App;