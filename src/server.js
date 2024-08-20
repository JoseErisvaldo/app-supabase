const fastify = require('fastify')();
const { supabase } = require('./supabaseConnection');

fastify.get('/users', async (request, reply) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return { value: data };
  } catch (error) {
    console.error(error);
    reply.status(500).send(error.message);
  }
});

fastify.post('/users', async (request, reply) => {
  try {
    const { name, email } = request.body;
    const { data, error } = await supabase.from('users').insert([{ name, email }]).select();
    if (error) throw error;
    return { value: data };
  } catch (error) {
    console.error(error);
    reply.status(500).send(error.message);
  }
});

fastify.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
