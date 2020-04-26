// Declaring variables and dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const colors = require("colors");
const employeeList = [];
let isThereAManager = false;
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Start the application
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
            if (isThereAManager === false) {
                isThereAManager = true;
                addManager();
            } else {
                console.log("  A manager has already been assigned.  Please try again.".yellow);
                start();
            }
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
            message: "What is the manager's name?",
            validate: async(input) => {
                if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                    return "Sorry, the employee's name must contain at least 1 character and must only contain letters and spaces!".yellow; 
                }
                    return true;
            }
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the manager's ID?",
            validate: async (input) => {
                if(!input.match(/^[0-9]+$/)) {
                    return "Please enter a number".yellow;
                }
                return true;
            }    
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's Email",
            validate: async(input) => {
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address".yellow;
            }
        },
        
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your office number?",
            validate: async (input) => {
                if(!input.match(/^[0-9]+$/)) {
                    return "Please enter a number".yellow;
                }
                return true;
            }            
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
            message: "What is the engineer's name?",
            validate: async(input) => {
                if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                    return "Sorry, the employee's name must contain at least 1 character and must only contain letters and spaces!".yellow; 
                }
                    return true;
            }
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's ID?",
            validate: async (input) => {
                if(!input.match(/^[0-9]+$/)) {
                    return "Please enter a number".yellow;
                }
                return true;
            }    
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's Email",
            validate: async(input) => {
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address".yellow;
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's gitHub?",
            validate: async(input) => {
            if (!input.match(/^[A-Z0-9_]+$/i)) {
                return "Sorry, the Github username can only contain numbers and/or letters and/or _)".yellow;
                }
                return true;
            }
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
            message: "What is the intern's name?",
            validate: async(input) => {
                if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                    return "Sorry, the employee's name must contain at least 1 character and must only contain letters and spaces!".yellow; 
                }
                    return true;
            }
        },
        {
            type: "input",
            name: "internID",
            message: "What is the intern's ID?",
            validate: async (input) => {
                if(!input.match(/^[0-9]+$/)) {
                    return "Please enter a number".yellow;
                }
                return true;
            }    
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's Email",
            validate: async(input) => {
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address".yellow;
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school name?",
            validate: async(input) => {
                if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                    return "Sorry, intern's school name must contain at least 1 character and must only contain letters and spaces!".yellow; 
                }
                    return true;
            }
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
     console.log("End".red);
     fs.writeFileSync(outputPath, render(employeeList), "utf-8");
}