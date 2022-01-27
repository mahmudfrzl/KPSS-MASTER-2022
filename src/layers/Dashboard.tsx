import { observer } from 'mobx-react-lite';
import React from 'react'
import { Route } from 'react-router-dom';
import SideMenu from '../components/sideMenu/SideMenu';



const Dashboard = () => {


    return (
        <SideMenu/>
    )
}


export default observer(Dashboard);

