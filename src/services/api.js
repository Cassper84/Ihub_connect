import axios from 'axios';

export const fetchLatestPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3005/posts/latest');
        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data; // Assuming the posts are in `response.data`
        } else {
            console.error('Unexpected API response:', response);
            return [];
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};
