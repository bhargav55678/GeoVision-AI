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

    if before is None or after is None:
        raise Exception("Could not read one or both images.")

    if before.shape != after.shape:
        after = cv2.resize(after, (before.shape[1], before.shape[0]))

    before_gray = cv2.cvtColor(before, cv2.COLOR_BGR2GRAY)
    after_gray = cv2.cvtColor(after, cv2.COLOR_BGR2GRAY)

    difference = cv2.absdiff(before_gray, after_gray)

    # Lower threshold
    _, threshold = cv2.threshold(difference, 20, 255, cv2.THRESH_BINARY)

    # Connect nearby white pixels
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    threshold = cv2.dilate(threshold, kernel, iterations=2)

    contours, _ = cv2.findContours(
        threshold,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    changed_area = 0
    changed_regions = 0

    for contour in contours:

        area = cv2.contourArea(contour)

        if area < 50:
            continue

        changed_regions += 1
        changed_area += area

        x, y, w, h = cv2.boundingRect(contour)

        cv2.rectangle(before, (x, y), (x + w, y + h), (0, 0, 255), 3)

    percentage = (changed_area / (before.shape[0] * before.shape[1])) * 100

    cv2.putText(
        before,
        f"Regions: {changed_regions}",
        (20, 35),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
    )

    cv2.putText(
        before,
        f"Changed: {percentage:.2f}%",
        (20, 70),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
    )

    output_path = os.path.join(COMPARE_FOLDER, "comparison_result.png")
    cv2.imwrite(output_path, before)

    return {
        "image": output_path,
        "changed_regions": changed_regions,
        "changed_area_percentage": round(percentage, 2),
    }