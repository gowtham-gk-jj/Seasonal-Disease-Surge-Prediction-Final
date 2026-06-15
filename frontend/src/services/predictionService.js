import API from "./api";

const predictionService = {

  async getPredictions() {

    const response =
      await API.get("/predictions");

    return response.data.data;
  },

  async getHighRiskPredictions() {

    const response =
      await API.get(
        "/predictions/high-risk"
      );

    return response.data.data;
  }

};

export default predictionService;