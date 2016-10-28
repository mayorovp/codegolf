$ErrorActionPreference = "Stop"

git fetch origin gh-pages:gh-pages --force

if (-not (Test-Path package)) {
    git worktree add package gh-pages
}

Push-Location package
[environment]::CurrentDirectory = (Get-Location)
git checkout --force gh-pages
git clean -fd

Pop-Location
[environment]::CurrentDirectory = (Get-Location)
node build

Push-Location package
[environment]::CurrentDirectory = (Get-Location)
git add .
git commit -m "publish"
git push
