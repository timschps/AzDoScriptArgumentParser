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
    $DefaultValue = Get-VstsInput -Name DefaultValue -Require
    $ParsedVariableName = Get-VstsInput -Name ParsedVariableName -Require

    Write-Host "-----------------------------------------------------"
    Write-Host "This task allows you to build an argument list for a script in this build. You can specify (optional) variables that can be passed to the build
    and that can be parsed to the argumentlist that you can specify in the variable 'ParsedArgumentListName' of this task"
    Write-Host "This task will try to retreive a value for variable: '$VariableName'"
    Write-Host "So, if you want to modify an optional script argument in the script you are going to call, 
    then all you need to do is to specify a build variable (with name $VariableName) and give it a value!"
    Write-Host "-----------------------------------------------------"
    

    
    
    Write-Host "Progress: Checking if variable '$VariableName' has been specified in the build variables"
    $VariableValue = [Environment]::GetEnvironmentVariable($VariableName)
    if($VarableValue){ 
        $VariableValue = $VarableValue
        }else{
        $VarableValue = $DefaultValue
        }

    Set-VstsTaskVariable -Name $ParsedVariableName -Value $VariableValue
    # Output the message to the log.
    Write-Host "-----------------------------------------------------"
    Write-Host "Here is a resume of what I found/did:"
    Write-Host "I had to look for a build variable with name: $VariableName"
    Write-Host "-----------------------------------------------------"
} finally {
    Trace-VstsLeavingInvocation $MyInvocation
}
