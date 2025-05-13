export const isNewRelease = (releaseDateString) => {
  if (!releaseDateString) {
    return false;
  }

  const releaseDate = new Date(releaseDateString);
  const currentDate = new Date();

  const normalizedReleaseDate = new Date(
    releaseDate.getFullYear(),
    releaseDate.getMonth(),
    releaseDate.getDate(),
  );
  const normalizedCurrentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
  const timeDifference =
    normalizedCurrentDate.getTime() - normalizedReleaseDate.getTime();

  return (
    (timeDifference >= 0 && timeDifference <= fourteenDaysInMs) ||
    timeDifference < 0
  ); // <0 because in database collection have a book that released date more than present
};
