FROM mysql:8.0.29 as MySQL_DB
COPY ./01-init-tables.sql /docker-entrypoint-initdb.d/01-init-tables.sql
COPY ./02-init-data.sql /docker-entrypoint-initdb.d/02-init-data.sql