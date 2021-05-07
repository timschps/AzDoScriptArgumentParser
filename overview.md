# What?

If you have worked with PowerShell (or another script runner) before, then you will most likely have discovered the power of being able to pass variables. These variables in turn help define what the script does and what you can accomplish. This is thus a very powerful mechanism to insert logic into your workflow. 

In Azure Pipelines, you have the possibility to set up a YML pipeline which can contain a "PowerShell" task. This is [documented here](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/powershell?view=azure-devops) (very well) 

Basically, to get started with this task, you can pass a 3 things:
1. the script (assuming we're going to work with a script based approach (`targettype=ps1`))
2. the working directory
3. the arguments

These arguments can be a list of options that you want/need to pass to the script and they can be based on variables/parameters, but what happens when you want/need to be able to work with "optional variables" in your script and when you "only" want to override the variables that you want to be different from the defaults that you have defined in the PowerShell script? Well, then you have a problem... And that is where this extension can help you!

The idea is that you can define (in your pipeline) which "optional" variables you want to support and to which "argumentstring" they should contribute. If you do nothing, then nothing happens and the default values in your script will be used (assuming that you have default values of course). But if you define one or more of these variables (on pipeline level),then they will be parsed in a so called "argumentstring", which can then be passed to the PowerShell task (still to be tested for other runners!)

# Why?

Well, I already hear you thinking, why would I need such a thing? Well, to me it's easy: this helps with making things simple for you. Instead of having to define (and maintain) multiple `yaml` files, you now can set up multiple build pipelines in Azure DevOps, all based on the same `azure-pipelines.yml` file in your repo. This is extremely powerful as it allows you to support multiple scenario's in your PowerShell script and at the same time, you don't have to worry about it too much in the platform that is calling the script (in this case Azure DevOps)

## Example: Cake
If you work with the [Cake Build](https://www.cakebuild.net) build system, then you will be most likely aware that your `build.cake` file can contain arguments that can be overridden at time of execution. All your build logic resides in that file and you most likely would like to keep it like that. When running that script, you can run it without arguments and then it will work with the defaults that have been defined by the end user (you). 

But if you want a second build pipeline that does something different, but still with the same Cake file, then you can achieve this with an argument that is passed to the cake file. If you want to be able to support it without this extension, then you would have to come up with a second `azure-pipelines.yml` file, which passes the variable. This means that you would have to set up another `azure-pipelines.yml` file, just for this reason, which is a shame as your logic get scattered all over the place! With this approach, you can focus on your (important) work, while still having the possibility to be flexible

# How?

With this extension, all you need to do is:
1. define 
   1. which arguments you want to support
   2. the name of the variable that will keep the `parsedargumentlist` (yes, you can have multiple if you want/need to)
2. add these in your `azure-pipelines.yml` file
3. set up the PowerShell task and pass the `parsedargumentlist` variable to the `arguments` input
4. set up one of more Azure Pipelines based on the same `azure-pipelines.yml`
5. define one or more of these variables on pipeline level so that these builds actually do something different (otherwise, it would be really stupid)
6. That's it, you can start running your build(s)!


Such a task would look like this:

```yml
- task: ScriptArgumentParser@0
        inputs:
          VariableName: caketarget
          VariableNameInTool: Target
          VariableBinder: '=' # Optional: this allows you to adopt the (to be) result to the needs of your tool/platform
          ParsedArgumentListName: parsedArgumentList
```

You can have as many of those as you want and this really will help you to have a flexible solution. 

Using the result in the PowerShell task can then be done like this:

```yml
 - task: PowerShell@2
        inputs:
          filePath: buildscript.ps1
          arguments: $(parsedArgumentList) # -> what you have been building
          workingDirectory: $(workdir) #-> optional

```

# Known issue(s)

## When no variables are defined on pipeline level

When you do not define a variable on pipeline level, then the resulting `parsedargumentlist` variable will be empty and that empty variable will be passed to the PowerShell. From my experience, the PowerShell task does not react too well to this and therefore, there are 2 solutions:
1. define at least one variable on your build pipeline(s) 
2. the task also supports the `DefaultValue` input. Specifying this one, will allow you to set up a pipeline with no variables (if this is what you need of course) That would like this:

```yml
- task: ScriptArgumentParser@0
        inputs:
          VariableName: cakeverbosity
          VariableNameInTool: Verbosity
          DefaultValue: Diagnostic
          VariableBinder: '=' # Optional: this allows you to adopt the (to be) result to the needs of your tool/platform
          ParsedArgumentListName: parsedArgumentList
```
