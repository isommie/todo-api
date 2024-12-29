const Todo = require('../models/todo');

// Get all To-Do items
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new To-Do
const addTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
        });
        const todo = await newTodo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a To-Do

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // You can also add runValidators if needed
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
};

// const updateTodo = async (req, res) => {
//     try {
//         const todo = await Todo.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         res.status(200).json(todo);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// Delete a To-Do
const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
