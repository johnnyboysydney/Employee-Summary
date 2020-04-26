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


