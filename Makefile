.PHONY: run
run: ## Runs the whole app in docker containers
	docker-compose up --build

.PHONY: down
down: ## Runs the whole app in docker containers
	docker-compose down 
