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