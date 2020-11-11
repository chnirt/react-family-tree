import { Button, Drawer } from 'antd'
import React, { Fragment, useState } from 'react'
import { Tree } from '../../components'
import { CloseOutlined } from '@ant-design/icons'

export default function Dashboard() {
	const [visible, setVisible] = useState(false)

	function showDrawer() {
		setVisible(true)
	}

	function onClose() {
		setVisible(false)
	}

	function onSubmit() {
		setVisible(false)
	}

	return (
		<Fragment>
			<Button type='primary' onClick={showDrawer}>
				Create Member
			</Button>
			<Tree />

			<Drawer
				title='New Member'
				placement='right'
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>

				<div
					style={{
						position: 'absolute',
						right: 0,
						bottom: 0,
						width: '100%',
						borderTop: '1px solid #e9e9e9',
						padding: '10px 16px',
						background: '#fff',
						textAlign: 'right',
					}}
				>
					<Button onClick={onClose} style={{ marginRight: 8 }}>
						Cancel
					</Button>
					<Button onClick={onSubmit} type='primary'>
						Submit
					</Button>
				</div>
			</Drawer>
		</Fragment>
	)
}
