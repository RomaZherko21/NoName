.PHONY: run
run: ## Runs the whole app in docker containers
	docker-compose up --build

.PHONY: down
down: ## Runs the whole app in docker containers
	docker-compose down 

.PHONY: prune
prune: ## Runs the whole app in docker containers
	docker container prune -f && docker volume prune -f

.PHONY: sysPrune
sysPrune: ## Runs the whole app in docker containers
	docker system prune 
	
.PHONY: sysPrune
sysPrune: ## Runs the whole app in docker containers
	docker system prune 
