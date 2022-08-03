import axios from 'axios'
const baseUrl = '/users'

const create = async newUser => {
	const response = await axios.post(baseUrl, newUser)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { create }