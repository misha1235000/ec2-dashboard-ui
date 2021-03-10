# EC2 Instances Dashboard UI Application

EC2 Instances Dashboard is a web application, which gives you the functionality of viewing all of your ec2 instances with search and sort abilities of the data.

## Clone Repository

Clone the repository by using the git cli

```node
git clone https://github.com/misha1235000/ec2-dashboard-ui.git
```

## Install Packages

After cloning the repository, you need to run:

```bash
cd ec2-dashboard-ui
npm install
npx ng serve
```
Thats it, now you can enter the website in the localhost URL:

```bash
http://localhost:4200
```

> Note: The default API URL is: http://localhost  
> You can change it in the environment.ts file located in: `src/environments/environment.ts` according to your API URL.
> The backend API can be found in this repository: https://github.com/misha1235000/ec2-dashboard-api
