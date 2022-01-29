import { withRouter } from 'react-router-dom';    
import SideMenu from '../components/sideMenu/SideMenu';
import Navbar from './Navbar';

const ComponentToHide = (props:any) => {
  const { location } = props;
  if (location.pathname.match(/log-in/)){
    return null;
  }else if (location.pathname.match(/sign-up/)){
      return null;
  }

  return (
    <div>
    <Navbar/>
    <SideMenu/>
    </div>
  )
}

export const ComponentThatHides = withRouter(ComponentToHide);