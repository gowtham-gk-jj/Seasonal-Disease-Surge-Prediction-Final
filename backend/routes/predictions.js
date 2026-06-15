

const express = require("express");



const router = express.Router();



const {

  getAllPredictions,

  getPredictionById,

  createPrediction,

  updatePrediction,

  deletePrediction,

  getPredictionsByDistrict,

  getHighRiskPredictions,

  getTopRiskDistricts,

  getDashboardSummary

} = require("../controllers/predictionController");



// ─────────────────────────────────────────────

// Dashboard Summary

// GET /api/predictions/dashboard-summary

// ─────────────────────────────────────────────

router.get(

  "/dashboard-summary",

  getDashboardSummary

);



// ─────────────────────────────────────────────

// High Risk Predictions

// GET /api/predictions/high-risk

// ─────────────────────────────────────────────

router.get(

  "/high-risk",

  getHighRiskPredictions

);



// ─────────────────────────────────────────────

// Top Risk Districts

// GET /api/predictions/top-districts

// ─────────────────────────────────────────────

router.get(

  "/top-districts",

  getTopRiskDistricts

);



// ─────────────────────────────────────────────

// Get Predictions By District

// GET /api/predictions/district/Chennai

// ─────────────────────────────────────────────

router.get(

  "/district/:district",

  getPredictionsByDistrict

);



// ─────────────────────────────────────────────

// Get All Predictions

// GET /api/predictions

// ─────────────────────────────────────────────

router.get(

  "/",

  getAllPredictions

);



// ─────────────────────────────────────────────

// Get Prediction By ID

// GET /api/predictions/:id

// Keep this AFTER all custom routes

// ─────────────────────────────────────────────

router.get(

  "/:id",

  getPredictionById

);



// ─────────────────────────────────────────────

// Create Prediction

// POST /api/predictions

// ─────────────────────────────────────────────

router.post(

  "/",

  createPrediction

);



// ─────────────────────────────────────────────

// Update Prediction

// PUT /api/predictions/:id

// ─────────────────────────────────────────────

router.put(

  "/:id",

  updatePrediction

);



// ─────────────────────────────────────────────

// Delete Prediction

// DELETE /api/predictions/:id

// ─────────────────────────────────────────────

router.delete(

  "/:id",

  deletePrediction

);



module.exports = router;


