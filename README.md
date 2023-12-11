# Senior Project

The project is a monorepo with 2 packages, frontend and backend

the database is on supabase

### to start we have to run these commands from the root folder

- ```yarn``` 
- ```yarn start:backend``` 
- ```yarn start:frontend``` scan the QR code from expo go to get started on ur phone 

note: I have developed and tested mainly on iOS only for the sake of time so maybe on android things won't go as expected 



#### frontend
- simple expo project
- data is being fetched usign the TRPC client which is type safe
- you will see some hardcoded values leave them for now
##### what is needed?
- owner dashboard to list the reservations and decline or accept the reservation.
- page to discover the teams and request to join a team
- handle accept and decline join requests from the team dashboard (which will be the same page as team but show additional info for the team members)
- creating team form (any user can create team)

#### backend
- it's built with trpc
- the database is on supabase
- using prisma orm to access the db
#### what is neeeded?
- the endpoints that will serve the needed data from the frontend for the new pages and actions 
