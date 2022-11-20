import Todo from "../../../db/models/Todo";

export default async function handler(req, res) {
    if (req.method === "DELETE") {
        const { slug } = req.query;
        const todo = await Todo.findByPk(slug);
        await todo.destroy();
        res.status(204).end();
    }
    if (req.method === "PATCH") {
        const { slug } = req.query;
        const { completed } = req.body;
        const todo = await Todo.findByPk(slug);
        todo.completed = completed;
        await todo.save();
        res.status(200).json(todo);
    }
    if (req.method === "PUT") {
        const { slug } = req.query;
        const { newTitle } = req.body;
        const todo = await Todo.findByPk(slug);
        todo.title = newTitle;
        await todo.save();
        res.status(200).json(todo);
    }
}