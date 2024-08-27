import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddUser, DeleteUser, EditUser, userdata } from '../apis/apis';

function UserList() {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
  });

  // Fetch data from API
  useEffect(() => {
    const datafetch = async () => {
      const fetchedData = await userdata();
      setData(fetchedData);
    };

    datafetch();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle Add User
  const handleAddUser = async () => {
    if (newUser.name && newUser.username && newUser.email) {
      
      const data1 = await AddUser(newUser);
      setData([...data,data1]);
      setNewUser({ id: '', name: '', username: '', email: '' });
    }
  };

  // Handle Edit User
  const handleEditUser = (index) => {
    setEditingIndex(index);
    setNewUser(data[index]);
  };

  // Handle Update User
  const handleUpdateUser = async () => {
    const updatedUser = { ...newUser, id: data[editingIndex].id };

    const data12 = await EditUser(updatedUser);

    const updatedData = data.map((item,index)=>{
      index === editingIndex ? data12 : item
    });

    setData(updatedData);
    setEditingIndex(null);
    setNewUser({ id: '', name: '', username: '', email: '' });

  };

  // Handle Delete User
  const handleDeleteUser = async (index) => {
    const userId = data[index].id;
    await DeleteUser(userId);

    const updateddata = data.filter(user => user.id !== userId)
    setData(updateddata);
    
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">User List</h1>

      <ul className="list-group mb-4">
        {data.map((user, index) => (
          <li key={user.id} className="list-group-item mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Username:</strong> {user.username}<br />
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Address:</strong> {user.address ? `${user.address.street}, ${user.address.city}` : 'Address not available'}<br />
                  <strong>Company:</strong> {user.company ? user.company.name : 'Company not available'}
                </p>
                <button className="btn btn-primary me-2" onClick={() => handleEditUser(index)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(index)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="card p-3">
        <h2>{editingIndex !== null ? 'Edit User' : 'Add User'}</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={newUser.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={newUser.email}
              onChange={handleChange}
            />
          </div>

          {editingIndex !== null ? (
            <button type="button" className="btn btn-success" onClick={handleUpdateUser}>Update User</button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleAddUser}>Add User</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserList;
