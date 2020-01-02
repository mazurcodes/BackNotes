import React, {useEffect, useContext} from 'react';
import AuthContext from '../../context/auth/AuthContext';
import ListMarkdown from '../markdown/ListMarkdown';
// import RawMD from "../layout/RawMD";
// import RenderedMD from "../layout/RenderedMD";


const Home = () => {
  const {loadUser} = useContext(AuthContext);
  
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])
  
  return (
    <ListMarkdown />
    // <div className="home-page" style={{display: "flex", flexDirection: "row", overflow: "hidden"}}>
    //   {/* <RawMD />
    //   <RenderedMD /> */}
    // </div>
  )
}

export default Home