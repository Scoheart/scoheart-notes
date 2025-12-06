import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question() {
  rl.question("please input: ", (input) => {
    if (input === "exit") {
      rl.close();
      return;
    }
    console.log(`you input: ${input}`);
    question();
  });
}

question();
