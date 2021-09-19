import * as tl from 'azure-pipelines-task-lib/task';

async function run() {
    try 
    {
        const variableName = tl.getInput('VariableName', true)!; 
        const defaultValue = tl.getInput('DefaultValue', true)!; 
        const parsedVariableName = tl.getInput('ParsedVariableName', true)!; 
    
        console.log("-----------------------------------------------------");
        console.log("This task allows you to specify an optional variable if you need one in your pipeline.");
        console.log("You can specify a variable name with a default value, which in turn can be overridden on " + 
                    "build/pipeline level. (when specified)" );

        console.log("It will override the default value that can also be specified here." );
        
        console.log(`This task will try to retreive a value for variable: '${variableName}' which can be used to ` +
                    `override the default value (${defaultValue}) So, if you want to override this optional variable, ` +
                    `then all you need to do is to specify a build variable (with name ${variableName}) and give it a value!`);
        console.log("-----------------------------------------------------");
        
        console.log("-----------------------------------------------------");
        console.log("Starting!");
        console.log("-----------------------------------------------------");
        console.log(`Progress: Checking if variable '${variableName}' has been specified in the build variables`);
        var variableValue = process.env[variableName];
        if(variableValue !== undefined && variableValue)
        { 
            console.log(`I found build variable with name: ${variableName}. The value is ${variableValue}`);
        }
        else
        {
            variableValue = defaultValue
            console.log(`I found no build variable with name: ${variableName}.`);
        }
        console.log("-----------------------------------------------------");
    
        tl.setVariable(parsedVariableName, variableValue);
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