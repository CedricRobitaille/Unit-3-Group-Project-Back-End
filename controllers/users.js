const User = require('../models/user');

//CREATE
const create = async (req, res) => {
    const newUser = await User.create(req.body)
    console.log(`newUser: ${newUser}`);
    res.json(newUser);
}

//READ
const index = async (req, res) => {
    const allUsers= await User.find();
    console.log(`allUsers: ${allUsers}`);
    res.json(allUsers);
}

const show = async (req, res) => {
    const singleUser = await User.findById(req.params.userId);
    console.log(`singleUser: ${singleUser}`);
    res.json(singleUser);
}


//UPDATE
const update = async (req, res) => {
    await User.findByIdAndUpdate(req.params.userId, req.body);
    const updatedUser = await User.findById(req.params.userId);
    console.log(`updatedUser: ${updatedUser}`);
    res.json(updatedUser);
}


//DELETE
const deleteUser = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId)
    console.log(`deletedUser: ${deletedUser}`);
    res.json(deletedUser);

}

module.exports = {
    create, 
    index,
    show,
    update,
    deleteUser
}