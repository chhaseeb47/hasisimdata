export interface SimRecord {
  Mobile?: string;
  SUB_NO?: string;
  Name?: string;
  NAME?: string;
  CNIC?: string;
  NIC?: string;
  Address?: string;
  ADDRESS?: string;
  number?: string;
  name?: string;
  cnic?: string;
  operator?: string;
  address?: string;
}

export interface ApiResponse {
  result: SimRecord[] | SimRecord | string;
}

export interface SearchResult {
  success: boolean;
  data?: SimRecord[];
  message?: string;
}

/**
 * Fetches SIM data based on the provided mobile number.
 *
 * @param {string} mobileNumber - The mobile number to search (e.g., "03462054xxx").
 * @returns {Promise<SearchResult>} - The API response with success status.
 */

export const searchSimData = async (mobileNumber: string): Promise<SearchResult> => {
  if (!mobileNumber) {
    console.warn("Please enter a valid mobile number.");
    return {
      success: false,
      message: "Please enter a valid mobile number.",
    };
  }

  const paid_api_key = "49d32e2308c704f3fa";
  const query = mobileNumber.trim().replace(/\s+/g, "");

  let formattedQuery = query;
  if (query.length === 11 && query.startsWith("0")) {
    formattedQuery = query.substring(1);
  }

  try {
    let response = await fetch(`https://api.nexoracle.com/details/pak-sim-database?apikey=${paid_api_key}&q=${formattedQuery}`);
    let data: ApiResponse = await response.json();

    if (response.status === 402 || data.result === "Access Not Allowed. Please Contact Owner.") {
      return {
        success: false,
        message: "Paid API access required. Please contact the service provider.",
      };
    }

    if (data.result === "No SIM or CNIC data found." || data.result === "No SIM data found.") {
      return {
        success: false,
        message: "No data found for this number",
      };
    }

    if (!data.result || (typeof data.result === "string" && data.result !== "No SIM or CNIC data found." && data.result !== "No SIM data found.")) {
      return {
        success: false,
        message: data.result || "API error occurred",
      };
    }

    const processedRecords: SimRecord[] = [];

    if (Array.isArray(data.result)) {
      data.result.forEach((item) => {
        if (item && (item.name || item.number)) {
          processedRecords.push({
            Mobile: item.number || item.Mobile || "N/A",
            Name: item.name || item.Name || item.NAME || "N/A",
            CNIC: item.cnic || item.CNIC || item.NIC || "N/A",
            Address: item.address || item.Address || item.ADDRESS || "N/A",
            operator: item.operator || "N/A",
          });
        }
      });
    } else if (typeof data.result === "object" && (data.result.name || data.result.number)) {
      processedRecords.push({
        Mobile: data.result.number || data.result.Mobile || "N/A",
        Name: data.result.name || data.result.Name || data.result.NAME || "N/A",
        CNIC: data.result.cnic || data.result.CNIC || data.result.NIC || "N/A",
        Address: data.result.address || data.result.Address || data.result.ADDRESS || "N/A",
        operator: data.result.operator || "N/A",
      });
    }

    if (processedRecords.length > 0) {
      return {
        success: true,
        data: processedRecords,
      };
    } else {
      return {
        success: false,
        message: "No valid information available for this number",
      };
    }
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      message: "API request failed. Please try again.",
    };
  }
};

export const incrementCounter = (): number => {
  const currentCount = parseInt(localStorage.getItem("hasiSiteUsage") || "0");
  const newCount = currentCount + 1;
  localStorage.setItem("hasiSiteUsage", newCount.toString());
  return newCount;
};

export const getCounter = (): number => {
  return parseInt(localStorage.getItem("hasiSiteUsage") || "0");
};

export const getActiveUsers = (): number => {
  return Math.floor(Math.random() * 50) + 1;
};
