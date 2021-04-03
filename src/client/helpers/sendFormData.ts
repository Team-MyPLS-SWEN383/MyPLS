export const sendFormData = async (endpoint: string, method: string, form: HTMLFormElement) => {
  await fetch(endpoint, {
    method,
    body: JSON.stringify({
      ...Object.fromEntries(((new FormData(form)) as any).entries())
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });
  location.reload();
}