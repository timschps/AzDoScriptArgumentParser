<#
    .SYNOPSIS
    This script generates a PowerShell arument list
    .DESCRIPTION
    This task allows you to specify a set of optional parameters that should be parsed in a Powershell Argument List. The parameters in the list will be checked against build variables that are passed to the build. When such a variable is specified, then it is added to the PowerShell argument list
    .PARAMETER length
    .NOTES
    Written by Tim Schaeps
    @timschaeps
    https://www.timschaeps.be
    #>



[CmdletBinding()]
param()

# For more information on the Azure DevOps Task SDK:
# https://github.com/Microsoft/vsts-task-lib
Trace-VstsEnteringInvocation $MyInvocation
try {
    # Set the working directory.
    $VariableName = Get-VstsInput -Name VariableName -Require
    $VariableNameInTool = Get-VstsInput -Name VariableNameInTool -Require
    $ParsedArgumentListName = Get-VstsInput -Name ParsedArgumentListName -Require
    $parsedArguments = Get-VstsTaskVariable -Name $ParsedArgumentListName

    Write-Host "-----------------------------------------------------"
    Write-Host "This task allows you to build an argument list for a script in this build. You can specify (optional) variables that can be passed to the build
    and that can be parsed to the argumentlist that you can specify in the variable 'ParsedArgumentListName' of this task"
    Write-Host "This task will try to retreive a value for variable: '$VariableName'"
    Write-Host "This variable (if it exists in the build definition) will then be used for the script variable: '$VariableNameInTool' "
    Write-Host "And it will be parsed in into the argument list with variable name: '$ParsedArgumentListName' "
    Write-Host "So, if you want to modify an optional script argument in the script you are going to call, 
    then all you need to do is to specify a build variable (with name $VariableName) and give it a value!"
    Write-Host "-----------------------------------------------------"
    

    if ($parsedArguments) {
        Write-Host "The the argumentlist (possibly retrieved from previous task) is: '$parsedArguments'"
    }
    else {
        Write-Host "The argumentlist seems to be empty at the moment, I'll start from scratch!"
    }
    
    Write-Host "Progress: Checking if variable '$VariableName' has been specified in the build variables"
    $VarableValue = [Environment]::GetEnvironmentVariable($VariableName)
    if($VarableValue){ 
        Write-Host "Progress: Variable with name '$VariableName' specified on buildlevel (The value is: $VarableValue) , adding this value to the argumentstring"
        $spacer = ""
        if ( -not ([string]::IsNullOrEmpty($parsedArguments)) ) {
            $spacer = " "
        }
        
        $parsedArguments = $parsedArguments + $spacer +"-$VariableNameInTool=""$VarableValue"""
        Set-VstsTaskVariable -Name $ParsedArgumentListName -Value $parsedArguments
        Write-Host "Progress: The result of this change is now: $parsedArguments"
        }else{
        Write-Host "Progress: no variable with name '$VariableName' specified on buildlevel, doing nothing"
        }

    Set-VstsTaskVariable -Name ParsedArguments -Value $parsedArguments
    # Output the message to the log.
    Write-Host "-----------------------------------------------------"
    Write-Host "Here is a resume of what I found/did:"
    Write-Host "I had to look for a build variable with name: $VariableName"
    Write-Host "I had to use it in the script argumetn list ($ParsedArgumentListName)"
    if($VarableValue){
        Write-Host "I found the variable ($VariableName) and it had the following value: $VarableValue"
        Write-Host "It is used in the argument list ($ParsedArgumentListName) and this is the result: $parsedArguments"
    }
    else {
        Write-Host "The variable was not defined (or it had no value), so I have nothing more to report here"
        
    }
    Write-Host "-----------------------------------------------------"
} finally {
    Trace-VstsLeavingInvocation $MyInvocation
}
