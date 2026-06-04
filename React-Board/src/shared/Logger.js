const styles = {
  info: "background: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
  success: "background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
  error: "background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
  render: "color: #8b5cf6; font-style: italic; font-weight: 500;",
  api: "background: #ec4899; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;"
};

export const logger = {
  info: (tag, message, ...data) => {
    if (data.length > 0) {
      console.log(`%cINFO%c [${tag}] ${message}`, styles.info, "", ...data);
    } else {
      console.log(`%cINFO%c [${tag}] ${message}`, styles.info, "");
    }
  },
  success: (tag, message, ...data) => {
    if (data.length > 0) {
      console.log(`%cSUCCESS%c [${tag}] ${message}`, styles.success, "", ...data);
    } else {
      console.log(`%cSUCCESS%c [${tag}] ${message}`, styles.success, "");
    }
  },
  error: (tag, message, error, ...data) => {
    if (data.length > 0) {
      console.error(`%cERROR%c [${tag}] ${message}`, styles.error, "", error, ...data);
    } else {
      console.error(`%cERROR%c [${tag}] ${message}`, styles.error, "", error);
    }
  },
  render: (componentName, details = "") => {
    console.log(`%c[RENDER] <${componentName}> ${details}`, styles.render);
  },
  api: (method, url, data = null) => {
    if (data) {
      console.log(`%cAPI%c ${method.toUpperCase()} -> ${url}`, styles.api, "", data);
    } else {
      console.log(`%cAPI%c ${method.toUpperCase()} -> ${url}`, styles.api, "");
    }
  }
};
