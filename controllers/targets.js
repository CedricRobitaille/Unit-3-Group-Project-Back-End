const Target = require('../models/target');


//CREATE
const create = async (req, res) => {
    const newTarget = await Target.create(req.body)
    console.log(`newTarget: ${newTarget}`);
    res.json(newTarget);
}

//READ
const index = async (req, res) => {
    const allTargets= await Target.find();
    console.log(`allTargets: ${allTargets}`);
    res.json(allTargets);
}

const show = async (req, res) => {
    const singleTarget = await Target.findById(req.params.targetId);
    console.log(`singleTarget: ${singleTarget}`);
    res.json(singleTarget);
}


//UPDATE
const update = async (req, res) => {
    await Target.findByIdAndUpdate(req.params.targetId, req.body);
    const updatedTarget = await Target.findById(req.params.targetId);
    console.log(`updatedTarget: ${updatedTarget}`);
    res.json(updatedTarget);
}

//DELETE
const deleteTarget = async (req, res) => {
    const deletedTarget = await Target.findByIdAndDelete(req.params.targetId);
    res.json(deletedTarget);

}

module.exports = {
    create, 
    index,
    show,
    update,
    deleteTarget
}