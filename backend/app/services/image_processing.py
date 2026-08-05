import cv2
import os

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "uploads/processed"

os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def process_image(filename):
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    output_path = os.path.join(PROCESSED_FOLDER, filename)

    image = cv2.imread(input_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(gray, 100, 200)

    cv2.imwrite(output_path, edges)

    return output_path