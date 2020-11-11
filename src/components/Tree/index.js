import React, { useRef, useState } from 'react'
import SortableTree, {
	addNodeUnderParent,
	removeNodeAtPath,
	changeNodeAtPath,
	toggleExpandedForAll,
} from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
import './index.less'

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

export function Tree() {
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
			<div style={{ flex: '0 0 auto', padding: '0 15px' }}>
				<h3>Family Members Tree</h3>
				<input ref={inputEl} type='text' />
				<br />
				<button onClick={createNode}>Create Node</button>
				<br />
				<button onClick={expandAll}>Expand All</button>
				<button onClick={collapseAll}>Collapse All</button>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<form
					style={{ display: 'inline-block' }}
					onSubmit={(event) => {
						event.preventDefault()
					}}
				>
					<label htmlFor='find-box'>
						Search:&nbsp;
						<input
							id='find-box'
							type='text'
							value={searchString}
							onChange={(event) => setSearchString(event.target.value)}
						/>
					</label>

					<button
						type='button'
						disabled={!searchFoundCount}
						onClick={selectPrevMatch}
					>
						&lt;
					</button>

					<button
						type='submit'
						disabled={!searchFoundCount}
						onClick={selectNextMatch}
					>
						&gt;
					</button>

					<span>
						&nbsp;
						{searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
						&nbsp;/&nbsp;
						{searchFoundCount || 0}
					</span>
				</form>
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
						<div>
							<button
								label='Add Sibling'
								onClick={() => addNodeSibling(rowInfo)}
							>
								Add Sibling
							</button>
							<button label='Add Child' onClick={() => addNodeChild(rowInfo)}>
								Add Child
							</button>
							<button label='Update' onClick={() => updateNode(rowInfo)}>
								Update
							</button>
							<button label='Delete' onClick={() => removeNode(rowInfo)}>
								Remove
							</button>
							<button label='Alert' onClick={() => alertNodeInfo(rowInfo)}>
								Info
							</button>
						</div>,
					],
					style: {
						height: '50px',
					},
				})}
			/>
		</div>
	)
}
