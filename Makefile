PRISMA=./node_modules/.bin/prisma

prisma/db:
	$(PRISMA) db pull


prisma/generate:
	$(PRISMA) generate
