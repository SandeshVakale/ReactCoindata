import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";
import { SearchOutlined, SettingFilled } from '@ant-design/icons';
import './header.less'
import {useViewport} from "../../hooks";
const {Header} = Layout
const HeaderBar = () => {
    const navigate = useNavigate();
    const {width} = useViewport()
    return <Header className='header'>
        <h1 className='title-header' >Coindata</h1>
        <Menu theme="dark" mode="horizontal" className={width < 620 ? 'menu-short' : 'menu-long'} defaultSelectedKeys={['overview']}>
            <Menu.Item key={'overview'} className={'item'} onClick={() => navigate('/')}>Overview</Menu.Item>
            <Menu.Item key={'cryptocurrencies'} className={'item'} onClick={() => navigate('cryptocurrencies')}>Cryptocurrencies</Menu.Item>
            <Menu.Item key={'exchanges'} className={'item'} onClick={() => navigate('exchanges')}>Exchanges</Menu.Item>
            <Menu.Item key={'markets'} className={'item'} onClick={() => navigate('markets')}>Markets</Menu.Item>
        </Menu>
        <div>
        <SearchOutlined style={{color: 'white', fontSize: 24, width: 30, position: 'absolute', right: 40, top: 20}}/>
        <SettingFilled style={{color: 'white', fontSize: 24, width: 30, position: 'absolute', right: 5, top: 20}} />
        </div>
    </Header>
}

export default HeaderBar;
