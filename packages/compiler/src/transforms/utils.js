const path = require("path");

/**
 * insertProps
 * @param {string} html component render return
 * @returns add {...props} to root element
 */
function insertProps(html) {
  const idx = html.indexOf(">");
  if (idx === -1) return html;
  return (
    html.slice(0, idx) +
    ' style="width: 100%; height: 100%;" {...props} ' +
    html.slice(idx)
  );
}

/**
 * peelOffImps
 * @param {string} scriptData
 * @returns {[string, string]} scriptData imps
 */
function peelOffImps(scriptData) {
  const pattern = new RegExp(
    /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;$/,
    "mg"
  );
  const impsArr = scriptData.match(pattern);
  let imps = "";
  if (!Array.isArray(impsArr)) {
    return [scriptData, ""];
  }
  impsArr.forEach((imp) => {
    scriptData = scriptData.replace(imp, "");
    imps += imp + `\n`;
  });
  return [scriptData, imps];
}

function getPath(resourcePath) {
  return resourcePath
    .replace(path.basename(resourcePath), "")
    .replace(/\\/g, "/");
}

function getDefaultDataPath(resourcePath) {
  return getPath(resourcePath) + "data.default.json".replace(/\\/g, "/");
}

function getDefaultStylePath(resourcePath) {
  return getPath(resourcePath) + "style.default.json".replace(/\\/g, "/");
}

module.exports = {
  insertProps,
  peelOffImps,
  getPath,
  getDefaultDataPath,
  getDefaultStylePath,
};
