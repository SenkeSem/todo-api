import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  complete: { type: Boolean, required: true },
  userId: { type: String, required: true },
});

export const TodosModel = mongoose.model('Todo', TodoSchema)

export const getTodos = (userId: string) => {
  return TodosModel.find({ userId })
};
export const getTodosById = (id: string) => TodosModel.findById(id)
export const createTodo = (values: Record<string, any>) => new TodosModel(values)
  .save().then((todo) => todo.toObject())
export const deleteTodoById = (id: string) => TodosModel.findOneAndDelete({ _id: id })
export const updateTodoById = (id: string, values: Record<string, any>) => TodosModel.findByIdAndUpdate(id, values)

