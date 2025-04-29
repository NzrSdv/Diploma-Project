// import axios from "axios";

// const API_BASE_URL = "https://api.sampleapis.com/wines/reds";

// interface Wine {
//   id: number;
//   name: string;
//   location: string;
//   rating:Object;
//   image: string;
//   price: number;
//   type: string;
// }

// export const getRedWines = async () => {
//   try {
//     const response = await axios.get(API_BASE_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching red wines:", error);
//     throw error;
//   }
// };

// export const getWhiteWines = async () => {
//   try {
//     const response = await axios.get("https://api.sampleapis.com/wines/whites");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching white wines:", error);
//     throw error;
//   }
// };

// export const getRoseWines = async () => {
//   try {
//     const response = await axios.get("https://api.sampleapis.com/wines/rose");
//     const RoseWines = response.data;
//     RoseWines.forEach((wine:Wine) => {
//       wine.image = wine.image.replace("https://", "http://"); // Ensure image URL uses http
//       wine.price = Math.floor(Math.random() * 100) + 1;
//       wine.type = "rose";
//     });
//     return RoseWines;
//   } catch (error) {
//     console.error("Error fetching rose wines:", error);
//     throw error;
//   }
// };
