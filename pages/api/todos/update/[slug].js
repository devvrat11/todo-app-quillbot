import Todo from "../../../../db/models/Todo";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { slug } = req.query;
        const { starred } = req.body;
        const todo = await Todo.findByPk(slug);
        todo.dataStarred = starred;
        await todo.save();
        res.status(200).json(todo);
    }
}