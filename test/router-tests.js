import test from 'ava';
import assert from 'assert';
const path = require('path');
const ROUTER = require('./../src/router');
var Inquirer = require("inquirer");
var robot = require("robotjs");

test("Given custom path", async t => {
    //return ROUTER.init([path.join(__dirname, "data/java_dagger_default")], undefined).then(result => {
        
        //t.is(true, true);
        //console.log(process.stdout.toString())
    //});
    //console.log(result)
    // t.fail("Write some tests please")

    askChartTypeQuestions().then(answer => {
        robot.keyTap("enter");
    })
    robot.keyTap("enter");
    
    console.log("finished")
});


const BUBBLE_CHART = "Bubble chart";
const TREE_CHART = "Tree chart";
const LINKED_NODE_CHART = "Linked node chart";
const CHART = "Chart";
const JSON_TYPE = "Json";
function askChartTypeQuestions(){
    const chartQuestions = [{
      type: "list",
      name: "chart_type",
      message: "What kind of chart do you want to generate?",
      choices: [BUBBLE_CHART,TREE_CHART,LINKED_NODE_CHART],
      default: BUBBLE_CHART
    }];
    return Inquirer.prompt(chartQuestions);
  }