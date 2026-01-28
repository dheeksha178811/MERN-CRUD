import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = process.env.API_URL || "http://localhost:4000/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get(API);
    setPosts(res.data);
  };

  const addOrUpdatePost = async () => {
    if (!name || !email || !rollNo || !department || !age) return;

    if (editId) {
      await axios.put(`${API}/${editId}`, { name, email, rollNo, department, age });
      setEditId(null);
    } else {
      await axios.post(API, { name, email, rollNo, department, age });
    }

    setName("");
    setEmail("");
    setRollNo("");
    setDepartment("");
    setAge("");
    fetchPosts();
  };

  const editPost = (post) => {
    setName(post.name);
    setEmail(post.email);
    setRollNo(post.rollNo);
    setDepartment(post.department);
    setAge(post.age);
    setEditId(post._id);
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchPosts();
  };

  return (
    <div className="container">
      <h1>MERN CRUD APPLICATION</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLL NO</th>
            <th>DEPARTMENT</th>
            <th>AGE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.name}</td>
              <td>{post.email}</td>
              <td>{post.rollNo}</td>
              <td>{post.department}</td>
              <td>{post.age}</td>
              <td>
                <button className="edit" onClick={() => editPost(post)}>Edit</button>
                <button className="delete" onClick={() => deletePost(post._id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input
                placeholder="Enter name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Enter roll no"
                value={rollNo}
                onChange={e => setRollNo(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Enter department"
                value={department}
                onChange={e => setDepartment(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Enter age"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </td>
            <td>
              <button className="add" onClick={addOrUpdatePost}>
                {editId ? "Update" : "Add"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      
    </div>
  );
}

export default App;
