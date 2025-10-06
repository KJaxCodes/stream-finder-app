import axios from 'axios';

const API_KEY = process.env.WATCHMODE_API_KEY;
const BASE_URL = 'https://api.watchmode.com/v1/';

// Define the structure of the movie information we want to return
export interface BasicMovieInfo {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
}

// Function to search for a movie by title
export async function searchMovie(title: string): Promise<BasicMovieInfo | null> {
  try {
    const response = await axios.get(`${BASE_URL}/search/`, {
      params: {
        apiKey: API_KEY,
        search_field: 'name',
        search_value: title,
        types: 'movie'
      }
    });
    const result = response.data.title_results[0];
    if (!result) return null;
    
    return {
      id: result.id,
      title: result.name,
      year: result.year,
      posterUrl: result.poster
    };
  } catch (error) {
    console.error('Error searching movie:', error);
    return null;
  }
}