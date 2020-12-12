import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import axios from 'axios';

function One(props) {
  const [project, setProject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/project/${props._id}`)
      .then(res => {
        setProject(res.data.project);
      })
  }, [])
  return (
    <>
      <div className="d-flex justify-content-end"><Link to="/" >Back to Dashboard</Link></div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="card m-5">
            <h3 className="card-header text-center textStyle" style={{ backgroundColor: "#D1E4EC", fontSize: '35px' }}>{project.name}</h3>
            <div className="card-body text-left" style={{ fontSize: '22px' }}>
              <div className="my-3">
                <h5 className="card-text d-inline">Status: </h5>
                <p className="d-inline">{project.status}</p>
              </div>
              <div className="my-3">
                <h5 className="card-text d-inline">Due Date: </h5>
                {new Date(project.dueDate) >= new Date() ?
                  <p className="d-inline text-danger" style={{ backgroundColor: "#D1E4EC", fontSize: '25px' }}>{moment(project.dueDate).format('MM/DD/YYYY')}</p> :
                  <p className="d-inline">{moment(project.dueDate).format('MM/DD/YYYY')}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  )
}

export default One
