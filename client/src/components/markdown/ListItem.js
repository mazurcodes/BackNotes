import React, { useContext } from 'react';
import MdContext from '../../context/md/MdContext';

const ListItem = ({ file: { _id: id, name, date } }) => {
  const { getMdDocument } = useContext(MdContext);

  const onEdit = () => {
    getMdDocument(id);
  };

  const onDelete = () => {};

  return (
    <li>
      <p>
        {name} - {date} <button onClick={onEdit}>Edit</button>{' '}
        <button onClick={onDelete}>Delete</button>
      </p>
    </li>
  );
};

export default ListItem;
