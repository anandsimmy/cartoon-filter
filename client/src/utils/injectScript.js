export default (scriptId, scriptLink) =>
  new Promise((resolve, reject) => {
    const existingscript = document.getElementById(scriptId);
    if (!existingscript) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', scriptId);
      script.setAttribute('type', 'text/javascript');
      script.addEventListener('load', () => {
        if (resolve) {
          resolve();
        }
      });
      script.addEventListener('error', e => {
        if (reject) {
          reject(e);
        }
      });
      script.src = scriptLink;
      const node = document.getElementsByTagName('script')[0];
      node.parentNode.insertBefore(script, node);
    } else if (resolve) {
      resolve();
    }
  });
