import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddForm = props => {
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Backlog");
  const [frontErrors, setFrontErrors] = useState({});


  const nameErrors = e => {
    let value = e.target.value;
    let message = "";
    if (!value) {
      message = "Name is required!"
    } else if (value.length < 3) {
      message = "Name must be 3 characters or longer!"
    }
    setFrontErrors({ ...frontErrors, name: message });
  }

  const myCreate = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/project/new", {
      name,
      status,
      dueDate
    }).then(res => {
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        navigate("/");
      }
    })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="d-flex justify-content-end"><Link to="/" >Back to Dashboard</Link></div>
      <div className="row d-flex justify-content-center my-4">
        <div className="card text-left">
          <div className="card-body">
            <h4 className="card-title">Plan a new project</h4>
            <div className="card-text">
              <form onSubmit={myCreate}>
                <div className="form-grpup">
                  <label>Name:</label>
                  <input type="text" className="form-control" onChange={e => setName(e.target.value)} onBlur={nameErrors} value={name} />
                  <p className="text-danger">{errors.name ? errors.name.message : ''}</p>
                  <p className="text-danger">{frontErrors.name}</p>
                </div>
                <div className="form-grpup">
                  <label>Due Date:</label>
                  <input type="date" className="form-control" onChange={e => setDueDate(e.target.value)} value={dueDate} />
                  <p className="text-danger">{errors.dueDate ? errors.dueDate.message : ''}</p>
                </div>
                <div className="card-footer text-center">
                  <div className="btn-group">
                    <input type="submit" className="btn btn-outline-secondary my-3" value="Plan Project" />
                    <Link className="btn btn-outline-secondary my-3" to="/" >Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default AddForm;
