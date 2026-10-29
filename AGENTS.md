# Regras do projeto

- Node.js 20+, Express, JavaScript com ES modules
- Código em camadas: rota, controller, service
- Dados em memória, sem banco
- Valide toda entrada com Zod
- Nunca devolva stack trace nem detalhe interno no erro
- Toda rota com :id confere se o recurso é do usuário logado
- Nenhum segredo no código
