import * as tl from 'azure-pipelines-task-lib/task';

async function run() {
    try 
    {
        const variableName = tl.getInput('VariableName', true)!; 
        const variableNameInTool = tl.getInput('VariableNameInTool', true)!; 
        const parsedArgumentListName = tl.getInput('ParsedArgumentListName', true)!;
        const variableBinder = tl.getInput('VariableBinder'); 
        const optionalDefaultValue = tl.getInput('DefaultValue');
        var parsedArguments = tl.getVariable(parsedArgumentListName);

        console.log("-----------------------------------------------------");
        console.log("This task allows you to build an argument list for a script in this build. " + 
                    "You can specify (optional) variables that can be passed to the build and that "+
                    "can be parsed to the argumentlist that you can specify in the variable 'ParsedArgumentListName' of this task");
        console.log(`This task will try to retreive a value for variable: '${variableName}'`);
        console.log(`This variable (if it exists in the build definition) will then be used for the script variable: '${variableNameInTool}' `);
        console.log(`And it will be parsed in into the argument list with variable name: '${parsedArgumentListName}'`);
        console.log("So, if you want to modify an optional script argument in the script you are going to call, " +
                    ` then all you need to do is to specify a build variable (with name ${variableName}") and give it a value!`);
        console.log("-----------------------------------------------------");
      
        if(parsedArguments !== undefined && parsedArguments ) {
            console.log(`The the argumentlist (possibly retrieved from previous task) is: '${parsedArguments}'`);
        }
        else {
            console.log("The argumentlist seems to be empty at the moment, I'll start from scratch!");
        }

        console.log(`Progress: Checking if variable '${variableName}' has been specified in the build variables`);
        
        var variableValue = process.env[variableName];
        if( !(variableValue !== undefined && variableValue) && (optionalDefaultValue !== undefined && optionalDefaultValue) )
        {
            console.log("There was no variable with name " + variableName + " specified in the pipeline, but there is a defaultvalue " + optionalDefaultValue);
            console.log("  -> So working with this value");
            variableValue = optionalDefaultValue;
        }

        if(variableValue !== undefined && variableValue)
        { 
            console.log(`Progress: Variable with name '${variableName}' specified on buildlevel (The value is: ${variableValue}), ` +
                                `adding this value to the argumentstring`);
            
            var spacer = "";
            if (parsedArguments !== undefined && parsedArguments){spacer = " ";}
            if (parsedArguments === undefined){parsedArguments = "";}

            var binder =  ( variableBinder !== undefined && variableBinder ) ? variableBinder : " ";

            parsedArguments = parsedArguments + spacer + "-" + variableNameInTool + binder + "\"" + variableValue + "\"";
            tl.setVariable(parsedArgumentListName, parsedArguments);

            console.log(`Progress: The result of this change is now: ${parsedArguments}`);
        }
        else
        {
            console.log(`Progress: no variable with name '${variableName}' specified on buildlevel, doing nothing`);
        }
    
        console.log("-----------------------------------------------------");
        console.log(`Here is a resume of what I found/did:`);
        console.log(`I had to look for a build variable with name: ${variableName}`);
        console.log(`I had to use it in the script argument list (${parsedArgumentListName})`);
        if(variableValue !== undefined && variableValue)
        {
            console.log(`I found the variable (${variableName}) and it had the following value: ${variableValue}`);
            console.log(`It is used in the argument list (${parsedArgumentListName}) and this is the result: ${parsedArguments}`);
        }
        else 
        {
            console.log("The variable was not defined (or it had no value), so I have nothing more to report here");    
        }
        console.log("-----------------------------------------------------");

    } 
    catch (err: unknown) 
    {
        if (err instanceof Error) 
        {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
        else
        {
            tl.setResult(tl.TaskResult.Failed, "Unknown error occurs");
        }
    }
}

run();