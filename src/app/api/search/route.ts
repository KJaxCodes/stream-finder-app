export async function POST(request: Request) {
    try {
        const reqBody = await request.json();
        const {query}   = reqBody;
        console.log("Search query: ", query);
    }
    catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}