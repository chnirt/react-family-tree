import React, { Fragment } from 'react'
import SortableTree from 'react-sortable-tree'
import { Button, Input, Modal, Row, Typography } from 'antd'
import {
	SearchOutlined,
	NodeCollapseOutlined,
	NodeExpandOutlined,
	LeftOutlined,
	RightOutlined,
	SisternodeOutlined,
	SubnodeOutlined,
	EditOutlined,
	DeleteOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
import './index.less'
import { PRIMARY } from '../../constants'
import { useTree } from '../../context'
import { TYPE } from '../../constants'

const { Text } = Typography

const { confirm } = Modal

export function Tree() {
	const {
		setHeader,
		setTitle,
		setSubTitle,
		setVisible,
		setRowInfo,
		collapseAll,
		expandAll,
		searchString,
		setSearchString,
		searchFoundCount,
		selectPrevMatch,
		selectNextMatch,
		searchFocusIndex,
		treeData,
		updateTreeData,
		setSearchFoundCount,
		setSearchFocusIndex,
		removeNode,
		alertNodeInfo,
	} = useTree()

	function showDrawer({ type, rowInfo }) {
		switch (type) {
			case 'AddSibling':
				setHeader('Add Sibling')
				setRowInfo(rowInfo)
				break
			case 'AddChild':
				setHeader('Add Child')
				setRowInfo(rowInfo)
				break
			case 'Update':
				setHeader('Update')
				setRowInfo(rowInfo)
				setTitle(rowInfo?.node?.title)
				setSubTitle(rowInfo?.node?.subtitle)
				break

			default:
				setHeader('New Member')
				break
		}
		setVisible(true)
	}

	function handleRemoveNode(rowInfo) {
		confirm({
			title: 'Are you sure?',
			onOk() {
				removeNode(rowInfo)
			},
			onCancel() {
				Modal.destroyAll()
			},
		})
	}

	return (
		<Fragment>
			<Row justify='space-between'>
				<Row style={{ marginTop: 10 }} align='middle'>
					<Button
						icon={<NodeCollapseOutlined style={{ color: PRIMARY }} />}
						size='middle'
						onClick={collapseAll}
					/>
					<Button
						style={{ marginLeft: 10 }}
						icon={<NodeExpandOutlined style={{ color: PRIMARY }} />}
						size='middle'
						onClick={expandAll}
					/>
					<Input
						style={{ marginLeft: 10, width: 200 }}
						placeholder='Member name'
						prefix={<SearchOutlined style={{ color: PRIMARY }} />}
						value={searchString}
						onChange={(event) => setSearchString(event.target.value)}
						allowClear
					/>
					<Button
						style={{ marginLeft: 10 }}
						icon={<LeftOutlined style={{ color: PRIMARY }} />}
						size='middle'
						disabled={!searchFoundCount}
						onClick={selectPrevMatch}
					/>
					<Button
						style={{ marginLeft: 10 }}
						icon={<RightOutlined style={{ color: PRIMARY }} />}
						size='middle'
						disabled={!searchFoundCount}
						onClick={selectNextMatch}
					/>
					<div style={{ marginLeft: 10 }}>
						<Text>{searchFoundCount > 0 ? searchFocusIndex + 1 : 0}</Text>
						<Text style={{ marginLeft: 5 }}>/</Text>
						<Text style={{ marginLeft: 5 }}>{searchFoundCount || 0}</Text>
					</div>
				</Row>

				<Button type='primary' onClick={() => showDrawer({ type: TYPE.ADD })}>
					Create Member
				</Button>
			</Row>

			<div
				style={{
					height: 'calc(100vh - 222px)',
					overflowX: 'hidden',
					overflowY: 'auto',
				}}
			>
				<SortableTree
					treeData={treeData}
					onChange={updateTreeData}
					searchQuery={searchString}
					searchFocusOffset={searchFocusIndex}
					searchFinishCallback={(matches) => {
						setSearchFoundCount(matches.length)
						setSearchFocusIndex(
							matches.length > 0 ? searchFocusIndex % matches.length : 0
						)
					}}
					canDrag={({ node }) => !node.dragDisabled}
					generateNodeProps={(rowInfo) => ({
						buttons: [
							<Fragment>
								{/* {JSON.stringify(rowInfo)} */}
								{/* {rowInfo?.node?.children?.length > 0 ? 'T' : 'F'} */}
								<Button
									icon={<SisternodeOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => {
										showDrawer({ type: TYPE.ADDSIBLING, rowInfo })
									}}
								/>
								<Button
									icon={<SubnodeOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => {
										showDrawer({ type: TYPE.ADDCHILD, rowInfo })
									}}
								/>
								<Button
									icon={<EditOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => {
										showDrawer({ type: TYPE.UPDATE, rowInfo })
									}}
								/>
								{!rowInfo?.node?.children?.length > 0 && (
									<Button
										icon={<DeleteOutlined style={{ color: PRIMARY }} />}
										size='middle'
										onClick={() => handleRemoveNode(rowInfo)}
									/>
								)}
								<Button
									icon={<InfoCircleOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => alertNodeInfo(rowInfo)}
								/>
							</Fragment>,
						],
						// style: {
						// 	height: '50px',
						// },
					})}
				/>
			</div>
		</Fragment>
	)
}
