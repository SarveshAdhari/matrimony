const register = (req, res) =>{
    res.send('Register User')
}

const login = (req, res) =>{
    res.send('Login User')
}

const update = (req, res) =>{
    res.send('Update User')
}

const getAllUsers = (req, res) =>{
    res.send('Get All Users')
}

export { register, login, update, getAllUsers }