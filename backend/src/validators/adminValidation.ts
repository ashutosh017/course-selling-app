import {z} from 'zod'

export const signupSignupSchema = z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().max(100),
    password: z.string().min(5).max(100),
  }); 