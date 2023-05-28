import * as yaml from 'js-yaml';
import * as fs from 'fs';
import swaggerJsDoc from 'swagger-jsdoc';

const usersYamlFilePath = require('path').resolve(__dirname, './src/routes/users/users.yaml')
const usersSpec = yaml.load(fs.readFileSync(usersYamlFilePath, 'utf8'));

const swaggerOptions = {
    definition: {
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'My Works Library API',
            termsOfService: '',
            contact: {
                name: 'API Support',
                url: '',
                email: '',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'My Works API Documentation',
            },
        ],
        security: [{ bearerAuth: [] }], // Apply security to all endpoints
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                },
            },
        },
        ...usersSpec,
    },
    apis: ['./src/routes/users/userroutes.ts']
};
export const specs = swaggerJsDoc(swaggerOptions);