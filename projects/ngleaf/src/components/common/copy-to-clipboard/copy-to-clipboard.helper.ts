export function copyToClipboard(value) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      const textToCopy =
        typeof value === "string" ? value : JSON.stringify(value);
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject("Clipboard API not available");
    }
  });
}
