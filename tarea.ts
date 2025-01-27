const howManyFit = (a: number, b: number, x: number, y: number): number => {
  if (
    (a > x && a > y) ||
    (b > x && b > y) ||
    (a > x && b > x) ||
    (b > y && a > y)
  ) {
    return 0;
  }

  const option1 =
    Math.floor(x / a) * Math.floor(y / b) +
    Math.floor((x % a) / b) * Math.floor(y / a);
  const option2 =
    Math.floor(y / a) * Math.floor(x / b) +
    Math.floor((y % a) / b) * Math.floor(x / a);

  return Math.max(option1, option2);
};

console.log(howManyFit(1, 2, 2, 4));
console.log(howManyFit(2, 1, 3, 5));
console.log(howManyFit(2, 2, 1, 10));
console.log("--------------------------------");

function maxRectanglesInTriangle(
  rectWidth: number,
  rectHeight: number,
  triangleBase: number,
  triangleHeight: number
): number {
  const calculateXIntersections = (y: number): [number, number] => {
    const slope = triangleHeight / (triangleBase / 2);
    const leftX = y / slope;
    const rightX = (y - 2 * triangleHeight) / -slope;
    return [leftX, rightX];
  };

  const calculateUsableWidth = (y: number): number => {
    const [leftX, rightX] = calculateXIntersections(y);
    return rightX - leftX;
  };

  const usableWidthForHorizontal = calculateUsableWidth(rectHeight);
  const usableWidthForVertical = calculateUsableWidth(rectWidth);

  if (
    usableWidthForHorizontal < rectWidth &&
    usableWidthForVertical < rectHeight
  ) {
    return 0;
  }

  const maxHorizontalRectangles = Math.floor(
    usableWidthForHorizontal / rectWidth
  );
  const maxVerticalRectangles = Math.floor(usableWidthForVertical / rectHeight);

  const remainingHeightForHorizontal = triangleHeight - rectHeight;
  const remainingHeightForVertical = triangleHeight - rectWidth;

  const horizontalBranch =
    maxHorizontalRectangles +
    maxRectanglesInTriangle(
      rectWidth,
      rectHeight,
      usableWidthForHorizontal,
      remainingHeightForHorizontal
    );

  const verticalBranch =
    maxVerticalRectangles +
    maxRectanglesInTriangle(
      rectWidth,
      rectHeight,
      usableWidthForVertical,
      remainingHeightForVertical
    );

  return Math.max(horizontalBranch, verticalBranch);
}

const a = 3;
const b = 5;
const x = 10;
const h = 33;

console.log(
  "Máximo número de rectángulos:",
  maxRectanglesInTriangle(a, b, x, h)
);
