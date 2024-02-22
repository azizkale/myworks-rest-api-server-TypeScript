import axios from 'axios';

export const getLocation =async () => {
        try {
            const response = await axios.get('https://ipinfo.io');
            const { loc } = response.data;
    
            const [latitude, longitude] = loc.split(',').map(parseFloat);
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        } catch (error:any) {
            console.error('Error fetching geolocation:', error.message);
        }    
    
}