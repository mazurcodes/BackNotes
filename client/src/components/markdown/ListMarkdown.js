import React, { useContext, useEffect } from 'react';
import MdContext from '../../context/md/MdContext';
import ListItem from './ListItem';

const ListMarkdown = () => {
  //context
  const { getMdList, mdList, loading } = useContext(MdContext);

  // fetch markdown list
  useEffect(() => {
    getMdList();
    // eslint-disable-next-line
  }, []);

  const markdownFiles = mdList.map(file => <ListItem key={file._id} file={file}/>);

  if (loading) return <div>Loading...</div>;
  return <ul>{markdownFiles}</ul>;
};

export default ListMarkdown;
