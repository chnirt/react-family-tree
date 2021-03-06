import React, {
	Fragment,
	// useState
} from 'react'
import {
	Button,
	Drawer,
	Input,
	// Select
} from 'antd'
import { Tree } from '../../components'
import {
	// useFirebase,
	useTree,
} from '../../context'

// const { Option } = Select

export default function Dashboard() {
	const {
		visible,
		setVisible,
		title,
		setTitle,
		subTitle,
		setSubTitle,
		header,
		createNode,
		rowInfo,
		setRowInfo,
		addNodeSibling,
		addNodeChild,
		updateNode,
	} = useTree()
	// const { addMember } = useFirebase()
	// const [options] = useState([
	// 	{
	// 		id: 'jack',
	// 		value: 'Jack',
	// 	},
	// 	{
	// 		id: 'lucy',
	// 		value: 'Lucy',
	// 	},
	// 	{
	// 		id: 'tom',
	// 		value: 'Tom',
	// 	},
	// ])

	// function onChange(value) {
	// 	console.log(`selected ${value}`)
	// }

	// function onBlur() {
	// 	console.log('blur')
	// }

	// function onFocus() {
	// 	console.log('focus')
	// }

	// function onSearch(val) {
	// 	console.log('search:', val)
	// }

	function onClose() {
		resetForm()
		setVisible(false)
	}

	async function onSubmit() {
		switch (header) {
			case 'Add Sibling':
				addNodeSibling(rowInfo)
				break
			case 'Add Child':
				addNodeChild(rowInfo)
				break
			case 'Update':
				updateNode(rowInfo)
				break

			default:
				createNode()
				break
		}
		resetForm()
		setVisible(false)
	}

	function resetForm() {
		setTitle('')
		setSubTitle('')
		setRowInfo(null)
	}

	return (
		<Fragment>
			<Tree />

			<Drawer
				title={header}
				placement='right'
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Title'
				/>
				<Input
					style={{ marginTop: 10 }}
					value={subTitle}
					onChange={(e) => setSubTitle(e.target.value)}
					placeholder='SubTitle'
				/>
				{/* <Select
					showSearch
					style={{ marginTop: 10, width: '100%' }}
					placeholder='Select a person'
					optionFilterProp='children'
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					onSearch={onSearch}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					{options?.map((element, i) => (
						<Option key={i} value={element.key}>
							{element.value}
						</Option>
					))}
				</Select> */}
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
