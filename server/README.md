

## API Documentation

The following is the automatically generated Swagger API documentation:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Rent-App API",
    "version": "1.0.0",
    "description": "API documentation for the Rent-App backend"
  },
  "servers": [
    {
      "url": "http://localhost:4050"
    }
  ],
  "paths": {
    "/register": {
      "post": {
        "summary": "Register a new user",
        "description": "Registers a new user by providing name, email, and password.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User successfully registered"
          },
          "401": {
            "description": "Signup failed"
          }
        }
      }
    },
    "/login": {
      "post": {
        "summary": "User login",
        "description": "Authenticates the user by email and password, and returns a JWT token.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Login successful, token generated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "user": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "email": {
                          "type": "string"
                        }
                      }
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "User not found"
          },
          "422": {
            "description": "Invalid password"
          }
        }
      }
    },
    "/logout": {
      "post": {
        "summary": "Logout the current user",
        "description": "Logs out the current user by clearing the JWT token from the cookies.",
        "responses": {
          "200": {
            "description": "User logged out successfully"
          }
        }
      }
    }
  },
  "components": {},
  "tags": []
}
```

    
{
  "openapi": "3.0.0",
  "info": {
    "title": "Rent-App API",
    "version": "1.0.0",
    "description": "API documentation for the Rent-App backend"
  },
  "servers": [
    {
      "url": "http://localhost:4050"
    }
  ],
  "paths": {},
  "components": {},
  "tags": []
}
```

    