// Login de mentira: o usuário vem do header x-user-id.
export function fakeAuth(req, res, next) {
  const id = req.header('x-user-id');
  if (!id) return res.status(401).json({ error: 'informe o header x-user-id' });
  req.user = { id };
  next();
}
