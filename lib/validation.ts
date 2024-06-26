import { z } from "zod";

export const questionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const answerSchema = z.object({
  answer: z
    .string()
    .min(10, { message: "Answer must be at least of 10 character" }),
});

export const editUserSchema = z.object({
  fullname: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  portfolioLink: z.string(),
  location: z.string().min(2).max(50),
  bio: z.string().min(10),
});
