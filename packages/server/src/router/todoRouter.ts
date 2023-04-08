import { trpc } from "../lib/trpc";
import { z } from "zod";

export const todoRouter = trpc.router({
  list: trpc.procedure.query(({ ctx }) => {
    console.log(ctx.user);
    // const todos = await prisma.todo.findMany()
    // return todos
    return [
      { id: "1", title: "Argus", isCompleted: false },
      { id: "2", title: "Suave", isCompleted: true },
    ];
  }),
  create: trpc.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const title = input.title;
      return { id: "3", title: "Snens", isCompleted: true };
    }),
  delete: trpc.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return true;
    }),
  update: trpc.procedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return { id: "4", title: "Huuuuuhn", isCompleted: true };
    }),
});
