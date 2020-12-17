type Color =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white';

export default function log(
  content: string,
  foreground?: Color,
  background?: Color,
): void {
  let backgroundCode;

  switch (background) {
    case 'black':
      backgroundCode = '[40m';
      break;
    case 'red':
      backgroundCode = '[41m';
      break;
    case 'green':
      backgroundCode = '[42m';
      break;
    case 'yellow':
      backgroundCode = '[43m';
      break;
    case 'blue':
      backgroundCode = '[44m';
      break;
    case 'magenta':
      backgroundCode = '[45m';
      break;
    case 'cyan':
      backgroundCode = '[46m';
      break;
    case 'white':
      backgroundCode = '[47m';
      break;
    default:
      backgroundCode = '[49m';
      break;
  }

  let foregroundCode;

  switch (foreground) {
    case 'black':
      foregroundCode = '[30m';
      break;
    case 'red':
      foregroundCode = '[31m';
      break;
    case 'green':
      foregroundCode = '[32m';
      break;
    case 'yellow':
      foregroundCode = '[33m';
      break;
    case 'blue':
      foregroundCode = '[34m';
      break;
    case 'magenta':
      foregroundCode = '[35m';
      break;
    case 'cyan':
      foregroundCode = '[36m';
      break;
    case 'white':
      foregroundCode = '[37m';
      break;
    default:
      foregroundCode = '[39m';
      break;
  }

  console.log(`\x1b${backgroundCode}\x1b${foregroundCode}${content}\x1b[0m`);
}
