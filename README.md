# lezzoo-task

The project is a monorepo with 2 packages, frontend and backend

the database is on docker

###to start we have to run these commands from the root folder

- ```yarn``` 
- ```yarn start:docker``` to start the database
- ```yarn prisma:migrate``` 
- ```yarn prisma:studio``` to enter the data manually since we can't insert items and stores from the backend 
- ```yarn start:backend``` 
- ```yarn start:frontend``` scan the QR code from expo go ro get started on ur phone 

note: I have developed and tested mainly on iOS only for the sake of time so maybe on android things won't go as expected 