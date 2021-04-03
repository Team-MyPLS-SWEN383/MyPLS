export const inputGenerator = (dbName: string, label: string, placeholder: string, inputType: string = "text", handler?: string) => {
  return (opts?: {
    nameOverride?: string,
    isRequired?: string
  }) => {
    return `
    <label>
      <b>${label}</b>
      <input onchange="${handler}" type="${inputType}" placeholder="${placeholder}" name="${opts?.nameOverride || dbName}" ${(opts?.isRequired === "false") ? "" : "required"}>
    </label>
    <br/>`
  }
}