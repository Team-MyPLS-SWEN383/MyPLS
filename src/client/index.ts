import staticComponents from "./components/static/_index";
import dynamicComponents from "./components/dynamic/_index";

export * from './page/admin';
export * from './page/instructor';

export const generateFieldComponents = async () => {
  for (const [fnName, generator] of Object.entries(staticComponents)) {
    const divs = document.getElementsByClassName(fnName);
    for (const div of Array.from(divs)) {
      if (fnName.endsWith("Picker")) {
        const opts = div.getAttribute("options")
        if (opts) {
          div.innerHTML = await generator({options: opts.split(",")})
        } else {
          div.innerHTML = await generator();
        }
      } else {
        const nameOverride = div.getAttribute("nameOverride");
        const isRequired = div.getAttribute("isRequired");
        const options = (div.getAttribute("options") || "").split(",");
        div.innerHTML = await generator({
          nameOverride,
          isRequired,
          options
        });
      }
    }
  }
  for (const [fnName, generator] of Object.entries(dynamicComponents)) {
    const divs = document.getElementsByClassName(fnName);
    for (const div of Array.from(divs)) {
      await generator(div as HTMLDivElement);
    }
  }
}
