import React, { createContext, useContext, useRef, useState } from 'react'
import {
	addNodeUnderParent,
	removeNodeAtPath,
	changeNodeAtPath,
	toggleExpandedForAll,
} from 'react-sortable-tree'
import { nanoid } from 'nanoid'

const TreeContext = createContext()

const seed = [
	{
		id: nanoid(),
		title: 'Nhà Họ Lê',
		subtitle: 'home',
		isDirectory: true,
		expanded: true,
		children: [
			{ id: nanoid(), title: 'Lê Trần A', subtitle: 'male' },
			{
				id: nanoid(),
				title: 'Lê Thị B',
				subtitle: 'female',
				expanded: true,
				children: [
					{
						id: nanoid(),
						title: 'Lê Ngọc C',
						subtitle: 'female',
					},
					{ id: nanoid(), title: 'Lê Phạm D', subtitle: 'male' },
				],
			},
		],
	},
]

export function TreeProvider({ children }) {
	const [title, setTitle] = useState('')
	const [subTitle, setSubTitle] = useState('')
	const [treeData, setTreeData] = useState(seed)
	const [searchString, setSearchString] = useState('')
	const [searchFocusIndex, setSearchFocusIndex] = useState(0)
	const [searchFoundCount, setSearchFoundCount] = useState(null)
	const [visible, setVisible] = useState(false)
	const [header, setHeader] = useState('')
	const [rowInfo, setRowInfo] = useState(null)
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
		// const value = inputEl.current.value

		// if (value === '') {
		// 	inputEl.current.focus()
		// 	return
		// }

		let newTree = addNodeUnderParent({
			treeData: treeData,
			parentKey: null,
			expandParent: true,
			getNodeKey,
			newNode: {
				id: nanoid(),
				title,
				subtitle: subTitle,
			},
		})

		setTreeData(newTree.treeData)

		// inputEl.current.value = ''
	}

	function updateNode(rowInfo) {
		const { node, path } = rowInfo
		const { children } = node

		// const value = inputEl.current.value

		// if (value === '') {
		// 	inputEl.current.focus()
		// 	return
		// }

		let newTree = changeNodeAtPath({
			treeData,
			path,
			getNodeKey,
			newNode: {
				id: nanoid(),
				title,
				subtitle: subTitle,
				children,
			},
		})

		setTreeData(newTree)

		// inputEl.current.value = ''
	}

	function addNodeChild(rowInfo) {
		let { path } = rowInfo

		// const value = inputEl.current.value
		// // const value = inputEls.current[treeIndex].current.value;

		// if (value === '') {
		// 	inputEl.current.focus()
		// 	// inputEls.current[treeIndex].current.focus();
		// 	return
		// }

		let newTree = addNodeUnderParent({
			treeData: treeData,
			parentKey: path[path.length - 1],
			expandParent: true,
			getNodeKey,
			newNode: {
				id: nanoid(),
				title,
				subtitle: subTitle,
			},
		})

		setTreeData(newTree.treeData)

		// inputEl.current.value = ''
		// inputEls.current[treeIndex].current.value = "";
	}

	function addNodeSibling(rowInfo) {
		let { path } = rowInfo

		// const value = inputEl.current.value
		// // const value = inputEls.current[treeIndex].current.value;

		// if (value === '') {
		// 	inputEl.current.focus()
		// 	// inputEls.current[treeIndex].current.focus();
		// 	return
		// }

		let newTree = addNodeUnderParent({
			treeData: treeData,
			parentKey: path[path.length - 2],
			expandParent: true,
			getNodeKey,
			newNode: {
				id: nanoid(),
				title,
				subtitle: subTitle,
			},
		})

		setTreeData(newTree.treeData)

		// inputEl.current.value = ''
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
		<TreeContext.Provider
			value={{
				title,
				setTitle,
				subTitle,
				setSubTitle,
				visible,
				setVisible,
				header,
				setHeader,
				rowInfo,
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
				addNodeSibling,
				addNodeChild,
				createNode,
				updateNode,
				removeNode,
				alertNodeInfo,
			}}
		>
			{children}
		</TreeContext.Provider>
	)
}

export const useTree = () => useContext(TreeContext)
