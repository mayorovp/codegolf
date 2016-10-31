param (
    [switch]$release
)

$ErrorActionPreference = "Stop"

git fetch origin gh-pages-release

if (-not (Test-Path package)) {
    git worktree add package origin/gh-pages-release
}

Push-Location package
[environment]::CurrentDirectory = (Get-Location)
Remove-Item * -Recurse
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