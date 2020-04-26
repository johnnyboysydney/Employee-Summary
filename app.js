const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employeeList = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function start() {
inquirer    
    .prompt([
    {
        type: "list",
        name: "jobType",
        message: "What type of employee are you?",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "list complete"            
        ]
    }

    ])
    .then(answers => {
        if(answers.jobType === "Engineer"){
            addEngineer();
        } 
        else if(answers.jobType === "Manager"){
            addManager();
        }
        else if(answers.jobType === "Intern"){
            addIntern();
        }
        else{
            end();
        }        
    });
}
function addManager() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is you manager's Email"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your office number?",            
        }
    ])
    .then(answers => {
        console.log(answers);
        const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);
        employeeList.push(manager);
        start();
    });
}
function addEngineer() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is you engineer's Email"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's gitHub?"
        }
    ])
    .then(answers => {
        console.log(answers);
        const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
        employeeList.push(engineer);
        start();
    });
}
function addIntern() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "internID",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is you intern's Email"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?"
        }
    ])
    .then(answers => {
        console.log(answers);
        const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
        employeeList.push(intern);
        start();
    });
}
start(); 

function end() {
     console.log("End");
     fs.writeFileSync(outputPath, render(employeeList), "utf-8");
}