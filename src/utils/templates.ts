export const success = (message: string) => {
  console.log(`\x1b[32m${message}\x1b[0m`);
};

export const error = (message: string) => {
  let error_msg = '';
  error_msg +=
    '⋱ ⋮ ⋰\n' +
    '⋯ ◯ ⋯ ︵ 　　　　　　^v^\n' +
    '¸︵︵( ░░ )︵.︵.︵　　\n' +
    "(´░░░░░░ ') ░░░' )\n" +
    '`´︶´¯`︶´`︶´︶´`　^v^　　^v^';
  return error_msg;
  //   console.log(`\x1b[31m${message}\x1b[0m`);
};
