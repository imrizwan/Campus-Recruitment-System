import React, { Component } from 'react';

class ProfileCreds extends Component {
    render() {
        const { experience, education } = this.props.profile;
        const expItems = experience.map(exp => (
            <li key={exp._id}>
              <h4>{exp.company}</h4>
              {new Date(exp.from).getUTCMonth()}/{new Date(exp.from).getUTCDate()}/{new Date(exp.from).getUTCFullYear()} -
                {exp.to === null ? (
                  ' Now'
                ) : (
                  <p>{new Date(exp.to).getUTCMonth()}/{new Date(exp.to).getUTCDate()}/{new Date(exp.to).getUTCFullYear()}</p>
                )}
              <p>
                <strong>Position:</strong> {exp.title}
              </p>
              <p>
                {exp.location === '' ? null : (
                  <span>
                    <strong>Location: </strong> {exp.location}
                  </span>
                )}
              </p>
              <p>
                {exp.description === '' ? null : (
                  <span>
                    <strong>Description: </strong> {exp.description}
                  </span>
                )}
              </p>
            </li>
          ));
      
          const eduItems = education.map(edu => (
            <li key={edu._id}>
              <h4>{edu.school}</h4>
              
              {new Date(edu.from).getUTCMonth()}/{new Date(edu.from).getUTCDate()}/{new Date(edu.from).getUTCFullYear()} -
                {edu.to === null ? (
                  ' Now'
                ) : (
                  <p>{new Date(edu.to).getUTCMonth()}/{new Date(edu.to).getUTCDate()}/{new Date(edu.to).getUTCFullYear()}</p>
                )}
              
              <p>
                <strong>Degree:</strong> {edu.degree}
              </p>
              <p>
                <strong>Field Of Study:</strong> {edu.fieldofstudy}
              </p>
              <p>
                {edu.description === '' ? null : (
                  <span>
                    <strong>Description: </strong> {edu.description}
                  </span>
                )}
              </p>
            </li>
          ));
  
        return(
            <div>
              <ul>  
                {expItems}
              </ul>
              <ul>
                {eduItems}
              </ul>
            </div>
        )
    }
}
export default ProfileCreds;