.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


.PHONY: run
run: ## Runs the whole app in docker containers ( --abort-on-container-exit ) 
	docker-compose up --build

.PHONY: down
down: ## Stops containers, networks, volumes, and images created by up
	docker compose down --remove-orphans -t 0

.PHONY: prune
prune: ## Remove ALL stopped container and ALL unused volumes
	docker container prune -f 
	docker volume prune -f

.PHONY: sysPrune
sysPrune: ## Remove all unused containers, networks, images, and optionally, volumes.
	docker system prune 



.PHONY: runGo
runGo: ## Run go_api container
	docker-compose up --build go_api

.PHONY: downGo
downGo: ## Stops go_api container
	docker-compose rm -s -v go_api

.PHONY: init_swagger
init_swagger: ## init swagger config
	swag init -g ./cmd/main.go

