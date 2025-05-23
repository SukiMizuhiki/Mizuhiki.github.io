const output = document.getElementById("output");
const input = document.getElementById("input");

const commands = {
  help: `Available commands: help, clear, ls, about, contact, projects, cat [filename], skills, education, quote, resume, motd`,
  ls: `about  contact  projects  skills  education  quote  resume  meow  test`,
  clear: () => output.innerText = '',
  about: `I'm a developer who loves building in terminal style.`,
  contact: `Email: yourname@example.com\nGitHub: https://github.com/yourusername\nDiscord: Insert username`,
  projects: `project1.txt  project2.txt`,
  skills: `JavaScript, Python, HTML/CSS, Git, Linux, React, Node.js, Communication, Teamwork`,
  education: `B.Sc. in Computer Science - Your University (20XX - 20XX)`,
  quote: `"Code is like humor. When you have to explain it, it’s bad." - Cory House`,
  resume: `To view resume details, type: cat resume.txt`,
  meow: `insert really big meow`,
  test: `this is a test line of code to show that you can add simple commands and they 
automatically add to the directory as well as the formating to allow 
multiple lines to be added`,
  
  cat: (arg) => {
    const files = {
      'project1.txt': `Project 1: Terminal OS\nA fully interactive web terminal with plugin support and command chaining.`,
      'project2.txt': `Project 2: Portfolio CLI\nA personal site mimicking a Unix shell to browse personal information.`,
      'resume.txt': `Name: Your Name\nEmail: yourname@example.com\nExperience: 3+ years in web development\nSkills: JavaScript, React, Node.js, Python`,
    };
    if (files[arg]) {
      output.innerText += `> cat ${arg}\n` + files[arg] + '\n';
    } else {
      output.innerText += `> cat ${arg}\nFile not found: ${arg}\n`;
    }
  },
  motd: `Welcome to my terminal-style portfolio!\nType 'help' to see a list of available commands.\nUse 'ls' to explore available sections.\nUse 'cat [filename]' to read files like project1.txt or resume.txt.\nUse 'clear' to reset the screen.`
};

let motdIndex = 0;
function typeMotd() {
  const motd = commands.motd + '\n';
  if (motdIndex < motd.length) {
    output.innerText += motd[motdIndex++];
    setTimeout(typeMotd, 20);
  } else {
    cursor.remove();
  }
}

const cursor = document.createElement('span');
cursor.className = 'cursor';
cursor.innerText = '_';
output.appendChild(cursor);

typeMotd();

function handleCommand(cmd) {
  const command = cmd.trim();
  if (!command) return;

  const parts = command.split(" ");
  const baseCmd = parts[0];
  const arg = parts.slice(1).join(" ");

  const entry = `> ${command}\n`;

  if (commands[baseCmd]) {
    if (typeof commands[baseCmd] === 'function') {
      commands[baseCmd](arg);
    } else {
      output.innerText += entry + commands[baseCmd] + '\n';
    }
  } else {
    output.innerText += entry + `Command not found: ${baseCmd}\n`;
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleCommand(input.value);
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});