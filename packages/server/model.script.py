import sys
import os
import json
import joblib

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

# Load the model
model = joblib.load(os.path.join(__location__, "linear_regression_model.joblib"))

# Get the input data from command line arguments
input_data = json.loads(sys.argv[1])

# Make predictions using the loaded model
predictions = model.predict(input_data)

# Output the predictions as JSON string
print(json.dumps(predictions.tolist()))
