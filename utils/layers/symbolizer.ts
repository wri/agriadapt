export interface legendConfigItem {
  color: string;
  name: string;
  id: number;
}

export const createColorValueMap = (
  xml: string,
  legendItems: legendConfigItem[]
) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(xml, 'application/xml');
  const elements = Array.from(doc.getElementsByTagName('ColorMapEntry'));
  const colorMap = elements.reduce((map, e) => {
    const item = legendItems.find((l) => l.color == e.getAttribute('color'));
    if (item) map[String(e.getAttribute('quantity'))] = item.name;
    return map;
  }, {});

  return colorMap;
};
