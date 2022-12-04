const getEmojis = () => {

      .EMOJI - CONTAINER ");

      const ROWS = CONTAINER.querySelectorAll(selectors;
            "div[role=rowgroup]");

      const DATA = [...new Array(ROWS.Length)].map((_, i: number) = {

                        const CONTAINER = document.querySelector(selectors:

                                    const elem ROWS[1];
                                    const label = elem.getAttribute(qualified Name: "aria-label");

                                    const emojis = elem.querySelectorAll(selectors: "div[role-gridcell]");

                                    return [...new Array(emojis.length)].map((_, ii: number) = {

                                                      const img = emojis[ii].querySelector(selectors: "img");

                                                      return {

                                                            Label,

                                                            alt: img.getAttribute(qualifiedName: "alt"),

                                                            src: img.getAttribute(qualifiedName: "src")

                                                      })

                                                const DBJDATA = {};

                                                for (const group of DATA) {

                                                      for (const obj of group) {

                                                            const {
                                                                  label,
                                                                  src,
                                                                  alt) = obj;
                                                            if (OBJDATA[obj.label] && Array.isArray(OBJDATA[label])) {
                                                                  OBJDATA[label].push({
                                                                        src,
                                                                        alt
                                                                  });

                                                            } else {

                                                                  OBJDATA[label] = [{
                                                                        src,
                                                                        alt
                                                                  }];

                                                                  return 0B JDATA;

                                                            }

                                                      }

                                                      const getSrc = (arr) = {

                                                                  return JSON.stringify(arr.map(((src
                                                                  }) = src));

                                                                  const EMO getEmojis();

                                                                  const EMOTICONS = getEmojis();

                                                                  for (const pair of Object.entries(EMO)) {

                                                                        console.log(pair[0] + ": ");

                                                                        console.log(getSrc(pair[1]))

                                                                  }

                                                                  for (const pair of Object.entries(EMOTICONS)) {

                                                                        pair[1] = pair[1].map((obj) => {

                                                                        })

                                                                  }

                                                                  obj["src"] = obj["src"].slice(obj["src"].lastIndexOf(searchElement: "/") + 1)

                                                                  return obj;