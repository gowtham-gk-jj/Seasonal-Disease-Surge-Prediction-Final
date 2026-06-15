import pandas as pd
import json

from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    accuracy_score
)

df = pd.read_csv(
    "district_predictions.csv"
)

actual = (
    df["surge_probability"] > 0.50
).astype(int)

predicted = (
    df["risk_level"] == "HIGH"
).astype(int)

precision = precision_score(
    actual,
    predicted
)

recall = recall_score(
    actual,
    predicted
)

f1 = f1_score(
    actual,
    predicted
)

accuracy = accuracy_score(
    actual,
    predicted
)

metrics = {
    "precision":
        round(precision, 4),

    "recall":
        round(recall, 4),

    "f1_score":
        round(f1, 4),

    "accuracy":
        round(accuracy, 4)
}

pd.DataFrame(
    [metrics]
).to_csv(
    "../backend/data/validation_metrics.csv",
    index=False
)

with open(
    "../backend/data/scorecard.json",
    "w"
) as f:

    json.dump(
        metrics,
        f,
        indent=4
    )

print("Validation completed")