
import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Rent-App API',  // API title
      version: '1.0.0',      // API version
      description: 'API documentation for the Rent-App backend', 
    },
    servers: [
      {
        url: 'http://localhost:4050',  
      },
    ],
  },
  apis: ['./routes/*.js'],  // Path to your route files
};


const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Path to your README.md
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Remove the leading '/' if on Windows
const normalizedDirname = __dirname.startsWith('/') ? __dirname.slice(1) : __dirname;

const readmePath = path.join(normalizedDirname, 'documentation.json');

const appendSwaggerToReadme = () => {
 
  fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) throw err;

    
    const documentationSection = `
## API Documentation

The following is the automatically generated Swagger API documentation:

\`\`\`json
${JSON.stringify(swaggerSpec, null, 2)}
\`\`\`

    `;

    const documentationMarker = '## API Documentation';
    if (data.includes(documentationMarker)) {
      const updatedData = data.replace(
        new RegExp(`(${documentationMarker}[\\s\\S]*?\\\`\`\`json)`, 'g'),
        `${documentationSection}`
      );
      fs.writeFile(readmePath, updatedData, 'utf8', (err) => {
        if (err) throw err;
        console.log('Swagger documentation has been updated in the README.md file.');
      });
    } else {
      
      fs.appendFile(readmePath, documentationSection, 'utf8', (err) => {
        if (err) throw err;
        console.log('Swagger documentation has been added to the README.md file.');
      });
    }
  });
};


appendSwaggerToReadme();
