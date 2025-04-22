import axios from 'axios';
const BASE_URL = 'http://localhost:5002/api/reviews';

// Type definition for each review
interface Review {
  rating: number;
  comment: string;
  reviewedBy: string;
  vehicle: string;
  createdAt: string;
  updatedAt: string;
}

// Type definition for API response
interface VehicleReviewResponse {
  reviews: Review[];
}

// ✅ Fetch average ratings for multiple vehicles
export const getVehicleRatings = async (vehicleIds: string[]) => {
  const ratingsMap: Record<string, number> = {};

  await Promise.all(
    vehicleIds.map(async (id) => {
      try {
        const res = await axios.get<VehicleReviewResponse>(`${BASE_URL}/vehicle/${id}`);
        const ratings = res.data.reviews;
        const avg =
          ratings.length > 0
            ? ratings.reduce((sum: number, r) => sum + r.rating, 0) / ratings.length
            : 0;
        ratingsMap[id] = avg;
      } catch (err) {
        console.error(`Failed to fetch rating for vehicle ${id}:`, err);
        ratingsMap[id] = 0;
      }
    })
  );

  return ratingsMap;
};

// ✅ Fetch average rating for a specific provider
interface AvgRatingResponse {
    data: {
      avgRating: number;
      count: number;
    };
  }
  
  export const getAvgProviderRating = async (providerId: string) => {
    const res = await axios.get<AvgRatingResponse>(`${BASE_URL}/provider/${providerId}/average`);
    return res.data.data; // returns { avgRating, count }
  };
  