const verify = require('../../verifyToken/verifyToken');
const Todos = require('../../model/Todo/Todo');
const router = require('express').Router();

router.post('/', verify, async (req, res) => {
    const todo = new Todos({
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
        userId: req.user.userId
    })

    try {
        const newTodo = await todo.save();
        res.status(200).json(newTodo)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', verify, async (req, res) => {
    const status = req.query.status;
    const search = req.query.search;
    const sort = req.query.sort;
    let myTodos;
    try {
        if (status) {
            if (status === 'completed') {
                if (search) {
                    myTodos = await Todos.aggregate([
                        { $match: { userId: req.user.userId, isCompleted: true, title: { $regex: search.toString() } } }
                    ]);
                } else {
                    myTodos = await Todos.aggregate([
                        { $match: { userId: req.user.userId, isCompleted: true } }
                    ]);
                }
            } else {
                if (search) {
                    myTodos = await Todos.aggregate([
                        { $match: { userId: req.user.userId, isCompleted: false, title: { $regex: search.toString() } } }
                    ]);
                } else {

                    myTodos = await Todos.aggregate([
                        { $match: { userId: req.user.userId, isCompleted: false } }
                    ]);
                }
            }
        } else {
            if (search) {
                myTodos = await Todos.aggregate([
                    { $match: { userId: req.user.userId, title: { $regex: search.toString() } } }
                ]);
            } else {
                myTodos = await Todos.aggregate([
                    { $match: { userId: req.user.userId } }
                ]);
            }
        }


        if (sort) {
            res.status(200).json(myTodos)
        } else {
            res.status(200).json(myTodos.reverse())
        }

    } catch (err) {
        console.log(err)
    }
})

router.put('/:id', verify, async (req, res) => {
    try {
        const updateTodo = await Todos.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {
            new: true
        });
        res.status(200).json(updateTodo)
    } catch (err) {
        console.log(err)
    }
})

router.delete('/:id', verify, async (req, res) => {
    try {
        await Todos.findByIdAndDelete(req.params.id);
        res.status(200).json('Todo deleted successfully')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router