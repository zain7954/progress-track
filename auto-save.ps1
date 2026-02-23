# Auto-Save to GitHub Script
# Watches the project for file changes and auto-commits + pushes every 60 seconds

$env:PATH = "C:\Program Files\Git\cmd;" + $env:PATH
$projectPath = $PSScriptRoot
$debounceSeconds = 60  # Wait 60 seconds after last change before pushing

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Auto-Save to GitHub is RUNNING" -ForegroundColor Green
Write-Host "  Watching: $projectPath" -ForegroundColor Yellow
Write-Host "  Changes will be pushed every $debounceSeconds seconds" -ForegroundColor Yellow
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Red
Write-Host "==================================================" -ForegroundColor Cyan

# Setup FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $projectPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::FileName

# Ignore these folders/files
$ignoredPaths = @("node_modules", ".git", "dist", ".gitignore")

$lastChangeTime = $null
$pendingChanges = $false

$action = {
    $path = $Event.SourceEventArgs.FullPath
    # Skip ignored paths
    foreach ($ignored in $ignoredPaths) {
        if ($path -like "*\$ignored*") { return }
    }
    $script:lastChangeTime = Get-Date
    $script:pendingChanges = $true
    Write-Host "  [$(Get-Date -Format 'HH:mm:ss')] Change detected: $($Event.SourceEventArgs.Name)" -ForegroundColor DarkYellow
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

try {
    while ($true) {
        Start-Sleep -Seconds 5

        if ($pendingChanges -and $lastChangeTime -and ((Get-Date) - $lastChangeTime).TotalSeconds -ge $debounceSeconds) {
            Write-Host "`n  [$(Get-Date -Format 'HH:mm:ss')] Saving to GitHub..." -ForegroundColor Cyan

            Set-Location $projectPath
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

            git add .
            $status = git status --porcelain
            if ($status) {
                git commit -m "Auto-save: $timestamp"
                git push
                Write-Host "  [$(Get-Date -Format 'HH:mm:ss')] Pushed to GitHub!" -ForegroundColor Green
            } else {
                Write-Host "  [$(Get-Date -Format 'HH:mm:ss')] No changes to push." -ForegroundColor DarkGray
            }

            $pendingChanges = $false
            $lastChangeTime = $null
        }
    }
} finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Write-Host "`nAuto-Save stopped." -ForegroundColor Red
}
