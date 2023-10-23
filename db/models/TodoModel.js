import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
},
{ timestamps: true });
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;