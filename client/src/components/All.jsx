import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import moment from 'moment';
import axios from 'axios';
const All = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects')
      .then(res => {
        setProjects(res.data.projects.slice().sort(function (a, b) {
          if (a.dueDate > b.dueDate) return 1;
          if (a.dueDate < b.dueDate) return -1;
          return 0;
        }))
      })
  }, [projects]);

  const myDelete = (projectId) => {
    axios.delete("http://localhost:8000/api/project/delete/" + projectId)
      .then(res => {
        setProjects(projects.filter(project => project._id = !projectId));
        navigate("/");
      })
      .catch(err => console.log(err))
  }

  const myProgress = (projectId) => {
    axios.put("http://localhost:8000/api/project/update/" + projectId, {
      status: "In Progress"
    }).then(res => {
      navigate("/view/" + projectId)
    })
      .catch(err => console.log(err))
  }
  const myComplete = (projectId) => {
    axios.put("http://localhost:8000/api/project/update/" + projectId, {
      status: "Completed"
    }).then(res => {
      navigate("/view/" + projectId)
    })
      .catch(err => console.log(err))
  }
  return (
    <>
      <div className="row">
        <div className="col-4 mt-3">
          <h3>Backlog</h3>
        </div>
        <div className="col-4 mt-3">
          <h3>In Progress</h3>
        </div>
        <div className="col-4 mt-3">
          <h3>Completed</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-4" style={{ overflowY: 'auto', maxHeight: '545px' }}>
          {projects.map(project =>
            project.status === "Backlog" ?
              <div className="card my-2">
                <Link to={`/view/${project._id}`} className="card-header text-center textStyle" style={{ backgroundColor: "#D1E4EC", fontSize: '35px' }}>{project.name}</Link>
                <div className="card-body text-left" style={{ fontSize: '22px' }}>
                  <div className="my-3">
                    <h5 className="card-text d-inline">Due Date: </h5>
                    {new Date(project.dueDate) >= new Date() ?
                      <p className="d-inline text-danger" style={{ backgroundColor: "#D1E4EC", fontSize: '25px' }}>{moment(project.dueDate).format('MM/DD/YYYY')}</p> :
                      <p className="d-inline">{moment(project.dueDate).format('MM/DD/YYYY')}</p>}
                  </div>
                </div>
                <div className="card-footer text-center">
                  <button onClick={e => { myProgress(project._id) }} className="btn btn-outline-secondary btn-block my-3">Start Project  &#10095;</button>
                </div>
              </div>
              : '')}
        </div>
        <div className="col-4" style={{ overflowY: 'auto', maxHeight: '545px' }}>
          {projects.map(project =>
            project.status === "In Progress" ?
              <div className="card my-2">
                <Link to={`/view/${project._id}`} className="card-header text-center textStyle" style={{ backgroundColor: "#D1E4EC", fontSize: '35px' }}>{project.name}</Link>
                <div className="card-body text-left" style={{ fontSize: '22px' }}>
                  <div className="my-3">
                    <h5 className="card-text d-inline">Due Date: </h5>
                    {new Date(project.dueDate) >= new Date() ?
                      <p className="d-inline text-danger" style={{ backgroundColor: "#D1E4EC", fontSize: '25px' }}>{moment(project.dueDate).format('MM/DD/YYYY')}</p> :
                      <p className="d-inline">{moment(project.dueDate).format('MM/DD/YYYY')}</p>}
                  </div>
                </div>
                <div className="card-footer text-center">
                  <button onClick={e => { myComplete(project._id) }} className="btn btn-outline-secondary btn-block my-3">Move to Completed &#10095;</button>
                </div>
              </div>
              : '')}
        </div>
        <div className="col-4" style={{ overflowY: 'auto', maxHeight: '545px' }}>
          {projects.map(project =>
            project.status === "Completed" ?
              <div className="card my-2">
                <Link to={`/view/${project._id}`} className="card-header text-center textStyle" style={{ backgroundColor: "#D1E4EC", fontSize: '35px' }}>{project.name}</Link>
                <div className="card-body text-left" style={{ fontSize: '22px' }}>
                  <div className="my-3">
                    <h5 className="card-text d-inline">Due Date: </h5>
                    {new Date(project.dueDate) >= new Date() ?
                      <p className="d-inline text-danger" style={{ backgroundColor: "#D1E4EC", fontSize: '25px' }}>{moment(project.dueDate).format('MM/DD/YYYY')}</p> :
                      <p className="d-inline">{moment(project.dueDate).format('MM/DD/YYYY')}</p>}
                  </div>
                </div>
                <div className="card-footer text-center">
                  <button onClick={e => { myDelete(project._id) }} className="btn btn-outline-secondary btn-block my-3">&#9747; Remove Project</button>
                </div>
              </div>
              : '')}
        </div>
        <div className="row mx-4 my-2">
          <Link to="/new">&oplus; Add New Project</Link>
        </div>
      </div>
    </>
  )
}
export default All;