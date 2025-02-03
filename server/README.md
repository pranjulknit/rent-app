<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rent-App API Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }
        h1, h2, h3 {
            color: #333;
        }
        .api-section {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .endpoint {
            margin-left: 20px;
        }
        .endpoint h3 {
            margin: 0;
            color: #0066cc;
        }
        .code-block {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            margin: 10px 0;
        }
    </style>
</head>
<body>

    <h1>Rent-App API Documentation</h1>
    <p><strong>Version:</strong> 1.0.0</p>
    <p><strong>Description:</strong> API documentation for the Rent-App backend</p>
    
    <div class="api-section">
        <h2>Servers</h2>
        <p><strong>URL:</strong> <a href="http://localhost:4050" target="_blank">http://localhost:4050</a></p>
    </div>
    
    <div class="api-section">
        <h2>Endpoints</h2>
        
        <div class="endpoint">
            <h3>/register</h3>
            <p><strong>Method:</strong> POST</p>
            <p><strong>Summary:</strong> Register a new user</p>
            <p><strong>Description:</strong> Registers a new user by providing name, email, and password.</p>
            <div class="code-block">
                <h4>Request Body:</h4>
                <pre>{
    "name": "string",
    "email": "string",
    "password": "string"
}</pre>
            </div>
            <p><strong>Responses:</strong></p>
            <ul>
                <li><strong>201:</strong> User successfully registered</li>
                <li><strong>401:</strong> Signup failed</li>
            </ul>
        </div>
        
        <div class="endpoint">
            <h3>/login</h3>
            <p><strong>Method:</strong> POST</p>
            <p><strong>Summary:</strong> User login</p>
            <p><strong>Description:</strong> Authenticates the user by email and password, and returns a JWT token.</p>
            <div class="code-block">
                <h4>Request Body:</h4>
                <pre>{
    "email": "string",
    "password": "string"
}</pre>
            </div>
            <p><strong>Responses:</strong></p>
            <ul>
                <li><strong>200:</strong> Login successful, token generated</li>
                <li><strong>401:</strong> User not found</li>
                <li><strong>422:</strong> Invalid password</li>
            </ul>
            <div class="code-block">
                <h4>Response Body (200):</h4>
                <pre>{
    "message": "string",
    "user": {
        "id": "string",
        "name": "string",
        "email": "string"
    },
    "token": "string"
}</pre>
            </div>
        </div>
        
        <div class="endpoint">
            <h3>/logout</h3>
            <p><strong>Method:</strong> POST</p>
            <p><strong>Summary:</strong> Logout the current user</p>
            <p><strong>Description:</strong> Logs out the current user by clearing the JWT token from the cookies.</p>
            <p><strong>Responses:</strong></p>
            <ul>
                <li><strong>200:</strong> User logged out successfully</li>
            </ul>
        </div>

    </div>

</body>
</html>
