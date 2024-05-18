# Blog creation in React using strapi API

- Project Requirements:
    [node.js, npx]
- Create and display Blogs using strapi api's
- To start your application you need run following command
    `npm start`
- To access the admin section: [<your_application_url>/admin]

## Features

- Strapi headless CMS is used to amanage API'S
- To get strapi in the local you need to follow some steps.
    1. Open cmd and go to the location where you want to install strapi.
    2. Run this command:
        `npx create-strapi-app@latest my-project`
    3. It will take some time to install.
    4. Run this command to start strapi:
        `npm run develop`
    5. In the cmd it will show the strapi admin url something like this:
        [http://localhost:1337/admin]
    6. Follow the admin url showing in cmd
    7. Go to the "Content Manager" and create a user which is used to login by admin section.
    8. Create blogs schema from "Content-Type-Builder" and give public permission (create/update/delete/find) from settings > User & Permission Plugin > Roles
    9. You can manage your api's from "Content Manager" link that is showing in sidebar.
    10. To install strapi swagger API documentation, run following command
        `npm run strapi install documentation`
    11. Find the "documentation" from sidebar and it will show option to view the documents.
    12. Use documentation to check api base url, request and response.