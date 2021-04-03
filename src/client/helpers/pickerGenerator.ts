export const pickerGenerator = (dbName: string, label: string, dataProvider: () => Promise<any[]>, handler?: string) => {
  return async (opts?: {
    isRequired?: string,
    filterFn?: () => boolean,
    options?: string[],
    nameOverride?: string
  }) => {
    let dataList = await dataProvider();
    if (opts?.filterFn) dataList = dataList.filter(opts.filterFn);
    if (opts?.options) dataList = dataList.filter((item) => {
      return opts.options.includes(item[dbName]);
    })
    
    let options = "";
    for (const data of dataList)
      options += `<option value="${data[dbName]}" class="option01">${data[dbName]}</option>`;

    return `
      <label>
        <b>${label}</b>
        <select name="${opts?.nameOverride || dbName}" ${(opts?.isRequired === "false") ? "" : "required"}>
          ${options}
        </select>
      </label>
      <br/>
    `;
  }
}