// fix unfindable module error

import Todo from "../db/models/TodoModel.js";

export const resolvers = {
    Query: {
      getTodos: async () => {
        return await Todo.find();
      },
    },
    Mutation: {
      addTodo: async(_, { task }) => {
        const todo = new Todo({
          task,
          completed: false,
        });
        await todo.save();
        return todo;
      },
      toggleComplete: async (_, { id }) => {
        const todo = await Todo.findById(id);
        if (!todo) return null;
      
        todo.completed = !todo.completed;
        await todo.save();
      
        return todo;
      },
    },
  };