📚 <b>**This is a project for study, and maybe contain bugs.</b>📚

## Technologies used

- Node
- Yarn
- Typescript
- Next.js
- NextAuth (Authentication)
- Auth0
- Tailwind CSS
- SWR (Client side caching)
- MongoDB Atlas (cloud database as a service)
- Vercel (hosting)

## Quick start

- Clone the repo: `git clone https://github.com/MisaelBeray/supermarket-list.git`
- Install all dependencies with npm (https://www.npmjs.com/): `npm i`
- Install all dependencies with yarn (https://yarnpkg.com/): `yarn`

- Create your own **.env.local** file based on **.env.example** (Create a mongoDB instance on MongoDB Atlas or docker container and paste the database url on **.env.local**, and also create an account on auth0 and paste he AUTH0 variables).

- Start dev server:

```bash
yarn dev
```

## Screenshot

| Home page logged out |
| ------------------- |
|<img src="https://user-images.githubusercontent.com/26965306/137637682-bd1c82ad-3bd7-43fe-bf55-5b383130ca50.jpeg" width="400" height="790">

| Authentication with auth0 |
| ------------------- |
|<img src="https://user-images.githubusercontent.com/26965306/137637693-0db74f04-ecd8-476f-adbd-0ff09f253acd.jpeg" width="400" height="790">

| Layout without data  |
| ------------------- |
|<img src="https://user-images.githubusercontent.com/26965306/137632577-b7780127-32b2-48ad-ad3d-6f522543ed8b.jpeg" width="400" height="790">

| Add new item |
| ------------------- |
|<img src="https://user-images.githubusercontent.com/26965306/137632582-e638d969-8d1c-4086-b3c1-b048a8ab800b.jpeg" width="400" height="790">

| Item added |
| ------------------- |
|<img src="https://user-images.githubusercontent.com/26965306/137632593-7155d5af-b358-46a1-88ee-b9b74b6ec029.jpeg" width="400" height="790">

| Total shopping cart value |
| ------------------- |
|<img src="https://user-images.githubusercontent.com/26965306/137632603-c831800d-996c-4d22-9b6a-bf62e92f43c0.jpeg" width="400" height="790">

| Total purchase amount vs budget |
| ------------------- |
|<img src="https://user-images.githubusercontent.com/26965306/137632607-c06f238b-6a22-4f00-8629-800afcb879aa.jpeg" width="400" height="790">

## Live version

You can visit the live version of Teach Other on https://supermarketlist.vercel.app/
