import { instance } from "@/config/axios.config";
import axios, { AxiosError } from "axios";

class TodoService {
  private url = "/good-deeds";

  static handleError(error: unknown): error is AxiosError {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
  async getAllTodo() {
    try {
      const responseTodo = await instance.get(`${this.url}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN ?? ''}`
        }
      });
      return responseTodo.data;
    } catch (error) {
      TodoService.handleError(error);
    }
  }
}

export const todoService = new TodoService();