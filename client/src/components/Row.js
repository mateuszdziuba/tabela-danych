import React from 'react';


const Row = ({ user }) => {
    
 
    const { name, surname, age } = user;

    return (
      <tr>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{age}</td>
      </tr>
    );
  }


export default Row;