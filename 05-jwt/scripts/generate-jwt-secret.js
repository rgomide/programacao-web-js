const crypto = require('crypto');

const bytes = Number(process.argv[2]) || 64;

if (!Number.isInteger(bytes) || bytes < 32) {
  console.error('Use um tamanho inteiro de pelo menos 32 bytes.');
  console.error('Exemplo: npm run generate:jwt-secret -- 64');
  process.exit(1);
}

const secret = crypto.randomBytes(bytes).toString('hex');

console.log('Copie o valor abaixo para JWT_SECRET no arquivo .env:\n');
console.log(`JWT_SECRET=${secret}`);
