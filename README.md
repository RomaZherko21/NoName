# **_NoName app_**

- [How to start](#how-to-start)
- [CMD](#cmd)
- [Client credentials](#client-credentials)
- [Php my admin credentials](#php-my-admin-credentials)
- [Diagrams](#diagrams)
- [Style guide](#Style-guide)

The main idea of the project is to practice with different technologies such as:\
:white_check_mark: React\
:white_check_mark: MobX\
:white_check_mark: Express\
:white_check_mark: MySQL queries\
:white_check_mark: Docker\
:black_square_button: Git-hub actions\
:white_check_mark: REST

## How to start

First of all you need to download Docker on your desktop.\
I also recommend you to install "Make", it is a tool which controls the generation of executables and other non-source files of a program from the program's source files.

## CMD:



### In the project root folder (/NoName) run `make run` or `docker compose up --build`
Start docker services in development mode.
- Open [http://localhost:8080](http://localhost:8080) to view phpMyAdmin.

### In the client folder (/NoName/client) run `yarn start`
Start client in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view client in the browser.

Client and api server will reload if you make edits.\
You will also see any lint errors in the console.

### `make down` or `docker compose down --remove-orphans -t 0`

Stops docker containers.

## Client credentials:

- email: admin@gmail.com
- password: qwerqwer

## Php my admin credentials:

- host: mysql_db
- name: root
- password: qwer

## Diagrams

https://app.diagrams.net/#HRomaZherko21%2FNoName%2Fmaster%2Fdiagrams%2Fdocker-services.png

![docker-services](https://github.com/RomaZherko21/NoName/blob/master/diagrams/docker-services.png?raw=true)

## Style guide

### Order in .jsx file

1. Libs hooks, root store hooks
2. Local state
3. side effects
4. functions, handlers

### CSS styles

- sx={{}} if there is less then 6 lines of code
- Styles.module.scss if 6 and more lines of code
- theme folder to change all default styles throughout the project

### Import order

1. From libs
2. Absolute path
3. Relative paths

### Commit message

- Types: feat, fix, refactor, ci, docs, style, test
- Scope: FE-{task-number}, BE-{task-number}, ROOT-{task-number}
- F.E. git commit -m "fix(FE-33): edit local storage hook"
