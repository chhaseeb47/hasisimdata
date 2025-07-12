export interface SimRecord {
  Mobile?: string;
  SUB_NO?: string;
  Name?: string;
  NAME?: string;
  CNIC?: string;
  NIC?: string;
  Address?: string;
  ADDRESS?: string;
}

export interface ApiResponse {
  [network: string]: SimRecord[];
}

export interface SearchResult {
  success: boolean;
  data?: SimRecord[];
  message?: string;
}

/**
 * Fetches SIM data based on the provided mobile number.
 * 
 * @param {string} mobileNumber - The mobile number to search (e.g., "03206948323").
 * @returns {Promise<SearchResult>} - The API response with success status.
 */
export const searchSimData = async (mobileNumber: string): Promise<SearchResult> => {
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
  const queryParam = encodeURIComponent(mobileNumber.trim().replace(/\s+/g, ''));

  const fullUrl = `${baseUrl}?username=${username}&password=${password}&search_term=${queryParam}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Process the data to extract unique records
    const processedRecords: SimRecord[] = [];
    const numbers = new Set<string>();

    for (const network in data) {
      const records = data[network];
      if (Array.isArray(records)) {
        records.forEach(entry => {
          const mobile = entry.Mobile || entry.SUB_NO || '';
          if (!mobile || numbers.has(mobile)) return;
          numbers.add(mobile);

          processedRecords.push({
            Mobile: mobile,
            Name: entry.Name || entry.NAME || 'N/A',
            CNIC: entry.CNIC || entry.NIC || 'N/A',
            Address: entry.Address || entry.ADDRESS || 'N/A'
          });
        });
      }
    }

    if (processedRecords.length > 0) {
      return {
        success: true,
        data: processedRecords
      };
    } else {
      return {
        success: false,
        message: "No data found for this number"
      };
    }
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      message: "API request failed. Please try again."
    };
  }
};

// Counter functions
export const incrementCounter = (): number => {
  const currentCount = parseInt(localStorage.getItem('hasiSiteUsage') || '0');
  const newCount = currentCount + 1;
  localStorage.setItem('hasiSiteUsage', newCount.toString());
  return newCount;
};

export const getCounter = (): number => {
  return parseInt(localStorage.getItem('hasiSiteUsage') || '0');
};

export const getActiveUsers = (): number => {
  // Simulate active users between 1-50
  return Math.floor(Math.random() * 50) + 1;
};