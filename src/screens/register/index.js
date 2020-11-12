import React, { Fragment } from 'react'
import {
	Row,
	Col,
	Typography,
	Form,
	Input,
	Button,
	Image,
	notification,
} from 'antd'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useSetRecoilState } from 'recoil'
import { loadingState } from '../../atoms'
import { useFirebase } from '../../context'
import { FULLNAME, USERNAME, PASSWORD } from '../../constants'

const { Title, Text } = Typography

export default function Register() {
	let history = useHistory()
	const setIsLoading = useSetRecoilState(loadingState)
	const { registerFB } = useFirebase()

	async function onFinish(values) {
		const { fullName, emailOrYourPhoneNumber, password } = values

		setIsLoading(true)

		try {
			const currentUser = await registerFB(
				fullName,
				emailOrYourPhoneNumber,
				password
			)
			// console.log(currentUser)
			if (currentUser) {
				notification['success']({
					message: 'Register',
					description: 'Register successfully!',
					onClick: () => {
						console.log('Notification Clicked!')
					},
					placement: 'bottomRight',
				})
			}
		} catch (error) {
			notification['error']({
				message: 'Login Error',
				description: error.message,
				onClick: () => {
					console.log('Notification Clicked!')
				},
				placement: 'bottomRight',
			})
		}
		setIsLoading(false)
	}

	function onFinishFailed(errorInfo) {
		// console.log('Failed:', errorInfo)
	}

	function navigateLogin() {
		history.push('/')
	}

	return (
		<Fragment>
			<Row>
				<Col
					xs={24}
					sm={{ span: 8, offset: 8 }}
					md={{ span: 12, offset: 6 }}
					lg={{ span: 8, offset: 8 }}
					xl={{ span: 6, offset: 9 }}
				>
					<Row
						style={{
							height: 'calc(100vh - 100px)',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<Row
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								height: '10vh',
							}}
						>
							<Image width={80} src={logo} />
						</Row>
						<Row style={{ justifyContent: 'center' }}>
							<Title level={2}>FamilyTree App</Title>
						</Row>
						<Row
							style={{
								justifyContent: 'center',
								height: '5vh',
							}}
						>
							<Text style={{ textAlign: 'center' }}>
								What email or number can people use to reach you?
							</Text>
						</Row>
						<Form
							style={{ padding: '0 5vw' }}
							name='normal_login'
							className='login-form'
							initialValues={{
								fullName: FULLNAME,
								emailOrYourPhoneNumber: USERNAME,
								password: PASSWORD,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<Form.Item
								name='fullName'
								rules={[
									{
										required: true,
										message: 'Please input your Fullname!',
									},
								]}
							>
								<Input placeholder='Fullname' />
							</Form.Item>
							<Form.Item
								name='emailOrYourPhoneNumber'
								rules={[
									{
										required: true,
										message: 'Please input your Email or Phone number!',
									},
								]}
							>
								<Input placeholder='Email or your phone number' />
							</Form.Item>
							<Form.Item
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your Password!',
									},
								]}
							>
								<Input type='password' placeholder='Password' />
							</Form.Item>

							<Form.Item>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<Button type='link' htmlType='submit'>
										Create Account
									</Button>
								</div>
							</Form.Item>

							<Form.Item name='remember' valuePropName='checked' noStyle>
								<div
									style={{
										textAlign: 'center',
									}}
								>
									{`By continuing, you are indicating that you agree to the `}
									<a href='https://sendbird.com/support-policy'>
										Privacy Policy
									</a>
									{` and `}
									<a href='https://sendbird.com/support-policy'>Terms</a>.
								</div>
							</Form.Item>
						</Form>
					</Row>

					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							height: 100,
						}}
					>
						<Button onClick={navigateLogin} type='link'>
							Login with FamilyTree
						</Button>
					</div>
				</Col>
			</Row>
		</Fragment>
	)
}
