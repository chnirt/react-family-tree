// Firebase
export const FB_API_KEY = process.env.REACT_APP_FB_API_KEY
export const FB_AUTH_DOMAIN = process.env.REACT_APP_FB_AUTH_DOMAIN
export const FB_DB_URL = process.env.REACT_APP_FB_DB_URL
export const FB_PROJECT_ID = process.env.REACT_APP_FB_PROJECT_ID
export const FB_STORAGE_BUCKET = process.env.REACT_APP_FB_STORAGE_BUCKET
export const FB_MESSAGING_SENDER_ID =
	process.env.REACT_APP_FB_MESSAGING_SENDER_ID
export const FB_APP_IP = process.env.REACT_APP_FB_APP_IP
export const FB_MEASUREMENT_ID = process.env.REACT_APP_FB_MEASUREMENT_ID

export const PRIMARY = '#a1887f'
export const SECONDARY = '#ffe7ba'

// console.log
export const LOG = '#52c41a'
export const INFO = '#1890ff'
export const WARN = '#fadb14'
export const ERROR = '#f5222d'

// login
export const USERNAME =
	process.env.NODE_ENV !== 'production' ? 'chnirt@gmail.com' : ''
export const PASSWORD = process.env.NODE_ENV !== 'production' ? '123456' : ''
