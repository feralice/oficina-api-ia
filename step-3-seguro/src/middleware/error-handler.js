// Erro sem detalhes pra fora. O detalhe fica só no log do servidor.
export function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  console.error(err);
  res.status(500).json({ error: 'erro interno' });
}
