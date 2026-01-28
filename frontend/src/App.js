import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = "http://localhost:4000/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
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
    if (!title || !body) return;

    if (editId) {
      await axios.put(`${API}/${editId}`, { title, body });
      setEditId(null);
    } else {
      await axios.post(API, { title, body });
    }

    setTitle("");
    setBody("");
    fetchPosts();
  };

  const editPost = (post) => {
    setTitle(post.title);
    setBody(post.body);
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
            <th>TITLE</th>
            <th>BODY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
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
                placeholder="Enter title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </td>
            <td>
              <input
                placeholder="Enter body"
                value={body}
                onChange={e => setBody(e.target.value)}
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
