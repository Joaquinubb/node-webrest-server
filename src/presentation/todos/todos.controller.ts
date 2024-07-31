import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const newTodo = await prisma.todo.create({ data: createTodoDto! });

    res.json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    if (!updatedTodo)
      return res.status(500).json({ error: "Failed to update TODO" });

    return res.json({ updatedTodo, message: "TODO updated successfully" });
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const deleteTodo = await prisma.todo.delete({ where: { id } });
    if (!deleteTodo)
      return res.status(500).json({ error: "Failed to delete TODO" });

    return res.json({ todo, message: "TODO deleted successfully" });
  };
}
