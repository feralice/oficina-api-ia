import { z } from 'zod';

const title = z.string().min(1).max(100);

// z.object descarta campos desconhecidos (userId, id...), então o cliente
// só consegue mandar o que está aqui.
export const createTaskSchema = z.object({ title });
export const updateTaskSchema = z.object({
  title: title.optional(),
  done: z.boolean().optional(),
});
