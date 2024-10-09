
//comments for another commit

const apikey = process.env.API_KEY;

/**
 * 
 * @param {Request} req 
 * @returns 
 */
export async function GET(req){
    const page = req.headers.get("Page");
    const result = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page}&apikey=${apikey}`);
    const data = await result.json();
    return Response.json(data);
}
export async function POST(req){
    const { q, page } = await req.json();
    const result = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=10&page=${page}&apikey=${apikey}`);
    const data = await result.json();
    return Response.json(data);
}