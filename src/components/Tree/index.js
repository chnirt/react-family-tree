import React, { Fragment } from 'react'
import SortableTree from 'react-sortable-tree'
import { Button, Input, Row, Typography } from 'antd'
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

const { Text } = Typography

export function Tree() {
	const {
		setVisible,
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
		addNodeSibling,
		addNodeChild,
		updateNode,
		removeNode,
		alertNodeInfo,
	} = useTree()

	function showDrawer() {
		setVisible(true)
	}

	return (
		<Fragment>
			<div>
				{/* <input ref={inputEl} type='text' /> */}
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

					<Button type='primary' onClick={showDrawer}>
						Create Member
					</Button>
				</Row>
			</div>

			<div
				style={{
					height: 'calc(100vh - 152px)',
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
								<Button
									icon={<SisternodeOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => addNodeSibling(rowInfo)}
								/>
								<Button
									icon={<SubnodeOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => addNodeChild(rowInfo)}
								/>
								<Button
									icon={<EditOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => updateNode(rowInfo)}
								/>
								<Button
									icon={<DeleteOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => removeNode(rowInfo)}
								/>
								<Button
									icon={<InfoCircleOutlined style={{ color: PRIMARY }} />}
									size='middle'
									onClick={() => alertNodeInfo(rowInfo)}
								/>
							</Fragment>,
						],
						style: {
							height: '50px',
						},
					})}
				/>
			</div>
		</Fragment>
	)
}
