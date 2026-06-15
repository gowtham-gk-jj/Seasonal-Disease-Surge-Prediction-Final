

const Prediction = require("../models/Prediction");



// Get All Predictions

exports.getAllPredictions = async () => {

  return await Prediction.find().sort({

    year: -1,

    week_number: -1,

  });

};



// Get Prediction By ID

exports.getPredictionById = async (id) => {

  return await Prediction.findById(id);

};



// Get Predictions By District

exports.getPredictionsByDistrict = async (

  district

) => {

  return await Prediction.find({

    district: {

      $regex: new RegExp(

        `^${district}$`,

        "i"

      ),

    },

  }).sort({

    year: -1,

    week_number: -1,

  });

};



// Create Prediction

exports.createPrediction = async (

  predictionData

) => {

  return await Prediction.create(

    predictionData

  );

};



// Update Prediction

exports.updatePrediction = async (

  id,

  updateData

) => {

  return await Prediction.findByIdAndUpdate(

    id,

    updateData,

    {

      new: true,

      runValidators: true,

    }

  );

};



// Delete Prediction

exports.deletePrediction = async (id) => {

  return await Prediction.findByIdAndDelete(

    id

  );

};



// High Risk Predictions

exports.getHighRiskPredictions =

  async () => {

    return await Prediction.find({

      $or: [

        {

          risk_level: "HIGH",

        },

        {

          surge_probability: {

            $gte: 0.7,

          },

        },

      ],

    }).sort({

      surge_probability: -1,

    });

  };



// Top Risk Districts

exports.getTopRiskDistricts =

  async (limit = 10) => {

    return await Prediction.find()

      .sort({

        surge_probability: -1,

      })

      .limit(limit)

      .select(

        "district disease risk_level surge_probability expected_cases_2w"

      );

  };



// Latest Predictions

exports.getLatestPredictions =

  async (limit = 50) => {

    return await Prediction.find()

      .sort({

        year: -1,

        week_number: -1,

      })

      .limit(limit);

  };



// Dashboard Summary

exports.getDashboardSummary =

  async () => {

    const totalPredictions =

      await Prediction.countDocuments();



    const highRiskCount =

      await Prediction.countDocuments({

        risk_level: "HIGH",

      });



    const mediumRiskCount =

      await Prediction.countDocuments({

        risk_level: "MEDIUM",

      });



    const lowRiskCount =

      await Prediction.countDocuments({

        risk_level: "LOW",

      });



    const totalDistricts =

      (

        await Prediction.distinct(

          "district"

        )

      ).length;



    return {

      totalPredictions,

      totalDistricts,

      highRiskCount,

      mediumRiskCount,

      lowRiskCount,

      last_updated:

        new Date(),

    };

  };

