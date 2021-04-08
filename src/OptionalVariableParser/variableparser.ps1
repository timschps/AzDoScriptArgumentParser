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
    Write-Host "This task allows you to specify an optional variable if you need one in your pipeline."
    Write-Host "You can specify a variable name with a default value, which in turn can be overridden on" 
    Write-Host "build/pipeline level. (when specified)" 
    Write-Host "It will override the default value that can also be specified here." 
    
    Write-Host "This task will try to retreive a value for variable: '$VariableName' which can be used to"
    Write-Host "override the default value ($DefaultValue) So, if you want to override this optional variable, 
    then all you need to do is to specify a build variable (with name $VariableName) and give it a value!"
    Write-Host "-----------------------------------------------------"
    
    Write-Host "-----------------------------------------------------"
    Write-Host "Starting!"
    Write-Host "-----------------------------------------------------"
    Write-Host "Progress: Checking if variable '$VariableName' has been specified in the build variables"
    $VariableValue = [Environment]::GetEnvironmentVariable($VariableName)
    if($VarableValue){ 
        $VariableValue = $VarableValue
        Write-Host "I found build variable with name: $VariableName. The value is $VariableValue"
        }else{
        $VarableValue = $DefaultValue
        Write-Host "I found no build variable with name: $VariableName."
        }
        Write-Host "-----------------------------------------------------"

    Set-VstsTaskVariable -Name $ParsedVariableName -Value $VariableValue
    # Output the message to the log.
} finally {
    Trace-VstsLeavingInvocation $MyInvocation
}
