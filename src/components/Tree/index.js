import React, { Fragment, useRef, useState } from 'react'
import SortableTree, {
	addNodeUnderParent,
	removeNodeAtPath,
	changeNodeAtPath,
	toggleExpandedForAll,
} from 'react-sortable-tree'
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

const { Text } = Typography

const seed = [
	{
		id: '123',
		title: 'Nhà Họ Lê',
		subtitle: 'home',
		isDirectory: true,
		expanded: true,
		children: [
			{ id: '456', title: 'Lê Trần A', subtitle: 'male' },
			{
				id: '789',
				title: 'Lê Thị B',
				subtitle: 'female',
				expanded: true,
				children: [
					{
						id: '234',
						title: 'Lê Ngọc C',
						subtitle: 'female',
					},
					{ id: '567', title: 'Lê Phạm D', subtitle: 'male' },
				],
			},
		],
	},
]

export function Tree({ showDrawer = () => {} }) {
	const [treeData, setTreeData] = useState(seed)
	const [searchString, setSearchString] = useState('')
	const [searchFocusIndex, setSearchFocusIndex] = useState(0)
	const [searchFoundCount, setSearchFoundCount] = useState(null)
	const inputEl = useRef()

	function updateTreeData(treeData) {
		setTreeData(treeData)
	}

	function expand(expanded) {
		setTreeData(
			toggleExpandedForAll({
				treeData,
				expanded,
			})
		)
	}

	function expandAll() {
		expand(true)
	}

	function collapseAll() {
		expand(false)
	}

	function selectPrevMatch() {
		setSearchFocusIndex(
			searchFocusIndex !== null
				? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
				: searchFoundCount - 1
		)
	}

	function selectNextMatch() {
		setSearchFocusIndex(
			searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
		)
	}

	function createNode() {
		const value = inputEl.current.value

		if (value === '') {
			inputEl.current.focus()
			return
		}

		let newTree = addNodeUnderParent({
			treeData: treeData,
			parentKey: null,
			expandParent: true,
			getNodeKey,
			newNode: {
				id: '123',
				title: value,
			},
		})

		setTreeData(newTree.treeData)

		inputEl.current.value = ''
	}

	function updateNode(rowInfo) {
		const { node, path } = rowInfo
		const { children } = node

		const value = inputEl.current.value

		if (value === '') {
			inputEl.current.focus()
			return
		}

		let newTree = changeNodeAtPath({
			treeData,
			path,
			getNodeKey,
			newNode: {
				children,
				title: value,
				subtitle: 'xxx',
			},
		})

		setTreeData(newTree)

		inputEl.current.value = ''
	}

	function addNodeChild(rowInfo) {
		let { path } = rowInfo

		const value = inputEl.current.value
		// const value = inputEls.current[treeIndex].current.value;

		if (value === '') {
			inputEl.current.focus()
			// inputEls.current[treeIndex].current.focus();
			return
		}

		let newTree = addNodeUnderParent({
			treeData: treeData,
			parentKey: path[path.length - 1],
			expandParent: true,
			getNodeKey,
			newNode: {
				title: value,
				subtitle: 'xxx',
			},
		})

		setTreeData(newTree.treeData)

		inputEl.current.value = ''
		// inputEls.current[treeIndex].current.value = "";
	}

	function addNodeSibling(rowInfo) {
		let { path } = rowInfo

		const value = inputEl.current.value
		// const value = inputEls.current[treeIndex].current.value;

		if (value === '') {
			inputEl.current.focus()
			// inputEls.current[treeIndex].current.focus();
			return
		}

		let newTree = addNodeUnderParent({
			treeData: treeData,
			parentKey: path[path.length - 2],
			expandParent: true,
			getNodeKey,
			newNode: {
				title: value,
				subtitle: 'xxx',
			},
		})

		setTreeData(newTree.treeData)

		inputEl.current.value = ''
		// inputEls.current[treeIndex].current.value = "";
	}

	function removeNode(rowInfo) {
		const { path } = rowInfo
		setTreeData(
			removeNodeAtPath({
				treeData,
				path,
				getNodeKey,
			})
		)
	}

	const alertNodeInfo = ({ node, path, treeIndex }) => {
		const objectString = Object.keys(node)
			.map((k) => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
			.join(',\n   ')

		global.alert(
			'Info passed to the icon and button generators:\n\n' +
				`node: {\n   ${objectString}\n},\n` +
				`path: [${path.join(', ')}],\n` +
				`treeIndex: ${treeIndex}`
		)
	}

	const getNodeKey = ({ treeIndex }) => treeIndex

	return (
		<div
			style={{
				height: 'calc(100vh - 222px)',
				overflowX: 'hidden',
				overflowY: 'auto',
			}}
		>
			<div>
				<input ref={inputEl} type='text' />
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
	)
}
