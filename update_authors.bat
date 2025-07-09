@echo off
for /r %%f in (*.js,*.jsx,*.scss) do (
    powershell -Command "(Get-Content '%%f' -Raw) | ForEach-Object { $_ -replace '@author Ryan Balieiro', '@author Omkar Patil' } | Set-Content '%%f' -NoNewline"
)