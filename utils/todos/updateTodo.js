const updateTodo = async(id, newTitle) => {
    console.log(id + newTitle)
    const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            newTitle
        }),
    });
    return await response.json();
};

export default updateTodo;