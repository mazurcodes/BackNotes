import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import MdContext from '../../context/md/MdContext';
import ListMarkdown from '../markdown/ListMarkdown';
import RawMD from '../markdown/RawMD';
import RenderedMD from '../markdown/RenderedMD';

const Home = () => {
  const { loadUser } = useContext(AuthContext);
  const { mdRendered } = useContext(MdContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  
  if (mdRendered === null) return <ListMarkdown />;
  
  return (
      <div
        className="home-page"
        style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}
      >
        <RawMD />
        <RenderedMD />
      </div>
    );
};

export default Home;
