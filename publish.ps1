param (
    [switch]$release
)

$ErrorActionPreference = "Stop"

git fetch origin gh-pages-release

if (-not (Test-Path package\.git)) {
    Remove-Item package -Recurse -Force 
    git worktree add package origin/gh-pages-release
}
if (-not (Test-Path package\.git)) {
    throw "Не могу продолжить работу без отдельного worktree в папке package";
}

Push-Location package
[environment]::CurrentDirectory = (Get-Location)
Remove-Item * -Recurse -Exclude .git
git checkout --force origin/gh-pages-release -B gh-pages
git rm execute-* -f

Pop-Location
[environment]::CurrentDirectory = (Get-Location)
node build

Push-Location package
[environment]::CurrentDirectory = (Get-Location)
git add .
git commit -m "publish"
git push origin gh-pages:gh-pages --force

if ($release) {
    git push origin gh-pages:gh-pages-release
}