import chalk from 'chalk';
import { connect } from 'socket.io-client';
import terminal, {
  clearTerminalLine,
  error,
  success,
  warn,
  writeNewLine,
} from './utils/terminal';

// Types
import { Message } from './types/message';

const client = connect('http://localhost:3000/');
let logged = false;

const waitingMessage = setInterval(
  () => console.log('Conectando no Servidor...'),
  1000
);

function openChat() {
  terminal.question('', answer => {
    client.emit('text', { data: answer } as Message);
    openChat();
  });
}

client.on('connect', () => {
  clearInterval(waitingMessage);
  warn('Conectado no servidor!');
  terminal.question(chalk.yellow('Digite o seu nome de usuário: '), answer => {
    client.emit('login', { data: answer } as Message);
    openChat();
    logged = true;
  });
});

client.on('login', ({ data }: Message) => {
  if (!logged) return;
  const currentLine = terminal.getPrompt();
  clearTerminalLine();
  success(data);
  writeNewLine(currentLine);
});

client.on('text', ({ data }: Message) => {
  if (!logged) return;
  const currentLine = terminal.getPrompt();
  clearTerminalLine();
  warn(data);
  writeNewLine(currentLine);
});

client.on('logout', ({ data }: Message) => {
  if (!logged) return;
  const currentLine = terminal.getPrompt();
  clearTerminalLine();
  error(data);
  writeNewLine(currentLine);
});
