# MyPlaces

## Creating and applying EF Core migrations

Make sure you have `dotnet-ef` 5.x installed globally and open a terminal
window in the project root folder (where the .csproj file is located) and run:

```sh
dotnet-ef migrations add <migration-name> -o .\Data\EfCore\Migrations\ -p .\MyPlaces.csproj
```

To apply the migration run:

```sh
dotnet-ef database update -p .\MyPlaces.csproj
```

> **_NOTE:_** The app creates the database and runs all migrations at startup if the database
> specified in the connection string does not exist or was not found.
>
> The default connection string uses MSSQL LocalDb, which creates databases under the current
> user's home folder (e.g. `C:\Users\YourUser\MyPlaces.mdf`, `C:\Users\YourUser\MyPlaces_log.ldf`)

## API endpoints

The API is a REST-like HTTP/S API, oferring basic CRUD operations for two entities.

Some examples:

```http
// Create new entities
POST https://localhost:5001/api/cities
POST https://localhost:5001/api/gmplaces

// GET all Cities and all Google Map Places:
GET https://localhost:5001/api/cities
GET https://localhost:5001/api/gmplaces

// GET by ID
GET https://localhost:5001/api/cities/{id}
GET https://localhost:5001/api/gmplaces/{id}

// Update by ID
PUT https://localhost:5001/api/cities/{id}
PUT https://localhost:5001/api/gmplaces/{id}

// Delete by ID
DELETE https://localhost:5001/api/cities/{id}
DELETE https://localhost:5001/api/gmplaces/{id}
```
