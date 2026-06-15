import API from "./api";

const districtService = {
  async getAllDistricts() {
    try {
      const response = await API.get(
        "/districts"
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async getDistrictByName(
    districtName
  ) {
    try {
      const response = await API.get(
        `/districts/${districtName}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getDistrictRanking() {
    try {
      const response = await API.get(
        "/districts/ranking"
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async getDistrictRiskTrend(
    districtName
  ) {
    try {
      const response = await API.get(
        `/districts/${districtName}/trend`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default districtService;