export interface SearchResult {
  success: boolean;
  data?: any;
  message?: string;
}

/**
 * Fetches SIM data based on the provided mobile number.
 * 
 * @param {string} mobileNumber - The mobile number to search (e.g., "033462054847").
 * @returns {Promise<SearchResult>} - The API response with success status.
 */
export const searchSimDetails = async (mobileNumber: string): Promise<SearchResult> => {
  if (!mobileNumber) {
    console.warn("Please enter a valid mobile number.");
    return {
      success: false,
      message: "Please enter a valid mobile number."
    };
  }

  const baseUrl = "https://pakdatabase.site/api/search.php";
  const username = "Kami";
  const password = "123456";
  const queryParam = encodeURIComponent(mobileNumber.trim());

  const fullUrl = `${baseUrl}?username=${username}&password=${password}&search_term=${queryParam}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    
    return {
      success: true,
      data: jsonData
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      message: "API request failed. Please try again."
    };
  }
};

export const incrementCounter = () => {
  const currentCount = parseInt(localStorage.getItem('siteUsage') || '0');
  const newCount = currentCount + 1;
  localStorage.setItem('siteUsage', newCount.toString());
  return newCount;
};

export const getCounter = () => {
  return parseInt(localStorage.getItem('siteUsage') || '0');
};

export const getActiveUsers = () => {
  // Simulate active users between 1-50
  return Math.floor(Math.random() * 50) + 1;
};