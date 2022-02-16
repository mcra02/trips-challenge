.DEFAULT_GOAL := help

TAG = latest
IMAGE_NAME = Trips
CONTAINER_NAME = server
CONTAINER_OWNER = [maicolcrodrigoa@gmail.com]

######## Manage containers status (default target = all)
status: ## Show containers status, use me with: make status target=api
	docker-compose ps ${target}

stop: ## Stops the docker containers, use me with: make stop target=api
	docker-compose stop ${target}

down: ## Stops and removes the docker containers, use me with: make down target=api
	docker-compose down ${target}

delete: ## Delete the docker containers, use me with: make delete target=api
	docker-compose rm -fv ${target}

up: ## Up the docker containers, use me with: make up target=api
	docker-compose up -d ${target}

logs: ## Logss the docker containers, use me with: make logs target=api
	docker-compose logs -f ${target}

restart: ## Restart the docker containers, use me with: make restart target=api
	docker-compose restart ${target}

build: ## Build the docker containers, use me with: make build target=api
	docker-compose build ${target}

rebuild: # Rebuild the docker containers, use me with: make rebuild
	make stop
	make delete
	make build
	make up

exec: ## Execute command in the docker container, use me with: make exec target=api cmd=ls
	docker-compose exec ${target} ${cmd}

test.jest: ## Execute command in the docker container, use me with: make test.cov
	make exec target=server cmd="yarn test"


###### Help
help:
	@echo  'Development commands for project ${PROYECT_NAME}'
	@echo
	@echo 'Usage: make COMMAND [target=some-targets] [cms=some-commads] [revision=some-revision]'
	@echo
	@echo 'Targets:'
	@echo
	@echo '  server            API Rest'
	@echo '  client            Client React'
	@echo '  mongo_db          Mongo database'
	@echo
	@echo '  default target=all'
	@echo
	@echo '༼ つ ◕_◕ ༽つ  Commands:'
	@echo
	@grep -E '^[a-zA-Z_-]+.+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'
	@echo