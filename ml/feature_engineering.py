import pandas as pd
import numpy as np

# =====================================================
# FILE PATHS
# =====================================================

IDSP_FILE = "../data/TamilNadu_IDSP_AllYears.csv"

RAINFALL_FILE = "../data/TamilNadu_IMD_Rainfall_2015_2025.csv"

TEMP_FILE = "../data/TamilNadu_IMD_MaxTemperature_2015_2025.csv"

AEDES_FILE = "../data/Aedes_LarvalIndex_Fortnightly_2015_2025.csv"

EMRI_FILE = "../data/EMRI_108_AmbulanceCalls_2015_2025.csv"

PHC_FILE = "../data/PHC_OPD_DailyRegistration_2015_2025.csv"

BED_FILE = "../data/HospitalBedOccupancy_Weekly_2015_2025.csv"

PHARMACY_FILE = "../data/Pharmacy_OTC_Sales_Weekly_2015_2025.csv"

TNMSC_FILE = "../data/TNMSC_MedicineIndent_Weekly_2015_2025.csv"

OUTPUT_FILE = "merged_dataset.csv"

# =====================================================
# LOAD DATA
# =====================================================

print("Loading datasets...")

idsp = pd.read_csv(IDSP_FILE)

rain = pd.read_csv(RAINFALL_FILE)

temp = pd.read_csv(TEMP_FILE)

aedes = pd.read_csv(AEDES_FILE)

emri = pd.read_csv(EMRI_FILE)

phc = pd.read_csv(PHC_FILE)

bed = pd.read_csv(BED_FILE)

pharmacy = pd.read_csv(PHARMACY_FILE)

tnmsc = pd.read_csv(TNMSC_FILE)

# =====================================================
# WEEKLY AGGREGATION
# =====================================================

print("Aggregating datasets...")

emri_weekly = (
    emri.groupby(
        ["district", "year", "week_number"]
    )
    .agg(
        {
            "total_calls": "sum",
            "fever_calls": "sum"
        }
    )
    .reset_index()
)

phc_weekly = (
    phc.groupby(
        ["district", "year", "week_number"]
    )
    .agg(
        {
            "total_opd": "sum",
            "fever_opd": "sum"
        }
    )
    .reset_index()
)

aedes_weekly = (
    aedes.groupby(
        ["district", "year"]
    )
    .agg(
        {
            "aedes_larval_index": "mean"
        }
    )
    .reset_index()
)

# =====================================================
# MERGE DATASETS
# =====================================================

print("Merging datasets...")

df = idsp.merge(
    rain,
    on=["district", "year", "week_number"],
    how="left"
)

df = df.merge(
    temp,
    on=["district", "year", "week_number"],
    how="left"
)

df = df.merge(
    emri_weekly,
    on=["district", "year", "week_number"],
    how="left"
)

df = df.merge(
    phc_weekly,
    on=["district", "year", "week_number"],
    how="left"
)

df = df.merge(
    bed[
        [
            "district",
            "year",
            "week_number",
            "occupancy_rate_pct"
        ]
    ],
    on=["district", "year", "week_number"],
    how="left"
)

df = df.merge(
    pharmacy[
        [
            "district",
            "year",
            "week_number",
            "paracetamol_strips_sold"
        ]
    ],
    on=["district", "year", "week_number"],
    how="left"
)

df = df.merge(
    tnmsc[
        [
            "district",
            "year",
            "week_number",
            "dengue_diagnostic_kits"
        ]
    ],
    on=["district", "year", "week_number"],
    how="left"
)

df = df.merge(
    aedes_weekly,
    on=["district", "year"],
    how="left"
)

# =====================================================
# FILL NULLS
# =====================================================

df.fillna(0, inplace=True)

# =====================================================
# CREATE TARGET
# =====================================================

district_avg = (
    df.groupby("district")["no_of_cases"]
    .transform("mean")
)

df["surge"] = np.where(
    df["no_of_cases"] > district_avg,
    1,
    0
)

# =====================================================
# SAVE
# =====================================================

df.to_csv(
    OUTPUT_FILE,
    index=False
)

print("Saved:", OUTPUT_FILE)

print(df.head())