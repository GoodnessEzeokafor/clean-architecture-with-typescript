Basic clean architecture setup


## Setup
* create .env file
  * create values for 
    * ```PORT```, ```DATABASE_URL ```,```DATABASE_NAME```, ``` REDIS_PASSWORD```, ```REDIS_HOST ```, ```REDIS_PORT``` in .env
    * or run export PORT= e.t.c on cli

* run ``` npm run dev ```

### Routes
 * ```/health ```
 * ```POST- /api/v1/blogs ```
 * ```GET- /api/v1/blogs ```
 * ```GET- /api/v1/blogs/:id ```
 * ```UPDATE- /api/v1/blogs/:id ```
 * ```DELETE- /api/v1/blogs/:id ```
 