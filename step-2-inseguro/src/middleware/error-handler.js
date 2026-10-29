// ATENÇÃO: devolve detalhes internos. É de propósito, pra turma achar.
export function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message, stack: err.stack });
}
