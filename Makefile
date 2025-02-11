PRISMA=./node_modules/.bin/prisma

prisma/db:
	$(PRISMA) db pull


prisma/generate:
	$(PRISMA) generate

MYSQL_ROOT_PASSWORD = rootpassword
MYSQL_DATABASE = ecsite-samples
MYSQL_USER = user
MYSQL_PASSWORD = password
MYSQL_IMAGE = mysql:8.0

start:
	docker rm -f prisma-db-sample
	docker run --name prisma-db-sample \
		-e MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD) \
		-e MYSQL_DATABASE=$(MYSQL_DATABASE) \
		-e MYSQL_USER=$(MYSQL_USER) \
		-e MYSQL_PASSWORD=$(MYSQL_PASSWORD) \
		-v $(PWD)/migrations:/docker-entrypoint-initdb.d \
		-p 3306:3306 $(MYSQL_IMAGE)


