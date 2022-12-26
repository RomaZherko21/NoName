# **_NoName app_**

- [How to start](#how-to-start)
- [CMD](#cmd)
- [Client credentials](#client-credentials)
- [phpMyAdmin credentials](#phpMyAdmin-credentials)
- [Diagrams](#diagrams)
- [Frontend style guide](#Frontend-style-guide)

The main idea of the project is to practice with different technologies such as:\
:white_check_mark: React\
:white_check_mark: MobX\
:white_check_mark: Express\
:black_square_button: GoLang\
:black_square_button: Gin\
:black_square_button: MySQL queries\
:black_square_button: Docker\
:black_square_button: Git-hub actions\
:black_square_button: REST\
:black_square_button: SOLID

## How to start

First of all you need to download Docker on your desktop.\
I also recommend you to install "Make", it is a tool which controls the generation of executables and other non-source files of a program from the program's source files.

## CMD:

### `make run` or `docker-compose up --build`

Start an app in the development mode.

- Open [http://localhost:80](http://localhost:80) to view client in the browser.
- Open [http://localhost:8000/swagger/index.html](http://localhost:8000/swagger/index.html) to view swagger of go_api.

Client and node_api server will reload if you make edits.\
You will also see any lint errors in the console.

### `make down` or `docker compose down --remove-orphans -t 0`

Stops docker containers.

## Client credentials

- email: admin@gmail.com
- password: qwerqwer

## phpMyAdmin credentials

- host: mysql_db
- name: root
- password: qwer

## go_api swagger

http://localhost:8000/swagger/index.html

## Diagrams

https://app.diagrams.net/#HRomaZherko21%2FNoName%2Fmaster%2Fdiagrams%2Fdocker-services.png

![docker-services](https://github.com/RomaZherko21/NoName/blob/master/diagrams/docker-services.png?raw=true)

## Frontend style guide

### Order in .jsx file
1. Libs hooks, root store hooks
2. Local state
3. side effects
4. functions, handlers

### CSS styles
- sx={{}} if there is less then 6 styles
- Styles.module.scss if 6 and more styles
- theme folder for change all default styles throughout the project

### Import order
1. From libs
2. Absolute path
3. Relative paths

### Commit message
- Types: feat, fix, refactor, ci, docs, style, test
- Scope: FE-0, BE-0, ROOT-0
- F.E. git commit -m "fix(FE-33): edit local storage hook"
