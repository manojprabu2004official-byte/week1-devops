import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function HelloHttp(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // Safely parse query param or request body text without breaking on GET requests
    let name = request.query.get('name');
    
    if (!name) {
        const name = request.query.get('name') || (await request.json().catch(() => ({})) as any).name || 'world';

    }

    return { body: `Hello, ${name}!` };
};

app.http('hellohttp', { // Lowercase here makes the URL lowercase
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: HelloHttp
});
