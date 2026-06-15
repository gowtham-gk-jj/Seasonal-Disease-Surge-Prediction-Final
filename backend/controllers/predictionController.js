

const predictionService = require("../services/predictionService");



// ─────────────────────────────────────────────

// Get All Predictions

// ─────────────────────────────────────────────

exports.getAllPredictions = async (req, res) => {

  try {

    const predictions =

      await predictionService.getAllPredictions();



    res.status(200).json({

      success: true,

      count: predictions.length,

      data: predictions,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ─────────────────────────────────────────────

// Get Prediction By ID

// ─────────────────────────────────────────────

exports.getPredictionById = async (req, res) => {

  try {

    const prediction =

      await predictionService.getPredictionById(

        req.params.id

      );



    if (!prediction) {

      return res.status(404).json({

        success: false,

        message: "Prediction not found",

      });

    }



    res.status(200).json({

      success: true,

      data: prediction,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ─────────────────────────────────────────────

// Create Prediction

// ─────────────────────────────────────────────

exports.createPrediction = async (req, res) => {

  try {

    const prediction =

      await predictionService.createPrediction(

        req.body

      );



    res.status(201).json({

      success: true,

      data: prediction,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ─────────────────────────────────────────────

// Update Prediction

// ─────────────────────────────────────────────

exports.updatePrediction = async (req, res) => {

  try {

    const prediction =

      await predictionService.updatePrediction(

        req.params.id,

        req.body

      );



    if (!prediction) {

      return res.status(404).json({

        success: false,

        message: "Prediction not found",

      });

    }



    res.status(200).json({

      success: true,

      data: prediction,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ─────────────────────────────────────────────

// Delete Prediction

// ─────────────────────────────────────────────

exports.deletePrediction = async (req, res) => {

  try {

    const prediction =

      await predictionService.deletePrediction(

        req.params.id

      );



    if (!prediction) {

      return res.status(404).json({

        success: false,

        message: "Prediction not found",

      });

    }



    res.status(200).json({

      success: true,

      message: "Prediction deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ─────────────────────────────────────────────

// Get Predictions By District

// ─────────────────────────────────────────────

exports.getPredictionsByDistrict = async (

  req,

  res

) => {

  try {

    const predictions =

      await predictionService.getPredictionsByDistrict(

        req.params.district

      );



    res.status(200).json({

      success: true,

      count: predictions.length,

      data: predictions,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ─────────────────────────────────────────────

// High Risk Predictions

// ─────────────────────────────────────────────

exports.getHighRiskPredictions = async (

  req,

  res

) => {

  try {

    const predictions =

      await predictionService.getHighRiskPredictions();



    res.status(200).json({

      success: true,

      count: predictions.length,

      data: predictions,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// ─────────────────────────────────────────────

// Top Risk Districts

// ─────────────────────────────────────────────

exports.getTopRiskDistricts = async (

  req,

  res

) => {

  try {

    const districts =

      await predictionService.getTopRiskDistricts();



    res.status(200).json({

      success: true,

      count: districts.length,

      data: districts,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ─────────────────────────────────────────────
// Dashboard Summary
// ─────────────────────────────────────────────
exports.getDashboardSummary = async (
  req,
  res
) => {
  try {
    const summary =
      await predictionService.getDashboardSummary();

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};