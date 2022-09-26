import { parse } from "json2csv";

export const makeRows = (data: any[]) =>
  data.map((d) => {
    const attributes = d.data.reduce(
      ({ arr = [], valArr = [] }, { interaction = {}, output, valueMap }) => {
        const colArr = output?.path.split('.') || [];
        const val =
          colArr.reduce(
            (acc: Record<string, any>, c: string) => acc[c],
            interaction
          ) ?? interaction[output.path];
        valArr.push(val);
        arr.push(formatValue(val, output, valueMap));
        return { arr, valArr };
      },
      {}
    );
    return {
      name: d.label,
      attributes: attributes.arr,
      numAttributes: attributes.valArr,
    };
  });

const formatValue = (
    val: number | string | undefined,
    output = null,
    valueMap = null
  ) => {
    let result = '';
    if (val == null) return 'N/A';
    if (!output) return String(val);
    if (valueMap && output.type === 'string') result = valueMap[val];
    else if (output.type === 'string' && typeof val === 'string') result = val;

    if (output.type === 'number' && typeof val === 'number') {
      const places = output.format?.split('.')[1]?.length || 0;
      result = val.toFixed(places);
    }

    if (output.prefix) result = `${output.prefix}${result}`;
    if (output.suffix) result = `${result}${output.suffix}`;
    return result;
  };

  export const exportToCSV = (rows: any[], cols: any[]) => {
    const topRow = [["Name", ...cols]];

    //replicates how each line of the table would look
    const dataRows = rows.map((row) => {
      return [row.name, ...row.attributes];
    });

    const array = topRow.concat(dataRows);

    try {
      
      // parses data into csv where top columns are just numbers
      let csv = parse(array);
      let i = 0;
      while (csv[i] !== '\n') {
        i = i + 1;
      }
      //removes first line so that proper columns are at top
      csv = csv.slice(i + 1, csv.length);

      //code to download table
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        `data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`,
      );
      element.setAttribute('download', 'analysis_export.csv');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }