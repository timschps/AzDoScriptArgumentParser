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
    if ($parsedArguments) {
        Write-Host "The the argumentlist (possibly retrieved from previous task) is: '$parsedArguments'"
    }
    else {
        Write-Host "The argumentlist seems to be empty at the moment"
    }
    Write-Host "The the argumentlist (possibly retrieved from previous task) is: '$parsedArguments'"
    $VarableValue = [Environment]::GetEnvironmentVariable($VariableName)
    Write-Verbose "Checking if variable '$VariableName' has been specified in the build variables"

    if($VarableValue){ 
        Write-Host "Variable with name '$VariableName' specified on buildlevel (The value is: $VarableValue) , adding this value to the argumentstring"
        $parsedArguments = $parsedArguments + " -$VariableNameInTool $VarableValue"
        Set-VstsTaskVariable -Name $ParsedArgumentListName -Value $parsedArguments
        Write-Host "The result of this change is now: $parsedArguments"
        }else{
        Write-Host "no variable with name '$VariableName' specified on buildlevel, doing nothing"
        }

    Set-VstsTaskVariable -Name ParsedArguments -Value $parsedArguments
    # Output the message to the log.
} finally {
    Trace-VstsLeavingInvocation $MyInvocation
}
