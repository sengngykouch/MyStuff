# TrackMyStuff

---

## Description

- A web app used to track all of personal items. (eg: where it's located and when it's expired).

---

## Get Started
### Prerequisites

Before working with TrackMyStuff, you should have the following installed:
- [Visual Studio Community](https://visualstudio.microsoft.com/downloads/) to build and run the project.
- [SQL Server for developer](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) to enable local database. Choose *Basic* Installation when installing.
- [Visual Studio Code](https://code.visualstudio.com/download)(opitional) for front-end development.
- [Node.js LTS version](https://nodejs.org/en/download/) for NPM related tasks.

### Build and Run the project
To Build and Run the project:
- Double-click TrackMyStuff.sln to open it with [Visual Studio Community](https://visualstudio.microsoft.com/downloads/) to build and run the project.
- Open appsettings.json file. Make sure that the connection string to your local database is correctly set:

 ```json
  {
    "ConnectionStrings": {
    "TrackMyStuffDB": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TrackMyStuffDB;Integrated Security=True;"
  }
 ```
- To open **Package Manager Console tools**, press Ctrl + Q. Then type the **package Manager console**.
- In that window: type **Script-Migration**
 
- [Then build and run the solution](https://docs.microsoft.com/en-us/cpp/build/vscpp-step-2-build?view=msvc-160). This will make a couple of minutes for the first time.




