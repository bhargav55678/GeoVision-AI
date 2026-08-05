import cv2
import os

UPLOAD_FOLDER = "uploads"
COMPARE_FOLDER = "uploads/comparison"

os.makedirs(COMPARE_FOLDER, exist_ok=True)


def compare_images(before_filename, after_filename):

    before_path = os.path.join(UPLOAD_FOLDER, before_filename)
    after_path = os.path.join(UPLOAD_FOLDER, after_filename)

    before = cv2.imread(before_path)
    after = cv2.imread(after_path)

    # Resize second image if dimensions differ
    if before.shape != after.shape:
        after = cv2.resize(after, (before.shape[1], before.shape[0]))

    difference = cv2.absdiff(before, after)

    output_filename = "comparison_result.png"
    output_path = os.path.join(COMPARE_FOLDER, output_filename)

    cv2.imwrite(output_path, difference)

    return output_path