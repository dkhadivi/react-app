@echo off
rem ###################################################################################################################
rem Build the application or runs the application.
rem
rem To build the application for either the development or production environment:
rem
rem     run build  dev | prod
rem
rem To run the application
rem
rem     run app dev | prod
rem
rem ###################################################################################################################
cls
echo.
rem Construct the root folder based on the current location of this batch file.
rem -------------------------------------------------------------------------------------------------------------------
set rootFolder=%~dp0

rem remove the trailing slash
if "%rootFolder:~-1%"=="\" (
    set rootFolder=%rootFolder:~0,-1%
)
echo rootFolder: %rootFolder%
echo.

rem Evaluate the command-line parameters.
rem -------------------------------------------------------------------------------------------------------------------
set param1Valid=false
set param2Valid=false
if "%1"=="build" set param1Valid=true
if "%1"=="app" set param1Valid=true
if "%2"=="dev" set param2Valid=true
if "%2"=="prod" set param2Valid=true

rem Determine the environment.
rem -------------------------------------------------------------------------------------------------------------------
if "%param2Valid%"=="true" (
    if "%2"=="prod" (
        set deployFolder=%rootFolder%^\dist
    ) else (
        set deployFolder=%rootFolder%^\dist
    )
) else (
    goto usage
)

rem Determine and perform the action.
rem -------------------------------------------------------------------------------------------------------------------
if "%param1Valid%"=="true" (
    rem If the 1st parameter is "build", build the application for the specified environment, using the appropriate script.
    if "%1"=="build" (
        cls
        echo.
        echo ************ Building app for '%2'.
        (npm run clean-"%2"); && npm run build-"%2"
        rem npm run "%2"
        goto done
    )

    rem If the 1st parameter is "app", run the application in the specified environment.
    if "%1"=="app" (
        rem In development environment, run the application using the Webpack Dev Server.
        if "%2"=="dev" (
            cls
            echo.
            echo ************ Running app in '%2' using the Webpack Dev Server.
            npm run start
            goto done
        )

        rem In prodction environment, display a message the the application should run in the local IIS.
        if "%2"=="prod" (
            cls
            echo.
            echo ************ Running app in '%2'.
            echo.
            echo App in '%2' should run in the local IIS. Make sure the web site is running.
            echo.
            goto done
        ) else (
              goto usage
        )
    ) else (
        goto usage
    )
) else (
     goto usage
)

rem Error handling and completion.
rem -------------------------------------------------------------------------------------------------------------------
:usage
     echo.
     echo.
     echo Usage:
     echo.
     echo     %~n0  build  dev ^| prod
     echo     %~n0  app dev ^| prod
     echo.

:done
    echo.
    echo ************ Done!