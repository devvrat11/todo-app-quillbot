const starTodo = async(id, currentStarStatus) => {
    // console.log(id)
    const response = await fetch(`/api/todos/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            starred: !currentStarStatus,
        }),
    });
    return await response.json();
};

export default starTodo;