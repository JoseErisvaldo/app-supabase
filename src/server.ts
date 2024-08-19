import fastify from "fastify";
import { supabase } from "./supabaseConnection";

const app = fastify();

type Users = {
  id: number;
  name: string;
  email: string;
}

app.get("/users", async () => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return { value: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app.post("/users", async (request) => {
  try {
    const { name, email } = request.body as Users;
    const { data, error } = await supabase.from('users').insert([{ name, email }]).select();
    if (error) throw error;
    return { value: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log('Servidor rodando');
});
