import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { useAuth } from '../context'
import { loadingState } from '../atoms'

const { Header, Sider, Content } = Layout

export function MyLayout({ children }) {
	const [collapsed, setCollapsed] = useState(false)
	const { logout } = useAuth()
	const setLoading = useSetRecoilState(loadingState)

	function toggle() {
		setCollapsed((prevState) => !prevState)
	}

	function handleLogout() {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			logout()
		}, 1000)
	}

	const backgroundColor = '#8d6e63'

	return (
		<Layout>
			<Sider
				style={{ backgroundColor }}
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className='logo' />
				<Menu
					style={{ backgroundColor, color: '#FFFFFF' }}
					mode='inline'
					defaultSelectedKeys={['1']}
				>
					<Menu.Item key='1' icon={<UserOutlined />}>
						Tree
						<Link to='/dashboard' />
					</Menu.Item>
					<Menu.Item key='2' icon={<VideoCameraOutlined />}>
						Table
						<Link to='/table' />
					</Menu.Item>
					<Menu.Item key='3' icon={<UploadOutlined />} onClick={handleLogout}>
						Log out
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ padding: 0 }}>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: 'trigger',
							onClick: toggle,
						}
					)}
				</Header>
				<Content
					className='site-layout-background'
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 'calc(100vh - 112px)',
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}
